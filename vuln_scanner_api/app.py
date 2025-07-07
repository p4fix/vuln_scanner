# app.py

from flask import Flask, request, jsonify, g
from flask_cors import CORS
import logging
from typing import Dict, Any, Tuple
import traceback

# Import our modules
from scanner import check_website, check_port, banner_grabbing
from input_validators import validate_url, validate_hostname, validate_port
from middleware import require_api_key, add_security_headers, log_request_info, validate_json_content, limiter
from config import Config

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS with security restrictions
CORS(app, origins=Config.ALLOWED_HOSTS)

# Initialize rate limiter with the app
limiter.init_app(app)

# Register middleware
@app.before_request
def before_request():
    """Execute before each request."""
    log_request_info()
    
    # Validate JSON content for POST requests
    if request.method == 'POST':
        validation_result = validate_json_content()
        if validation_result:
            return validation_result

@app.after_request
def after_request(response):
    """Execute after each request."""
    return add_security_headers(response)

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    logger.warning(f"404 error: {request.path} from {request.remote_addr}")
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    logger.error(f"500 error: {error}")
    return jsonify({"error": "Internal server error"}), 500

@app.errorhandler(Exception)
def handle_exception(e):
    """Handle unhandled exceptions."""
    logger.error(f"Unhandled exception: {str(e)}")
    logger.error(f"Traceback: {traceback.format_exc()}")
    return jsonify({"error": "An unexpected error occurred"}), 500

@app.route("/")
def home():
    """Home endpoint with API information."""
    return jsonify({
        "message": "Vulnerability Scanner API is running.",
        "version": "1.0.0",
        "endpoints": {
            "/check_website": "POST - Check website accessibility",
            "/check_port": "POST - Check port status",
            "/banner_grab": "POST - Grab banner information"
        },
        "authentication": "Requires X-API-Key header"
    })

@app.route("/check_website", methods=["POST"])
@limiter.limit(f"{Config.MAX_REQUESTS_PER_MINUTE} per minute")
@require_api_key
def api_check_website():
    """
    Check if a website is accessible.
    
    Expected JSON payload:
    {
        "url": "https://example.com"
    }
    """
    try:
        data = request.get_json()
        url = data.get("url")
        
        # Validate URL
        is_valid, error_message = validate_url(url)
        if not is_valid:
            logger.warning(f"Invalid URL provided: {url} from {request.remote_addr}")
            return jsonify({"error": error_message}), 400
        
        # Perform the check
        result = check_website(url)
        
        # Log the operation
        logger.info(f"Website check completed for {url} by {request.remote_addr}")
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in check_website endpoint: {str(e)}")
        return jsonify({"error": "An error occurred while checking the website"}), 500

@app.route("/check_port", methods=["POST"])
@limiter.limit(f"{Config.MAX_REQUESTS_PER_MINUTE} per minute")
@require_api_key
def api_check_port():
    """
    Check if a port is open on a host.
    
    Expected JSON payload:
    {
        "host": "example.com",
        "port": 80
    }
    """
    try:
        data = request.get_json()
        host = data.get("host")
        port = data.get("port")
        
        # Validate hostname
        is_valid, error_message = validate_hostname(host)
        if not is_valid:
            logger.warning(f"Invalid hostname provided: {host} from {request.remote_addr}")
            return jsonify({"error": error_message}), 400
        
        # Validate port
        try:
            port = int(port)
        except (ValueError, TypeError):
            logger.warning(f"Invalid port provided: {port} from {request.remote_addr}")
            return jsonify({"error": "Port must be a valid integer"}), 400
        
        is_valid, error_message = validate_port(port)
        if not is_valid:
            logger.warning(f"Invalid port provided: {port} from {request.remote_addr}")
            return jsonify({"error": error_message}), 400
        
        # Perform the check
        result = check_port(host, port)
        
        # Log the operation
        logger.info(f"Port check completed for {host}:{port} by {request.remote_addr}")
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in check_port endpoint: {str(e)}")
        return jsonify({"error": "An error occurred while checking the port"}), 500

@app.route("/banner_grab", methods=["POST"])
@limiter.limit(f"{Config.MAX_REQUESTS_PER_MINUTE} per minute")
@require_api_key
def api_banner_grab():
    """
    Attempt to grab banner information from a port.
    
    Expected JSON payload:
    {
        "host": "example.com",
        "port": 80
    }
    """
    try:
        data = request.get_json()
        host = data.get("host")
        port = data.get("port")
        
        # Validate hostname
        is_valid, error_message = validate_hostname(host)
        if not is_valid:
            logger.warning(f"Invalid hostname provided: {host} from {request.remote_addr}")
            return jsonify({"error": error_message}), 400
        
        # Validate port
        try:
            port = int(port)
        except (ValueError, TypeError):
            logger.warning(f"Invalid port provided: {port} from {request.remote_addr}")
            return jsonify({"error": "Port must be a valid integer"}), 400
        
        is_valid, error_message = validate_port(port)
        if not is_valid:
            logger.warning(f"Invalid port provided: {port} from {request.remote_addr}")
            return jsonify({"error": error_message}), 400
        
        # Perform the banner grab
        result = banner_grabbing(host, port)
        
        # Log the operation
        logger.info(f"Banner grab completed for {host}:{port} by {request.remote_addr}")
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in banner_grab endpoint: {str(e)}")
        return jsonify({"error": "An error occurred while grabbing banner information"}), 500

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "timestamp": "2024-01-01T00:00:00Z"
    })

if __name__ == "__main__":
    logger.info("Starting Vulnerability Scanner API...")
    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )
