const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\VISHWAJITH\\AppData\\Local\\Temp\\preloader-shots-custom';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Stage 1 at 1400ms (rider putting helmet on head)
  await new Promise(r => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'stage1-helmet.png') });
  console.log('Captured stage1-helmet.png at 1400ms');

  // Stage 2 at 3900ms (rider pedaling across text, wiping letters)
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'stage2-wipe.png') });
  console.log('Captured stage2-wipe.png at 3900ms');

  const wipeInfo = await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll('h1 span'));
    return {
      spansState: spans.map(s => ({
        char: s.innerText,
        opacity: window.getComputedStyle(s).opacity,
        clip: window.getComputedStyle(s).clipPath
      }))
    };
  });
  console.log('Wipe info at 3900ms:', JSON.stringify(wipeInfo, null, 2));

  // Check position at ~4.7s
  await page.evaluate(() => window.__startTime = performance.now());
  const check = await page.evaluate(async () => {
    return new Promise(resolve => {
      const checkInterval = setInterval(() => {
        const elapsed = performance.now() - window.__startTime;
        const el = document.querySelector('svg[aria-label="Realistic cyclist silhouette"]')?.parentElement?.parentElement;
        if (el && elapsed > 4500 && elapsed < 6000) {
          const rect = el.getBoundingClientRect();
          if (rect.left > 100 && rect.left < 800) {
            clearInterval(checkInterval);
            resolve({ elapsed, rect: { left: rect.left, top: rect.top, width: rect.width } });
          }
        }
        if (elapsed >= 6500) {
          clearInterval(checkInterval);
          resolve({ elapsed, rect: null });
        }
      }, 50);
    });
  });
  console.log('Bike in wheelie at:', check);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'stage4-wheelie.png') });
  console.log('Captured stage4-wheelie.png');

  // Stage 5 at 7000ms (finished)
  await new Promise(r => setTimeout(r, 1800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'stage5-finished.png') });
  console.log('Captured stage5-finished.png at 7000ms');

  await browser.close();
  console.log('Verification complete.');
}

run().catch(console.error);
