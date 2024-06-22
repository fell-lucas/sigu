import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { schema } from './schema';
import { createCaller } from '$lib/server/trpc/router';
import { createContext } from '$lib/server/trpc/context';

export const load = async () => {
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

		try {
			return await caller.user.create(form.data);
		} catch (error) {
			console.log(error);

			throw error;
		}
	}
};
