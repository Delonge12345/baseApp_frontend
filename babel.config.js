const plugins = [
	['import', { libraryName: 'antd', style: true, libraryDirectory: 'es' }],
	'babel-plugin-styled-components',
	// "@babel/plugin-proposal-class-properties",
	// "jsx-classnames-advanced",
	// 'lodash',
].filter(Boolean)

// if (process.env.NODE_ENV !== 'production') {
// 	plugins.push('react-refresh/babel')
// }

module.exports = {
	presets: [
		'@babel/preset-env',
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
				development: process.env.NODE_ENV === 'development',
			},
		],
	],
	plugins,
}
