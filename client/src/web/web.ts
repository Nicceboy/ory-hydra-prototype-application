import express from 'express';
import http from 'http';
import path from 'path';
const fetch = require('node-fetch');

// Express app initialization
const app = express();

// Static files configuration
app.use('/assets', express.static(path.join(__dirname, 'frontend')));

// // Template configuration
app.set('view engine', 'ejs');
app.set('views', 'public');

app.get('/*', (req: any, res: any) => {
  console.log('fuck');
  res.render('index');
});
// Start function
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, 'localhost');
  });
};
