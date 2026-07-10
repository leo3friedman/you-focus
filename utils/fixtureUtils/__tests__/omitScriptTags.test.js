import { describe, it, expect } from 'vitest'

import { omitScriptTags } from '../omitScriptTags.js'

describe('omitScriptTags', () => {
  it('should omit script tags from html', () => {
    // Arrange
    const html = `
      <html>
        <head>
          <script id="js1" src="./somescript.js">
          </script>
        </head>
        <body></body>
      </html>`

    // Act
    const result = omitScriptTags(html)

    // Assert
    expect(result).toMatchInlineSnapshot(`
      "<html><head>
                
              </head>
              <body>
            </body></html>"
    `)
  })

  it('should keep elements between scripts', () => {
    // Arrange
    const html = `
      <html>
        <head>
          <script id="js1" src="./somescript.js"></script>
          <div></div> <!-- Ensure this div remains after the surrounding scripts are removed -->
          <script id="js1" src="./othercript.js"></script>
        </head>
        <body></body>
      </html>`

    // Act
    const result = omitScriptTags(html)

    // Assert
    expect(result).toMatchInlineSnapshot(`
      "<html><head>
                
                </head><body><div></div> <!-- Ensure this div remains after the surrounding scripts are removed -->
                
              
              
            </body></html>"
    `)
  })

  it('should preserve stylesheet links in html', () => {
    // Arrange
    const html = `
    <html>
      <head>
        <link rel="stylesheet" href="./YouTube_files/www-onepick-2x.css">
      </head>
    </html>`

    // Act
    const result = omitScriptTags(html)

    // Assert
    expect(result).toMatchInlineSnapshot(`
      "<html><head>
              <link rel="stylesheet" href="./YouTube_files/www-onepick-2x.css">
            </head>
          <body></body></html>"
    `)
  })

  it('should work with empty values', () => {
    expect(omitScriptTags(null)).toEqual(null)
    expect(omitScriptTags(undefined)).toEqual(undefined)
    expect(omitScriptTags('')).toEqual('')
  })
})
