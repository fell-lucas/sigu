import { db } from '$lib/server/auth';
import { messageDatabaseMutationError } from '$lib/server/exceptions';
import { setFlash } from 'sveltekit-flash-message/server';
import { ulid } from 'ulidx';
import { authFormProcedure } from '../../t';
import { schema } from '../../../../../routes/(dashboard)/courses/[id]/new-material/schema';
import { courseMaterialTable } from '$lib/server/db/schema';

export const createMaterial = authFormProcedure.input(schema).mutation(async ({ input, ctx }) => {
	const materialID = ulid();

	try {
		await db.insert(courseMaterialTable).values({
			id: materialID,
			name: input.name,
			content: input.content,
			courseId: ctx.event.params.id!,
			isLink: input.content.startsWith('http') ? 1 : 0
		});

		setFlash(
			{
				type: 'success',
				message: 'Material adicionado com sucesso!',
				redirect: `/courses/${ctx.event.params.id!}`
			},
			ctx.event.cookies
		);

		return { form: ctx.form };
	} catch (error) {
		console.error(error);
		return messageDatabaseMutationError(ctx);
	}
});
