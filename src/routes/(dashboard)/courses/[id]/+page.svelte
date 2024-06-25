<script lang="ts">
	import FormErrors from '$lib/components/form/FormErrors.svelte';
  import Section from '$lib/components/cards/Section.svelte';
	import { AppBar, ProgressBar } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';
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
	<header class="card-header h3 text-center ">{data.course.name}</header>
  <hr class="!border-t-2 mt-3" />
	<section class="p-4 flex flex-row items-center variant-soft"> <PhUserBold class="" /> {data.course.professorName}</section>
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
    WIP
  </Section>

</div>

</main>