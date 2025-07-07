# scanner.py

import socket
import requests
import logging
from typing import Dict, Any
from config import Config

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def check_website(url: str) -> Dict[str, Any]:
    """
    Check if a website is accessible and return status information.
    
    Args:
        url: The URL to check
        
    Returns:
        Dictionary containing status information
    """
    result = {
        'url': url,
        'status_code': None,
        'message': '',
        'error': None
    }
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        logger.info(f"Checking website: {url}")
        response = requests.get(
            url, 
            headers=headers, 
            timeout=Config.HTTP_TIMEOUT,
            allow_redirects=False
        )
        
        result['status_code'] = response.status_code
        result['message'] = "Online" if response.status_code == 200 else f"Response: {response.status_code}"
        
        # Log the result
        logger.info(f"Website {url} check completed: {result['message']}")
        
    except requests.exceptions.Timeout:
        result['message'] = "Timeout"
        result['error'] = "Request timed out"
        logger.warning(f"Timeout checking website: {url}")
    except requests.exceptions.ConnectionError:
        result['message'] = "Connection Error"
        result['error'] = "Unable to connect to the server"
        logger.warning(f"Connection error checking website: {url}")
    except requests.exceptions.RequestException as e:
        result['message'] = "Request Error"
        result['error'] = str(e)
        logger.error(f"Request error checking website {url}: {e}")
    except Exception as e:
        result['message'] = "Unexpected Error"
        result['error'] = str(e)
        logger.error(f"Unexpected error checking website {url}: {e}")
    
    return result


def check_port(host: str, port: int) -> Dict[str, Any]:
    """
    Check if a port is open on a host.
    
    Args:
        host: The hostname to check
        port: The port number to check
        
    Returns:
        Dictionary containing port status information
    """
    result = {
        'host': host,
        'port': port,
        'status': '',
        'error': None
    }
    
    try:
        logger.info(f"Checking port {port} on {host}")
        
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(Config.SOCKET_TIMEOUT)
            connection_result = sock.connect_ex((host, port))
            
            if connection_result == 0:
                result['status'] = "Open"
                logger.info(f"Port {port} on {host} is open")
            else:
                result['status'] = "Closed"
                logger.info(f"Port {port} on {host} is closed")
                
    except socket.gaierror as e:
        result['status'] = "Error"
        result['error'] = f"Hostname resolution failed: {str(e)}"
        logger.error(f"Hostname resolution error for {host}: {e}")
    except socket.timeout:
        result['status'] = "Error"
        result['error'] = "Connection timeout"
        logger.warning(f"Timeout checking port {port} on {host}")
    except Exception as e:
        result['status'] = "Error"
        result['error'] = str(e)
        logger.error(f"Error checking port {port} on {host}: {e}")
    
    return result


def banner_grabbing(host: str, port: int) -> Dict[str, Any]:
    """
    Attempt to grab banner information from a port.
    
    Args:
        host: The hostname to connect to
        port: The port number to connect to
        
    Returns:
        Dictionary containing banner information
    """
    result = {
        'host': host,
        'port': port,
        'banner': None,
        'error': None
    }
    
    try:
        logger.info(f"Attempting banner grab on {host}:{port}")
        
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(Config.SOCKET_TIMEOUT)
            s.connect((host, port))
            
            # Send a basic HTTP request
            request = f"GET / HTTP/1.1\r\nHost: {host}\r\nUser-Agent: Mozilla/5.0\r\n\r\n"
            s.send(request.encode())
            
            # Receive response
            response = s.recv(1024)
            if response:
                result['banner'] = response.decode(errors="ignore")
                logger.info(f"Banner grabbed from {host}:{port}")
            else:
                result['error'] = "No response received"
                logger.warning(f"No response from {host}:{port}")
                
    except socket.gaierror as e:
        result['error'] = f"Hostname resolution failed: {str(e)}"
        logger.error(f"Hostname resolution error for {host}: {e}")
    except socket.timeout:
        result['error'] = "Connection timeout"
        logger.warning(f"Timeout during banner grab on {host}:{port}")
    except ConnectionRefusedError:
        result['error'] = "Connection refused"
        logger.warning(f"Connection refused on {host}:{port}")
    except Exception as e:
        result['error'] = str(e)
        logger.error(f"Error during banner grab on {host}:{port}: {e}")
    
    return result
