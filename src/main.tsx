import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import ErrorBoundary from './components/ErrorBoundary.tsx'

// CRITICAL: Disable browser's automatic scroll restoration BEFORE React mounts
// This prevents the browser from restoring scroll position on page refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top immediately on page load (before React renders)
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

