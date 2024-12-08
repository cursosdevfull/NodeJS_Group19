import './config/environment-vars';
import 'reflect-metadata';

import { app } from './app';
import { DatabaseBootstrap } from './bootstrap/database.bootstrap';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

const serverBootstrap = new ServerBootstrap(app);
const databaseBootstrap = new DatabaseBootstrap();

async function start() {
  try {
    await Promise.allSettled([
      serverBootstrap.initialize(),
      databaseBootstrap.initialize(),
    ]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error: ${(error as Error).message}`);
    } else {
      console.log('An error occurred', error);
    }
  }
}

start();
