<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import PhPlus from '~icons/ph/plus';

	export let data;
</script>

<AppBar>
	<svelte:fragment slot="headline">
		<div class="flex w-full justify-between">
			<h3 class="h3">Cursos</h3>
      {#if $page.url.pathname === '/courses'}
			<a type="button" class="variant-filled btn" href="/courses/new" >
				<span><PhPlus class="w-full" /></span>
				<span>Novo Curso</span>
			</a>
      {/if}
		</div>
	</svelte:fragment>
</AppBar>

<main class="flex	 flex-row max-w-5xl mt-8 gap-4">
  {#if data.courses.length === 0}
    <p class="text-center">Nenhum curso disponível.</p>
  {:else}
    {#each data.courses as course}
      <div class="card p-4 border rounded shadow">
        <h4 class="text-lg font-semibold">{course.name}</h4>
        <p><strong>Professor:</strong> {course.professorName}</p>
        <p><strong>Numero de vagas:</strong> {course.slotsCount}</p>
        <p><strong>Data de início:</strong> {new Date(course.startDate).toLocaleDateString()}</p>
        <p><strong>Data de fim:</strong> {new Date(course.endDate).toLocaleDateString()}</p>
      </div>
    {/each}
  {/if}
</main>

<style>
  .card {
    transition: transform 0.2s;
  }
  .card:hover {
    transform: scale(1.02);
  }
</style>