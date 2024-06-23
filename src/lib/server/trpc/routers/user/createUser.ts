import { hashPassword } from '$lib/server/utils';
import { ulid } from 'ulidx';
import { schema } from '../../../../../routes/(auth)/signup/schema';
import { db } from '$lib/server/auth';
import { messageDatabaseMutationError, messageDatabaseQueryError } from '$lib/server/exceptions';
import { userTable } from '$lib/server/db/schema';
import { publicFormProcedure } from '../../t';
import { setError, fail } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';

export const createUser = publicFormProcedure.input(schema).mutation(async ({ input, ctx }) => {
	const userId = ulid();

	try {
		const duplicateEmail = await db.query.userTable.findFirst({
			columns: { email: true },
			where: (users, { eq }) => eq(users.email, input.email)
		});

		if (duplicateEmail) {
			setError(ctx.form!, 'email', 'Este e-mail já está cadastrado');
			return fail(400, { form: ctx.form });
		}
	} catch (_) {
		return messageDatabaseQueryError(ctx);
	}

	try {
		await db.insert(userTable).values({
			email: input.email,
			id: userId,
			name: input.name,
			password: await hashPassword(input.password),
			role: input.role
		});

		setFlash(
			{ type: 'success', message: 'Usuário cadastrado com sucesso!', redirect: '/signin' },
			ctx.event.cookies
		);

		return { form: ctx.form };
	} catch (_) {
		return messageDatabaseMutationError(ctx);
	}
});
