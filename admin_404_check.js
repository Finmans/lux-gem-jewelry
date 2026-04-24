const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const failed = [];
  page.on('requestfailed', req => {
    failed.push(req.url() + ' — ' + req.failure()?.errorText);
  });
  page.on('response', res => {
    if (res.status() >= 400) {
      failed.push(res.status() + ' ' + res.url());
    }
  });
  
  await page.goto('https://my-app-finmans-projects.vercel.app/admin', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  console.log('Failed/404 resources:');
  failed.forEach(f => console.log(' ', f));
  
  await browser.close();
})().catch(e => console.error('Fatal:', e.message));
