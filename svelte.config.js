import adapter from '@sveltejs/adapter-cloudflare';

export default {
	kit: {
		alias: {
			$db: 'src/db',
			'$db/*': './src/db/*',
			$i18n: 'src/i18n',
			'$i18n/*': './src/i18n/*',
			'$types/*': './src/@types/*'
		},
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
};
