// Permission Demo - Main JavaScript
// This script handles the interactive demonstration of browser permission abuse

// DOM Elements
const phases = document.querySelectorAll('.phase');
const startBtn = document.getElementById('start-demo');
const backBtn = document.getElementById('back-btn');
const beginBtn = document.getElementById('begin-btn');
const exitBtn = document.getElementById('exit-demo');
const restartBtn = document.getElementById('restart-demo');
const learnMoreBtn = document.getElementById('learn-more');
const consentCheckbox = document.getElementById('consent-checkbox');
const connectionStatus = document.getElementById('connection-status');
const terminalOutput = document.getElementById('terminal-output');
const currentYear = document.getElementById('current-year');

// Set current year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Check if connection is secure
if (window.location.protocol === 'https:') {
    connectionStatus.textContent = 'Secure (HTTPS)';
    connectionStatus.classList.add('text-success');
} else {
    connectionStatus.textContent = 'Not Secure (HTTP)';
    connectionStatus.classList.add('text-danger');
    
    // Show warning if not on HTTPS
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        alert('WARNING: This demo requires HTTPS for permission requests to work. Please use HTTPS or localhost.');
    }
}

// Phase management
function showPhase(phaseId) {
    phases.forEach(phase => {
        if (phase.id === phaseId) {
            phase.classList.add('active');
            phase.style.display = 'block';
            phase.scrollIntoView({ behavior: 'smooth' });
        } else {
            phase.classList.remove('active');
            phase.style.display = 'none';
        }
    });
}

// Terminal simulation
class TerminalSimulator {
    constructor(outputElement) {
        this.output = outputElement;
        this.queue = [];
        this.isProcessing = false;
        this.typingSpeed = 5; // Lower is faster
        this.lineDelay = 500; // Delay between lines in ms
    }

    typeText(text, element, speed = this.typingSpeed) {
        return new Promise(resolve => {
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            };
            type();
        });
    }

    addLine(text, className = '', typeSpeed = this.typingSpeed) {
        return new Promise(resolve => {
            this.queue.push({ text, className, typeSpeed, resolve });
            this.processQueue();
        });
    }

    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;
        
        const { text, className, typeSpeed, resolve } = this.queue.shift();
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        
        // Add prompt for input lines
        if (className === 'input') {
            line.innerHTML = '> ';
            const textNode = document.createElement('span');
            line.appendChild(textNode);
            this.output.appendChild(line);
            await this.typeText(text, textNode, typeSpeed);
        } else {
            line.innerHTML = '> ' + text;
            this.output.appendChild(line);
        }
        
        // Auto-scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;
        
        // Resolve after a small delay to allow for animation
        setTimeout(() => {
            resolve();
            this.isProcessing = false;
            this.processQueue();
        }, this.lineDelay);
    }

    clear() {
        this.output.innerHTML = '';
        this.queue = [];
        this.isProcessing = false;
    }
}

// Initialize terminal
const terminal = new TerminalSimulator(terminalOutput);

// Permission simulation
class PermissionSimulator {
    constructor(terminal) {
        this.terminal = terminal;
        this.permissions = [
            {
                name: 'geolocation',
                description: 'High-accuracy geolocation',
                method: this.simulateGeolocation.bind(this),
                delay: 1000
            },
            {
                name: 'camera',
                description: 'Front-facing camera',
                method: this.simulateCameraAccess.bind(this),
                delay: 1500
            },
            {
                name: 'microphone',
                description: 'Microphone access',
                method: this.simulateMicrophoneAccess.bind(this),
                delay: 1000
            },
            {
                name: 'notifications',
                description: 'Browser notifications',
                method: this.simulateNotifications.bind(this),
                delay: 1200
            },
            {
                name: 'fullscreen',
                description: 'Fullscreen mode',
                method: this.simulateFullscreen.bind(this),
                delay: 800
            },
            {
                name: 'clipboard',
                description: 'Clipboard access',
                method: this.simulateClipboardAccess.bind(this),
                delay: 1000
            },
            {
                name: 'sensors',
                description: 'Motion/orientation sensors',
                method: this.simulateSensors.bind(this),
                delay: 1200
            },
            {
                name: 'usb',
                description: 'USB device access',
                method: this.simulateUSBAccess.bind(this),
                delay: 1500
            },
            {
                name: 'battery',
                description: 'Battery status',
                method: this.simulateBatteryStatus.bind(this),
                delay: 800
            }
        ];
        
        this.currentIndex = 0;
    }

