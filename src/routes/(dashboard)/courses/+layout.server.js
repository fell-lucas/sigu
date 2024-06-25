import { createContext } from '$lib/server/trpc/context';
import { createCaller } from '$lib/server/trpc/router';

export const load = async (event) => {
	const caller = createCaller(await createContext(event));

	return { courses: caller.course.getAll() }; 
};
