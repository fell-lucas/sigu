import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../../lib/server/db/schema';

const client = createClient({
	url: '--',
	authToken: '--'
});

export const db = drizzle(client, { schema });
