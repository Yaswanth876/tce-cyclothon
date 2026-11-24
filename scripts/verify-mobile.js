const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\VISHWAJITH\\AppData\\Local\\Temp\\preloader-shots-mobile';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testDevice(name, width, height) {
  console.log(`Testing ${name} (${width}x${height})...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width, height, isMobile: width < 600 },
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Stage 1 at 700ms
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(OUTPUT_DIR, `${name}-stage1.png`) });

  // Stage 2 at 2800ms
  await new Promise(r => setTimeout(r, 2100));
  await page.screenshot({ path: path.join(OUTPUT_DIR, `${name}-stage2-wipe.png`) });

  // Stage 4 at 4800ms
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, `${name}-stage4-wheelie.png`) });

  await browser.close();
  console.log(`${name} tests complete.`);
}

async function run() {
  await testDevice('mobile-iphone', 390, 844);
  await testDevice('tablet-ipad', 768, 1024);
}

run().catch(console.error);
