import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import * as schema from './db/schema';
import { env } from '$env/dynamic/private';

const client = createClient({
	url: env.TURSO_CONNECTION_URL,
	authToken: env.TURSO_AUTH_TOKEN
});

export const db = drizzle(client, { schema });

const luciaAdapter = new DrizzleSQLiteAdapter(db, schema.sessionTable, schema.userTable);

export const lucia = new Lucia(luciaAdapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
	}
}
