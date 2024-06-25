<script lang="ts">
	import { AppBar, ProgressRadial } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import PhPlus from '~icons/ph/plus';
	import PhUserBold from '~icons/ph/user-bold';
	import PhListChecks from '~icons/ph/list-checks';

	export let data;

	function gotoCoursesNew() {
		window.location.href = '/courses/new';
	}
</script>

<AppBar>
	<svelte:fragment slot="headline">
		<div class="flex w-full justify-between">
			<h3 class="h3">Cursos</h3>
			{#if data.role === 'ADMIN'}
				<button type="button" class="variant-filled btn" on:click={gotoCoursesNew}>
					<span><PhPlus class="w-full" /></span>
					<span>Novo Curso</span>
				</button>
			{/if}
		</div>
	</svelte:fragment>
</AppBar>

<main class="mx-4 mt-8 flex flex-col gap-4">
	<h5 class="h5 font-semibold">Cursos disponíveis</h5>
	<hr class="!border-t-2" />
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#await data.courses}
			<ProgressRadial class="w-8" />
		{:then courses}
			{#if courses.length === 0}
				<p class="text-center">Nenhum curso disponível.</p>
			{:else}
				{#each courses as course}
					<div class="text-toke card flex flex-col justify-between overflow-hidden shadow-xl">
						<div class="space-y-4 p-4">
							<h3 class="h3 line-clamp-1 w-4/5">{course.name}</h3>
							<article>
								<p class="line-clamp-2 opacity-75">
									{course.description}
								</p>
								<p class="opacity-75">
									<strong>Data de início:</strong>
									{new Date(course.startDate).toLocaleDateString()}
								</p>
								<p class="opacity-75">
									<strong>Data de fim:</strong>
									{new Date(course.endDate).toLocaleDateString()}
								</p>
							</article>
						</div>
						<footer class="items-center">
							<hr class="opacity-50" />
							<div class="flex flex-row justify-between space-x-4 p-4">
								<span class="flex flex-row items-center gap-2 font-semibold">
									<span><PhUserBold class="w-full" /></span>
									<span>{course.professorName}</span>
								</span>
								<span class="items-center gap-2 font-semibold">
									<span>{course.slotsCount} vagas</span>
								</span>
							</div>
						</footer>
					</div>
				{/each}
			{/if}
		{/await}
	</div>
</main>
