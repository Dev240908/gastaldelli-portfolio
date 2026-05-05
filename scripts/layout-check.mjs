/**
 * Layout Bug Detector — Puppeteer + DOM overlap detection
 * No API key needed. Finds overlapping elements, overflow issues, contrast failures.
 * Uso: node scripts/layout-check.mjs [url]
 */

import puppeteer from 'puppeteer'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve } from 'path'

const URL = process.argv[2] || 'http://localhost:3040'
const OUT = './scripts/audit-output'

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const allIssues = []

  for (const vp of VIEWPORTS) {
    console.log(`\n📐 Testing ${vp.name} (${vp.width}×${vp.height})`)
    const page = await browser.newPage()
    await page.setViewport({ width: vp.width, height: vp.height })
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 })

    // Wait for animations to settle
    await new Promise(r => setTimeout(r, 1500))

    // Screenshot full page
    const screenshotPath = resolve(OUT, `${vp.name}-full.png`)
    await page.screenshot({ path: screenshotPath, fullPage: true })
    console.log(`  Screenshot → ${screenshotPath}`)

    // Run DOM analysis
    const issues = await page.evaluate((viewportName) => {
      const results = []

      // 1. Detect horizontal overflow
      const allEls = document.querySelectorAll('*')
      const bodyWidth = document.body.scrollWidth
      const vpWidth = window.innerWidth

      if (bodyWidth > vpWidth) {
        results.push({
          type: 'OVERFLOW',
          severity: 'HIGH',
          viewport: viewportName,
          message: `Horizontal overflow: body is ${bodyWidth}px wide on ${vpWidth}px viewport`,
        })
      }

      // 2. Find elements that overflow their container
      allEls.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return
        if (rect.right > vpWidth + 2) {
          const tag = el.tagName.toLowerCase()
          const cls = el.className?.toString().substring(0, 60) || ''
          const text = el.textContent?.trim().substring(0, 40) || ''
          results.push({
            type: 'ELEMENT_OVERFLOW',
            severity: 'HIGH',
            viewport: viewportName,
            message: `<${tag} class="${cls}"> overflows right edge by ${Math.round(rect.right - vpWidth)}px. Text: "${text}"`,
          })
        }
      })

      // 3. Find text elements with very small contrast (alpha < 0.15)
      const textEls = document.querySelectorAll('p, h1, h2, h3, h4, span, a, li, label')
      textEls.forEach(el => {
        const style = window.getComputedStyle(el)
        const color = style.color
        // Parse rgba
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
        if (match) {
          const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1
          if (alpha < 0.15 && el.textContent?.trim().length > 0) {
            results.push({
              type: 'LOW_CONTRAST',
              severity: 'MEDIUM',
              viewport: viewportName,
              message: `Low alpha text (${alpha.toFixed(2)}): "${el.textContent?.trim().substring(0, 50)}"`,
            })
          }
        }
      })

      // 4. Detect overlapping sibling elements (text on text)
      function getTextNodes(el) {
        const texts = []
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT)
        let node
        while ((node = walker.nextNode())) {
          if (node.children.length === 0 && node.textContent?.trim().length > 3) {
            texts.push(node)
          }
        }
        return texts
      }

      const sections = document.querySelectorAll('section, header, footer, main')
      sections.forEach(section => {
        const leafEls = getTextNodes(section)
        for (let i = 0; i < leafEls.length; i++) {
          for (let j = i + 1; j < Math.min(leafEls.length, i + 20); j++) {
            const a = leafEls[i].getBoundingClientRect()
            const b = leafEls[j].getBoundingClientRect()
            if (a.width === 0 || b.width === 0) continue
            // Check overlap
            const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left)
            const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
            if (overlapX > 5 && overlapY > 5) {
              const aText = leafEls[i].textContent?.trim().substring(0, 30)
              const bText = leafEls[j].textContent?.trim().substring(0, 30)
              results.push({
                type: 'OVERLAP',
                severity: 'CRITICAL',
                viewport: viewportName,
                message: `Elements overlap by ${Math.round(overlapX)}×${Math.round(overlapY)}px:\n    A: "${aText}"\n    B: "${bText}"`,
              })
            }
          }
        }
      })

      // 5. Check z-index stacking issues (elements with z-index > 1 that might cover content)
      const stacked = document.querySelectorAll('[style*="z-index"], [style*="position"]')
      stacked.forEach(el => {
        const style = window.getComputedStyle(el)
        const z = parseInt(style.zIndex)
        if (!isNaN(z) && z > 100) {
          const rect = el.getBoundingClientRect()
          if (rect.width > 100 && rect.height > 100) {
            results.push({
              type: 'HIGH_ZINDEX',
              severity: 'LOW',
              viewport: viewportName,
              message: `Large element with z-index ${z}: ${el.tagName.toLowerCase()} ${el.className?.toString().substring(0, 40)}`,
            })
          }
        }
      })

      // 6. Images without dimensions
      const imgs = document.querySelectorAll('img')
      imgs.forEach(img => {
        if (!img.getAttribute('width') && !img.getAttribute('height')) {
          results.push({
            type: 'IMG_NO_DIMS',
            severity: 'LOW',
            viewport: viewportName,
            message: `Image without explicit dimensions: ${img.src?.substring(0, 60)}`,
          })
        }
      })

      return results
    }, vp.name)

    allIssues.push(...issues)

    const critical = issues.filter(i => i.severity === 'CRITICAL')
    const high = issues.filter(i => i.severity === 'HIGH')
    const medium = issues.filter(i => i.severity === 'MEDIUM')

    console.log(`  Issues: ${critical.length} CRITICAL | ${high.length} HIGH | ${medium.length} MEDIUM`)
    critical.forEach(i => console.log(`  🔴 [${i.type}] ${i.message}`))
    high.forEach(i => console.log(`  🟠 [${i.type}] ${i.message}`))
    medium.forEach(i => console.log(`  🟡 [${i.type}] ${i.message.substring(0, 80)}`))

    await page.close()
  }

  await browser.close()

  // Write JSON report
  const report = {
    url: URL,
    date: new Date().toISOString(),
    totalIssues: allIssues.length,
    bySeverity: {
      CRITICAL: allIssues.filter(i => i.severity === 'CRITICAL').length,
      HIGH: allIssues.filter(i => i.severity === 'HIGH').length,
      MEDIUM: allIssues.filter(i => i.severity === 'MEDIUM').length,
      LOW: allIssues.filter(i => i.severity === 'LOW').length,
    },
    issues: allIssues,
  }

  writeFileSync(resolve(OUT, 'layout-report.json'), JSON.stringify(report, null, 2))

  // Write HTML report
  const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<title>Layout Audit Report</title>
