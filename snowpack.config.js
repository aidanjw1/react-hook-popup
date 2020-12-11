module.exports = {
    installOptions: {
        polyfillNode: true,
        // externalPackage: ['react'],
    },
    buildOptions: {
        out: 'dist',
        clean: true,
    },
    mount: {
        'src': '/',
    },
    plugins: [
        ['@snowpack/plugin-sass', { 
            sourceMap: false,
         }]
    ],
}