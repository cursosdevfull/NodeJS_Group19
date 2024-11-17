import './config/environment-vars';

import { app } from './app';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

const serverBootstrap = new ServerBootstrap(app);

try {
  serverBootstrap.initialize();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Error: ${(error as Error).message}`);
  } else {
    console.log('An error occurred', error);
  }
}
