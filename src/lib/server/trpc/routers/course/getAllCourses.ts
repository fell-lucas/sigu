import { db } from '$lib/server/auth';
import { courseTable, userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { setFlash } from 'sveltekit-flash-message/server';
import { publicProcedure } from '../../t';

export const getAllCourses = publicProcedure.query(async ({ ctx }) => {
	try {
		const courses = await db
			.select({
				id: courseTable.id,
				name: courseTable.name,
				description: courseTable.description,
				professorName: userTable.name,
				slotsCount: courseTable.slotsCount,
				startDate: courseTable.startDate,
				endDate: courseTable.endDate
			})
			.from(courseTable)
			.innerJoin(userTable, eq(courseTable.professorId, userTable.id))
			.execute();

		return courses;
	} catch (error) {
		console.error(error);
		setFlash(
			{ type: 'error', message: 'Algo deu errado ao acessar o banco de dados.' },
			ctx.event.cookies
		);

		return [];
	}
});
