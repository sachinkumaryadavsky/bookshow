import app from './app.js';
import dotenv from 'dotenv';
import { db } from './persistance/db.js'; // your TypeORM DataSource

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

async function startServer() {
  //  Initialize DB
  try {
    await db.initialize();
    console.log(' Database connected successfully');
  } catch (err) {
    console.error(' Database connection failed:', err);
    process.exit(1);
  }

  // Start server
  try {
    await app.listen({ port: PORT });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();
