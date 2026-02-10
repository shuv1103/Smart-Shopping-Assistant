import 'dotenv/config';
import {Pool} from 'pg'

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL missing in environment");
}

export const connectDB = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: true,
  },
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20,
});

connectDB.on("error", (err: any) => {
  console.error("Unexpected Postgres error", err);
});



console.log("Database connection done")