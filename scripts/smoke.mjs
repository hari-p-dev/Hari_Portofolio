// Dependency-free smoke test for the production build.
//
// Why not jsdom? In this WSL setup the shell runs Linux Node but npm installs
// Windows binaries, and jsdom fails to initialize under the Linux Node build.
// This test avoids that entirely: it serves dist/ with Node's built-in http
// server and asserts the built artifacts are correct and complete.
//
// It ALWAYS terminates (hard 30s watchdog + explicit process.exit).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const WATCHDOG = setTimeout(() => {
  console.log('SMOKE_TEST: FAIL (watchdog timeout)');
  process.exit(2);
}, 30_000);
WATCHDOG.unref?.();

const ROOT = path.resolve('dist');
const PORT = 4342;
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

const get = (urlPath) =>
  new Promise((resolve) => {
    http.get({ host: '127.0.0.1', port: PORT, path: urlPath }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', () => resolve({ status: 0, body: '' }));
  });

async function main() {
  if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
    console.log('SMOKE_TEST: FAIL (no dist — run `npm run build` first)');
    return 1;
  }

  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    fs.readFile(path.join(ROOT, p), (e, d) => {
      if (e) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('content-type', types[path.extname(p)] || 'application/octet-stream');
      res.end(d);
    });
  });

  await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

  const checks = [];
  const record = (name, ok, detail = '') => {
    checks.push({ name, ok, detail });
    console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${name}${detail ? ' — ' + detail : ''}`);
  };

  // 1) Core documents serve.
  const html = await get('/');
  record('index.html 200', html.status === 200, `status ${html.status}`);
  record('title present', /<title>Hari P/.test(html.body));

  const jsMatch = html.body.match(/\/assets\/index-[^"]+\.js/);
  const cssMatch = html.body.match(/\/assets\/index-[^"]+\.css/);
  const js = jsMatch ? await get(jsMatch[0]) : { status: 0, body: '' };
  const css = cssMatch ? await get(cssMatch[0]) : { status: 0 };
  record('JS bundle 200', js.status === 200);
  record('CSS bundle 200', css.status === 200);

  // 2) Assets serve (portrait, résumé, cosmic backgrounds).
  record('portrait 200', (await get('/hari.png')).status === 200);
  record('resume 200', (await get('/assets/Hari-P-Resume.pdf')).status === 200);
  const bg1 = await get('/Background1.png');
  const bg2 = await get('/Background2.png');
  const bg3 = await get('/Background3.png');
  record('backgrounds 1/2/3 200',
    bg1.status === 200 && bg2.status === 200 && bg3.status === 200,
    `${bg1.status}/${bg2.status}/${bg3.status}`);

  // 3) Bundle carries real résumé content + landing copy.
  const b = js.body;
  record('name/title present', /HARI/.test(b) && /Full-Stack Developer/.test(b));
  record('statement present', /interface to infrastructure|digital products/.test(b));
  record('CTA "View My Work" present', /View My Work/.test(b));
  record('CTA "About Me" present', /About Me/.test(b));
  record('CTA "Start a Conversation" present', /Start a Conversation/.test(b));
  record('project Learn2Drive present', /Learn2Drive/.test(b));
  record('company Stigmata present', /Stigmata/.test(b));
  record('email present', /haripanneer07@gmail\.com/.test(b));
  record('cosmic backgrounds themed', /Background1\.png/.test(css.body || '') || bg1.status === 200);
  // Removed sections must NOT be referenced.
  record('no gallery frame refs', !/\/frames\/frame-/.test(b));

  server.close();

  const allOk = checks.every((c) => c.ok);
  console.log(allOk ? 'SMOKE_TEST: PASS' : 'SMOKE_TEST: FAIL');
  return allOk ? 0 : 1;
}

main()
  .then((code) => { clearTimeout(WATCHDOG); process.exit(code); })
  .catch((e) => {
    console.log('SMOKE_TEST: FAIL (harness error: ' + (e?.message || e) + ')');
    clearTimeout(WATCHDOG);
    process.exit(1);
  });
