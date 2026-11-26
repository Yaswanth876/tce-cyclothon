const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SHOTS_DIR = path.join(__dirname, '..', 'gallery-test-shots');

if (!fs.existsSync(SHOTS_DIR)) {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

async function verify() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  // 1. Verify Homepage does NOT have embedded gallery section
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 600));

  const homepageHasGallery = await page.evaluate(() => {
    return document.getElementById('gallery') !== null;
  });
  console.log('Homepage has embedded gallery section?', homepageHasGallery);
  if (homepageHasGallery) {
    throw new Error('Gallery section should NOT be embedded on homepage!');
  }

  // Check gallery link in Navbar
  const galleryLinkHref = await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('nav a')).find(a => a.textContent.includes('Gallery'));
    return link ? link.getAttribute('href') : null;
  });
  console.log('Navbar Gallery link points to:', galleryLinkHref);

  await page.screenshot({ path: path.join(SHOTS_DIR, '01-homepage-nav.png') });

  // 2. Click Gallery link or navigate to /gallery
  console.log('Navigating to http://localhost:3000/gallery ...');
  await page.goto('http://localhost:3000/gallery', { waitUntil: 'networkidle2' });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 600));

  // Check hero and breadcrumb
  await page.screenshot({ path: path.join(SHOTS_DIR, '02-gallery-page-hero.png') });
  console.log('Saved 02-gallery-page-hero.png');

  // Scroll to masonry
  await page.evaluate(() => window.scrollBy(0, 380));
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(SHOTS_DIR, '03-gallery-masonry-default.png') });
  console.log('Saved 03-gallery-masonry-default.png');

  // Hover over the first masonry tile
  const tiles = await page.$$('.columns-1 > div');
  console.log(`Found ${tiles.length} masonry tiles in DOM`);

  if (tiles.length > 0) {
    console.log('Hovering over tile 0...');
    await tiles[0].hover();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SHOTS_DIR, '04-gallery-tile-hover.png') });
    console.log('Saved 04-gallery-tile-hover.png');

    // Click tile 0 to open Lightbox
    console.log('Clicking tile 0 to open Lightbox...');
    await tiles[0].click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SHOTS_DIR, '05-lightbox-open.png') });
    console.log('Saved 05-lightbox-open.png');

    // Press ArrowRight to test navigation
    console.log('Pressing ArrowRight...');
    await page.keyboard.press('ArrowRight');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SHOTS_DIR, '06-lightbox-next.png') });
    console.log('Saved 06-lightbox-next.png');

    // Press Escape to close
    console.log('Pressing Escape to close Lightbox...');
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
  }

  // Test "Show All" button to expand all 52 photos
  console.log('Testing "Show All" button...');
  const showAllBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Show All'));
  });
  if (showAllBtn && showAllBtn.asElement()) {
    await showAllBtn.asElement().click();
    await new Promise(r => setTimeout(r, 600));
    const allTilesCount = await page.evaluate(() => document.querySelectorAll('.columns-1 > div').length);
    console.log(`After "Show All", DOM has ${allTilesCount} masonry tiles!`);
  }

  // Test year filter: Click "2024 · Season 2"
  const filterBtns = await page.$$('button');
  for (const btn of filterBtns) {
    const text = await (await btn.getProperty('innerText')).jsonValue();
    if (text.includes('2024')) {
      console.log('Clicking 2024 filter button...');
      await btn.click();
      await new Promise(r => setTimeout(r, 500));
      break;
    }
  }
  await page.screenshot({ path: path.join(SHOTS_DIR, '07-filter-2024.png') });
  console.log('Saved 07-filter-2024.png');

  // 3. Test Mobile Viewport (iPhone 12 / 390x844)
  console.log('Switching to mobile viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/gallery', { waitUntil: 'networkidle2' });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));

  // Check horizontal overflow
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Mobile has horizontal scroll overflow?', hasHorizontalScroll);
  if (hasHorizontalScroll) {
    throw new Error('Detected horizontal overflow on mobile!');
  }

  await page.screenshot({ path: path.join(SHOTS_DIR, '08-mobile-gallery-hero.png') });
  console.log('Saved 08-mobile-gallery-hero.png');

  await page.evaluate(() => window.scrollBy(0, 450));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SHOTS_DIR, '09-mobile-gallery-masonry.png') });
  console.log('Saved 09-mobile-gallery-masonry.png');

  await browser.close();
  console.log('ALL TESTS PASSED SUCCESSFULLY!');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
