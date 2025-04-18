//import { DATABASE_URL, DATABASE_TOKEN } from '$env/static/private';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '$lib/server/db/data';



if (!process.env.DATABASE_URL) throw new globalThis.Error('DATABASE_URL is not set');

if (!process.env.DATABASE_TOKEN) throw new globalThis.Error('DATABASE_TOKEN is not set');

const client = createClient({ url: process.env.DATABASE_URL, authToken: process.env.DATABASE_TOKEN });

export const db = drizzle(client, {schema ,casing: 'snake_case' });