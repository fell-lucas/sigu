<script lang="ts">
	import { page } from '$app/stores';
	import Section from '$lib/components/cards/Section.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import PhCaretLeft from '~icons/ph/caret-left';
	import PhUserBold from '~icons/ph/user-bold';
	import PhPlus from '~icons/ph/plus';

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

		<Section title="Materiais do Curso">
			<div slot="actions">
				{#if $page.data.session?.userId === data.course.professorId}
					<a
						type="button"
						class="variant-filled-primary btn"
						href="/courses/{data.course.id}/new-material"
					>
						<span><PhPlus /></span>
						<span>Novo</span>
					</a>
				{/if}
			</div>
			<hr class="!border-t-2" />
			{#each data.courseMaterials as material}
				<div class="px-4 py-2">
					<p>{material.name}</p>
					{#if material.isLink}
						<span class="text-xs">Acesse em</span>
						<a class="anchor text-xs" href={material.content}>{material.content}</a>
					{:else}
						<span class="text-xs">Conteúdo:</span>
						<p class="text-xs">
							{material.content}
						</p>
					{/if}
				</div>
			{:else}
				<p class="p-4">Nenhum material cadastrado ainda.</p>
			{/each}
		</Section>
	</div>
</main>
