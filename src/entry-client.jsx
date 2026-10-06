import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.jsx'

// El servidor deja los datos de la página en window.__RLF_INITIAL__.
const initialPage = window.__RLF_INITIAL__ || { status: 200, data: null }
window.history.scrollRestoration = 'manual'

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App
      initialUrl={`${window.location.pathname}${window.location.search}`}
      initialPage={initialPage}
    />
  </StrictMode>,
)
