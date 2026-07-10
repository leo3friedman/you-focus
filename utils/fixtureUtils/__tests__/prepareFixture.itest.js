import { beforeEach, describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import _ from 'lodash/fp'

import { prepareFixture } from '../prepareFixture.js'
import { safeRemoveSubdir } from '../../safeRemoveSubdir.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const fixtureInitialDir = path.join(__dirname, '/fixtures/webpage')
const fixtureTempDir = path.join(__dirname, '/temp/fixtures/webpage')

describe('prepareFixture', () => {
  beforeEach(async () => {
    await safeRemoveSubdir(__dirname, fixtureTempDir)
    await fs.promises.cp(fixtureInitialDir, fixtureTempDir, {
      recursive: true,
    })
  })

  it('should generate a working static fixture from a saved webpage', async () => {
    // Arrange
    const pagePath = path.join(fixtureTempDir, 'webpage.html')

    // Act
    await prepareFixture(pagePath)

    // Assert
    const html = await fs.promises.readFile(pagePath, 'utf8')
    expect(html).toMatchSnapshot()

    const files = await fs.promises.readdir(
      path.join(fixtureTempDir, 'webpage_files')
    )
    expect(files).toEqual(expect.arrayContaining(['styles.css']))
    expect(_.filter(_.endsWith('.js'), files)).toEqual([])
  })
})
