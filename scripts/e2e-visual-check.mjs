/**
 * E2E Visual Check — Portfolio Showcase
 * Playwright script per verificare visivamente le sezioni dopo le modifiche recenti:
 * - Services bento grid
 * - Works 2-col layout
 * - About stat counters
 * - Projects empty state
 * - SmoothScroll Lenis + GSAP
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, 'audit-output', 'screenshots');
const BASE_URL = 'http://localhost:3040';

// Assicura che la directory esista
if (!existsSync(SCREENSHOTS_DIR)) {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const results = {
  tests: [],
  consoleErrors: [],
  passed: 0,
  failed: 0,
  warned: 0,
};

function log(msg) {
  console.log(`[e2e] ${msg}`);
}

function recordTest(name, status, detail = '') {
  results.tests.push({ name, status, detail });
  if (status === 'PASS') results.passed++;
  else if (status === 'FAIL') results.failed++;
  else if (status === 'WARN') results.warned++;
  const icon = status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : '!';
  console.log(`  [${icon}] ${name}${detail ? ': ' + detail : ''}`);
}

async function scrollToSection(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, selector);
  // Attende che lo scroll si completi (Lenis e animazioni GSAP)
  await page.waitForTimeout(1500);
}

async function runTests() {
  const browser = await chromium.launch({ headless: true });

  // ─── TEST 1: Hero carica correttamente ──────────────────────────────────
  log('Test 1 — Hero carica correttamente');
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => {
      errors.push(`JS Error: ${err.message}`);
    });

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 });
    } catch {
      await page.goto(BASE_URL, { timeout: 15000 });
      await page.waitForTimeout(3000);
    }

    const screenshotPath = join(SCREENSHOTS_DIR, 'hero-check.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    recordTest('screenshot hero-check.png', 'PASS', screenshotPath);

    const heroText = await page.locator('text=Il digitale').first().isVisible().catch(() => false);
    if (heroText) {
      recordTest('Hero text "Il digitale" visibile', 'PASS');
    } else {
      // Fallback: cerca qualsiasi testo hero
      const bodyText = await page.textContent('body');
      if (bodyText.includes('digitale') || bodyText.includes('Brian') || bodyText.includes('portfolio')) {
        recordTest('Hero text "Il digitale" visibile', 'WARN', 'Testo trovato nel DOM ma non visibile come elemento isolato');
      } else {
        recordTest('Hero text "Il digitale" visibile', 'FAIL', 'Testo non trovato nella pagina');
      }
    }

    // Salva gli errori console per dopo
    results.consoleErrors.push(...errors);
    await context.close();
  }

  // ─── TEST 2: Scroll attraverso le sezioni ───────────────────────────────
  log('Test 2 — Scroll attraverso le sezioni');
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => {
      errors.push(`JS Error: ${err.message}`);
    });

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 });
    } catch {
      await page.goto(BASE_URL, { timeout: 15000 });
      await page.waitForTimeout(3000);
    }

    // Works section
    await scrollToSection(page, '#lavori');
    const worksPath = join(SCREENSHOTS_DIR, 'works-check.png');
    await page.screenshot({ path: worksPath, fullPage: false });
    recordTest('screenshot works-check.png', 'PASS', worksPath);

    const worksVisible = await page.locator('#lavori').isVisible().catch(() => false);
    recordTest('#lavori sezione presente', worksVisible ? 'PASS' : 'WARN', worksVisible ? '' : 'Sezione non trovata nel DOM');

    // About section
    await scrollToSection(page, '#about');
    const aboutPath = join(SCREENSHOTS_DIR, 'about-check.png');
    await page.screenshot({ path: aboutPath, fullPage: false });
    recordTest('screenshot about-check.png', 'PASS', aboutPath);

    const aboutVisible = await page.locator('#about').isVisible().catch(() => false);
    recordTest('#about sezione presente', aboutVisible ? 'PASS' : 'WARN', aboutVisible ? '' : 'Sezione non trovata nel DOM');

    // Projects section (empty state)
    await scrollToSection(page, '#progetti');
    const projectsPath = join(SCREENSHOTS_DIR, 'projects-check.png');
    await page.screenshot({ path: projectsPath, fullPage: false });
    recordTest('screenshot projects-check.png', 'PASS', projectsPath);

    const projectsVisible = await page.locator('#progetti').isVisible().catch(() => false);
    recordTest('#progetti sezione presente', projectsVisible ? 'PASS' : 'WARN', projectsVisible ? '' : 'Sezione non trovata nel DOM');

    // Services section
    await scrollToSection(page, '#servizi');
    const servicesPath = join(SCREENSHOTS_DIR, 'services-check.png');
    await page.screenshot({ path: servicesPath, fullPage: false });
    recordTest('screenshot services-check.png', 'PASS', servicesPath);

    const servicesVisible = await page.locator('#servizi').isVisible().catch(() => false);
    recordTest('#servizi sezione presente', servicesVisible ? 'PASS' : 'WARN', servicesVisible ? '' : 'Sezione non trovata nel DOM');

    // Verifica .services-bento-grid esiste
    const bentogrid = await page.locator('.services-bento-grid').count();
    recordTest('.services-bento-grid presente', bentogrid > 0 ? 'PASS' : 'WARN', `Trovati ${bentogrid} elementi`);

    results.consoleErrors.push(...errors);
    await context.close();
  }

  // ─── TEST 3: Mobile responsive 375px ────────────────────────────────────
  log('Test 3 — Mobile responsive 375px');
  {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();

    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => {
      errors.push(`JS Error: ${err.message}`);
    });

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 });
    } catch {
      await page.goto(BASE_URL, { timeout: 15000 });
      await page.waitForTimeout(3000);
    }

    const mobileHeroPath = join(SCREENSHOTS_DIR, 'mobile-hero.png');
    await page.screenshot({ path: mobileHeroPath, fullPage: false });
    recordTest('screenshot mobile-hero.png', 'PASS', mobileHeroPath);

    // Verifica niente overflow orizzontale su mobile
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    recordTest('Nessun overflow orizzontale su 375px', hasHorizontalOverflow ? 'WARN' : 'PASS',
      hasHorizontalOverflow ? `scrollWidth=${await page.evaluate(() => document.documentElement.scrollWidth)}` : '');

    // Scroll fino a services su mobile
    await scrollToSection(page, '#servizi');
    const mobileServicesPath = join(SCREENSHOTS_DIR, 'mobile-services.png');
    await page.screenshot({ path: mobileServicesPath, fullPage: false });
    recordTest('screenshot mobile-services.png', 'PASS', mobileServicesPath);

    results.consoleErrors.push(...errors);
    await context.close();
  }

  // ─── TEST 4: Console errors summary ─────────────────────────────────────
  log('Test 4 — Console errors');
  {
    const uniqueErrors = [...new Set(results.consoleErrors)];
    // Filtra errori minori noti (HMR, extension, ecc.)
    const criticalErrors = uniqueErrors.filter(e =>
      !e.includes('HMR') &&
      !e.includes('hot-update') &&
      !e.includes('extension') &&
      !e.includes('favicon') &&
      !e.includes('chrome-extension')
    );

    if (criticalErrors.length === 0) {
      recordTest('Nessun errore console critico', 'PASS');
    } else {
      criticalErrors.forEach(err => {
        recordTest('Console error', 'WARN', err.slice(0, 120));
      });
    }
  }

  await browser.close();

  // ─── Report finale ───────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════');
  console.log('  REPORT FINALE E2E VISUAL CHECK');
  console.log('══════════════════════════════════════════════');
  console.log(`  PASS:  ${results.passed}`);
  console.log(`  WARN:  ${results.warned}`);
  console.log(`  FAIL:  ${results.failed}`);
  console.log('══════════════════════════════════════════════');

  const overallStatus = results.failed > 0 ? 'FAIL' : results.warned > 3 ? 'WARN' : 'PASS';
  console.log(`  RATING GENERALE: ${overallStatus}`);
  console.log('══════════════════════════════════════════════\n');

  if (results.consoleErrors.length > 0) {
    const unique = [...new Set(results.consoleErrors)].filter(e =>
      !e.includes('HMR') && !e.includes('hot-update') && !e.includes('chrome-extension')
    );
    if (unique.length > 0) {
      console.log('Errori JS rilevati:');
      unique.forEach(e => console.log('  -', e.slice(0, 200)));
    }
  }

  return { overallStatus, results };
}

runTests().catch(err => {
  console.error('[e2e] ERRORE FATALE:', err.message);
  process.exit(1);
});
