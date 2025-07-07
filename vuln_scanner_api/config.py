# config.py
import os
from typing import List

class Config:
    # API Configuration
    API_KEY = os.getenv('API_KEY', 'your-secret-api-key-here')
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 5000))
    
    # Security Settings
    ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')
    MAX_REQUESTS_PER_MINUTE = int(os.getenv('MAX_REQUESTS_PER_MINUTE', 60))
    REQUEST_TIMEOUT = int(os.getenv('REQUEST_TIMEOUT', 10))
    
    # Scanner Settings
    SOCKET_TIMEOUT = 5
    HTTP_TIMEOUT = 10
    MAX_PORT = 65535
    MIN_PORT = 1 