import { describe, it, expect } from 'vitest'

import { extensionlessStylesheets } from '../extensionlessStylesheets';

describe('extensionlessStylesheets', () => {
    it('should return list of only stylesheets which are missing .css extension', () => {
        // Arrange
        const html = `
            <html>
                <head>
                    <link rel="stylesheet" href="./files/www-onepic-2x">
                    <link rel="stylesheet" href="./files/www-onepic-3x">
                    <link rel="manifest" href="something" >
                </head>
            </html>`

        // Act
        const hrefs = extensionlessStylesheets(html)

        // Assert
        expect(hrefs).toEqual(['./files/www-onepic-2x', './files/www-onepic-3x'])
    })

    it('should not return stylesheets which have .css extension', () => {
        // Arrange
        const html = `
            <html>
                <head>
                    <link rel="stylesheet" href="./files/fonts-css.css">
                </head>
            </html>`

        // Act
        const hrefs = extensionlessStylesheets(html)

        // Assert
        expect(hrefs).toEqual([])
    })

    it('should not care about attribute order', () => {
        // Arrange
        const html = `
            <html>
                <head>
                    <link href="./files/cssfile" rel="stylesheet" >
                </head>
            </html>`

        // Act
        const hrefs = extensionlessStylesheets(html)

        // Assert
        expect(hrefs).toEqual(['./files/cssfile'])
    })

    it('should work for multiple links on same line', () => {
        const html = `<link rel="stylesheet" href="./YouTube-home_files/css2"><link rel="stylesheet" href="./YouTube-home_files/rs=AGKMywFcF_uUCyYlEIvSUG7EoP5mCDRoSg" >`
        const hrefs = extensionlessStylesheets(html)
        expect(hrefs).toEqual([
            './YouTube-home_files/css2',
            './YouTube-home_files/rs=AGKMywFcF_uUCyYlEIvSUG7EoP5mCDRoSg',
        ])
    })

})