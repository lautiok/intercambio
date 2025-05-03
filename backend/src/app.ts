import { config } from './config/config';
import app from './server/server';
import './config/mongodb';
import { createServer } from 'http';
import { initSocket } from './config/socket'; 

const PORT = config.port;

const server = createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});