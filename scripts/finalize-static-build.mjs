import { copyFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve('dist/espace-oasis/browser');
const notFoundRoute = resolve(outputDirectory, '404/index.html');
const notFoundFile = resolve(outputDirectory, '404.html');

await copyFile(notFoundRoute, notFoundFile);

function resolveSiteUrl() {
  const candidate =
    process.env.SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!candidate) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;
  return new URL(withProtocol).origin;
}

const siteUrl = resolveSiteUrl();

if (siteUrl) {
  const routes = ['/', '/menu'];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}
</urlset>
`;
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  await Promise.all([
    writeFile(resolve(outputDirectory, 'sitemap.xml'), sitemap, 'utf8'),
    writeFile(resolve(outputDirectory, 'robots.txt'), robots, 'utf8'),
  ]);
  console.log(`Generated sitemap.xml for ${siteUrl}.`);
} else {
  console.log(
    'SITE_URL is not set; sitemap.xml will be generated automatically on Vercel.',
  );
}

console.log('Generated the static 404 page.');
