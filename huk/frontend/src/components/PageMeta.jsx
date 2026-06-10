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

function PageMeta({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Hukmilane Lanecha Raja`
      upsertMeta('og:title', `${title} | Hukmilane Lanecha Raja`, 'property')
      upsertMeta('twitter:title', `${title} | Hukmilane Lanecha Raja`)
    }
    if (description) {
      upsertMeta('description', description)
      upsertMeta('og:description', description, 'property')
      upsertMeta('twitter:description', description)
    }
  }, [description, title])

  return null
}

export default PageMeta
