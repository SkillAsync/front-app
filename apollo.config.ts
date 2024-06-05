module.exports = {
    client: {
        service: {
            name: 'my-app',
            url: 'http://localhost:8086/graphql',
        },
        //Files processed by the extension
        includes: [
            'src/**/*.vue',
            'src/**/*.js',
            'src/**/*.ts',
        ],
    },
}