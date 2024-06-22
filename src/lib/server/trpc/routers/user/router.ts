import { router } from '../../t';
import { createUser } from './createUser';
import { signinUser } from './signinUser';
import { signoutUser } from './signoutUser';

export const userRouter = router({
	create: createUser,
	signin: signinUser,
	signout: signoutUser
});
