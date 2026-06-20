import { useEffect } from 'react'

function upsertMeta(name, content, attribute = 'name') {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function PageMeta({ title, description }) {
  useEffect(() => {
    const siteName = 'Hukmill Lane Cha Raja'
    const pageTitle = title === 'Home' ? `${siteName} | Established 1934` : `${title} | ${siteName}`
    const canonicalUrl = `https://www.hukmillanecharaja.in${window.location.pathname === '/' ? '/' : window.location.pathname}`

    if (title) {
      document.title = pageTitle
      upsertMeta('og:title', pageTitle, 'property')
      upsertMeta('twitter:title', pageTitle)
    }
    if (description) {
      upsertMeta('description', description)
      upsertMeta('og:description', description, 'property')
      upsertMeta('twitter:description', description)
    }
    upsertLink('canonical', canonicalUrl)
    upsertMeta('og:url', canonicalUrl, 'property')
  }, [description, title])

  return null
}

export default PageMeta
