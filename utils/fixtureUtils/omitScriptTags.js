import _ from 'lodash/fp.js'
import { JSDOM } from 'jsdom';

/**
 * Return the specified html but without any of the script tags.
 * This allows us to create a static test fixture from html which might otherwise
 *  be impacted when dynamic scripts attempt to re-render
 * @param {string} html
 * @return {string} html without the script tags
 */
export const omitScriptTags = html => {
  if (_.isEmpty(html)) return html
  const dom = new JSDOM(html)
  const scripts = dom.window.document.querySelectorAll('script')
  scripts.forEach(el => el.remove())
  return dom.serialize()
}
