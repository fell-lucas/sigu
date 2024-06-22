<script lang="ts">
	export let errors: string[] | undefined;
</script>

{#if errors && errors.length > 0}
	<ul class="mt-1 list-inside list-disc text-sm text-error-500">
		{#each errors as error}
			<li>{error}</li>
		{/each}
	</ul>
{/if}
