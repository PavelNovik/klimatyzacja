// Пререндер: готовый HTML главной страницы + robots.txt, sitemap.xml, llms.txt.
// Поисковики и ИИ-краулеры, не исполняющие JS, видят весь контент сразу,
// а в браузере React «оживляет» страницу.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const server = path.resolve('dist-server/entry-server.js')
const { render, renderHead, robotsTxt, sitemapXml, llmsTxt } = await import(pathToFileURL(server).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const html = template
  .replace('<!--app-head-->', renderHead())
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
fs.writeFileSync(path.join(dist, 'index.html'), html)

fs.writeFileSync(path.join(dist, 'robots.txt'), robotsTxt())
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml())
fs.writeFileSync(path.join(dist, 'llms.txt'), llmsTxt())
fs.rmSync(path.resolve('dist-server'), { recursive: true, force: true })
console.log('  prerendered /, robots.txt, sitemap.xml, llms.txt')
