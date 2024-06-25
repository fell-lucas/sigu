<script lang="ts">
	import { AppBar, ProgressRadial } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';
	import PhPlus from '~icons/ph/plus';
	import PhUserBold from '~icons/ph/user-bold';
	import { EnrollmentStatus } from '../../../lib/db-enums';
	import { page } from '$app/stores';

	export let data;
	let deleteConfirmation: string | null = null;

	const { enhance } = superForm(data.form, {
		onSubmit: () => {
			deleteConfirmation = null;
		}
	});
</script>

<nav class="sticky top-0">
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
</nav>

<main class="mx-4 mt-8 flex flex-col gap-4">
	<h5 class="h5 font-semibold">Cursos disponíveis</h5>
	<hr class="!border-t-2" />
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each data.courses as course}
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
									{#if $page.data.session?.userId !== course.professorId}
										{#if course.enrollmentStatus == EnrollmentStatus.ENROLLED}
											<span class="text-green-500 mr-4">Inscrito</span>
										{:else if course.slotsCount === 0}
											<span class="text-red-500 btn variant-ghost">Sem vagas</span>
										{:else}
											<form use:enhance method="POST">
												<input type="hidden" name="courseId" value={course.id} />
												{#if deleteConfirmation == course.id}
													<button type="submit" class="variant-filled btn-sm btn">
														<span>Confirma?</span>
													</button>
												{:else}
													<button
														type="button"
														class="variant-filled btn-sm btn"
														onclick={() => (deleteConfirmation = course.id)}
													>
														<span>Inscrever-se</span>
													</button>
												{/if}
											</form>
										{/if}
									{/if}
								</span>
							</div>
						</footer>
					</div>
				{:else}
					<p>Nenhum curso disponível.</p>
				{/each}
	</div>
</main>
