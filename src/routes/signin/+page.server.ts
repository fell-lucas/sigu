import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions } from './$types';

const schema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions: Actions = {
	default: (event) => {}
};
