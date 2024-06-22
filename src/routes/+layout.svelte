<script>
	/* eslint svelte/no-at-html-tags: 0 */
	import { autoModeWatcher } from '@skeletonlabs/skeleton';
	import '../app.css';
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<slot></slot>

<style></style>
