import { db } from '$lib/server/auth';
import { courseTable, userTable } from '$lib/server/db/schema';
import { publicProcedure } from '../../t';
import { messageDatabaseQueryError } from '$lib/server/exceptions';
import { eq } from 'drizzle-orm';

export const getCourse = publicProcedure.query(async ({ ctx }) => {
	try {
		const course = await db
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
			.where(eq(courseTable.id, ctx.event.params.id ?? ''))
			.innerJoin(userTable, eq(courseTable.professorId, userTable.id))
			.execute();

		return course[0];
	} catch (error) {
		console.error(error);
		return messageDatabaseQueryError(ctx);
	}
});
