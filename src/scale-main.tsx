import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import WeightScale from './WeightScale'
import './scale-base.css'
import './market-scale.css'

function LandscapePrompt() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('scale-portrait-continue') === 'yes'
    } catch {
      return false
    }
  })

  if (dismissed) return null

  const continuePortrait = () => {
    try {
      sessionStorage.setItem('scale-portrait-continue', 'yes')
    } catch {
      // Browsers with disabled storage can still dismiss the prompt.
    }
    setDismissed(true)
  }

  return (
    <section className="landscape-prompt" role="dialog" aria-modal="true" aria-labelledby="landscape-prompt-title">
      <div className="landscape-prompt-content">
        <svg className="landscape-phone-icon" viewBox="0 0 120 160" role="img" aria-label="將手機打橫">
          <rect x="31" y="12" width="58" height="105" rx="13" fill="none" stroke="currentColor" strokeWidth="8" />
          <path d="M29 138c17 15 45 17 65 1m-8-8 9 8-9 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 id="landscape-prompt-title">請將手機橫向放置</h2>
        <p>橫向時畫面會更大，更容易看清磅面刻度和操作。</p>
        <button type="button" onClick={continuePortrait}>仍然直向使用</button>
      </div>
    </section>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="market-app">
      <WeightScale />
      <footer className="market-footer">選擇物品，放上秤盤，觀察指針和刻度。</footer>
    </main>
    <LandscapePrompt />
  </StrictMode>,
)