    async start() {
        // Clear terminal and show initial message
        this.terminal.clear();
        await this.terminal.addLine('Initializing attack simulation...', 'info');
        await this.terminal.addLine('Target system analysis in progress...', 'info');
        await this.terminal.addLine(`Detected: ${navigator.userAgent}`, 'text-muted');
        await this.terminal.addLine(`Platform: ${navigator.platform}`, 'text-muted');
        await this.terminal.addLine(`Language: ${navigator.language}`, 'text-muted');
        await this.terminal.addLine('', 'divider');
        
        // Start simulating permissions
        await this.simulateNextPermission();
        
        // After all permissions are simulated
        await this.terminal.addLine('', 'divider');
        await this.terminal.addLine('Simulation complete. Analyzing results...', 'info');
        await this.terminal.addLine('Generating security report...', 'info');
        await this.terminal.addLine('', 'divider');
        await this.terminal.addLine('DEMONSTRATION COMPLETE', 'success text-center');
        
        // Show debrief after a short delay
        setTimeout(() => {
            showPhase('debrief');
        }, 2000);
    }
    
    async simulateNextPermission() {
        if (this.currentIndex >= this.permissions.length) {
            return;
        }
        
        const permission = this.permissions[this.currentIndex];
        this.currentIndex++;
        
        // Show the permission being requested
        await this.terminal.addLine(`Requesting ${permission.name} access...`, 'info');
        
        // Simulate the permission request with appropriate delay
        await new Promise(resolve => setTimeout(resolve, permission.delay));
        
        // Execute the permission simulation
        await permission.method();
        
        // Process next permission
        await this.simulateNextPermission();
    }
    
