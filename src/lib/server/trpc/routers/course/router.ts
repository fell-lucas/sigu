import { router } from '../../t';
import { createCourse } from './createCourse';

export const courseRouter = router({
	create: createCourse
});
