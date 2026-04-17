// src/app/about/page.js
import Link from 'next/link'

export default function About() {
  return (
    <div style={styles.container}>
      <h1>About This App</h1>
      <p>This is a simple Next.js application configured for CI/CD deployment.</p>
      
      <div style={styles.info}>
        <h2>Features:</h2>
        <ul>
          <li>✅ Ready for production deployment</li>
          <li>✅ Health check endpoint at /api/health</li>
          <li>✅ Optimized build with standalone output</li>
          <li>✅ Environment configuration ready</li>
        </ul>
      </div>
      
      <Link href="/" style={styles.link}>
        ← Back to Home
      </Link>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center'
  },
  info: {
    textAlign: 'left',
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0'
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '20px'
  }
}