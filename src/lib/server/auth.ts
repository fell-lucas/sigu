import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { sessionTable, userTable } from './db/schema';

config({ path: '.env' });

const client = createClient({
	url: process.env.TURSO_CONNECTION_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!
});

export const db = drizzle(client);

const luciaAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

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
