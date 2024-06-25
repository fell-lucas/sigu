import { base } from '$lib';
import { z } from 'zod';

export const schema = z.object({
	name: base.strings.short,
	content: base.strings.large
});
