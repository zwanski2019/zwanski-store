import React, { useState, useEffect, useRef } from 'react'
import SEO from '../components/SEO'

export default function CybersecurityDemo() {
  const [agreed, setAgreed] = useState(false)
  const [demoActive, setDemoActive] = useState(false)
  const [phase, setPhase] = useState<'intro' | 'demo' | 'reveal'>('intro')
  const [terminalMessages, setTerminalMessages] = useState<string[]>([])
  const [permissions, setPermissions] = useState<Record<string, 'pending' | 'granted' | 'denied'>>({})
  const [progress, setProgress] = useState(0)
  const [fakeData, setFakeData] = useState<any>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const matrixIntervalRef = useRef<number | null>(null)
  const glitchIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (phase === 'demo' && canvasRef.current) {
      startMatrixEffect()
      startGlitchEffect()
      playCreepySounds()
    }
    return () => {
      cleanup()
    }
  }, [phase])

  const cleanup = () => {
    if (matrixIntervalRef.current) {
      clearInterval(matrixIntervalRef.current)
    }
    if (glitchIntervalRef.current) {
      clearInterval(glitchIntervalRef.current)
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
  }

  const addTerminalMessage = (msg: string) => {
    setTerminalMessages(prev => [...prev, msg])
  }

  const startMatrixEffect = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff00'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    matrixIntervalRef.current = interval as any
  }

  const startGlitchEffect = () => {
    const glitch = () => {
      document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`
      setTimeout(() => {
        document.body.style.filter = ''
      }, 100)
    }
    const interval = setInterval(glitch, 2000)
    glitchIntervalRef.current = interval as any
  }

  const playCreepySounds = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext

      const playBeep = (freq: number, duration: number, delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.frequency.value = freq
          oscillator.type = 'sawtooth'
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
          
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + duration)
        }, delay)
      }

      playBeep(200, 0.1, 500)
      playBeep(150, 0.1, 1500)
      playBeep(100, 0.2, 3000)
      playBeep(80, 0.3, 5000)
    } catch (e) {
      // Audio not available
    }
  }

  const requestGeolocation = async () => {
    setPermissions(prev => ({ ...prev, geolocation: 'pending' }))
    addTerminalMessage('> Locating your exact position...')
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 })
      })
      
      setPermissions(prev => ({ ...prev, geolocation: 'granted' }))
      addTerminalMessage('✓ GPS coordinates acquired: ' + position.coords.latitude + ', ' + position.coords.longitude)
      addTerminalMessage('> Tracking enabled...')
    } catch (e) {
      setPermissions(prev => ({ ...prev, geolocation: 'denied' }))
      addTerminalMessage('✗ ACCESS DENIED - Excellent! You just stopped location tracking.')
    }
  }

  const requestMedia = async () => {
    setPermissions(prev => ({ ...prev, media: 'pending' }))
    addTerminalMessage('> Activating front camera... smile!')
    addTerminalMessage('> Turning on microphone... listening...')
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      
      mediaStreamRef.current = stream
      setPermissions(prev => ({ ...prev, media: 'granted' }))
      addTerminalMessage('✓ Camera and microphone activated')
      addTerminalMessage('> Recording in progress...')
      
      // Stop immediately after getting permission
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop())
        mediaStreamRef.current = null
      }, 100)
    } catch (e) {
      setPermissions(prev => ({ ...prev, media: 'denied' }))
      addTerminalMessage('✗ ACCESS DENIED - Excellent! You protected your privacy.')
    }
  }

  const requestNotifications = async () => {
    setPermissions(prev => ({ ...prev, notifications: 'pending' }))
    addTerminalMessage('> Injecting persistent notification...')
    
    try {
      const permission = await Notification.requestPermission()
      
      if (permission === 'granted') {
        setPermissions(prev => ({ ...prev, notifications: 'granted' }))
        addTerminalMessage('✓ Notification permission granted')
        addTerminalMessage('> Spam notifications enabled...')
      } else {
        setPermissions(prev => ({ ...prev, notifications: 'denied' }))
        addTerminalMessage('✗ ACCESS DENIED - Excellent! You prevented notification spam.')
      }
    } catch (e) {
      setPermissions(prev => ({ ...prev, notifications: 'denied' }))
      addTerminalMessage('✗ ACCESS DENIED - Excellent!')
    }
  }

  const requestFullscreen = async () => {
    setPermissions(prev => ({ ...prev, fullscreen: 'pending' }))
    addTerminalMessage('> Attempting fullscreen takeover...')
    
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
        setPermissions(prev => ({ ...prev, fullscreen: 'granted' }))
        addTerminalMessage('✓ Fullscreen mode activated')
      } else {
        throw new Error('Fullscreen not supported')
      }
    } catch (e) {
      setPermissions(prev => ({ ...prev, fullscreen: 'denied' }))
      addTerminalMessage('✗ ACCESS DENIED - Excellent!')
    }
  }

  const requestClipboard = async () => {
    setPermissions(prev => ({ ...prev, clipboard: 'pending' }))
    addTerminalMessage('> Reading your clipboard...')
    
    try {
      const text = await navigator.clipboard.readText()
      setPermissions(prev => ({ ...prev, clipboard: 'granted' }))
      addTerminalMessage('✓ Clipboard data extracted: ' + (text.substring(0, 20) || '[empty]'))
    } catch (e) {
      setPermissions(prev => ({ ...prev, clipboard: 'denied' }))
      addTerminalMessage('✗ ACCESS DENIED - Excellent! You protected your clipboard.')
    }
  }

  const generateFakeData = () => {
    const fakeIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    const fakeDevice = {
      userAgent: navigator.userAgent.substring(0, 50) + '...',
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      ip: fakeIP,
      timestamp: new Date().toISOString()
    }
    setFakeData(fakeDevice)
  }

  const startDemo = async () => {
    if (!agreed) return
    
    setDemoActive(true)
    setPhase('demo')
    setTerminalMessages([])
    setProgress(0)
    generateFakeData()
    
    addTerminalMessage('> Initializing attack sequence...')
    addTerminalMessage('> Connecting to remote server...')
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Sequential permission requests
    await requestGeolocation()
    setProgress(20)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await requestMedia()
    setProgress(40)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await requestNotifications()
    setProgress(60)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await requestFullscreen()
    setProgress(80)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await requestClipboard()
    setProgress(100)
    
    addTerminalMessage('')
    addTerminalMessage('> SYSTEM COMPROMISED - DATA EXFILTRATION IN PROGRESS')
    addTerminalMessage('> Uploading sensitive data...')
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Reveal phase
    setPhase('reveal')
    cleanup()
    
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  const exitDemo = () => {
    cleanup()
    setDemoActive(false)
    setPhase('intro')
    setTerminalMessages([])
    setProgress(0)
    setPermissions({})
    setFakeData(null)
    
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    
    document.body.style.filter = ''
  }

  return (
    <div className={`min-h-screen ${phase === 'demo' ? 'bg-black text-green-500' : 'bg-gray-50 text-gray-900'}`}>
      <SEO 
        title="Cybersecurity Warning: Permission Trap Demo" 
        description="Educational cybersecurity awareness demo showing how malicious sites trick users into granting dangerous permissions"
      />
      
      <div className="container mx-auto px-4 py-8">
        {phase === 'intro' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">Cybersecurity Warning: Permission Trap Demo</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Understanding Cybersecurity Threats</h2>
              <p className="mb-4 text-gray-700">
                Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. 
                These attacks are usually aimed at accessing, changing, or destroying sensitive information, 
                extorting money from users, or interrupting normal business processes.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Common Threats:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Phishing:</strong> Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity</li>
                <li><strong>Permission Abuse:</strong> Malicious websites requesting unnecessary permissions (camera, microphone, location) to spy on users</li>
                <li><strong>Spyware:</strong> Software that secretly monitors and collects information about users without their knowledge</li>
                <li><strong>Ransomware:</strong> Malware that encrypts files and demands payment for decryption</li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-red-700">⚠️ Important Warning</h2>
              <p className="mb-4 text-gray-800">
                This is an intense educational simulation designed to demonstrate how easily malicious websites 
                can trick users into granting dangerous permissions. The demo will:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800 mb-4">
                <li>Request REAL browser permissions (camera, microphone, geolocation, notifications, etc.)</li>
                <li>Display scary visual effects to mimic a real attack</li>
                <li>Show fake terminal messages and progress indicators</li>
                <li>Create an immersive "hacker" experience</li>
              </ul>
              <p className="text-gray-800 font-semibold">
                <strong>Important:</strong> No data will be recorded, stored, or transmitted. All media streams are 
                stopped immediately after permission is granted. This is completely safe and educational.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5"
                />
                <span className="text-gray-700">
                  I understand this is an intense educational simulation. It will request real device permissions 
                  and display scary effects to mimic a real attack. No data will be recorded, stored, or transmitted. 
                  I voluntarily agree to participate in this demo.
                </span>
              </label>
            </div>

            <div className="text-center">
              <button
                onClick={startDemo}
                disabled={!agreed}
                className={`px-8 py-4 text-xl font-bold rounded-lg transition-all ${
                  agreed
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg transform hover:scale-105'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                START DEMO
              </button>
            </div>
          </div>
        )}

        {phase === 'demo' && (
          <div className="relative min-h-screen">
            <canvas
              ref={canvasRef}
              className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none"
            />
            
            <div className="relative z-10 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-red-500 animate-pulse">
                  ⚠️ SYSTEM BREACH DETECTED ⚠️
                </h2>
                <button
                  onClick={exitDemo}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  EXIT DEMO
                </button>
              </div>

              <div className="bg-black border-2 border-green-500 rounded-lg p-6 mb-6 font-mono text-sm">
                <div className="space-y-1">
                  {terminalMessages.map((msg, idx) => (
                    <div key={idx} className={msg.startsWith('✗') ? 'text-green-400' : msg.startsWith('✓') ? 'text-red-400' : 'text-green-500'}>
                      {msg}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-green-500 animate-pulse">_</div>
              </div>

              {progress > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-red-400 font-bold">ATTACK PROGRESS</span>
                    <span className="text-red-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-4">
                    <div
                      className="bg-red-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {fakeData && (
                <div className="bg-black border-2 border-red-500 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-red-500 mb-4">EXTRACTED DATA:</h3>
                  <pre className="text-green-500 font-mono text-xs overflow-auto">
                    {JSON.stringify(fakeData, null, 2)}
                  </pre>
                </div>
              )}

              {Object.values(permissions).some(p => p === 'granted') && (
                <div className="bg-red-900 border-4 border-red-500 rounded-lg p-6 mb-6 animate-pulse">
                  <h3 className="text-3xl font-bold text-white text-center mb-4">
                    🚨 CRITICAL SECURITY BREACH 🚨
                  </h3>
                  <p className="text-white text-center text-xl">
                    Your device permissions have been compromised!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === 'reveal' && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold text-green-600 mb-4">
                ✅ THIS WAS A SIMULATION
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                You just experienced how real malicious websites work
              </p>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-4">What Just Happened?</h3>
              <p className="text-gray-800 mb-4">
                Malicious websites use fear, urgency, fake rewards, or social engineering to trick you into 
                clicking "Allow" on permission requests. They create scenarios that make you feel like you 
                need to grant permissions quickly, without thinking.
              </p>
              <p className="text-gray-800">
                <strong>Remember:</strong> Real attackers use these exact same techniques. The visual effects, 
                fake terminal messages, and urgent warnings are all designed to make you feel vulnerable and 
                act impulsively.
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-4">Safe Browsing Tips:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li><strong>Always question permission requests:</strong> Ask yourself why a website needs camera, microphone, or location access</li>
                <li><strong>Check the URL:</strong> Make sure you're on a legitimate website before granting permissions</li>
                <li><strong>Read carefully:</strong> Don't rush through permission dialogs - take your time to understand what you're allowing</li>
                <li><strong>When in doubt, deny:</strong> It's better to deny a permission and grant it later if needed</li>
                <li><strong>Review permissions:</strong> Regularly check your browser settings to see which sites have permissions</li>
                <li><strong>Use HTTPS:</strong> Only grant permissions on secure (HTTPS) websites</li>
                <li><strong>Keep software updated:</strong> Browser updates often include security improvements</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-4">Permission Review:</h3>
              <div className="space-y-2">
                {Object.entries(permissions).map(([perm, status]) => (
                  <div key={perm} className="flex justify-between items-center">
                    <span className="capitalize">{perm.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className={status === 'granted' ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                      {status === 'granted' ? '⚠️ Granted' : '✅ Denied'}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-gray-800">
                {Object.values(permissions).some(p => p === 'granted')
                  ? 'If you granted any permissions, consider revoking them in your browser settings.'
                  : 'Excellent! You denied all permission requests. This is the correct behavior for unknown or suspicious websites.'}
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={exitDemo}
                className="bg-blue-600 text-white px-8 py-4 text-xl font-bold rounded-lg hover:bg-blue-700 shadow-lg"
              >
                Exit Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
