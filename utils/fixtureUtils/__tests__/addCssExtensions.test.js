import { describe, it, expect } from 'vitest'

import { addCssExtensions } from '../addCssExtensions';

describe('addCssExtensions', () => {
    it('should ensure all css file references end in .css', () => {
        // Arrange
        const html = `
            <html>
                <head>
                    <link rel="stylesheet" href="./YouTube-home_files/www-onepic-2x">
                    <link rel="stylesheet" href="./YouTube-home_files/www-onepic-3x.css">
                </head>
            </html>`

        // Act
        const withExtensions = addCssExtensions(html)

        // Assert
        expect(withExtensions).toMatchInlineSnapshot(`
          "<html><head>
                              <link rel="stylesheet" href="./YouTube-home_files/www-onepic-2x.css">
                              <link rel="stylesheet" href="./YouTube-home_files/www-onepic-3x.css">
                          </head>
                      <body></body></html>"
        `)
    })
})
