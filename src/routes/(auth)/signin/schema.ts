import { base } from '$lib';
import { z } from 'zod';

export const schema = z.object({
	email: base.strings.email,
	password: base.strings.short
});
