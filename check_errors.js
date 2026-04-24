const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Test Wishlist
  console.log('=== WISHLIST ERRORS ===');
  page.on('console', msg => { if (msg.type() === 'error') console.log('CONSOLE ERR:', msg.text().substring(0, 300)); });
  page.on('pageerror', err => console.log('PAGE ERR:', err.message.substring(0, 300)));
  await page.goto('https://my-app-finmans-projects.vercel.app/wishlist', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  console.log('Title:', await page.title());
  
  // Test Admin
  console.log('\n=== ADMIN ERRORS ===');
  const adminErrors = [];
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
  page.on('console', msg => { if (msg.type() === 'error') adminErrors.push(msg.text().substring(0, 300)); });
  page.on('pageerror', err => adminErrors.push('PAGE: ' + err.message.substring(0, 300)));
  await page.goto('https://my-app-finmans-projects.vercel.app/admin', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  console.log('Title:', await page.title());
  adminErrors.forEach(e => console.log('ERR:', e));
  
  await browser.close();
})().catch(e => console.error('Fatal:', e.message));
