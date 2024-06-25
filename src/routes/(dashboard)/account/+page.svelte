<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<nav class="sticky top-0">
	<AppBar>
		<svelte:fragment slot="headline">
			<h3 class="h3 w-full">Minha conta</h3>
		</svelte:fragment>
	</AppBar>
</nav>

<div class="p-4">
	Você é {$page.data.session?.role}
</div>
