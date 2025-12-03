/**
 * Node script to generate Google Merchant XML feed from public/products.json
 * Run: node scripts/generate-merchant-feed.js
 */
const fs = require('fs')
const path = require('path')
const productsPath = path.join(__dirname, '..', 'public', 'products.json')
const brandPath = path.join(__dirname, '..', 'public', 'brand.json')
const outPath = path.join(__dirname, '..', 'public', 'merchant-feed.xml')

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'))
const brand = JSON.parse(fs.readFileSync(brandPath, 'utf8'))
let items = products.map(p => `  <item>
    <g:id>${escapeXml(p.id)}</g:id>
    <title>${escapeXml(p.title)}</title>
    <description>${escapeXml(p.description)}</description>
    <g:link>${escapeXml(brand.url.replace(/\/$/, '') + '/product/' + p.id)}</g:link>
    <g:condition>new</g:condition>
    <g:availability>in stock</g:availability>
    <g:price>${Number(p.price).toFixed(2)} USD</g:price>
    <g:brand>${escapeXml(brand.name || 'Zwanski Tech')}</g:brand>
    ${p.image ? `<g:image_link>${escapeXml(brand.url.replace(/\/$/, '') + p.image)}</g:image_link>` : ''}
  </item>`).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Zwanski Tech Store</title>
    <link>https://your-domain.com/</link>
    <description>Products from Zwanski Tech</description>
${items}
  </channel>
</rss>`

fs.writeFileSync(outPath, xml, 'utf8')
console.log('Wrote merchant feed to', outPath)
