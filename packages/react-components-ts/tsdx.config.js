const path = require('path');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('node-sass');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        preprocessor: (content, id) => new Promise((resolve, reject) => {
          const result = sass.renderSync({ file: id })
          resolve({ code: result.css.toString() })
        }),
        extensions: ['.css', '.scss', '.sass'],
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        modules: true,
        // inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: path.resolve('./dist/index.css'),
      })
    );
    return config;
  },
};