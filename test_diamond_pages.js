const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('response', async resp => {
    if (resp.status() >= 400) {
      console.log(`  ${resp.status()} ${resp.url().replace('https://my-app-finmans-projects.vercel.app','')}`);
    }
  });

  // Test D008 diamond page
  console.log('=== Testing /diamonds/D008 ===');
  await page.goto('https://my-app-finmans-projects.vercel.app/diamonds/D008');
  await page.waitForTimeout(5000);
  
  console.log('URL:', page.url());
  const body = await page.locator('body').textContent();
  const hasPrincess = body.includes('Princess');
  const has140 = body.includes('1.4');
  const has404 = body.includes('404') || body.includes('Not Found') || body.includes('not found');
  console.log('Has Princess:', hasPrincess);
  console.log('Has 1.4:', has140);
  console.log('Has 404:', has404);
  
  if (errors.length > 0) {
    console.log('Console errors:', errors.map(e => e.substring(0, 200)));
  }
  
  // Check the rendered heading
  const h1 = await page.locator('h1').textContent().catch(() => 'no h1');
  console.log('H1:', h1);
  
  // Test D001 which we know exists in mock data
  console.log('\n=== Testing /diamonds/D001 ===');
  await page.goto('https://my-app-finmans-projects.vercel.app/diamonds/D001');
  await page.waitForTimeout(3000);
  const body1 = await page.locator('body').textContent();
  const hasRound = body1.includes('Round');
  const has151 = body1.includes('1.51');
  const h1_1 = await page.locator('h1').textContent().catch(() => 'no h1');
  console.log('Has Round:', hasRound);
  console.log('Has 1.51:', has151);
  console.log('H1:', h1_1);
  if (errors.length > 0) {
    console.log('Console errors:', errors.map(e => e.substring(0, 200)));
  }
  
  await browser.close();
})().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
