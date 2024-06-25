import { createContext } from '$lib/server/trpc/context';
import { createCaller } from '$lib/server/trpc/router';

export const load = async (event) => {
	const caller = createCaller(await createContext(event));
	const courses = await caller.course.getAll();

	return { courses };
};