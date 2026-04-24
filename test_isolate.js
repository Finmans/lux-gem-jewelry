const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('pageerror', err => errors.push('PAGE: ' + err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text().substring(0, 200));
  });

  // Test 1: Homepage (no WishlistToggle)
  console.log('=== Test: / ===');
  await page.goto('http://localhost:3456/');
  await page.waitForTimeout(6000);
  console.log('H1:', await page.locator('h1').first().textContent().catch(() => 'no h1'));
  console.log('Errors:', errors.filter(e => !e.includes('storage')).length === 0 ? 'none' : errors);
  errors.length = 0;

  // Test 2: Diamond page without WishlistToggle by removing it temporarily
  console.log('\n=== Test: /diamonds/D001 (check if page itself works) ===');
  await page.goto('http://localhost:3456/diamonds/D001');
  await page.waitForTimeout(6000);
  
  const h1 = await page.locator('h1').textContent().catch(() => 'no h1');
  console.log('H1:', h1);
  
  // Check if diamond detail content is present
  const body = await page.locator('body').textContent();
  const hasCarat = body.includes('1.51') || body.includes('Round');
  console.log('Has diamond content:', hasCarat);
  
  if (errors.length > 0) {
    console.log('Errors:');
    errors.forEach(e => console.log(' -', e.substring(0, 300)));
  } else {
    console.log('No errors!');
  }
  
  await browser.close();
})().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
