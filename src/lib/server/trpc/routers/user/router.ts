import { router } from '../../t';
import { createUser } from './createUser';
import { signinUser } from './signinUser';

export const userRouter = router({
	create: createUser,
	signin: signinUser
});
