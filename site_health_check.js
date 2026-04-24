const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];
  
  const tests = [
    { name: 'Homepage', url: 'https://my-app-finmans-projects.vercel.app/' },
    { name: 'Diamonds', url: 'https://my-app-finmans-projects.vercel.app/diamonds' },
    { name: 'Diamond D001', url: 'https://my-app-finmans-projects.vercel.app/diamonds/D001' },
    { name: 'Diamond D008', url: 'https://my-app-finmans-projects.vercel.app/diamonds/D008' },
    { name: 'Collections', url: 'https://my-app-finmans-projects.vercel.app/collections' },
    { name: 'Contact', url: 'https://my-app-finmans-projects.vercel.app/contact' },
    { name: 'Appointment', url: 'https://my-app-finmans-projects.vercel.app/appointment' },
    { name: 'Education 4Cs', url: 'https://my-app-finmans-projects.vercel.app/education/4cs' },
    { name: 'Wishlist', url: 'https://my-app-finmans-projects.vercel.app/wishlist' },
    { name: 'Admin', url: 'https://my-app-finmans-projects.vercel.app/admin' },
  ];

  for (const test of tests) {
    const errors = [];
    const handler = msg => { if (msg.type() === 'error') errors.push(msg.text().substring(0, 150)); };
    page.on('console', handler);
    
    try {
      const res = await page.goto(test.url, { timeout: 15000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);
      const status = res.status();
      const ok = status < 400 && errors.length === 0;
      results.push({ name: test.name, status, errors: errors.length, ok });
    } catch (e) {
      results.push({ name: test.name, status: 0, errors: 1, ok: false, err: e.message.substring(0, 80) });
    }
    
    page.removeListener('console', handler);
  }
  
  await browser.close();
  
  console.log('=== Site Health Check ===');
  for (const r of results) {
    const icon = r.ok ? '✅' : '❌';
    const errInfo = r.errors > 0 ? ` [${r.errors} errors]` : '';
    const statusInfo = r.status ? ` [HTTP ${r.status}]` : '';
    console.log(`${icon} ${r.name}${statusInfo}${errInfo}`);
  }
  
  const passed = results.filter(r => r.ok).length;
  console.log(`\n${passed}/${results.length} pages passed`);
})().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
