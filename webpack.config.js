var webpack = require('webpack');
var Path = require('path');


var isProduction = process.env.NODE_ENV === 'production';

var devToolConfig = isProduction ? 'source-map' : 'cheap-eval-source-map';

var config = {
    entry: {
        app: './src/client/index.js',
    },

    output: {
        path: Path.join(__dirname, './dist/scripts'),
        filename: 'app.js',
    },

    devtool: devToolConfig,

    module: {
        rules: [
              {
                test: /\.js$/, //Check for all js files
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: ['babel-preset-react', 'babel-preset-stage-2']
                        }
                    }
                ]
              },
              {
                test: /\.(sass|scss)$/, //Check for sass or scss file names
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ]
              },
              {
                test: /\.json$/,
                loader: "json-loader"  //JSON loader
              }
         ]
    },

    devServer: {
        contentBase: __dirname + '/src',
    }

};

module.exports = config;