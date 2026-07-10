import { JSDOM } from 'jsdom';

/** Return true if the href does not end with .css */
const isMissingExtension = href => href?.endsWith('.css') === false

/**
 * The browser infers the content type from the extension if content type
 *  isn't provided. When dealing with local files, we need to add .css extension
 *  to got by the browser blocking it.
 * @param {string} html
 * @return {string} html where all stylesheets end in .css
 */
export const addCssExtensions = html => {
    const dom = new JSDOM(html)
    const links = dom.window.document.querySelectorAll('link[rel="stylesheet"]')
    links.forEach(
        link =>
            isMissingExtension(link.href) &&
            link.setAttribute('href', `${ link.href }.css`)
    )
    return dom.serialize()
}