import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { schema } from './schema';
import { createCaller } from '$lib/server/trpc/router';
import { createContext } from '$lib/server/trpc/context';

export const load = async (event) => {
	const form = await superValidate(zod(schema));

	const caller = createCaller(await createContext(event));
	const professors = await caller.user.getProfessorsForSelect();

	return { form, professors };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const caller = createCaller(await createContext(event, form));
			await caller.course.create(form.data);

			return { success: true, form };
		} catch (error) {
			console.error(error);
			return fail(500, { form, message: 'An error occurred while creating the course' });
		}
	}
};