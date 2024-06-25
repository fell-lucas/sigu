<script lang="ts">
	import FormErrors from '$lib/components/form/FormErrors.svelte';
	import { AppBar, ProgressBar } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';
	import PhCaretLeft from '~icons/ph/caret-left';

	export let data;

	const { form, errors, enhance, delayed, submitting } = superForm(data.form);
	const noProfessors = data.professors.length === 0;
</script>

<nav class="sticky top-0">
	<AppBar>
		<svelte:fragment slot="headline">
			<div class="flex w-full justify-start gap-2">
				<a type="button" class="items-center p-2 text-center" href="/courses">
					<span><PhCaretLeft /></span>
				</a>
				<h3 class="h3">Novo Curso</h3>
			</div>
		</svelte:fragment>
	</AppBar>
</nav>

<main class="mx-auto mt-8 flex max-w-sm flex-col">
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

		<label class="label" for="description">
			<span>Descrição do curso</span>
			<textarea
				class="input h-20 resize-none"
				id="description"
				name="description"
				bind:value={$form.description}
				placeholder="Digite a descrição..."
			></textarea>
			<FormErrors errors={$errors.description} />
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

		<label class="label" for="professorId">
			<span>Professor responsável</span>
			{#if noProfessors}
				<p class="text-red-500">Nenhum professor disponível. Não é possível criar um curso.</p>
			{:else}
				<select class="input" id="professorId" name="professorId" bind:value={$form.professorId}>
					{#each data.professors as professor}
						<option value={professor.id}>{professor.name}</option>
					{/each}
				</select>
				<FormErrors errors={$errors.professorId} />
			{/if}
		</label>

		{#if $delayed}
			<ProgressBar />
		{/if}

		<button disabled={$submitting || noProfessors} class="variant-filled-primary btn">Enviar</button
		>
	</form>
</main>
