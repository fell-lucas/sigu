import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
	return {
		session: event.locals.session
	};
});
