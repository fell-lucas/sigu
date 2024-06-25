import { db } from '$lib/server/auth';
import { courseTable, userEnrollmentsTable, userTable } from '$lib/server/db/schema';
import { messageDatabaseQueryError } from '$lib/server/exceptions';
import { eq } from 'drizzle-orm';
import { authProcedure } from '../../t';

export const getAllCourses = authProcedure.query(async ({ ctx }) => {
	try {
		const userId = ctx.event.locals.user!.id;
		const courses = await db
			.select({
				id: courseTable.id,
				name: courseTable.name,
				description: courseTable.description,
				professorName: userTable.name,
				slotsCount: courseTable.slotsCount,
				startDate: courseTable.startDate,
				endDate: courseTable.endDate,
				enrollmentStatus: userEnrollmentsTable.status
			})
			.from(courseTable)
			.leftJoin(userTable, eq(courseTable.professorId, userTable.id))
			.leftJoin(userEnrollmentsTable, eq(courseTable.id, userEnrollmentsTable.courseId))
			.where(eq(userEnrollmentsTable.userId, userId))
			.all();

		return courses;
	} catch (error) {
		console.error(error);
		return messageDatabaseQueryError(ctx);
	}
});
