<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Section from '$lib/components/cards/Section.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import PhCaretLeft from '~icons/ph/caret-left';
	import PhPlus from '~icons/ph/plus';
	import PhTrash from '~icons/ph/trash';
	import PhUserBold from '~icons/ph/user-bold';

	export let data;

	let deleteConfirmation: string | null = null;
</script>

<nav class="sticky top-0">
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
</nav>

<main class="mx-auto my-8 flex max-w-3xl flex-col">
	<div class="card pb-2">
		<header class="h3 card-header text-center">{data.course.name}</header>
		<hr class="mt-3 !border-t-2" />
		<section class="variant-soft flex flex-row items-center p-4">
			<PhUserBold />
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
				<div class="flex items-center justify-between px-4">
					<div class="py-2">
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
					{#if $page.data.session?.userId === data.course.professorId}
						<form
							use:enhance={() => {
								deleteConfirmation = null;
								return async () => await invalidateAll();
							}}
							action="/courses/{data.course.id}?/deleteMaterial"
							method="POST"
						>
							<input type="hidden" name="materialId" value={material.id} />
							{#if deleteConfirmation === material.id}
								<button type="submit" class="variant-filled-error btn">Confirma?</button>
							{:else}
								<button
									type="button"
									onclick={() => (deleteConfirmation = material.id)}
									class="variant-filled-error btn"
								>
									<PhTrash />
								</button>
							{/if}
						</form>
					{/if}
				</div>
			{:else}
				<p class="p-4">Nenhum material cadastrado ainda.</p>
			{/each}
		</Section>
	</div>
</main>
