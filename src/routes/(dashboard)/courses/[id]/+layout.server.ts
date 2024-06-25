import { createContext } from '$lib/server/trpc/context';
import { createCaller } from '$lib/server/trpc/router';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const caller = createCaller(await createContext(event));
	const course = await caller.course.get();
	if (!course) {
		return error(404, 'Curso não encontrado.');
	}

	const courseMaterials = await caller.courseMaterial.getAll();

	return { course, courseMaterials };
};
