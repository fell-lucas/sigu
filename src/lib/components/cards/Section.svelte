<script lang="ts">
	export let title = '';
</script>

<section class="variant-outline mx-2 mt-2 flex flex-col rounded-lg">
	<div class="variant-soft flex w-full items-center justify-between p-4">
		<header class="h5 font-bold">{title}</header>
		<slot name="actions"></slot>
	</div>
	<hr class="!border-t-2" />
	<slot></slot>
</section>
