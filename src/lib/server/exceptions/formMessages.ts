import { setFlash } from 'sveltekit-flash-message/server';
import { fail } from 'sveltekit-superforms';
import type { Context } from '../trpc/context';

export const messageDatabaseQueryError = (ctx: Context) => {
	setFlash(
		{ type: 'error', message: 'Algo deu errado ao acessar o banco de dados.' },
		ctx.event.cookies
	);

	return fail(500, { form: ctx.form });
};

export const messageDatabaseMutationError = (ctx: Context) => {
	setFlash(
		{ type: 'error', message: 'Algo deu errado ao modificar o banco de dados.' },
		ctx.event.cookies
	);

	return fail(500, { form: ctx.form });
};
