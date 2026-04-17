// src/app/layout.js
import './globals.css'

export const metadata = {
  title: 'CI/CD Deployment Demo',
  description: 'A simple Next.js app for CI/CD deployment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}