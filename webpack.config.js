const path = require('path')
const zlib = require('zlib')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const browserslist = require('browserslist')
const CleanPlugin = require('clean-webpack-plugin')
const { SourceMapDevToolPlugin } = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RobotstxtPlugin = require('robotstxt-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin')
const MinifyCssNames = require('mini-css-class-name/css-loader')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const publicPath = './public'
const srcPath = path.resolve(__dirname, './src/')
const destPath = path.resolve(__dirname, 'build')
const filesThreshold = 10240 // (bytes) threshold for compression, url-loader plugins
const indexHtmlPath = path.resolve(__dirname, './public/')
const env = process.env.BROWSERSLIST_ENV || 'defaults'
const supportedBrowsers = browserslist(null, { env })

module.exports = (env, argv) => {
	const isDevServer = env.WEBPACK_SERVE
	const mode = argv.mode || (isDevServer ? 'development' : 'production')
	const isDevMode = mode !== 'production'
	const isProd = mode === 'production'
	const target = isProd ? 'browserslist' : 'web'
	const generateSourceMap = process.env.GENERATE_SOURCEMAP

	const cssModules = {
		auto: /\.module\.\w+$/,
		getLocalIdent: isDevMode
			? (loaderContext, _localIdentName, localName, options) => {
					const request = path
						.relative(options.context || '', loaderContext.resourcePath)
						.replace(`src${path.sep}`, '')
						.replace('.module.css', '')
						.replace('.module.scss', '')
						.replace('.main.scss', '')
						.replace(/\\|\//g, '-')
						.replace(/\./g, '_')

					return `${request}__${localName}`
			  }
			: MinifyCssNames(
					// minify classNames for prod-build
					{ excludePattern: /[_dD]/gi } // exclude '_','d','D' because Adblock blocks '%ad%' classNames
			  ),
	}

	const cssModuleOptions = () => {
		return isProd
			? {
					localIdentName: '[contenthash:base64:8]',
					exportLocalsConvention: 'camelCase',
					...cssModules,
			  }
			: {
					localIdentName: '[name]__[local]___[hash:base64:5]',
					exportLocalsConvention: 'camelCase',
					...cssModules,
			  }
	}

	const plugins = [
		new CaseSensitivePathsPlugin(),
		new RobotstxtPlugin({
			policy: [env.REACT_APP_USE_DEV_API ? { userAgent: '*', disallow: '/' } : { userAgent: '*', allow: '/' }],
		}),
		// new AntDesignThemePlugin(options),
		new FriendlyErrorsWebpackPlugin(),
		new ObsoleteWebpackPlugin({
			name: 'obsolete',
			promptOnNonTargetBrowser: true, // show popup if browser is not listed in .browserlistrc
		}),
		new ScriptExtHtmlWebpackPlugin({
			// it adds to obsolete-plugin-script 'async' tag (for perfomance puprpose)
			async: 'obsolete',
		}),
		new webpack.ProgressPlugin(),
		new webpack.ProvidePlugin({
			React: 'react',
		}),

		new webpack.WatchIgnorePlugin({ paths: [/\.d\.js$/] }), // ignore d.js files in --watch mode
		new webpack.IgnorePlugin({
			resourceRegExp: /^\.\/locale$/,
			contextRegExp: /moment$/,
		}),

		new CopyWebpackPlugin(
			{
				patterns: [
					{
						from: publicPath,
						globOptions: {
							ignore: ['**/index.html', '**/color.less'],
						},
					},
				],
			},
			{ from: 'public/manifest', to: 'manifest' }
		),
		new webpack.DefinePlugin({
			// it adds custom Global definition to the project like BASE_URL for index.html
			'process.env.NODE_ENV': JSON.stringify(mode),
			'process.env.REACT_APP_USE_DEV_API': env.REACT_APP_USE_DEV_API,
			'global.DEV': JSON.stringify(!isProd),
			'global.DEBUG': JSON.stringify(false),
			'global.VERBOSE': JSON.stringify(false),
		}),

		new MiniCssExtractPlugin({
			filename: isProd ? 'static/css/[name].[contenthash].css' : 'static/css/[name].css',
			chunkFilename: isProd ? 'static/css/[id].[contenthash].css' : 'static/css/[id].css',
		}),
		new Dotenv({
			path: `./.env.${env.REACT_APP_USE_DEV_API}`,
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(indexHtmlPath, 'index.html'),
			title: 'BASE-APP PWA',
			minify: isProd && {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
				removeAttributeQuotes: true,
				collapseBooleanAttributes: true,
				removeScriptTypeAttributes: true,
			},
		}),
	]

	if (process.env.SERVE) {
		plugins.push(new ReactRefreshWebpackPlugin())
	}

	if (!isProd) {
		plugins.push(
			new SourceMapDevToolPlugin({
				filename: '[file].map[query]',
			})
		)
	}

	if (isProd) {
		plugins.push(
			new CompressionPlugin({
				filename: '[path][base].gz',
				algorithm: 'gzip',
				test: /.(js|jsx|css|scss|ts|tsx|html|svg|png|jpg|jpeg)$/,
				threshold: filesThreshold,
				minRatio: 0.8,
			})
		)
		plugins.push(
			new CompressionPlugin({
				filename: '[path][base].br',
				algorithm: 'brotliCompress',
				test: /.(js|jsx|css|scss|ts|tsx|html|svg|png|jpg|jpeg)$/,
				threshold: filesThreshold,
				compressionOptions: {
					params: {
						[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
					},
				},
				minRatio: 0.8,
				deleteOriginalAssets: false,
			})
		)
		plugins.push(new CleanPlugin.CleanWebpackPlugin())

		plugins.push(
			new GenerateSW({
				// swDest: 'sw.js',
				clientsClaim: true,
				skipWaiting: true,
				// runtimeCaching: [{
				// 	urlPattern: new RegExp('(\\b(https)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'),
				// 	handler: 'StaleWhileRevalidate'
				// }]
			})
		)

		plugins.push(
			new WebpackManifestPlugin({
				fileName: 'asset-manifest.json',
			})
		)

		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'disabled',
				generateStatsFile: true,
				statsOptions: { source: false },
			})
		)
		plugins.push(
			new InjectManifest({
				maximumFileSizeToCacheInBytes: 5000000, // <-- Added (5 MB)
				swSrc: './src/sw.js',
				swDest: 'sw.js',
				exclude: [/\.map$/, /manifest$/, /\.htaccess$/, /service-worker\.js$/, /sw\.js$/],
			})
		)
	}

	const devServer = () => {
		return !isProd
			? {
					static: {
						directory: path.join(__dirname, 'build'),
					},
					https: true,
					historyApiFallback: true,
					port: 3000,
					open: false,
					compress: true,
					hot: true,
			  }
			: {}
	}

	return {
		mode: isProd ? 'production' : 'development',
		devtool: argv.devtool === false ? false : 'eval-cheap-module-source-map',
		entry: path.resolve(srcPath, 'index.jsx'),

		performance: {
			hints: isProd ? 'warning' : false,
			maxEntrypointSize: 5120,
			maxAssetSize: 5120,
			assetFilter: function assetFilter(assetFilename) {
				return !/(\.map$)|(fonts)|(images)/.test(assetFilename) // ignore these files from performance-hints
			},
		},

		stats: {
			cached: false,
			cachedAssets: false,
			chunks: false,
			chunkModules: false,
			children: false,
			colors: true,
			hash: false,
			modules: false,
			reasons: false,
			timings: false,
			version: false,
		},

		output: {
			pathinfo: true,
			path: destPath,
			publicPath: '/',
			filename: isProd ? 'static/js/[name].[contenthash].js' : 'static/js/[name].js',
			chunkFilename: isProd ? 'static/js/[name].[chunkhash:8].chunk.js' : 'static/js/[name].chunk.js',
			assetModuleFilename: 'static/media/[contenthash][ext][query]',
		},

		plugins,

		target,

		resolve: {
			extensions: ['.js', '.jsx', '.scss', '.css', '.png', '.svg', '.ts', '.tsx'],
			plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
		},

		optimization: {
			flagIncludedChunks: true,
			emitOnErrors: true,
			splitChunks: {
				minSize: 10000,
				maxSize: 250000,
				// for avoiding duplicated dependencies across modules
				minChunks: 1, // Minimum number of chunks that must share a module before splitting.
				cacheGroups: {
					defaultVendors: {
						name: 'chunk-vendors', // move js-files from node_modules into splitted file [chunk-vendors].js
						test: /[\\/]node_modules[\\/]/, // filtering files that should be included
						priority: -10, // a module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority
						chunks: 'all', // type of optimization: [initial | async | all]
					},
					common: {
						name: 'chunk-common', // move reusable nested js-files into splitted file [chunk-common].js
						minChunks: 2, // minimum number of chunks that must share a module before splitting
						priority: -20,
						chunks: 'all',
						reuseExistingChunk: true, // If the current chunk contains modules already split out from the main bundle, it will be reused instead of a new one being generated. This can impact the resulting file name of the chunk
					},
				},
			},
			minimize: isProd,
			minimizer: isProd
				? [
						new TerserPlugin({
							test: /\.m?js(\?.*)?$/i,
							// exclude: /\.m?js(\?.*)?$/i, // uncomment if we don't need uglifying (for debug purpose)
							extractComments: false, // disable extracting comments to a different file
							terserOptions: {
								safari10: supportedBrowsers.some(
									(browser) => browser.includes('safari 10') || browser.includes('ios_saf 10')
								),
								toplevel: true, // https://github.com/terser/terser#minify-options
								output: {
									comments: false, // remove comments from files
								},
								mangle: {
									safari10: true, // for preventing Safari 10/11 bugs in loop scoping and await
								},
								// compress: { pure_funcs: ['console.info', 'console.debug', 'console.warn'] }, // remove this functions when their return values are not used
							},
						}),
						new CssMinimizerPlugin(),
				  ]
				: ['...'],
		},

		devServer: devServer(),

		module: {
			rules: [
				/* mp3 loader*/
				{
					test: /\.mp3$/,
					loader: 'file-loader',
					options: {
						name: 'static/media/[name].[hash:8].[ext]',
					},
				},

				/* json loader*/
				{
					test: /\.json$/i,
					loader: 'json5-loader',
					type: 'javascript/auto',
				},

				/* css loader*/
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},

				{
					test: /\.(sa|sc)ss$/,
					exclude: /\.module\.s(a|c)ss$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: { importLoaders: 1 },
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: generateSourceMap,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: generateSourceMap,
							},
						},
					],
				},

				/* scss module  loader*/
				{
					test: /\.module\.s(a|c)ss$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: cssModuleOptions(),
								importLoaders: 1,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: generateSourceMap,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: generateSourceMap,
							},
						},
					],
				},

				/* less loader*/
				{
					test: /\.less$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
							},
						},
						{
							loader: 'less-loader',
							options: {
								lessOptions: {
									javascriptEnabled: true,
									sourceMap: true,
								},
							},
						},
					],
				},

				/* img loader*/
				{
					test: /\.(?:ico|png|jpg|jpeg|svg|gif)$/,
					exclude: /node_modules/,
					type: 'asset/resource',
					parser: {
						dataUrlCondition: {
							maxSize: 30 * 1024,
						},
					},
				},

				/* fonts loader*/
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[hash][ext][query]',
					},
				},

				/* jsx loader*/
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',

						options: {
							cacheDirectory: !isProd,
							cacheCompression: !isProd,
							compact: !isProd,
						},
					},
				},
				{
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					use: [
						'babel-loader',
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: true,
							},
						},
					],
				},
			],
		},
	}
}
