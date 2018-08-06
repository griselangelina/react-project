exports.config = {
  optimize: false,
  sourceMaps: true,

  files: {
    javascripts: {
      joinTo: "js/app.dev.js"
    },
    stylesheets: {
      joinTo: "css/app.dev.css",
    },
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    assets: /^(web\/static\/assets)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "deps/phoenix/web/static",
      "deps/phoenix_html/web/static",
      "web/static",
      "test/static"
    ],

    // Where to compile files to
    public: "priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      presets: ['react', 'es2015'],
      // Do not use ES6 compiler in vendor code
      ignore: [/web\/static\/vendor/]
    },
    sass: {
      mode: 'native' // Use libsass. Change to 'ruby' to use the gem
    },
    uglify: {
      mangle: false,
      compress: false,
    }
  },

  modules: {
    autoRequire: {
      "js/app.dev.js": ["web/static/js/app"]
    }
  },

  // Production settings
  overrides: {
    production: {
      optimize: true,
      sourceMaps: false,
      plugins: {
        uglify: {
          compress: true,
          mangle: true
        }
      },
      files: {
        javascripts: {
          joinTo: "js/app.prod.js"
        },
        stylesheets: {
          joinTo: "css/app.prod.css",
        },
      },
      modules: {
        autoRequire: {
          "js/app.prod.js": ["web/static/js/app"]
        }
      },
    },
  },

  npm: {
    enabled: true
  }
};