import { db } from '$lib/server/auth';
import { courseTable, userEnrollmentsTable, userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { setFlash } from 'sveltekit-flash-message/server';
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
				endDate: courseTable.endDate
			})
			.from(courseTable)
			.leftJoin(userTable, eq(courseTable.professorId, userTable.id))
			.all();

		const enrollments = await db
			.select({
				courseId: userEnrollmentsTable.courseId,
				status: userEnrollmentsTable.status
			})
			.from(userEnrollmentsTable)
			.where(eq(userEnrollmentsTable.userId, userId));

		return courses.map((course) => {
			const enrollment = enrollments.find((enrollment) => enrollment.courseId === course.id);
			return {
				...course,
				enrollmentStatus: enrollment?.status
			};
		});
	} catch (error) {
		console.error(error);
		setFlash(
			{ type: 'error', message: 'Algo deu errado ao acessar o banco de dados.' },
			ctx.event.cookies
		);

		return [];
	}
});
