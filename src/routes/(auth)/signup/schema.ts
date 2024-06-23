import { base } from '$lib';
import { UserRole } from '$lib/db-enums';
import { z } from 'zod';

export const schema = z
	.object({
		name: base.strings.short,
		email: base.strings.email,
		role: z.enum([UserRole.ADMIN, UserRole.PROFESSOR, UserRole.STUDENT], {
			message: 'Função inválida'
		}),
		password: base.strings.password,
		cpassword: base.strings.short
	})
	.superRefine(({ cpassword, password }, ctx) => {
		if (cpassword !== password) {
			ctx.addIssue({
				code: 'custom',
				path: ['cpassword'],
				message: 'As senhas devem ser iguais'
			});
		}
	});
