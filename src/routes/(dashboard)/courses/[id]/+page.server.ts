import { createContext } from '$lib/server/trpc/context';
import { createCaller } from '$lib/server/trpc/router';
import { fail } from '@sveltejs/kit';

export const actions = {
	deleteMaterial: async (event) => {
		const materialId = (await event.request.formData()).get('materialId');

		if (!materialId) {
			return fail(404, { message: 'Material não encontrado.' });
		}

		const caller = createCaller(await createContext(event));
		return await caller.courseMaterial.delete({ materialId: materialId as string });
	}
};
