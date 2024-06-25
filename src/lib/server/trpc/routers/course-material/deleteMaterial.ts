import { db } from '$lib/server/auth';
import { courseMaterialTable } from '$lib/server/db/schema';
import { messageDatabaseMutationError } from '$lib/server/exceptions';
import { eq } from 'drizzle-orm';
import { setFlash } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { authProcedure } from '../../t';

export const deleteMaterial = authProcedure
	.input(z.object({ materialId: z.string() }))
	.mutation(async ({ input, ctx }) => {
		try {
			await db
				.delete(courseMaterialTable)
				.where(eq(courseMaterialTable.id, input.materialId))
				.execute();

			setFlash(
				{
					type: 'success',
					message: 'Material removido com sucesso.'
				},
				ctx.event.cookies
			);

			return { form: ctx.form };
		} catch (error) {
			console.error(error);
			return messageDatabaseMutationError(ctx);
		}
	});
