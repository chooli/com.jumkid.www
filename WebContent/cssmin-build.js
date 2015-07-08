module.exports = {

    target: {
        files: {
            'styles/user-darkgray.min.css': ['styles/user/ss-style-darkgray-*.css', 'styles/!*.min.css'],
            'styles/site-darkgray.min.css': ['styles/site/ss-style-darkgray-*.css', 'styles/!*.min.css']
        }
    }

}