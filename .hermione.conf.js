module.exports = {
    sets: {
        common: {
            files: 'test/hermione/common'
        },
        desktop: {
            files: [
                'test/hermione/*.hermione.js',
                'test/hermione/*.hermione.js'
            ],
            ignoreFiles: ['tests/fixtures/**'],
            browsers: ['chrome']
        }
    },
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-report'
        }
    }
};