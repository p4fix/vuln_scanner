# Vulnerability Scanner Frontend

A modern React TypeScript frontend for the Vulnerability Scanner API. This provides a beautiful, user-friendly interface for performing security scanning operations.

## Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Real-time API Status**: Monitors API connectivity
- **Three Scanning Tools**:
  - Website Accessibility Check
  - Port Scanner
  - Banner Grabber
- **Configuration Management**: Easy API settings configuration
- **Error Handling**: Comprehensive error messages and validation
- **Security Notices**: Built-in warnings for responsible usage

## Screenshots

The frontend provides a clean, professional interface with:
- Header with API status indicator
- Configuration panel for API settings
- Tabbed interface for different scanning tools
- Real-time results display
- Security warnings and notices

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- The Vulnerability Scanner API running on `http://localhost:5000`

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure the API**:
   - Update the API key in the configuration panel
   - Ensure the API server is running on `http://localhost:5000`

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Usage

### Configuration

1. Click "Configure" in the API Configuration panel
2. Enter your API base URL (default: `http://localhost:5000`)
3. Enter your API key
4. Click "Save Configuration"

### Website Check

1. Select the "Website Check" tab
2. Enter a URL to test (e.g., `https://example.com`)
3. Click "Check"
4. View the results showing status code and accessibility

### Port Scanner

1. Select the "Port Scanner" tab
2. Enter a hostname (e.g., `example.com`)
3. Enter a port number (1-65535)
4. Click "Scan Port"
5. View the results showing if the port is open or closed

### Banner Grabber

1. Select the "Banner Grabber" tab
2. Enter a hostname and port
3. Click "Grab Banner"
4. View the banner information retrieved from the port
5. Use the "Copy" button to copy banner data to clipboard

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout with header/navigation
│   ├── WebsiteCheck.tsx    # Website accessibility checker
│   ├── PortScan.tsx        # Port scanner component
│   ├── BannerGrab.tsx      # Banner grabber component
│   └── ConfigPanel.tsx     # API configuration panel
├── services/
│   └── api.ts              # API service layer
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main application component
├── index.tsx               # Application entry point
└── index.css               # Global styles with Tailwind
```

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing (if needed)

## API Integration

The frontend integrates with the Vulnerability Scanner API endpoints:

- `POST /check_website` - Website accessibility check
- `POST /check_port` - Port scanning
- `POST /banner_grab` - Banner grabbing
- `GET /health` - API health check

## Security Features

- **Input Validation**: Client-side validation for all inputs
- **Error Handling**: Comprehensive error messages
- **Security Warnings**: Built-in notices about responsible usage
- **API Key Management**: Secure API key configuration
- **CORS Support**: Configured for local development

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

# Vulnerability Scanner API

A secure Flask-based API for performing basic vulnerability scanning operations including website accessibility checks, port scanning, and banner grabbing.

## Features

- **Website Accessibility Check**: Check if websites are accessible and return status codes
- **Port Scanning**: Check if specific ports are open on target hosts
- **Banner Grabbing**: Attempt to retrieve banner information from open ports
- **Security Features**: API key authentication, rate limiting, input validation
- **SSRF Protection**: Prevents access to localhost and internal networks
- **Comprehensive Logging**: Detailed logging for security monitoring

## Security Improvements

✅ **Input Validation**: All inputs are validated for format and security constraints  
✅ **API Key Authentication**: All endpoints require valid API key  
✅ **Rate Limiting**: Configurable rate limiting to prevent abuse  
✅ **SSRF Protection**: Blocks access to localhost and internal networks  
✅ **Security Headers**: Comprehensive security headers on all responses  
✅ **Error Handling**: Proper error handling without information leakage  
✅ **Logging**: Detailed logging for security monitoring  
✅ **CORS Configuration**: Restricted CORS settings  

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd vuln_scanner_api
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure the API**:
   - Edit `config.py` to set your API key and other settings
   - For production, set environment variables:
     ```bash
     export API_KEY=your-secret-api-key-here
     export DEBUG=False
     ```

4. **Run the application**:
   ```bash
   python app.py
   ```

## API Documentation

### Authentication

All endpoints require an API key to be included in the request headers:

```
X-API-Key: your-secret-api-key-here
```

### Endpoints

#### 1. Home (`GET /`)

Returns API information and available endpoints.

**Response**:
```json
{
  "message": "Vulnerability Scanner API is running.",
  "version": "1.0.0",
  "endpoints": {
    "/check_website": "POST - Check website accessibility",
    "/check_port": "POST - Check port status",
    "/banner_grab": "POST - Grab banner information"
  },
  "authentication": "Requires X-API-Key header"
}
```

#### 2. Check Website (`POST /check_website`)

Check if a website is accessible.

**Request**:
```json
{
  "url": "https://example.com"
}
```

**Response**:
```json
{
  "url": "https://example.com",
  "status_code": 200,
  "message": "Online",
  "error": null
}
```

#### 3. Check Port (`POST /check_port`)

Check if a port is open on a host.

**Request**:
```json
{
  "host": "example.com",
  "port": 80
}
```

**Response**:
```json
{
  "host": "example.com",
  "port": 80,
  "status": "Open",
  "error": null
}
```

#### 4. Banner Grab (`POST /banner_grab`)

Attempt to grab banner information from a port.

**Request**:
```json
{
  "host": "example.com",
  "port": 80
}
```

**Response**:
```json
{
  "host": "example.com",
  "port": 80,
  "banner": "HTTP/1.1 200 OK\r\nServer: nginx/1.18.0\r\n...",
  "error": null
}
```

#### 5. Health Check (`GET /health`)

Health check endpoint for monitoring.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Configuration

Edit `config.py` to customize the API settings:

- `API_KEY`: Your secret API key
- `DEBUG`: Enable/disable debug mode
- `HOST`: Host to bind the server to
- `PORT`: Port to run the server on
- `ALLOWED_HOSTS`: Comma-separated list of allowed CORS origins
- `MAX_REQUESTS_PER_MINUTE`: Rate limiting configuration
- `REQUEST_TIMEOUT`: Request timeout in seconds

## Security Features

### Input Validation
- URL format validation
- Hostname format validation
- Port range validation (1-65535)
- SSRF protection (blocks localhost/internal networks)

### Authentication
- API key required for all endpoints
- Invalid API key attempts are logged

### Rate Limiting
- Configurable rate limiting per IP address
- Default: 60 requests per minute

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000; includeSubDomains
- Content-Security-Policy: default-src 'self'

### Error Handling
- Comprehensive error handling
- No sensitive information leakage
- Detailed logging for security monitoring

## Usage Examples

### Using curl

```bash
# Check website
curl -X POST http://localhost:5000/check_website \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key-here" \
  -d '{"url": "https://example.com"}'

