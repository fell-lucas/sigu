import { setFlash } from 'sveltekit-flash-message/server';
import type { MiddlewareFn } from '../t';
import { redirect } from '@sveltejs/kit';

export const isAdmin: MiddlewareFn = async ({ ctx, next }) => {
	if (ctx.event.locals.session!.role !== 'admin') {
		setFlash({ message: 'Você não possui permissão para isso', type: 'error' }, ctx.event.cookies);
		throw redirect(303, '/');
	}

	return next({ ctx });
};
