import { createContext } from '$lib/server/trpc/context';
import { createCaller } from '$lib/server/trpc/router';
import { redirect } from '@sveltejs/kit';

export const actions = {
	signout: async (event) => {
		const caller = createCaller(await createContext(event));
		await caller.user.signout();

		return redirect(303, '/signin');
	}
};
