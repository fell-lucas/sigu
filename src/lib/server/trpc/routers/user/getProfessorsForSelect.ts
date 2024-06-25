import { db } from '$lib/server/auth';
import { setFlash } from 'sveltekit-flash-message/server';
import { publicProcedure } from '../../t';

export const getProfessorsForSelect = publicProcedure.query(async ({ ctx }) => {
	try {
		const professors = await db.query.userTable.findMany({
			columns: { id: true, name: true },
			where: (users, { eq }) => eq(users.role, 'PROFESSOR')
		});

		return professors;
	} catch (_) {
		setFlash(
			{ type: 'error', message: 'Algo deu errado ao acessar o banco de dados.' },
			ctx.event.cookies
		);
		return [];
	}
});
