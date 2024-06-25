<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import PhPlus from '~icons/ph/plus';

</script>

<AppBar>
	<svelte:fragment slot="headline">
		<div class="flex w-full justify-between">
			<h3 class="h3">Cursos</h3>
      {#if $page.url.pathname === '/courses'}
			<a type="button" class="variant-filled btn" href="/courses/new" >
				<span><PhPlus class="w-full" /></span>
				<span>Novo Curso</span>
			</a>
      {/if}
		</div>
	</svelte:fragment>
</AppBar>
