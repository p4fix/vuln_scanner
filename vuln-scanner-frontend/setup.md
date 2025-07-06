# React Frontend Setup Guide

## Quick Start

### 1. Install Node.js
First, ensure you have Node.js installed (version 14 or higher):
```bash
node --version
npm --version
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## Configuration

### API Setup
1. Ensure your Vulnerability Scanner API is running on `http://localhost:5000`
2. Open the frontend in your browser
3. Click "Configure" in the API Configuration panel
4. Enter your API key (default: `your-secret-api-key-here`)
5. Click "Save Configuration"

### Environment Variables (Optional)
Create a `.env` file in the root directory:
```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_DEFAULT_API_KEY=your-secret-api-key-here
```

## Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Run `npm install` to install dependencies
   - Clear node_modules: `rm -rf node_modules && npm install`

2. **API connection failed**
   - Check if the API server is running on port 5000
   - Verify the API key in the configuration panel
   - Check browser console for CORS errors

3. **TypeScript errors**
   - Ensure all dependencies are installed
   - Check that TypeScript is properly configured

## Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Project Structure
```
vuln-scanner-frontend/
├── public/                 # Static files
├── src/                    # Source code
│   ├── components/         # React components
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── ...
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── tailwind.config.js     # Tailwind CSS config
```

## Security Notes

⚠️ **Important**: This tool is for educational and authorized testing only.
- Only scan systems you own or have permission to test
- The frontend includes security warnings
- API keys should be kept secure 