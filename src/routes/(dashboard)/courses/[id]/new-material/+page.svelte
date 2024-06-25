<script lang="ts">
	import FormErrors from '$lib/components/form/FormErrors.svelte';
	import { AppBar, ProgressBar } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';
	import PhCaretLeft from '~icons/ph/caret-left';

	export let data;

	const { form, errors, enhance, delayed, submitting } = superForm(data.form, {
		invalidateAll: 'force'
	});
</script>

<nav class="sticky top-0">
	<AppBar>
		<svelte:fragment slot="headline">
			<div class="flex w-full justify-start gap-2">
				<a type="button" class="items-center p-2 text-center" href="/courses/{data.course?.id}">
					<span><PhCaretLeft /></span>
				</a>
				<h3 class="h3">Novo Material de Curso</h3>
			</div>
		</svelte:fragment>
	</AppBar>
</nav>

<main class="mx-auto mt-8 flex max-w-sm flex-col">
	<h3 class="h3 text-center">Preencha as informações abaixo sobre o material a ser cadastrado</h3>
	<form use:enhance class="mt-8 flex flex-col gap-4" method="POST">
		<label class="label" for="name">
			<span>Nome do material</span>
			<input
				class="input"
				type="text"
				id="name"
				name="name"
				bind:value={$form.name}
				placeholder="Digite o nome."
			/>
			<FormErrors errors={$errors.name} />
		</label>

		<label class="label" for="content">
			<span>Conteúdo</span>
			<textarea
				class="input h-20 resize-none"
				id="content"
				name="content"
				bind:value={$form.content}
				placeholder="Digite o conteúdo em texto, ou apenas um link."
			></textarea>
			<FormErrors errors={$errors.content} />
		</label>

		{#if $delayed}
			<ProgressBar />
		{/if}

		<button disabled={$submitting} class="variant-filled-primary btn">Enviar</button>
	</form>
</main>
