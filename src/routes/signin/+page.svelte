<script lang="ts">
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form } = superForm(data.form);
</script>

<h2 class="h2">Entre no SIGU</h2>
<p>Faça seu login para usar a plataforma e gerenciar suas atividades acadêmicas.</p>

<form use:focusTrap={true} class="mt-8 flex flex-col gap-4" method="POST">
	<label class="label" for="email">
		<span>E-mail</span>
		<input class="input" type="email" id="email" name="email" bind:value={$form.email} />
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
	</label>

	<button class="variant-filled-primary btn">Enviar</button>
	<a class="anchor" href="/signup">Não possui conta? Crie sua conta</a>
</form>
