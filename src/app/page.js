// src/app/page.js
'use client'

import { useState, useEffect } from 'react'
import Link from "next/link";

export default function Home() {
  const [deployTime, setDeployTime] = useState('')
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setDeployTime(new Date().toLocaleString())
    
    // Check health status
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('error'))
  }, [])

  return (

    
    <main style={styles.container}>
      <h1 style={styles.title}>🚀 CI/CD Deployment Demo</h1>
      <p style={styles.subtitle}>Successfully deployed with automated pipeline!</p>



       <div style={{ marginBottom: "20px" }}>
        <Link href="/about">
          <button style={styles.button}>About Us</button>
        </Link>
      </div>
      
      <div style={styles.card}>
        <h2>📋 Deployment Information</h2>
        <p><strong>Status:</strong> <span style={{color: '#28a745'}}>● Live</span></p>
        <p><strong>Deployed at:</strong> {deployTime || 'Loading...'}</p>
        <p><strong>Environment:</strong> Production</p>
        <p><strong>Health Check:</strong> {status === 'healthy' ? '✅ Passing' : '⏳ Checking...'}</p>
      </div>

      <div style={styles.card}>
        <h2>✅ CI/CD Pipeline Status</h2>
        <ul style={styles.list}>
          <li>✓ Code committed to repository</li>
          <li>✓ Automated build completed</li>
          <li>✓ Tests passed</li>
          <li>✓ Deployed to production server</li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2>🔄 Quick Actions</h2>
        <button onClick={() => window.location.reload()} style={styles.button}>
          Refresh Page
        </button>
        <button onClick={() => fetch('/api/health').then(res => res.json()).then(data => alert('Status: ' + data.status))} style={{...styles.button, ...styles.buttonSecondary}}>
          Check Health
        </button>
      </div>

      <footer style={styles.footer}>
        <p>Powered by Next.js | CI/CD Ready</p>
      </footer>
    </main>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    borderRadius: '10px'
  },
  title: {
    color: '#fff',
    fontSize: '2.5rem',
    marginBottom: '10px'
  },
  subtitle: {
    color: '#fff',
    fontSize: '1.2rem',
    marginBottom: '30px'
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
    margin: '20px 0',
    textAlign: 'left',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  button: {
    background: '#0070f3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px'
  },
  buttonSecondary: {
    background: '#6c757d'
  },
  footer: {
    marginTop: '40px',
    color: '#fff',
    fontSize: '14px'
  }
}