<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<nav class="sticky top-0">
	<AppBar>
		<svelte:fragment slot="headline">
			<h3 class="h3 max-w-xs truncate text-ellipsis">
				Bem vindo, {$page.data.session?.name}
			</h3>
		</svelte:fragment>
	</AppBar>
</nav>
