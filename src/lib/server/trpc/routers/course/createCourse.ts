import { ulid } from 'ulidx';
import { schema } from '../../../../../routes/(dashboard)/courses/new/schema';
import { db } from '$lib/server/auth';
import { courseTable } from '$lib/server/db/schema';
import { publicFormProcedure } from '../../t';
import { setFlash } from 'sveltekit-flash-message/server';
import { messageDatabaseMutationError } from '$lib/server/exceptions';

export const createCourse = publicFormProcedure.input(schema).mutation(async ({ input, ctx }) => {
	const courseId = ulid();

	try {
		await db.insert(courseTable).values({
			id: courseId,
			name: input.name,
			professorId: input.professorId,
			slotsCount: input.slotsCount,
			startDate: new Date(input.startDate).getTime(),
			endDate: new Date(input.endDate).getTime()
		});

		setFlash(
			{ type: 'success', message: 'Curso criado com sucesso!', redirect: '/courses' },
			ctx.event.cookies
		);

		return { form: ctx.form };
	} catch (error) {
		console.error(error);
		return messageDatabaseMutationError(ctx);
	}
});
