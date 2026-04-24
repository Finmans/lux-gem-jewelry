const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('pageerror', err => errors.push('PAGE: ' + err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text().substring(0, 200));
  });

  // Test D008
  console.log('=== /diamonds/D008 ===');
  await page.goto('http://localhost:3456/diamonds/D008');
  await page.waitForTimeout(5000);
  console.log('H1:', await page.locator('h1').textContent().catch(() => 'no h1'));
  const body = await page.locator('body').textContent();
  console.log('Princess:', body.includes('Princess'));
  console.log('1.4:', body.includes('1.4'));
  console.log('265,000:', body.includes('265'));
  console.log('Errors:', errors.length === 0 ? 'NONE ✅' : errors);

  errors.length = 0;
  
  // Test D001
  console.log('\n=== /diamonds/D001 ===');
  await page.goto('http://localhost:3456/diamonds/D001');
  await page.waitForTimeout(5000);
  console.log('H1:', await page.locator('h1').textContent().catch(() => 'no h1'));
  console.log('Errors:', errors.length === 0 ? 'NONE ✅' : errors);
  
  await browser.close();
})().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
