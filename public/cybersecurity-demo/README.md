# Permission is the New Perimeter

**A Live Demonstration of Browser Permission Abuse**

An educational cybersecurity awareness project that demonstrates how malicious websites abuse browser permissions to spy on users. This is a controlled, safe simulation designed for security education and awareness training.

## 🎯 Purpose

This project creates a realistic, intense (but 100% harmless) browser-based demonstration that shows:

- How modern web APIs can be weaponized by attackers
- Real-world attack patterns used in campaigns like MageCart, Pegasus, and ransomware operations
- The importance of carefully reviewing permission requests
- Best practices for browser security and privacy

## ⚠️ Important Disclaimer

**This is an educational tool only.** The demo:

- ✅ Requests real browser permissions (for educational impact)
- ✅ Immediately stops all media streams after permission requests
- ✅ Never records, stores, or transmits any data
- ✅ Runs entirely client-side in your browser
- ✅ Is completely safe and harmless

**No data is ever collected, stored, or sent anywhere.**

## 🚀 Quick Start

### Local Development

1. **Clone or download this repository**

2. **Serve the files using a local server** (required for proper functionality):

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve .

   # Using PHP
   php -S localhost:8000

   # Using VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

3. **Open in browser**: Navigate to `http://localhost:8000`

   **Note**: For full functionality (especially camera/microphone permissions), use HTTPS. See deployment options below.

### Requirements

- Modern web browser (Chrome, Firefox, Edge, Safari)
- HTTPS connection (recommended for all permission APIs to work)
- User consent (required checkbox before demo starts)

## 📁 Project Structure

```
cybersecurity-demo/
├── index.html      # Main demo page
├── style.css       # Styling (terminal theme)
├── script.js       # Demo logic and permission requests
├── README.md       # This file
├── package.json    # Node.js dependencies
└── wrangler.toml   # Cloudflare Workers configuration
```

## 🌐 Deployment Options

### Option 1: Cloudflare Workers (Recommended)

Cloudflare Workers provides free HTTPS hosting with global edge distribution.

1. **Install Wrangler CLI**:
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Deploy**:
   ```bash
   wrangler deploy
   ```

4. Your demo will be live at: `https://your-project-name.your-subdomain.workers.dev`

**Benefits**:
- Free HTTPS (required for camera/mic permissions)
- Global CDN
- Fast deployment
- Custom domain support

### Option 2: Cloudflare Pages

1. **Push to GitHub** (or GitLab/Bitbucket)

2. **Connect to Cloudflare Pages**:
   - Go to Cloudflare Dashboard → Pages
   - Connect your repository
   - Build command: (leave empty, static site)
   - Output directory: `/` (root)

3. **Deploy**: Cloudflare will automatically deploy on every push

### Option 3: GitHub Pages

1. **Push to GitHub repository**

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select source branch (usually `main`)
   - Save

3. **Access**: `https://your-username.github.io/your-repo-name/`

**Note**: GitHub Pages provides free HTTPS automatically.

### Option 4: Netlify

1. **Drag and drop** the `cybersecurity-demo` folder to [Netlify Drop](https://app.netlify.com/drop)

2. **Or connect via Git**:
   - Connect repository
   - Build command: (none)
   - Publish directory: `/`

### Option 5: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

## 🔧 Configuration

### Cloudflare Workers (wrangler.toml)

The `wrangler.toml` file is pre-configured for Cloudflare Workers deployment. You can customize:

- `name`: Your project name
- `compatibility_date`: Workers runtime version

### Custom Domain

To use a custom domain:

1. **Cloudflare Workers**: Add route in `wrangler.toml`:
   ```toml
   routes = [
     { pattern = "demo.yourdomain.com", zone_name = "yourdomain.com" }
   ]
   ```

2. **Cloudflare Pages**: Add custom domain in dashboard

3. **GitHub Pages**: Add CNAME file with your domain

## 🎓 Educational Use Cases

This demo is suitable for:

- **Security Awareness Training**: Show employees how permission-based attacks work
- **Educational Institutions**: Computer science and cybersecurity courses
- **Conference Presentations**: DEF CON, Black Hat, BSides talks
- **Red Team Exercises**: Demonstrate attack vectors to stakeholders
- **Personal Learning**: Understand browser security risks

## 🔒 Security Features

- **No Data Collection**: All permission requests are immediately terminated
- **Client-Side Only**: No server-side code, no data transmission
- **Open Source**: Full code available for audit
- **HTTPS Required**: Warns users if not on secure connection

## 📋 Permissions Demonstrated

The demo requests (and immediately stops) the following permissions:

1. **Geolocation** - High-accuracy location tracking
2. **Camera** - Front-facing camera access
3. **Microphone** - Audio recording
4. **Notifications** - Push notification spam
5. **Fullscreen** - UI takeover
6. **Clipboard** - Read clipboard contents
7. **Motion Sensors** - Device orientation/motion (mobile)
8. **USB Devices** - Connected USB enumeration
9. **Battery Status** - Battery level monitoring
10. **Vibration** - Haptic feedback (mobile)

## 🛠️ Development

### Local Testing

```bash
# Install dependencies (optional, for local dev server)
npm install

# Serve locally
npx serve .

# Or use Python
python -m http.server 8000
```

### Browser Compatibility

- ✅ Chrome/Edge (Chromium) - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support (some APIs may vary)
- ✅ Mobile browsers - Full support with enhanced effects

### Customization

To customize the demo:

1. **Modify terminal messages**: Edit `script.js` → `addTerminalMessage()` calls
2. **Change colors**: Edit `style.css` → CSS variables
3. **Add permissions**: Add new request methods in `script.js`
4. **Modify debrief**: Edit HTML in `index.html` → `#phase-debrief`

## 📚 Resources & References

- [Electronic Frontier Foundation (EFF)](https://www.eff.org/)
- [Mozilla Foundation](https://foundation.mozilla.org/)
- [OWASP](https://owasp.org/)
- [Web API Permissions](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
- [Browser Security Best Practices](https://developer.mozilla.org/en-US/docs/Web/Security)

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- Additional permission APIs
- Enhanced visual effects
- Mobile-specific features
- Accessibility improvements
- Translation/localization
- Additional educational content

## 📄 License

This project is provided for educational purposes. Use responsibly and ethically.

## 🙏 Credits

Created for cybersecurity education and awareness. Inspired by real-world attack campaigns and security research.

---

**Remember**: Permission is the new perimeter. Stay vigilant, stay informed, stay secure.
