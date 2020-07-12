module.exports = {
    roots: ['./dist'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'html'],
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Test Report',
            },
        ],
    ],
};
