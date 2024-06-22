import { lucia } from '$lib/server/auth';
import { setFlash } from 'sveltekit-flash-message/server';
import { authProcedure } from '../../t';

export const signoutUser = authProcedure.mutation(async ({ ctx }) => {
	await lucia.invalidateSession(ctx.event.locals.session!.id);
	await lucia.deleteExpiredSessions();

	setFlash({ message: 'Você saiu com sucesso.', type: 'success' }, ctx.event.cookies);
});
