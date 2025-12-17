import React, { useEffect } from 'react'
import SEO from '../components/SEO'

export default function PermissionDemo() {
  useEffect(() => {
    // Redirect to the standalone demo
    // Since we're using HashRouter, we need to navigate outside the hash routing
    const base = (import.meta as any).env?.BASE_URL || '/'
    const demoPath = base + 'cybersecurity-demo/index.html'
    
    // Use window.location.replace to avoid adding to history
    window.location.replace(demoPath)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <SEO 
        title="Permission Trap Demo" 
        description="Standalone browser permission abuse demonstration"
      />
      <div className="text-center">
        <h1 className="text-2xl mb-4">Loading Permission Trap Demo...</h1>
        <p className="text-gray-400">Redirecting to standalone demo...</p>
      </div>
    </div>
  )
}
