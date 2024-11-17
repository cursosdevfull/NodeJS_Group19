import { Application } from 'express';
import http from 'http';

import { envs } from '../config/environment-vars';

export class ServerBootstrap {
  constructor(private app: Application) {}

  initialize() {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      const port = envs.port;

      server
        .listen(port)
        .on('listening', () => {
          resolve(true);
          console.log(`Server is running on port ${port}`);
        })
        .on('error', (error: NodeJS.ErrnoException) => {
          reject(error);
        });
    });
  }
}
