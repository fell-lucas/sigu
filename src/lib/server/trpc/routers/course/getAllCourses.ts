import { db } from '$lib/server/auth';
import { courseTable, userTable } from '$lib/server/db/schema';
import { publicProcedure } from '../../t';
import { messageDatabaseQueryError } from '$lib/server/exceptions';
import { eq } from 'drizzle-orm';

export const getAllCourses = publicProcedure.query(async ({ ctx }) => {
	try {
		const courses = await db
			.select({
				id: courseTable.id,
				name: courseTable.name,
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
		return messageDatabaseQueryError(ctx);
	}
});
