// src/app/page.js
'use client'

import { useState, useEffect } from 'react'
import Link from "next/link";

export default function Home() {
  const [deployTime, setDeployTime] = useState('')
  const [status, setStatus] = useState('loading')
  const [activeTab, setActiveTab] = useState('deployment')
  
  // Dynamic state for user management
  const [users, setUsers] = useState([])
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  
  // Dynamic state for counter
  const [counter, setCounter] = useState(0)
  
  // Dynamic state for theme
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setDeployTime(new Date().toLocaleString())
    
    // Check health status
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('error'))
    
    // Load users from localStorage
    const savedUsers = localStorage.getItem('app_users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('app_theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users))
  }, [users])

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('app_theme', isDarkMode ? 'dark' : 'light')
    if (isDarkMode) {
      document.body.style.backgroundColor = '#1a1a2e'
    } else {
      document.body.style.backgroundColor = ''
    }
  }, [isDarkMode])

  // User CRUD operations
  const addUser = () => {
    if (newUserName.trim() && newUserEmail.trim()) {
      const newUser = {
        id: Date.now(),
        name: newUserName,
        email: newUserEmail,
        createdAt: new Date().toLocaleString()
      }
      setUsers([...users, newUser])
      setNewUserName('')
      setNewUserEmail('')
    }
  }

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const startEdit = (user) => {
    setEditingUser(user)
    setEditName(user.name)
    setEditEmail(user.email)
  }

  const saveEdit = () => {
    setUsers(users.map(user => 
      user.id === editingUser.id 
        ? { ...user, name: editName, email: editEmail, updatedAt: new Date().toLocaleString() }
        : user
    ))
    setEditingUser(null)
    setEditName('')
    setEditEmail('')
  }

  const cancelEdit = () => {
    setEditingUser(null)
    setEditName('')
    setEditEmail('')
  }

  const incrementCounter = () => setCounter(counter + 1)
  const decrementCounter = () => setCounter(counter - 1)
  const resetCounter = () => setCounter(0)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  // Dynamic styles based on theme
  const currentStyles = {
    ...styles,
    container: {
      ...styles.container,
      background: isDarkMode 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    card: {
      ...styles.card,
      background: isDarkMode ? '#2d2d44' : 'white',
      color: isDarkMode ? '#e0e0e0' : '#333'
    }
  }

  return (
    <main style={currentStyles.container}>
      <div style={styles.themeToggle}>
        <button onClick={toggleTheme} style={currentStyles.button}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <h1 style={currentStyles.title}>✨ Full Dynamic Application</h1>
      <p style={currentStyles.subtitle}>Complete CRUD operations + Real-time updates</p>

      {/* Tab Navigation */}
      <div style={styles.tabContainer}>
        <button 
          onClick={() => setActiveTab('deployment')} 
          style={{...styles.tab, ...(activeTab === 'deployment' ? styles.activeTab : {})}}
        >
          📊 Deployment Info
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          style={{...styles.tab, ...(activeTab === 'users' ? styles.activeTab : {})}}
        >
          👥 User Management
        </button>
        <button 
          onClick={() => setActiveTab('counter')} 
          style={{...styles.tab, ...(activeTab === 'counter' ? styles.activeTab : {})}}
        >
          🔢 Interactive Counter
        </button>
      </div>

      {/* Deployment Tab */}
      {activeTab === 'deployment' && (
        <>
          <div style={currentStyles.card}>
            <h2>📋 Deployment Information</h2>
            <p><strong>Status:</strong> <span style={{color: '#28a745'}}>● Live</span></p>
            <p><strong>Deployed at:</strong> {deployTime || 'Loading...'}</p>
            <p><strong>Environment:</strong> Production</p>
            <p><strong>Health Check:</strong> {status === 'healthy' ? '✅ Passing' : '⏳ Checking...'}</p>
          </div>

          <div style={currentStyles.card}>
            <h2>✅ CI/CD Pipeline Status</h2>
            <ul style={styles.list}>
              <li>✓ Code committed to repository</li>
              <li>✓ Automated build completed</li>
              <li>✓ Tests pass</li>
              <li>✓ Deployed to production server</li>
            </ul>
          </div>

          <div style={currentStyles.card}>
            <h2>🔄 Quick Actions</h2>
            <button onClick={() => window.location.reload()} style={currentStyles.button}>
              Refresh Page
            </button>
            <button onClick={() => fetch('/api/health').then(res => res.json()).then(data => alert('Status: ' + data.status))} style={{...currentStyles.button, ...styles.buttonSecondary}}>
              Check Health
            </button>
          </div>
        </>
      )}

      {/* User Management Tab - Full CRUD */}
      {activeTab === 'users' && (
        <div style={currentStyles.card}>
          <h2>👥 User Management System</h2>
          <p style={{color: '#666', marginBottom: '20px'}}>Total Users: {users.length}</p>
          
          {/* Add User Form */}
          <div style={styles.formGroup}>
            <h3>➕ Add New User</h3>
            <div style={styles.formRow}>
              <input
                type="text"
                placeholder="Full Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                style={styles.input}
              />
              <button onClick={addUser} style={{...currentStyles.button, background: '#28a745'}}>
                Add User
              </button>
            </div>
          </div>

          {/* Users List */}
          <div style={styles.usersList}>
            <h3>📋 Registered Users</h3>
            {users.length === 0 ? (
              <p style={{color: '#999', textAlign: 'center'}}>No users yet. Add your first user above!</p>
            ) : (
              users.map(user => (
                <div key={user.id} style={styles.userItem}>
                  {editingUser?.id === user.id ? (
                    // Edit Mode
                    <div style={styles.editMode}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={styles.input}
                      />
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        style={styles.input}
                      />
                      <button onClick={saveEdit} style={{...currentStyles.button, background: '#28a745'}}>Save</button>
                      <button onClick={cancelEdit} style={{...currentStyles.button, background: '#6c757d'}}>Cancel</button>
                    </div>
                  ) : (
                    // View Mode
                    <div style={styles.userInfo}>
                      <div>
                        <strong>{user.name}</strong>
                        <p style={{margin: '5px 0 0 0', fontSize: '12px', color: '#666'}}>{user.email}</p>
                        <small style={{color: '#999'}}>Added: {user.createdAt}</small>
                        {user.updatedAt && <small style={{color: '#999', marginLeft: '10px'}}>Updated: {user.updatedAt}</small>}
                      </div>
                      <div>
                        <button onClick={() => startEdit(user)} style={{...currentStyles.button, background: '#ffc107', marginRight: '10px'}}>
                          ✏️ Edit
                        </button>
                        <button onClick={() => deleteUser(user.id)} style={{...currentStyles.button, background: '#dc3545'}}>
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Interactive Counter Tab */}
      {activeTab === 'counter' && (
        <div style={currentStyles.card}>
          <h2>🔢 Interactive Counter</h2>
          <div style={styles.counterContainer}>
            <div style={styles.counterDisplay}>
              <span style={{fontSize: '72px', fontWeight: 'bold'}}>{counter}</span>
            </div>
            <div style={styles.counterButtons}>
              <button onClick={decrementCounter} style={{...currentStyles.button, background: '#dc3545', fontSize: '24px', padding: '15px 25px'}}>
                -
              </button>
              <button onClick={resetCounter} style={{...currentStyles.button, background: '#6c757d', fontSize: '16px'}}>
                Reset
              </button>
              <button onClick={incrementCounter} style={{...currentStyles.button, background: '#28a745', fontSize: '24px', padding: '15px 25px'}}>
                +
              </button>
            </div>
            <p style={{marginTop: '20px', color: '#666'}}>
              Counter is {counter > 0 ? 'positive' : counter < 0 ? 'negative' : 'zero'}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Link */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Link href="/about">
          <button style={currentStyles.button}>About Us</button>
        </Link>
      </div>

      <footer style={currentStyles.footer}>
        <p>Powered by Next.js | Full Dynamic CRUD Application | Data persists in localStorage</p>
      </footer>
    </main>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px',
    transition: 'all 0.3s ease'
  },
  themeToggle: {
    textAlign: 'right',
    marginBottom: '20px'
  },
  title: {
    color: '#fff',
    fontSize: '2.5rem',
    marginBottom: '10px',
    textAlign: 'center'
  },
  subtitle: {
    color: '#fff',
    fontSize: '1.2rem',
    marginBottom: '30px',
    textAlign: 'center'
  },
  tabContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    transition: 'all 0.3s ease'
  },
  activeTab: {
    background: 'white',
    color: '#667eea'
  },
  card: {
    borderRadius: '10px',
    padding: '20px',
    margin: '20px 0',
    textAlign: 'left',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  button: {
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
    transition: 'all 0.3s ease'
  },
  buttonSecondary: {
    background: '#6c757d'
  },
  footer: {
    marginTop: '40px',
    fontSize: '14px',
    textAlign: 'center'
  },
  formGroup: {
    marginBottom: '30px',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  formRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    minWidth: '200px'
  },
  usersList: {
    marginTop: '20px'
  },
  userItem: {
    borderBottom: '1px solid #eee',
    padding: '15px',
    marginBottom: '10px'
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },
  editMode: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  counterContainer: {
    textAlign: 'center',
    padding: '20px'
  },
  counterDisplay: {
    marginBottom: '30px'
  },
  counterButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    alignItems: 'center'
  }
}