import http from 'http';

import { app } from './app';

const server = http.createServer(app);

server
  .listen(3000)
  .on('listening', () => {
    console.log('Server is running on port 3000');
  })
  .on('error', (error: NodeJS.ErrnoException) => {
    console.log(`Error: ${error.message}`);
  });