<style>
  body { font-family: monospace; background: #0a0a0a; color: #f0f0ee; padding: 2rem; }
  h1 { color: #bfff00; }
  .issue { padding: 0.75rem 1rem; margin: 0.5rem 0; border-left: 3px solid #444; background: rgba(255,255,255,0.03); }
  .CRITICAL { border-color: #ff4444; }
  .HIGH { border-color: #ff8800; }
  .MEDIUM { border-color: #ffcc00; }
  .LOW { border-color: #666; }
  .badge { display: inline-block; padding: 0.1rem 0.4rem; font-size: 0.75rem; border-radius: 3px; margin-right: 0.5rem; }
  .CRITICAL .badge { background: #ff4444; color: #000; }
  .HIGH .badge { background: #ff8800; color: #000; }
  .MEDIUM .badge { background: #ffcc00; color: #000; }
  .LOW .badge { background: #666; color: #fff; }
  .summary { display: flex; gap: 1rem; margin: 1.5rem 0; }
  .stat { padding: 1rem 1.5rem; border: 1px solid rgba(255,255,255,0.1); text-align: center; }
  .stat .n { font-size: 2rem; font-weight: bold; color: #bfff00; }
  pre { white-space: pre-wrap; word-break: break-all; }
</style>
</head>
<body>
<h1>Layout Audit — ${URL}</h1>
<p>${new Date().toLocaleString('it-IT')} — ${allIssues.length} issues found</p>
<div class="summary">
  <div class="stat"><div class="n">${report.bySeverity.CRITICAL}</div>CRITICAL</div>
  <div class="stat"><div class="n">${report.bySeverity.HIGH}</div>HIGH</div>
  <div class="stat"><div class="n">${report.bySeverity.MEDIUM}</div>MEDIUM</div>
  <div class="stat"><div class="n">${report.bySeverity.LOW}</div>LOW</div>
</div>
${allIssues.filter(i => ['CRITICAL','HIGH','MEDIUM'].includes(i.severity)).map(i => `
<div class="issue ${i.severity}">
  <span class="badge">${i.severity}</span>
  <span class="badge" style="background:rgba(255,255,255,0.1)">${i.type}</span>
  <span style="opacity:0.5">[${i.viewport}]</span>
  <pre>${i.message}</pre>
</div>`).join('')}
</body>
</html>`

  writeFileSync(resolve(OUT, 'layout-report.html'), html)

  console.log(`\n✅ Report saved to ${OUT}/layout-report.html`)
  console.log(`📊 Summary: ${report.bySeverity.CRITICAL} critical | ${report.bySeverity.HIGH} high | ${report.bySeverity.MEDIUM} medium`)

  return report
}

run().catch(err => {
  console.error('Audit failed:', err.message)
  process.exit(1)
})
