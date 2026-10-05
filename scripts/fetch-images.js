// Скачивает фото из scripts/images.json (Unsplash) и сохраняет в public/images
// два WebP-варианта: <name>.webp (полный размер) и <name>-sm.webp (для мобильных и превью).
// Необязательное поле "params" — доп. параметры Unsplash (кадрирование: h=…&fit=crop&crop=faces).
// Необязательное поле "hide": [left, top, width, height] в долях кадра — размыть и затемнить
// эту область (например, номерной знак).
// Запуск: npm run images. Свои фото — просто положите <name>.webp и <name>-sm.webp в public/images.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const list = JSON.parse(fs.readFileSync(path.resolve('scripts/images.json'), 'utf8'))
const out = path.resolve('public/images')
fs.mkdirSync(out, { recursive: true })

async function hide(buf, [l, t, w, h]) {
  const { width, height } = await sharp(buf).metadata()
  const region = { left: Math.round(l * width), top: Math.round(t * height), width: Math.round(w * width), height: Math.round(h * height) }
  const patch = await sharp(buf).extract(region).blur(14).modulate({ brightness: 0.3, saturation: 0.2 }).toBuffer()
  return sharp(buf).composite([{ input: patch, left: region.left, top: region.top }]).jpeg({ quality: 95 }).toBuffer()
}

for (const [name, img] of Object.entries(list)) {
  const res = await fetch(`${img.src}?w=${img.width}&q=90&fm=jpg${img.params ? `&${img.params}` : ''}`)
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
  let buf = Buffer.from(await res.arrayBuffer())
  if (img.hide) buf = await hide(buf, img.hide)
  await sharp(buf).webp({ quality: 78 }).toFile(path.join(out, `${name}.webp`))
  await sharp(buf).resize({ width: Math.round(img.width / 2) }).webp({ quality: 74 }).toFile(path.join(out, `${name}-sm.webp`))
  const meta = await sharp(buf).metadata()
  console.log(`  ${name}  ${meta.width}×${meta.height}`)
}
