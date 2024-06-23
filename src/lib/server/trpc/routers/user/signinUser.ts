import { db, lucia } from '$lib/server/auth';
import { messageDatabaseQueryError } from '$lib/server/exceptions';
import { comparePassword } from '$lib/server/utils';
import { setFlash } from 'sveltekit-flash-message/server';
import { fail, setError } from 'sveltekit-superforms';
import { schema } from '../../../../../routes/(auth)/signin/schema';
import { publicFormProcedure } from '../../t';

export const signinUser = publicFormProcedure.input(schema).mutation(async ({ input, ctx }) => {
	if (ctx.event.locals.session) {
		setFlash({ type: 'error', message: 'Você já está logado.' }, ctx.event.cookies);
		return fail(400);
	}

	let existingUser;
	try {
		existingUser = await db.query.userTable.findFirst({
			columns: { email: true, password: true, id: true, name: true, role: true },
			where: (users, { eq }) => eq(users.email, input.email)
		});
	} catch (_) {
		return messageDatabaseQueryError(ctx);
	}

	if (!existingUser) {
		setError(ctx.form!, 'email', 'E-mail não encontrado');
		return fail(404, { form: ctx.form });
	}

	if (!(await comparePassword(input.password, existingUser.password))) {
		setError(ctx.form!, 'password', 'Senha incorreta');
		return fail(400, { form: ctx.form });
	}

	await lucia.deleteExpiredSessions();

	let newSession;
	try {
		newSession = await lucia.createSession(existingUser.id, {
			email: existingUser.email,
			name: existingUser.name,
			role: existingUser.role
		});

		const cookie = lucia.createSessionCookie(newSession.id);
		ctx.event.cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });

		return { form: ctx.form };
	} catch (_) {
		setFlash(
			{ type: 'error', message: 'Erro ao criar sessão, tente novamente mais tarde' },
			ctx.event.cookies
		);

		return fail(500, { form: ctx.form });
	}
});
