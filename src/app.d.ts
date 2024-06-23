import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string; redirect?: string };
			session?: import('lucia').Session;
		} // interface PageState {}
		// interface Platform {}
	}
}

declare module 'lucia' {
	interface Register {
		DatabaseSessionAttributes: {
			name: string;
			email: string;
			role: keyof import('$lib/server/db/schema').UserRole;
		};
	}
}

export {};
