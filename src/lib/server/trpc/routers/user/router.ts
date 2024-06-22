import { router } from '../../t';
import { createUser } from './createUser';

export const userRouter = router({
	create: createUser
});
