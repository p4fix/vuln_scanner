# validators.py
import re
import validators
from typing import Tuple, Optional
from config import Config

def validate_url(url: str) -> Tuple[bool, Optional[str]]:
    """
    Validate URL format and security constraints.
    
    Args:
        url: The URL to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not url:
        return False, "URL is required"
    
    # Check if URL starts with http or https
    if not url.startswith(('http://', 'https://')):
        return False, "URL must start with http:// or https://"
    
    # Use validators library for comprehensive URL validation
    if not validators.url(url):
        return False, "Invalid URL format"
    
    # Check for localhost/internal IP addresses (SSRF protection)
    localhost_patterns = [
        r'localhost',
        r'127\.0\.0\.1',
        r'0\.0\.0\.0',
        r'10\.',
        r'172\.(1[6-9]|2[0-9]|3[0-1])\.',
        r'192\.168\.',
    ]
    
    for pattern in localhost_patterns:
        if re.search(pattern, url, re.IGNORECASE):
            return False, "Access to localhost/internal networks is not allowed"
    
    return True, None

def validate_hostname(hostname: str) -> Tuple[bool, Optional[str]]:
    """
    Validate hostname format and security constraints.
    
    Args:
        hostname: The hostname to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not hostname:
        return False, "Hostname is required"
    
    # Check for valid hostname format
    if not re.match(r'^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$', hostname):
        return False, "Invalid hostname format"
    
    # Check for localhost/internal addresses
    localhost_patterns = [
        r'^localhost$',
        r'^127\.0\.0\.1$',
        r'^0\.0\.0\.0$',
        r'^10\.',
        r'^172\.(1[6-9]|2[0-9]|3[0-1])\.',
        r'^192\.168\.',
    ]
    
    for pattern in localhost_patterns:
        if re.match(pattern, hostname, re.IGNORECASE):
            return False, "Access to localhost/internal networks is not allowed"
    
    return True, None

def validate_port(port: int) -> Tuple[bool, Optional[str]]:
    """
    Validate port number.
    
    Args:
        port: The port number to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not isinstance(port, int):
        return False, "Port must be an integer"
    
    if port < Config.MIN_PORT or port > Config.MAX_PORT:
        return False, f"Port must be between {Config.MIN_PORT} and {Config.MAX_PORT}"
    
    return True, None

def validate_api_key(api_key: str) -> bool:
    """
    Validate API key.
    
    Args:
        api_key: The API key to validate
        
    Returns:
        True if valid, False otherwise
    """
    return api_key == Config.API_KEY 