import type { Context } from '$lib/server/trpc/context';
import { initTRPC } from '@trpc/server';
import { hasForm, isAuthenticated } from './middlewares';

export type MiddlewareFn = Parameters<typeof t.middleware>[0];
export const t = initTRPC.context<Context>().create();

const hasFormMd = t.middleware(hasForm);
const isAuthenticatedMd = t.middleware(isAuthenticated);

export const publicProcedure = t.procedure;
export const publicFormProcedure = publicProcedure.use(hasFormMd);
export const authProcedure = publicProcedure.use(isAuthenticatedMd);
export const authFormProcedure = authProcedure.use(hasFormMd);

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
