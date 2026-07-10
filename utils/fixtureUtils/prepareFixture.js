import fs from 'node:fs'
import path from 'node:path'
import _ from 'lodash/fp.js'

import { addCssExtensions } from './addCssExtensions.js'
import { omitScriptTags } from './omitScriptTags.js'
import { extensionlessStylesheets } from './extensionlessStylesheets.js';
import { localScriptFiles } from './localScriptFiles.js';

/**
 * Prepare a saved webpage along with its dependent files to be used as a static fixture.
 * This is a destructive operation that will update the file in place and delete and rename
 *  dependent files as necessary
 * @param {string} pagePath - path to the fixture html to be updated
 * @return {Promise<void>}
 */
export const prepareFixture = async pagePath => {
  console.log('Rewriting html to remove script tags and add css extensions...')
  const fixtureDir = path.dirname(pagePath)
  const originalHtml = await fs.promises.readFile(pagePath, 'utf8')
  const preparedHtml = _.pipe(addCssExtensions, omitScriptTags)(originalHtml)
  await fs.promises.writeFile(pagePath, preparedHtml)

  const scriptFiles = localScriptFiles(originalHtml)
  console.log('Deleting script files', scriptFiles)
  await Promise.all(
    _.map(src => fs.promises.rm(path.resolve(fixtureDir, src)), scriptFiles)
  )

  const hrefs = extensionlessStylesheets(originalHtml)
  console.log('Updating stylesheets to have .css extension', hrefs)
  await Promise.all(
    _.map(
      href =>
        fs.promises.rename(
          path.resolve(fixtureDir, href),
          `${path.resolve(fixtureDir, href)}.css`
        ),
      hrefs
    )
  )
}

/** Support running this on the command line **/
if (import.meta.main) {
  const [, , pagePath] = process.argv
  if (_.isEmpty(pagePath)) {
    console.log('Usage: prepareFixture <path-to-html-page>')
    process.exit(1)
  }
  await prepareFixture(pagePath)
  console.log('Fixture ready', pagePath)
}
