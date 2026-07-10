import { describe, it, expect } from 'vitest'

import { localScriptFiles } from '../localScriptFiles';

describe('localScriptFiles', () => {
    it('should return list of only the local scripts ', () => {
        // Arrange
        const html = `
            <html>
                <head>
                    <script src="./files/script1.js" id="a"></script>
                    <script id="b" src="./files/script2.js"></script>
                    <script id="c" src="http://www.test.com/files/script3.js"></script>
                </head>
            </html>`

        // Act
        const scripts = localScriptFiles(html)

        // Assert
        expect(scripts).toEqual(['./files/script1.js', './files/script2.js'])
    })
})