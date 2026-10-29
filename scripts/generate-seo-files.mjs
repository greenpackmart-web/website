import { cp, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { productCategories } from '../src/data/products.js'

const siteUrl = 'https://greenpackmart.com'
const outputDirectory = path.resolve('dist')
const isProduction = (process.env.VITE_BASE_PATH || '/website/') === '/'
const publicRoutes = [
  '/',
  '/about/',
  '/products/',
  ...productCategories.map((category) => `/products/${category.slug}/`),
  '/manufacturing/',
  '/faq/',
  '/privacy/',
  '/terms/',
]

await Promise.all(
  publicRoutes.filter((route) => route !== '/').map(async (route) => {
    const directory = path.join(outputDirectory, route)
    await mkdir(directory, { recursive: true })
    await cp(path.join(outputDirectory, 'index.html'), path.join(directory, 'index.html'))
  })
)

const robots = isProduction
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'

await writeFile(path.join(outputDirectory, 'robots.txt'), robots)

if (isProduction) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes
    .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
    .join('\n')}\n</urlset>\n`
  await writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap)
}
