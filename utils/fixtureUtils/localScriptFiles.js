import _ from 'lodash/fp.js'
import { JSDOM } from 'jsdom';

/**
 * Return true if the string is a local file reference
 * @param {string}
 * @return {boolean}
 */
const isLocalFile = _.startsWith('./')

/**
 * Return all the src values of the script tags which are relative paths
 *  to local files
 * @param {string} html
 * @return {string[]} paths to local source files
 */
export const localScriptFiles = html => {
    const dom = new JSDOM(html)
    const scripts = dom.window.document.querySelectorAll('script')
    return _.filter(isLocalFile, _.map('src', scripts))
}
