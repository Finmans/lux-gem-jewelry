const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // Test on my-7h51bmxlc directly  
  console.log('=== my-7h51bmxlc ===');
  await page.goto('https://my-7h51bmxlc-finmans-projects.vercel.app/diamonds/D001');
  await page.waitForTimeout(5000);
  const h1_7h = await page.locator('h1').textContent().catch(() => 'no h1');
  console.log('H1:', h1_7h);
  console.log('Errors:', errors.length === 0 ? 'NONE' : errors.map(e => e.substring(0, 150)));

  errors.length = 0;
  
  // Test on my-app-finmans-projects.vercel.app  
  console.log('\n=== my-app-finmans-projects ===');
  await page.goto('https://my-app-finmans-projects.vercel.app/diamonds/D001');
  await page.waitForTimeout(5000);
  const h1_app = await page.locator('h1').textContent().catch(() => 'no h1');
  console.log('H1:', h1_app);
  console.log('Errors:', errors.length === 0 ? 'NONE' : errors.map(e => e.substring(0, 150)));
  
  await browser.close();
})().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
