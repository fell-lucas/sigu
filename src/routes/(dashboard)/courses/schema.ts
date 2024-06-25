import { EnrollmentStatus } from '$lib/db-enums';
import { base } from '$lib';
import { z } from 'zod';

export const schema = z.object({
	courseId: base.strings.short,
	status: z.enum(
		[EnrollmentStatus.ENROLLED, EnrollmentStatus.DROPPED, EnrollmentStatus.COMPLETED],
		{
			message: 'Status inválido'
		}
	)
});
