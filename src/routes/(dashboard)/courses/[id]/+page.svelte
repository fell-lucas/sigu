<script lang="ts">
	import Section from '$lib/components/cards/Section.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import PhCaretLeft from '~icons/ph/caret-left';
	import PhUserBold from '~icons/ph/user-bold';

	export let data;
</script>

<AppBar>
	<svelte:fragment slot="headline">
		<div class="flex w-full justify-start gap-2">
			<a type="button" class="items-center p-2 text-center" href="/courses">
				<span><PhCaretLeft /></span>
			</a>
			<h3 class="h3">Descrição do Curso</h3>
		</div>
	</svelte:fragment>
</AppBar>

<main class="mx-auto mt-8 flex max-w-3xl flex-col">
	<div class="card pb-2">
		<header class="h3 card-header text-center">{data.course.name}</header>
		<hr class="mt-3 !border-t-2" />
		<section class="variant-soft flex flex-row items-center p-4">
			<PhUserBold class="" />
			{data.course.professorName}
		</section>
		<Section title="Descrição">
			<p class="p-4">{data.course.description}</p>
		</Section>

		<Section title="Datas">
			<p class="p-3">Início: {new Date(data.course.startDate).toLocaleDateString()}</p>
			<p class="p-3">Fim: {new Date(data.course.endDate).toLocaleDateString()}</p>
		</Section>

		<Section title="Vagas">
			<p class="p-4">{data.course.slotsCount}</p>
		</Section>

		<Section title="Materiais do Curso">WIP</Section>
	</div>
</main>
