// Permission Trap Demo - Main Script
// Educational cybersecurity awareness demonstration

class PermissionTrapDemo {
    constructor() {
        this.currentPhase = 'intro';
        this.permissions = {};
        this.mediaStream = null;
        this.audioContext = null;
        this.matrixInterval = null;
        this.glitchInterval = null;
        this.progress = 0;
        this.extractedData = {};
        
        this.init();
    }

    init() {
        this.checkHTTPS();
        this.setupEventListeners();
        this.setupMatrixCanvas();
    }

    checkHTTPS() {
        if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
            document.getElementById('https-warning').classList.add('show');
        }
    }

    setupEventListeners() {
        const consentCheckbox = document.getElementById('consent-checkbox');
        const beginBtn = document.getElementById('begin-btn');
        const exitBtn = document.getElementById('exit-btn');
        const restartBtn = document.getElementById('restart-btn');
        const exitDebriefBtn = document.getElementById('exit-debrief-btn');

        consentCheckbox.addEventListener('change', (e) => {
            beginBtn.disabled = !e.target.checked;
        });

        beginBtn.addEventListener('click', () => this.startDemo());
        exitBtn.addEventListener('click', () => this.exitDemo());
        restartBtn.addEventListener('click', () => this.restartDemo());
        exitDebriefBtn.addEventListener('click', () => this.exitDemo());
    }

    setupMatrixCanvas() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    showPhase(phase) {
        document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
        document.getElementById(`phase-${phase}`).classList.add('active');
        this.currentPhase = phase;
    }

    addTerminalMessage(message, type = 'normal') {
        const terminal = document.getElementById('terminal');
        if (!terminal) return;

        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = `> ${message}`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    updateProgress(percent) {
        this.progress = percent;
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        
        if (progressBar) progressBar.style.width = `${percent}%`;
        if (progressText) progressText.textContent = `${percent}%`;
    }

    startMatrixEffect() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff00';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        this.matrixInterval = setInterval(draw, 50);
    }

    startGlitchEffect() {
        const glitch = () => {
            document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            setTimeout(() => {
                document.body.style.filter = '';
            }, 100);
        };

        this.glitchInterval = setInterval(glitch, 2000);
    }

    playAmbientSound() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            const playBeep = (freq, duration, delay) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.value = freq;
                    oscillator.type = 'sawtooth';
                    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + duration);
                }, delay);
            };

            playBeep(200, 0.1, 500);
            playBeep(150, 0.1, 1500);
            playBeep(100, 0.2, 3000);
            playBeep(80, 0.3, 5000);
        } catch (e) {
            console.log('Audio not available');
        }
    }

    async collectSystemInfo() {
        this.extractedData = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screenResolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: new Date().toISOString()
        };

        // Try to get public IP (harmless, just for demo)
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            this.extractedData.publicIP = data.ip;
        } catch (e) {
            this.extractedData.publicIP = '[Unable to fetch]';
        }

        // Battery API (if available)
        if (navigator.getBattery) {
            try {
                const battery = await navigator.getBattery();
                this.extractedData.battery = {
                    level: Math.round(battery.level * 100) + '%',
                    charging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            } catch (e) {
                // Battery API not available
            }
        }

        this.updateExtractedDataDisplay();
    }

    updateExtractedDataDisplay() {
        const dataDisplay = document.getElementById('extracted-data');
        if (dataDisplay) {
            dataDisplay.textContent = JSON.stringify(this.extractedData, null, 2);
        }
    }

    async requestGeolocation() {
        this.addTerminalMessage('Breaching geolocation defenses...', 'warning');
        this.permissions.geolocation = 'pending';

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    { enableHighAccuracy: true, timeout: 5000 }
                );
            });

            this.permissions.geolocation = 'granted';
            this.addTerminalMessage(`ACCESS GRANTED - Coordinates: ${position.coords.latitude}, ${position.coords.longitude}`, 'granted');
            this.extractedData.location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            };
            this.updateExtractedDataDisplay();
        } catch (e) {
            this.permissions.geolocation = 'denied';
            this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
        }
    }

    async requestMedia() {
        this.addTerminalMessage('Activating front-facing camera... subject detected', 'warning');
        this.addTerminalMessage('Microphone hot – recording ambient audio', 'warning');
        this.permissions.media = 'pending';

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: true
            });

            this.mediaStream = stream;
            this.permissions.media = 'granted';
            this.addTerminalMessage('ACCESS GRANTED - Camera and microphone active', 'granted');
            
            // Stop immediately
            setTimeout(() => {
                stream.getTracks().forEach(track => track.stop());
                this.mediaStream = null;
            }, 100);
        } catch (e) {
            this.permissions.media = 'denied';
            this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
        }
    }

    async requestNotifications() {
        this.addTerminalMessage('Injecting persistent notification spam...', 'warning');
        this.permissions.notifications = 'pending';

        try {
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                this.permissions.notifications = 'granted';
                this.addTerminalMessage('ACCESS GRANTED - Notification spam enabled', 'granted');
            } else {
                this.permissions.notifications = 'denied';
                this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
            }
        } catch (e) {
            this.permissions.notifications = 'denied';
            this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
        }
    }

    async requestFullscreen() {
        this.addTerminalMessage('Attempting fullscreen takeover...', 'warning');
        this.permissions.fullscreen = 'pending';

        try {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
                this.permissions.fullscreen = 'granted';
                this.addTerminalMessage('ACCESS GRANTED - Fullscreen mode activated', 'granted');
            } else {
                throw new Error('Fullscreen not supported');
            }
        } catch (e) {
            this.permissions.fullscreen = 'denied';
            this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
        }
    }

    async requestClipboard() {
        this.addTerminalMessage('Dumping clipboard history...', 'warning');
        this.permissions.clipboard = 'pending';

        try {
            const text = await navigator.clipboard.readText();
            this.permissions.clipboard = 'granted';
            this.addTerminalMessage(`ACCESS GRANTED - Clipboard data: ${text.substring(0, 30)}...`, 'granted');
            this.extractedData.clipboard = text.substring(0, 100);
            this.updateExtractedDataDisplay();
        } catch (e) {
            this.permissions.clipboard = 'denied';
            this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
        }
    }

    async requestMotion() {
        this.addTerminalMessage('Probing motion and orientation sensors...', 'warning');
        this.permissions.motion = 'pending';

        try {
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === 'granted') {
                    this.permissions.motion = 'granted';
                    this.addTerminalMessage('ACCESS GRANTED - Motion tracking enabled', 'granted');
                } else {
                    this.permissions.motion = 'denied';
                    this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
                }
            } else {
                // Try to access directly (may work on some browsers)
                this.permissions.motion = 'denied';
                this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
            }
        } catch (e) {
            this.permissions.motion = 'denied';
            this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
        }
    }

    async requestUSB() {
        this.addTerminalMessage('Enumerating connected USB devices...', 'warning');
        this.permissions.usb = 'pending';

        try {
            if (navigator.usb) {
                const devices = await navigator.usb.getDevices();
                this.permissions.usb = 'granted';
                this.addTerminalMessage(`ACCESS GRANTED - Found ${devices.length} USB device(s)`, 'granted');
            } else {
                throw new Error('WebUSB not supported');
            }
        } catch (e) {
            this.permissions.usb = 'denied';
            this.addTerminalMessage('ACCESS DENIED - Target protected this vector', 'denied');
        }
    }

    async requestVibration() {
        if ('vibrate' in navigator) {
            try {
                navigator.vibrate([200, 100, 200]);
                this.addTerminalMessage('Haptic feedback triggered', 'warning');
            } catch (e) {
                // Vibration not available
            }
        }
    }

    showWarning(message) {
        const overlay = document.getElementById('warning-overlay');
        const warningText = document.getElementById('warning-text');
        
        if (overlay && warningText) {
            warningText.textContent = message;
            overlay.classList.remove('hidden');
            
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 3000);
        }
    }

    cleanup() {
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
            this.matrixInterval = null;
        }

        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
            this.glitchInterval = null;
        }

        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }

        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        document.body.style.filter = '';
    }

    async startDemo() {
        this.showPhase('demo');
        this.permissions = {};
        this.progress = 0;
        this.updateProgress(0);
        
        // Clear terminal
        const terminal = document.getElementById('terminal');
        if (terminal) terminal.innerHTML = '';

        // Start effects
        this.startMatrixEffect();
        this.startGlitchEffect();
        this.playAmbientSound();

        // Collect system info
        await this.collectSystemInfo();
        this.updateProgress(10);

        // Sequential permission requests
        await this.delay(1000);
        await this.requestGeolocation();
        this.updateProgress(25);

        await this.delay(2000);
        await this.requestMedia();
        this.updateProgress(40);

        await this.delay(2000);
        await this.requestNotifications();
        this.updateProgress(55);

        await this.delay(2000);
        await this.requestFullscreen();
        this.updateProgress(70);

        await this.delay(2000);
        await this.requestClipboard();
        this.updateProgress(85);

        await this.delay(2000);
        await this.requestMotion();
        this.updateProgress(90);

        await this.delay(2000);
        await this.requestUSB();
        this.updateProgress(95);

        await this.requestVibration();

        await this.delay(2000);
        this.addTerminalMessage('SYSTEM COMPROMISED - DATA EXFILTRATION IN PROGRESS', 'warning');
        this.updateProgress(100);

        await this.delay(3000);
        
        // Show final warning
        const grantedCount = Object.values(this.permissions).filter(p => p === 'granted').length;
        if (grantedCount > 0) {
            this.showWarning(`CRITICAL: ${grantedCount} permission(s) granted. In a real attack, your data would be compromised.`);
        }

        await this.delay(3000);
        
        // Move to debrief
        this.cleanup();
        this.showPhase('debrief');
    }

    exitDemo() {
        this.cleanup();
        this.showPhase('intro');
        this.permissions = {};
        this.progress = 0;
        this.extractedData = {};
        
        const terminal = document.getElementById('terminal');
        if (terminal) terminal.innerHTML = '';
        
        const consentCheckbox = document.getElementById('consent-checkbox');
        if (consentCheckbox) consentCheckbox.checked = false;
        
        const beginBtn = document.getElementById('begin-btn');
        if (beginBtn) beginBtn.disabled = true;
    }

    restartDemo() {
        this.exitDemo();
        setTimeout(() => {
            const consentCheckbox = document.getElementById('consent-checkbox');
            if (consentCheckbox) {
                consentCheckbox.checked = true;
                const beginBtn = document.getElementById('begin-btn');
                if (beginBtn) beginBtn.disabled = false;
            }
        }, 100);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize demo when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PermissionTrapDemo();
    });
} else {
    new PermissionTrapDemo();
}
