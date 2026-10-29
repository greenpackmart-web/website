import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { productCategories } from '../data/products'

const siteName = 'GreenpackMart'
const productionUrl = 'https://greenpackmart.com'

const pageMetadata = {
  '/': {
    title: 'Bagasse Tableware & Disposable Glasses Manufacturer | GreenpackMart',
    description:
      'GreenpackMart manufactures and exports biodegradable bagasse tableware and disposable glasses from India for wholesale buyers worldwide.',
  },
  '/about/': {
    title: 'About GreenpackMart | Biodegradable Tableware Exporter',
    description:
      'Learn about GreenpackMart, an Indian manufacturer and exporter of biodegradable tableware and bagasse disposable glasses.',
  },
  '/products/': {
    title: 'Bagasse Tableware & Disposable Glasses | GreenpackMart',
    description:
      'Browse GreenpackMart’s biodegradable plates, bowls, trays, containers, cutlery and bagasse disposable glasses for wholesale export.',
  },
  '/manufacturing/': {
    title: 'Bagasse Tableware Manufacturing | GreenpackMart',
    description:
      'See how GreenpackMart manufactures biodegradable tableware in India for export buyers, caterers, retailers and distributors.',
  },
  '/faq/': {
    title: 'Frequently Asked Questions | GreenpackMart',
    description:
      'Find answers about GreenpackMart’s biodegradable tableware, sample requests, minimum order quantities and export process.',
  },
  '/privacy/': {
    title: 'Privacy Policy | GreenpackMart',
    description: 'Read the GreenpackMart privacy policy.',
  },
  '/terms/': {
    title: 'Terms of Use | GreenpackMart',
    description: 'Read the GreenpackMart terms of use.',
  },
}

function getMetadata(pathname) {
  const normalizedPath = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`
  const category = productCategories.find(
    (item) => normalizedPath === `/products/${item.slug}/`
  )

  if (category) {
    return {
      title: `${category.name} | ${siteName}`,
      description: `${category.blurb} Available for wholesale export from India through GreenpackMart.`,
    }
  }

  if (normalizedPath === '/get-quote/' || normalizedPath === '/request-samples/') {
    return {
      title: `Enquire | ${siteName}`,
      description: 'Contact GreenpackMart for biodegradable tableware pricing or samples.',
      noindex: true,
    }
  }

  return pageMetadata[normalizedPath] ?? {
    title: `Page Not Found | ${siteName}`,
    description: 'The requested page could not be found.',
    noindex: true,
  }
}

function setMeta(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.name = name
    document.head.append(element)
  }
  element.content = content
}

function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const metadata = getMetadata(pathname)
    document.title = metadata.title
    setMeta('description', metadata.description)
    const isTestSite = import.meta.env.BASE_URL !== '/'
    setMeta(
      'robots',
      isTestSite || metadata.noindex ? 'noindex, follow' : 'index, follow'
    )

    const canonicalPath = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`
    let canonical = document.querySelector('link[rel="canonical"]')

    if (import.meta.env.BASE_URL === '/') {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = `${productionUrl}${canonicalPath}`
    } else if (canonical) {
      canonical.remove()
    }
  }, [pathname])

  return null
}

export default Seo