# Check port
curl -X POST http://localhost:5000/check_port \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key-here" \
  -d '{"host": "example.com", "port": 80}'

# Banner grab
curl -X POST http://localhost:5000/banner_grab \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-secret-api-key-here" \
  -d '{"host": "example.com", "port": 80}'
```

### Using Python requests

```python
import requests

headers = {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-secret-api-key-here'
}

# Check website
response = requests.post(
    'http://localhost:5000/check_website',
    headers=headers,
    json={'url': 'https://example.com'}
)
print(response.json())

# Check port
response = requests.post(
    'http://localhost:5000/check_port',
    headers=headers,
    json={'host': 'example.com', 'port': 80}
)
print(response.json())
```

## Error Codes

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid API key
- `404 Not Found`: Endpoint not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## Logging

The API provides comprehensive logging:

- Request logging with IP addresses
- Security event logging (invalid API keys, validation failures)
- Error logging with stack traces
- Operation logging for audit trails

## Development

### Project Structure

```
vuln_scanner_api/
├── app.py              # Main Flask application
├── scanner.py          # Core scanning functions
├── input_validators.py # Input validation functions
├── middleware.py       # Authentication and security middleware
├── config.py          # Configuration settings
├── requirements.txt   # Python dependencies
└── README.md         # This file
```

### Adding New Endpoints

1. Add the endpoint to `app.py`
2. Apply the `@require_api_key` decorator
3. Apply the `@limiter.limit()` decorator
4. Add input validation
5. Add proper error handling
6. Add logging

## Security Considerations

⚠️ **Important**: This API is designed for educational and authorized testing purposes only.

- Always use HTTPS in production
- Regularly rotate API keys
- Monitor logs for suspicious activity
- Keep dependencies updated
- Use strong API keys
- Consider additional authentication methods for production use

## License

This project is for educational purposes. Use responsibly and only on systems you own or have explicit permission to test. 