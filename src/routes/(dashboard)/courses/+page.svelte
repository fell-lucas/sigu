<script lang="ts">
	import { AppBar, ProgressRadial } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import PhPlus from '~icons/ph/plus';

	export let data;
</script>

<AppBar>
	<svelte:fragment slot="headline">
		<div class="flex w-full justify-between">
			<h3 class="h3">Cursos</h3>
			{#if $page.url.pathname === '/courses'}
				<a type="button" class="variant-filled btn" href="/courses/new">
					<span><PhPlus class="w-full" /></span>
					<span>Novo Curso</span>
				</a>
			{/if}
		</div>
	</svelte:fragment>
</AppBar>

<main class="mx-4 mt-8 flex flex-col gap-4">
	<h5 class="h5 font-semibold">Cursos disponíveis</h5>
	<hr class="!border-t-2" />
	<div class="flex flex-row gap-4">
		{#await data.courses}
			<ProgressRadial class="w-8" />
		{:then courses}
			{#if courses.length === 0}
				<p class="text-center">Nenhum curso disponível.</p>
			{:else}
				{#each courses as course}
					<div class="card text-token max-w-[400px] overflow-hidden shadow-xl">
						<div class="space-y-4 p-4">
							<h3 class="h3">{course.name}</h3>
							<article>
								<p class="opacity-75">
									This showcases Skeleton's Card, Typography, Chips, and Divider elements.
								</p>
							</article>
						</div>
						<hr class="opacity-50" />
						<footer class="flex items-center justify-between space-x-4 p-4">
							<span class="variant-soft chip hover:variant-filled">
								<i class="fa-solid fa-heart"></i>
								<span>Like</span>
							</span>
							<span class="variant-soft chip hover:variant-filled">
								<i class="fa-solid fa-paperclip"></i>
								<span>Save</span>
							</span>
						</footer>
					</div>
					<div class="card rounded border p-4 shadow">
						<h4 class="text-lg font-semibold">{course.name}</h4>
						<p><strong>Professor:</strong> {course.professorName}</p>
						<p><strong>Numero de vagas:</strong> {course.slotsCount}</p>
						<p>
							<strong>Data de início:</strong>
							{new Date(course.startDate).toLocaleDateString()}
						</p>
						<p><strong>Data de fim:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
					</div>
				{/each}
			{/if}
		{/await}
	</div>
</main>

<style>
	.card {
		transition: transform 0.2s;
	}
	.card:hover {
		transform: scale(1.02);
	}
</style>
