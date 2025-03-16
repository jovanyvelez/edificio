
import  {db}  from '$lib/server/db/index';
import { ppto } from "$lib/server/db/schema";
import { eq, count, isNull, sql, isNotNull } from 'drizzle-orm';

