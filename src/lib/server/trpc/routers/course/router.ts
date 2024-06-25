import { router } from '../../t';
import { createCourse } from './createCourse';
import { getAllCourses } from './getAllCourses';

export const courseRouter = router({
	create: createCourse,
	getAll: getAllCourses
});
