import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { router, createCallerFactory } from './t';
import { userRouter } from './routers/user/router';
import { courseRouter } from './routers/course/router';
import { courseMaterialRouter } from './routers/course-material/router';

export const appRouter = router({
	user: userRouter,
	course: courseRouter,
	courseMaterial: courseMaterialRouter
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;
