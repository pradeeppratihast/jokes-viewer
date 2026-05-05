import { useState, useEffect } from 'react'
import './App.css'

// Custom Inline SVG Components
const RefreshIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

const QuoteIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 5 2 6z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 5 2 6z" />
  </svg>
);

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getJoke() {
    setLoading(true);
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes/joke/random");
      const data = await response.json();
      setJoke(data.data);
      setLoading(false);
    } catch (error) {
      setJoke(error.message);
    }
  };

  useEffect(() => {
    getJoke();
  }, [])

  return (
    <>
      <div className="page-container">
        <div className="glow glow-top"></div>
        <div className="glow glow-bottom"></div>

        <div className="main-wrapper" style={{ width: '100%', maxWidth: '28rem' }}>
          <div className="joke-card">
            <header className="card-header">
              <div className="branding">
                <div className="logo-box">
                  <QuoteIcon className="icon" />
                </div>
                <span className="brand-text">Daily Humor</span>
              </div>
              <button 
                onClick={getJoke} 
                disabled={loading} 
                className="icon-btn"
              >
                <RefreshIcon className={`icon ${loading ? 'spin' : ''}`} />
              </button>
            </header>

            <main className="content-area">
              {loading ? (
                <>
                  <div className="skeleton-line" style={{ width: '80%' }}></div>
                  <div className="skeleton-line" style={{ width: '50%' }}></div>
                </>
              ) : (
                <>
                  <h2 className="joke-setup">{joke.content}</h2>
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
