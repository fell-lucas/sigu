import { setFlash } from 'sveltekit-flash-message/server';
import type { MiddlewareFn } from '../t';
import { redirect } from '@sveltejs/kit';

export const isAuthenticated: MiddlewareFn = async ({ ctx, next }) => {
	if (!ctx.event.locals.session) {
		setFlash({ message: 'Entre para continuar.', type: 'error' }, ctx.event.cookies);
		throw redirect(303, '/signin');
	}

	return next({ ctx });
};
