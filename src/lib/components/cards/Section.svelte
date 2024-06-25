<script lang="ts">
	export let title = '';
</script>

<section class="variant-outline mx-2 mt-2 flex flex-col rounded-lg">
	<header class="variant-soft h5 p-4 font-bold">{title}</header>
	<hr class="!border-t-2" />
	<slot></slot>
</section>
