import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DRIZZLE = Symbol('drizzle-connection');

export const drizzleProvider = [
  {
    provide: DRIZZLE,
    inject: ['DATABASE_POOL'],
    useFactory: (pool: Pool) => drizzle(pool, { schema }),
  },
  {
    provide: 'DATABASE_POOL',
    useFactory: () => {
      return new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    },
  },
];
