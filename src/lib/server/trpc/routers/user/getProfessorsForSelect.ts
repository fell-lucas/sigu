import { db } from '$lib/server/auth';
import { publicProcedure } from '../../t';
import { messageDatabaseQueryError } from '$lib/server/exceptions';

export const getProfessorsForSelect = publicProcedure.query(async ({ ctx }) => {
	try {
		const professors = await db.query.userTable.findMany({
			columns: { id: true, name: true },
			where: (users, { eq }) => eq(users.role, 'PROFESSOR')
		});

		return professors ?? [];
	} catch (_) {
		return messageDatabaseQueryError(ctx);
	}
});
