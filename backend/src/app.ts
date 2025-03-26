import { config } from './config/config';
import app from './server/server';
import './config/mongodb';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});