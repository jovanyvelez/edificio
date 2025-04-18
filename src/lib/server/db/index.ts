import { DATABASE_URL, /*DATABASE_TOKEN*/ } from '$env/static/private';
import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '$lib/server/db/data';

if (!DATABASE_URL) throw new Error('DATABASE_URL no fue definida en entorno');

/*if (!dev && !DATABASE_TOKEN)
	throw new Error('DATABASE_AUTH_TOKEN no fue definida en entorno');*/

const client = createClient({ url: DATABASE_URL, /*authToken: DATABASE_TOKEN*/ });

export const db = drizzle(client, {schema ,casing: 'snake_case' });