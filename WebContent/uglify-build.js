module.exports = {

    my_target: {
      files: {
        'scripts/app.js': ['scripts/admin/core.js', 'scripts/admin/helpers/helpers.js', 'scripts/admin/templates.js',
		                      'scripts/admin/controllers.js', 'scripts/admin/components.js', 'scripts/admin/app.js'],
        'scripts/app-login.js': ['scripts/admin/core.js', 'scripts/admin/templates.js', 'scripts/admin/login-app.js']
      }
    }

}