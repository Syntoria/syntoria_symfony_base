// Node
const path = require("path");

// Webpack
const webpack = require("webpack");
const {merge} = require("webpack-merge");

// Webpack plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {WebpackManifestPlugin} = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const AssetsPlugin = require('assets-webpack-plugin');

const disableWatch = process.argv.includes('--no-watch');

// Other
const devMode = process.env.NODE_ENV !== "production";

// Webpack abilities
const WEBPACK_REPORT = process.env.WEBPACK_REPORT || false;

// Config
const ROOT_PATH = __dirname;
const CACHE_PATH = ROOT_PATH + "/temp/webpack";

require('dotenv').config({
    path: '.env.local',
});

module.exports = {
    watch: disableWatch === false ? devMode : false,
    mode: devMode ? "development" : "production",
    context: path.join(ROOT_PATH, "assets"),
    entry: {
        app: path.join(ROOT_PATH, "assets/app/index.tsx"),
    },
    output: {
        path: path.join(ROOT_PATH, "public/dist"),
        publicPath: "/dist/",
        filename: '[name].bundle.js',
        clean: true,
    },
    devtool: 'cheap-module-source-map',
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(CACHE_PATH, 'cache'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules\/vendor/,
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'imgs/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|ico)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'imgs/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            importLoaders: 2,
                            modules: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [require("autoprefixer"), require('postcss-preset-env')]
                            }
                        }
                    },
                ],
            },
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "assets", "app"),
            react: path.resolve('./node_modules/react'),
            'highlight.js': path.resolve('./node_modules/highlight.js'),
            '@fullcalendar': path.resolve('./node_modules/@fullcalendar')
        },
        extensions: [".js", ".ts", ".tsx"],
        modules: [
            'node_modules',
        ],
    },
    plugins: [
        // extract css
        new MiniCssExtractPlugin({
            filename: !devMode ? "[name].[chunkhash:8].bundle.css" : "[name].bundle.css",
        }),
        new AssetsPlugin({
            filename: 'public/dist/manifest.json',
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        })
    ],
};

if (WEBPACK_REPORT) {
    module.exports.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            generateStatsFile: true,
            openAnalyzer: false,
            reportFilename: path.join(CACHE_PATH, "webpack-report/index.html"),
            statsFilename: path.join(CACHE_PATH, "webpack-report/stats.json"),
        })
    );
}

if (process.env.NODE_ENV === "development") {
    const development = {
        output: {
            globalObject: 'this'
        },
    };

    module.exports = merge(module.exports, development);
}

if (process.env.NODE_ENV === "production") {
    const production = {
        output: {
            // uncomment for manifest loader
            filename: '[name].[contenthash:8].bundle.js',
            // chunkFilename: '[name].[contenthash:8].chunk.js'
        },
        devtool: "source-map"
    };

    module.exports = merge(module.exports, production);
}
