import { db } from '$lib/server/auth';
import { userEnrollmentsTable } from '$lib/server/db/schema';
import { messageDatabaseMutationError } from '$lib/server/exceptions';
import { and } from 'drizzle-orm';
import { setFlash } from 'sveltekit-flash-message/server';
import { fail } from 'sveltekit-superforms';
import { ulid } from 'ulidx';
import { schema } from '../../../../../routes/(dashboard)/courses/schema';
import { authFormProcedure } from '../../t';

export const createEnrollment = authFormProcedure.input(schema).mutation(async ({ input, ctx }) => {
	const enrollmentId = ulid();

	try {
		const duplicateEnrollment = await db.query.userEnrollmentsTable.findFirst({
			columns: { courseId: true, userId: true },
			where: (user_enrollments, { eq }) =>
				and(
					eq(user_enrollments.courseId, input.courseId),
					eq(user_enrollments.userId, ctx.event.locals.user!.id)
				)
		});

		if (duplicateEnrollment) {
			setFlash({ type: 'error', message: 'Você já está inscrito neste curso!' }, ctx.event.cookies);
			return fail(400, { form: ctx.form });
		}

		await db.insert(userEnrollmentsTable).values({
			id: enrollmentId,
			userId: ctx.event.locals.user!.id,
			courseId: input.courseId,
			enrollmentDate: new Date().getTime(),
			status: input.status
		});

		setFlash(
			{ type: 'success', message: 'Inscrição realizada com sucesso!', redirect: '/courses' },
			ctx.event.cookies
		);

		return { form: ctx.form };
	} catch (error) {
		console.error(error);
		return messageDatabaseMutationError(ctx);
	}
});
