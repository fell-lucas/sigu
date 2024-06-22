import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';
import type { SuperValidated } from 'sveltekit-superforms';

export async function createContext(
	event: RequestEvent,
	form?: SuperValidated<Record<string, unknown>>
) {
	return {
		event,
		form
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
