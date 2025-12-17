# Permission is the New Perimeter

> A Live Demonstration of Browser Permission Abuse

![Demo Screenshot](screenshot.png)

## Overview

This is a professional, educational demonstration that showcases how modern web applications can potentially abuse browser permissions. The demo simulates various permission requests in a controlled environment to raise awareness about web security and privacy concerns.

**Disclaimer**: This is an educational tool only. No data is collected, stored, or transmitted during the demonstration.

## Features

- Interactive terminal-style interface
- Simulation of various browser permission requests:
  - Geolocation
  - Camera and microphone access
  - Notifications
  - Fullscreen mode
  - Clipboard access
  - Device motion/orientation
  - USB device access
  - Battery status
- Educational debrief with security recommendations
- Responsive design for all devices
- No external dependencies (100% client-side)

## Prerequisites

- Modern web browser (Chrome, Firefox, Edge, or Safari)
- HTTPS connection (required for most permissions)
- For local development: Node.js and npm (optional)

## Local Development

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd permission-demo
   ```

2. **Install dependencies** (optional, for development server)
   ```bash
   npm install -g live-server
   ```

3. **Run the development server**
   ```bash
   live-server --port=3000
   ```
   The demo will be available at `http://localhost:3000`

## Deployment

### Option 1: GitHub Pages

1. Create a new GitHub repository
2. Push the code to the `main` branch
3. Go to Repository Settings > Pages
4. Select `main` branch and `/ (root)` folder
5. Save and wait for deployment

### Option 2: Cloudflare Pages

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   wrangler pages publish . --project-name=permission-demo
   ```

### Option 3: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

## Usage

1. Open the demo in a modern web browser
2. Read the introduction and click "BEGIN DEMONSTRATION"
3. Review and accept the consent form
4. Observe the simulated permission requests in the terminal interface
5. Review the educational debrief at the end

## Security Considerations

- The demo runs entirely in the browser with no server-side component
- No data is collected, stored, or transmitted
- All media streams are immediately terminated after access
- The demo is designed to be educational and non-malicious

## Browser Compatibility

| Browser       | Status | Notes                                      |
|---------------|--------|--------------------------------------------|
| Chrome        | ✅      | Full support                              |
| Firefox       | ✅      | Full support                              |
| Edge          | ✅      | Full support                              |
| Safari        | ⚠️      | Some permissions may be limited on iOS/macOS |
| Mobile Chrome | ✅      | Full support                              |
| Mobile Safari | ⚠️      | Some permissions may be limited           |

## Customization

You can customize the following aspects of the demo:

- **Colors**: Modify the CSS variables in `style.css`
- **Terminal Text**: Edit the text in `script.js`
- **Permissions**: Add or remove permission simulations in the `PermissionSimulator` class

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by real-world security research and attack techniques
- Special thanks to the security community for their ongoing research

## Author

[Your Name] - [Your Twitter/GitHub]

---

*This tool is for educational purposes only. Use responsibly and always obtain proper authorization before testing security measures on any system.*
