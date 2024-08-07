import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss(), Icons({ compiler: 'svelte' })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['src/e2e/**']
	}
});