    async simulateGeolocation() {
        try {
            await this.terminal.addLine('> Accessing high-accuracy geolocation...', 'input');
            
            // Simulate geolocation access
            const position = await new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocation not supported'));
                    return;
                }
                
                // Mock position for demonstration
                setTimeout(() => {
                    resolve({
                        coords: {
                            latitude: 37.7749 + (Math.random() * 0.01 - 0.005), // Randomize slightly
                            longitude: -122.4194 + (Math.random() * 0.01 - 0.005),
                            accuracy: 10 + Math.random() * 50,
                            altitude: null,
                            altitudeAccuracy: null,
                            heading: null,
                            speed: null
                        },
                        timestamp: Date.now()
                    });
                }, 1000);
            });
            
            const { latitude, longitude, accuracy } = position.coords;
            await this.terminal.addLine(`  ✓ Location accessed: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Accuracy: ${Math.round(accuracy)}m)`, 'success');
            await this.terminal.addLine(`  > Reverse geocoding approximate address...`, 'text-muted');
            await new Promise(resolve => setTimeout(resolve, 800));
            await this.terminal.addLine(`  ✓ Approximate address: 123 Main St, San Francisco, CA`, 'text-muted');
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
    
    async simulateCameraAccess() {
        try {
            await this.terminal.addLine('> Accessing camera feed...', 'input');
            
            // Try to access camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            
            // Immediately stop the stream (we don't actually want to record)
            stream.getTracks().forEach(track => track.stop());
            
            await this.terminal.addLine('  ✓ Camera accessed successfully', 'success');
            await this.terminal.addLine(`  > Camera resolution: 1280x720`, 'text-muted');
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
    
    async simulateMicrophoneAccess() {
        try {
            await this.terminal.addLine('> Accessing microphone...', 'input');
            
            // Try to access microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Immediately stop the stream
            stream.getTracks().forEach(track => track.stop());
            
            await this.terminal.addLine('  ✓ Microphone accessed successfully', 'success');
            await this.terminal.addLine('  > Audio levels: Normal', 'text-muted');
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
    
    async simulateNotifications() {
        try {
            await this.terminal.addLine('> Requesting notification permissions...', 'input');
            
            if (!('Notification' in window)) {
                throw new Error('Notifications not supported');
            }
            
            if (Notification.permission === 'granted') {
                await this.terminal.addLine('  ✓ Notifications already enabled', 'success');
                return;
            }
            
            if (Notification.permission === 'denied') {
                throw new Error('Notifications blocked by user');
            }
            
            // Request permission
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                await this.terminal.addLine('  ✓ Notifications enabled', 'success');
            } else {
                throw new Error('User denied notification permission');
            }
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
    
    async simulateFullscreen() {
        try {
            await this.terminal.addLine('> Attempting fullscreen takeover...', 'input');
            
            if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled) {
                throw new Error('Fullscreen not supported');
            }
            
            // Just simulate the request, don't actually go fullscreen
            await this.terminal.addLine('  ! Fullscreen request would be displayed here', 'warning');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simulate user accepting after a delay
            await this.terminal.addLine('  ✓ Fullscreen access granted', 'success');
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
    
    async simulateClipboardAccess() {
        try {
            await this.terminal.addLine('> Accessing clipboard...', 'input');
            
            if (!navigator.clipboard) {
                throw new Error('Clipboard API not supported');
            }
            
            // Try to read clipboard text
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    await this.terminal.addLine('  ✓ Clipboard accessed successfully', 'success');
                    await this.terminal.addLine(`  > Clipboard content: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`, 'text-muted');
                } else {
                    await this.terminal.addLine('  ✓ Clipboard accessed (empty)', 'success');
                }
            } catch (error) {
                // If read is denied, try write as a fallback
                if (error.name === 'NotAllowedError') {
                    await this.terminal.addLine('  ! Read access denied, trying write access...', 'warning');
                    await navigator.clipboard.writeText('This is a test from the permission demo');
                    await this.terminal.addLine('  ✓ Write access successful', 'success');
                } else {
                    throw error;
                }
            }
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
    
    async simulateSensors() {
        try {
            await this.terminal.addLine('> Accessing device motion/orientation...', 'input');
            
            // Check for DeviceMotionEvent
            if (!('DeviceMotionEvent' in window) || !('DeviceOrientationEvent' in window)) {
                throw new Error('Motion/Orientation API not supported');
            }
            
            // iOS 13+ requires permission for motion/orientation
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                await this.terminal.addLine('  > iOS 13+ detected, requesting permission...', 'text-muted');
                const permission = await DeviceMotionEvent.requestPermission();
                
                if (permission !== 'granted') {
                    throw new Error('User denied motion permission');
                }
            }
            
            // Simulate reading sensor data
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            await this.terminal.addLine('  ✓ Motion/orientation access granted', 'success');
            await this.terminal.addLine('  > Device orientation: Landscape', 'text-muted');
            await this.terminal.addLine('  > Motion: Stationary', 'text-muted');
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
    
    async simulateUSBAccess() {
        try {
            await this.terminal.addLine('> Enumerating USB devices...', 'input');
            
            if (!navigator.usb) {
                throw new Error('WebUSB API not supported');
            }
            
            // Just simulate the request, don't actually request USB access
            await this.terminal.addLine('  ! USB permission request would be displayed here', 'warning');
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulate finding a device
            await this.terminal.addLine('  ✓ USB access granted', 'success');
            await this.terminal.addLine('  > Found 2 USB devices:', 'text-muted');
            await this.terminal.addLine('    - USB Keyboard (046d:c31c)', 'text-muted');
            await this.terminal.addLine('    - USB Storage (0781:5590)', 'text-muted');
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
    
    async simulateBatteryStatus() {
        try {
            await this.terminal.addLine('> Accessing battery status...', 'input');
            
            if (!navigator.getBattery) {
                throw new Error('Battery Status API not supported');
            }
            
            const battery = await navigator.getBattery();
            
            await this.terminal.addLine('  ✓ Battery status accessed', 'success');
            await this.terminal.addLine(`  > Battery level: ${Math.floor(battery.level * 100)}%`, 'text-muted');
            await this.terminal.addLine(`  > Charging: ${battery.charging ? 'Yes' : 'No'}`, 'text-muted');
            
            // Add event listeners for demonstration purposes
            battery.addEventListener('chargingchange', () => {
                // In a real app, you'd update the UI here
            });
            
            battery.addEventListener('levelchange', () => {
                // In a real app, you'd update the UI here
            });
            
        } catch (error) {
            await this.terminal.addLine(`  ✗ Access denied: ${error.message}`, 'danger');
        }
    }
}

// Initialize permission simulator
const permissionSimulator = new PermissionSimulator(terminal);

// Event Listeners
if (startBtn) {
    startBtn.addEventListener('click', () => {
        showPhase('consent');
    });
}

if (backBtn) {
    backBtn.addEventListener('click', () => {
        showPhase('landing');
    });
}

if (beginBtn) {
    // Enable/disable begin button based on consent checkbox
    consentCheckbox.addEventListener('change', () => {
        beginBtn.disabled = !consentCheckbox.checked;
    });
    
    beginBtn.addEventListener('click', () => {
        showPhase('demo');
        // Start the simulation after a short delay
        setTimeout(() => {
            permissionSimulator.start();
        }, 1000);
    });
}

if (exitBtn) {
    exitBtn.addEventListener('click', () => {
        showPhase('debrief');
    });
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        // Reset the permission simulator
        permissionSimulator.currentIndex = 0;
        showPhase('landing');
    });
}

if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        window.open('https://owasp.org/www-project-top-ten/', '_blank');
    });
}

// Initialize matrix background
function initMatrix() {
    const canvas = document.getElementById('matrix');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Set canvas size
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Matrix characters
    const matrix = '01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * 100;
    }
    
    // Draw function
    function draw() {
        // Semi-transparent black rectangle for fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text style
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px 'IBM Plex Mono', monospace`;
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            // Reset drop if it reaches the bottom or randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Start animation
    setInterval(draw, 33);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize matrix background
    initMatrix();
    
    // Show landing page by default
    showPhase('landing');
    
    // Check if we're coming back from a page refresh
    if (sessionStorage.getItem('demoStarted') === 'true') {
        showPhase('demo');
        setTimeout(() => {
            permissionSimulator.start();
        }, 1000);
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    // Clear any stored state
    sessionStorage.removeItem('demoStarted');
});
