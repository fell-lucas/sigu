<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar>
	<svelte:fragment slot="headline">
		<h3 class="h3 w-full">Minha conta</h3>
	</svelte:fragment>
</AppBar>

Você é {$page.data.session?.role}
