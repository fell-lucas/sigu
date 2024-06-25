<script lang="ts">
	import { AppBar, ProgressRadial } from '@skeletonlabs/skeleton';
	import PhPlus from '~icons/ph/plus';
	import PhUserBold from '~icons/ph/user-bold';
	import { superForm } from 'sveltekit-superforms';

	export let data;
	let deleteConfirmation: string | null = null;

	const { form, errors, enhance, delayed, submitting } = superForm(data.form, {onSubmit: () => {
		deleteConfirmation = null;
	}});
</script>

<AppBar>
	<svelte:fragment slot="headline">
		<div class="flex w-full justify-between">
			<h3 class="h3">Cursos</h3>
			{#if data.role === 'ADMIN'}
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
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#await data.courses}
			<ProgressRadial class="w-8" />
		{:then courses}
			{#if courses.length === 0}
				<p>Nenhum curso disponível.</p>
			{:else}
				{#each courses as course}
					<div class="text-toke card flex flex-col justify-between overflow-hidden shadow-xl">
						<a class="space-y-4 p-4" href="/courses/{course.id}">
							<h3 class="h3 line-clamp-1 overflow-ellipsis">{course.name}</h3>
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
								<p class="opacity-75">
									<strong>Número de vagas:</strong>
									{course.slotsCount}
								</p>
							</article>
						</a>
						<footer class="items-center">
							<hr class="opacity-50" />
							<div class="flex flex-row justify-between space-x-4 p-4">
								<span class="flex flex-row items-center gap-2 font-semibold">
									<span><PhUserBold class="w-full" /></span>
									<span>{course.professorName}</span>
								</span>
								<span class="items-center gap-2 font-semibold">
									{#if course.enrollmentStatus == EnrollmentStatus.ENROLLED}
										<span class="text-green-500">Inscrito</span>
									{:else if course.slotsCount === 0}
											<span class="text-red-500">Sem vagas</span>
									{:else}
											<form use:enhance method="POST">
												<input type="hidden" name="courseId" value={course.id} />
												{#if deleteConfirmation == course.id}
													<button type="submit" class="variant-filled btn">
														<span>Confirma?</span>
													</button>
												{:else}
													<button
														type="button"
														class="variant-filled btn"
														onclick={() => (deleteConfirmation = course.id)}
													>
														<span>Inscrever-se</span>
													</button>
												{/if}
											</form>
									{/if}
									
								</span>
							</div>
						</footer>
					</div>
				{/each}
			{/if}
		{:catch}
			<p>Erro ao carregar cursos.</p>
		{/await}
	</div>
</main>
