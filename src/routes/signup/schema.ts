import { base } from '$lib';
import { z } from 'zod';

export const schema = z
	.object({
		name: base.strings.short,
		email: base.strings.email,
		password: base.strings.password,
		cpassword: z.string()
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
