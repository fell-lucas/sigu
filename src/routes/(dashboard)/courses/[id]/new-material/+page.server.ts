import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { schema } from './schema';
import { createCaller } from '$lib/server/trpc/router';
import { createContext } from '$lib/server/trpc/context';
import { redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

export const load = async (event) => {
	const parent = await event.parent();

	if (event.locals?.session?.userId !== parent.course?.professorId) {
		setFlash(
			{ message: 'Você não tem permissão para acessar esta página.', type: 'error' },
			event.cookies
		);
		return redirect(303, '/courses');
	}

	const form = await superValidate(zod(schema));

	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const caller = createCaller(await createContext(event, form));

		return await caller.courseMaterial.create(form.data);
	}
};
