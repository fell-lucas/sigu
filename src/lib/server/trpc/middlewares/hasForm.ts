import type { MiddlewareFn } from '../t';
import { setFlash, redirect } from 'sveltekit-flash-message/server';

export const hasForm: MiddlewareFn = async ({ ctx, next }) => {
	if (!ctx.form) {
		setFlash({ message: 'Requisição inválida', type: 'error' }, ctx.event.cookies);
		throw redirect(303, ctx.event.request.headers.get('referer') || '/');
	}

	return next({ ctx });
};
