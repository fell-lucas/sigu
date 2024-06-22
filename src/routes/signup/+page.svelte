<script lang="ts">
	import { FormErrors } from '$lib/components/form';
	import { ProgressBar, focusTrap } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, delayed, submitting, enhance } = superForm(data.form);
</script>

<h2 class="h2">Cadastre-se no SIGU</h2>
<p>Cadastre-se para usar a plataforma e gerenciar suas atividades acadêmicas.</p>

<form use:enhance use:focusTrap={true} class="mt-8 flex flex-col gap-4" method="POST">
	<label class="label" for="name">
		<span>Nome</span>
		<input class="input" type="text" id="name" name="name" bind:value={$form.name} />
		<FormErrors errors={$errors.name} />
	</label>

	<label class="label" for="email">
		<span>E-mail</span>
		<input class="input" type="email" id="email" name="email" bind:value={$form.email} />
		<FormErrors errors={$errors.email} />
	</label>

	<label for="password">
		<span>Senha</span>
		<input
			class="input"
			type="password"
			id="password"
			name="password"
			bind:value={$form.password}
		/>
		<FormErrors errors={$errors.password} />
	</label>

	<label for="password">
		<span>Confirme a senha</span>
		<input
			class="input"
			type="password"
			id="cpassword"
			name="cpassword"
			bind:value={$form.cpassword}
		/>
		<FormErrors errors={$errors.cpassword} />
	</label>

	<button disabled={$submitting} class="variant-filled-primary btn">Enviar</button>
	{#if $delayed}
		<ProgressBar />
	{/if}
	<a class="anchor" href="/signin">Já possui conta? Acesse a plataforma</a>
</form>
