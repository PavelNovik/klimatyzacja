import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export { renderHead, robotsTxt, sitemapXml, llmsTxt } from './seo.js'

export function render() {
  return renderToString(<App />)
}
