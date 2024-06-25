<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
	import FormErrors from '$lib/components/form/FormErrors.svelte';
	import { ProgressBar, focusTrap } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';
  import PhCaretLeft from '~icons/ph/caret-left';

	export let data;

	const { form, errors, enhance, delayed, submitting } = superForm(data.form);
</script>

<AppBar>
	<svelte:fragment slot="headline">
		<div class="flex w-full justify-start gap-2">
      <a type="button" class="items-center text-center p-2" href="/courses" >
				<span><PhCaretLeft /></span>
			</a>
			<h3 class="h3">Novo Curso</h3>
		</div>
	</svelte:fragment>
</AppBar>

<main class="flex mx-auto flex-col max-w-sm mt-8">
<p class="text-center">Preencha as informações abaixo sobre o curso a ser cadastrado.</p>
	<form use:enhance class="mt-8 flex flex-col gap-4" method="POST">
		<label class="label" for="name">
			<span>Nome do curso</span>
			<input
				class="input"
				type="text"
				id="name"
				name="name"
				bind:value={$form.name}
				placeholder="Digite o nome..."
			/>
			<FormErrors errors={$errors.name} />
		</label>

		<label class="label" for="slotsCount">
			<span>Numero de vagas</span>
			<input
				class="input"
				type="number"
				id="slotsCount"
				name="slotsCount"
				bind:value={$form.slotsCount}
			/>
			<FormErrors errors={$errors.slotsCount} />
		</label>

		<label class="label" for="startDate">
			<span>Data de início</span>
			<input
				class="input"
				type="date"
				id="startDate"
				name="startDate"
				bind:value={$form.startDate}
			/>
			<FormErrors errors={$errors.startDate} />
		</label>

		<label class="label" for="endDate">
			<span>Data de fim</span>
			<input class="input" type="date" id="endDate" name="endDate" bind:value={$form.endDate} />
			<FormErrors errors={$errors.endDate} />
		</label>
		
	{#if $delayed}
		<ProgressBar />
	{/if} 

		<button disabled={$submitting} class="variant-filled-primary btn">Enviar</button>
	</form>
</main>