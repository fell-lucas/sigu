<script>
	/* eslint svelte/no-at-html-tags: 0 */
	import { autoModeWatcher, getToastStore } from '@skeletonlabs/skeleton';
	import '../app.css';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	initializeStores();

	const toastStore = getToastStore();
	const flash = getFlash(page);

	flash.subscribe(async (value) => {
		if (value) {
			if (value.redirect) {
				await goto(value.redirect);
			}
			toastStore.trigger({
				message: value.message,
				background: value.type === 'success' ? 'variant-filled-success' : 'variant-filled-error'
			});
		}
	});
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<Toast />

<div class="flex h-full flex-1 flex-col px-6">
	<slot></slot>
</div>

<style></style>
