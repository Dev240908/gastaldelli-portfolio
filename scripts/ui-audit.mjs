/**
 * UI Audit Script — Chrome headless screenshot + Claude Vision analysis
 * Uso: node scripts/ui-audit.mjs [url] [output-dir]
 * Default: http://localhost:3040
 */

import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join, resolve } from 'path'
import Anthropic from '@anthropic-ai/sdk'

// Carica .env se presente
const envPath = resolve(process.cwd(), '.env.audit')
if (existsSync(envPath)) {
  readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=')
    if (k && v.length) process.env[k.trim()] = v.join('=').trim()
  })
}

const URL = process.argv[2] || 'http://localhost:3040'
const OUT = process.argv[3] || './scripts/audit-output'
const CHROME = process.env.CHROME_PATH ||
  'C:\\Users\\brian\\.browser-driver-manager\\chrome\\win64-148.0.7778.97\\chrome-win64\\chrome.exe'

const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

// Sezioni della pagina da analizzare (scroll offset approssimativo)
const SECTIONS = [
  { name: 'hero',     scrollY: 0 },
  { name: 'works',    scrollY: 900 },
  { name: 'services', scrollY: 2200 },
  { name: 'about',    scrollY: 3500 },
  { name: 'contact',  scrollY: 5000 },
]

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

async function screenshot(viewport, scrollY, outputPath) {
  const script = `
    window.scrollTo(0, ${scrollY});
    await new Promise(r => setTimeout(r, 600));
  `
  // Chrome headless screenshot via puppeteer-less approach
  const args = [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--window-size=${viewport.width},${viewport.height}`,
    `--screenshot=${outputPath}`,
    `--virtual-time-budget=3000`,
    URL + (scrollY > 0 ? `#scroll${scrollY}` : ''),
  ]
  try {
    execSync(`"${CHROME}" ${args.join(' ')}`, { timeout: 15000, stdio: 'pipe' })
    return existsSync(outputPath)
  } catch {
    return false
  }
}

async function analyzeWithClaude(imagePath, viewport, section) {
  const client = new Anthropic()
  const imageData = readFileSync(imagePath)
  const base64 = imageData.toString('base64')

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: 'image/png', data: base64 },
        },
        {
          type: 'text',
          text: `Sei un esperto UI/UX reviewer. Analizza questo screenshot di un portfolio web (sezione: ${section}, viewport: ${viewport.name} ${viewport.width}px).

Identifica SOLO problemi reali e specifici. Rispondi SOLO con JSON:
{
  "score": <0-10>,
  "critical": ["problema critico 1", ...],
  "warnings": ["warning 1", ...],
  "ok": ["cosa funziona bene 1", ...]
}

Controlla: testi sovrapposti, overflow, elementi tagliati, contrasto insufficiente, spaziature inconsistenti, gerarchia tipografica, allineamenti, responsive issues. Sii brutalmente onesto.`,
        },
      ],
    }],
  })

  try {
    const text = response.content[0].text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 0, critical: [text], warnings: [], ok: [] }
  } catch {
    return { score: 0, critical: ['Parsing error'], warnings: [], ok: [] }
  }
}

async function main() {
  console.log(`\n🔍 UI Audit — ${URL}`)
  console.log(`📁 Output: ${OUT}\n`)

  const allResults = []

  for (const viewport of VIEWPORTS) {
    console.log(`\n📱 Viewport: ${viewport.name} (${viewport.width}x${viewport.height})`)

    for (const section of SECTIONS) {
      const filename = `${viewport.name}-${section.name}.png`
      const outputPath = join(OUT, filename)

      process.stdout.write(`  📸 ${section.name}... `)
      const ok = await screenshot(viewport, section.scrollY, outputPath)

      if (!ok) {
        console.log('❌ screenshot failed')
        continue
      }
      console.log('✓')

      process.stdout.write(`  🤖 Claude analysis... `)
      const analysis = await analyzeWithClaude(outputPath, viewport, section.name)
      console.log(`score: ${analysis.score}/10`)

      allResults.push({ viewport: viewport.name, section: section.name, ...analysis })

      if (analysis.critical?.length) {
        analysis.critical.forEach(c => console.log(`    ❌ ${c}`))
      }
      if (analysis.warnings?.length) {
        analysis.warnings.forEach(w => console.log(`    ⚠️  ${w}`))
      }
    }
  }

  // Report finale
  const reportPath = join(OUT, 'report.json')
  writeFileSync(reportPath, JSON.stringify(allResults, null, 2))

  const htmlReport = generateHtmlReport(allResults)
  const htmlPath = join(OUT, 'report.html')
  writeFileSync(htmlPath, htmlReport)

  console.log(`\n✅ Report salvato:`)
  console.log(`   JSON: ${reportPath}`)
  console.log(`   HTML: ${htmlPath}`)

  // Summary
  const criticals = allResults.flatMap(r => r.critical || [])
  const warnings = allResults.flatMap(r => r.warnings || [])
  const avgScore = allResults.reduce((s, r) => s + (r.score || 0), 0) / allResults.length

  console.log(`\n📊 SUMMARY`)
  console.log(`   Score medio: ${avgScore.toFixed(1)}/10`)
  console.log(`   ❌ Critical: ${criticals.length}`)
  console.log(`   ⚠️  Warning: ${warnings.length}`)
  if (criticals.length) {
    console.log('\n❌ CRITICAL ISSUES:')
    criticals.forEach(c => console.log(`  • ${c}`))
  }
}

function generateHtmlReport(results) {
  const criticals = results.flatMap(r => (r.critical || []).map(c => ({ ...r, msg: c })))
  const warnings = results.flatMap(r => (r.warnings || []).map(w => ({ ...r, msg: w })))

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<title>UI Audit Report — Portfolio</title>
<style>
  body { font-family: system-ui; background: #0d0d0d; color: #f0f0ee; padding: 2rem; max-width: 900px; margin: 0 auto; }
  h1 { color: #bfff00; }
  .issue { padding: .5rem 1rem; margin: .25rem 0; border-left: 3px solid; border-radius: 2px; }
  .critical { border-color: #ff4444; background: rgba(255,68,68,.08); }
  .warning  { border-color: #ffaa00; background: rgba(255,170,0,.08); }
  .ok       { border-color: #00cc66; background: rgba(0,204,102,.08); }
  .badge    { font-size: .7rem; opacity: .6; margin-right: .5rem; }
  .score    { font-size: 2rem; font-weight: 800; color: #bfff00; }
</style>
</head>
<body>
<h1>UI Audit Report</h1>
<p>Generato: ${new Date().toLocaleString('it-IT')}</p>
<h2>❌ Critical Issues (${criticals.length})</h2>
${criticals.map(i => `<div class="issue critical"><span class="badge">${i.viewport} / ${i.section}</span>${i.msg}</div>`).join('\n')}
<h2>⚠️ Warnings (${warnings.length})</h2>
${warnings.map(i => `<div class="issue warning"><span class="badge">${i.viewport} / ${i.section}</span>${i.msg}</div>`).join('\n')}
<h2>Dettaglio per sezione</h2>
${results.map(r => `<div style="margin:1rem 0;padding:1rem;border:1px solid rgba(255,255,255,.1)">
  <strong>${r.viewport} / ${r.section}</strong> <span class="score">${r.score}/10</span>
  ${(r.ok || []).map(o => `<div class="issue ok">${o}</div>`).join('')}
</div>`).join('')}
</body></html>`
}

main().catch(console.error)
