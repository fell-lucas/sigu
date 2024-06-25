import { router } from '../../t';
import { createUser } from './createUser';
import { signinUser } from './signinUser';
import { signoutUser } from './signoutUser';
import { getProfessorsForSelect } from './getProfessorsForSelect';

export const userRouter = router({
	create: createUser,
	signin: signinUser,
	signout: signoutUser,
	getProfessorsForSelect: getProfessorsForSelect
});
