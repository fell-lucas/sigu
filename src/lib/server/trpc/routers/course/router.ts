import { router } from '../../t';
import { createCourse } from './createCourse';
import { getAllCourses } from './getAllCourses';
import { getCourse } from './getCourse';

export const courseRouter = router({
	create: createCourse,
	getAll: getAllCourses,
	get: getCourse
});
