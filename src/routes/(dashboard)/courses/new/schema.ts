import { base } from '$lib';
import { z } from 'zod';

export const schema = z
	.object({
		name: base.strings.short,
		description: base.strings.large,
		slotsCount: base.numbers.positive,
		startDate: base.strings.short,
		endDate: base.strings.short,
		professorId: base.strings.short
	})
	.refine((data) => new Date(data.startDate) < new Date(data.endDate), {
		message: 'A data de início deve ser anterior à data de término.',
		path: ['startDate']
	});
