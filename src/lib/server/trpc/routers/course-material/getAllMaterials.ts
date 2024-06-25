import { db } from '$lib/server/auth';
import { courseMaterialTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { setFlash } from 'sveltekit-flash-message/server';
import { publicProcedure } from '../../t';

export const getAllMaterials = publicProcedure.query(async ({ ctx }) => {
	try {
		const materials = await db
			.select({
				id: courseMaterialTable.id,
				name: courseMaterialTable.name,
				content: courseMaterialTable.content,
				isLink: courseMaterialTable.isLink,
				updatedAt: courseMaterialTable.updatedAt
			})
			.from(courseMaterialTable)
			.where(eq(courseMaterialTable.courseId, ctx.event.params.id!))
			.execute();

		return materials;
	} catch (error) {
		console.error(error);
		setFlash(
			{ type: 'error', message: 'Algo deu errado ao acessar o banco de dados.' },
			ctx.event.cookies
		);

		return [];
	}
});
