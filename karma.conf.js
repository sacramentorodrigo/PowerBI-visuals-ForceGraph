/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

'use strict';

const recursivePathToTests = 'test/**/*.ts';
const srcRecursivePath = '.tmp/drop/visual.js';
const srcCssRecursivePath = '.tmp/drop/visual.css';
const srcOriginalRecursivePath = 'src/**/*.ts';
const coverageFolder = 'coverage';

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = (config) => {
    config.set({
        browsers: ['ChromeHeadless'],
        colors: true,
        frameworks: ['jasmine'],
        reporters: [
            'progress',
            'coverage',
            'karma-remap-istanbul'
        ],
        singleRun: true,
        files: [
            srcCssRecursivePath,
            srcRecursivePath,
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'node_modules/powerbi-visuals-utils-testutils/lib/index.js',
            {
                pattern: './capabilities.json',
                watched: false,
                served: true,
                included: false
            },
            recursivePathToTests,
            {
                pattern: srcOriginalRecursivePath,
                included: false,
                served: true
            }
        ],
        preprocessors: {
            [recursivePathToTests]: ['typescript'],
            [srcRecursivePath]: ['sourcemap', 'coverage']
        },
        typescriptPreprocessor: {
            options: {
                sourceMap: false,
                target: 'ES5',
                removeComments: false,
                concatenateOutput: false
            }
        },
        coverageReporter: {
            dir: coverageFolder,
            reporters: [{
                    type: 'html'
                },
                {
                    type: 'lcov'
                }
            ]
        },
        remapIstanbulReporter: {
            reports: {
                lcovonly: coverageFolder + '/lcov.info',
                html: coverageFolder,
                'text-summary': null
            }
        }
    });
};