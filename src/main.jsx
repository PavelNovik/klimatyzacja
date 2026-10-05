import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
// Шрифты с нашего домена (без Google Fonts CDN): кириллица + латиница
import '@fontsource/exo-2/cyrillic-700.css'
import '@fontsource/exo-2/latin-700.css'
import '@fontsource/exo-2/cyrillic-800.css'
import '@fontsource/exo-2/latin-800.css'
import '@fontsource/commissioner/cyrillic-400.css'
import '@fontsource/commissioner/latin-400.css'
import '@fontsource/commissioner/cyrillic-600.css'
import '@fontsource/commissioner/latin-600.css'
import '@fontsource/roboto-mono/cyrillic-500.css'
import '@fontsource/roboto-mono/latin-500.css'
import './styles/variables.css'
import './styles/global.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// В продакшене HTML уже отрендерен заранее (scripts/prerender.js) — «оживляем» его
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
