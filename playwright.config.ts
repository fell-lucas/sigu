import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'src/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		video: 'retain-on-failure'
	}
};

export default config;
