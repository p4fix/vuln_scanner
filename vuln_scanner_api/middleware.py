# middleware.py

from functools import wraps
from flask import request, jsonify, g
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging
from input_validators import validate_api_key
from config import Config

logger = logging.getLogger(__name__)

# Initialize rate limiter
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=[f"{Config.MAX_REQUESTS_PER_MINUTE} per minute"]
)

def require_api_key(f):
    """
    Decorator to require API key authentication.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        
        if not api_key:
            logger.warning(f"Missing API key from {request.remote_addr}")
            return jsonify({"error": "API key required"}), 401
        
        if not validate_api_key(api_key):
            logger.warning(f"Invalid API key from {request.remote_addr}")
            return jsonify({"error": "Invalid API key"}), 401
        
        # Store the API key in Flask's g object for potential future use
        g.api_key = api_key
        logger.info(f"Valid API key used by {request.remote_addr}")
        
        return f(*args, **kwargs)
    return decorated_function

def add_security_headers(response):
    """
    Add security headers to all responses.
    """
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    return response

def log_request_info():
    """
    Log request information for security monitoring.
    """
    logger.info(f"Request: {request.method} {request.path} from {request.remote_addr}")
    if request.headers.get('User-Agent'):
        logger.info(f"User-Agent: {request.headers.get('User-Agent')}")

def validate_json_content():
    """
    Validate that the request has proper JSON content.
    """
    if request.method == 'POST':
        if not request.is_json:
            logger.warning(f"Non-JSON request from {request.remote_addr}")
            return jsonify({"error": "Content-Type must be application/json"}), 400
        
        if not request.get_json():
            logger.warning(f"Empty JSON request from {request.remote_addr}")
            return jsonify({"error": "Request body cannot be empty"}), 400 