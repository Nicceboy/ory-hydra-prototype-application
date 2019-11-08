import express from 'express';
import http from 'http';
const fetch = require('node-fetch');



// Express app initialization
const app = express();

// // Template configuration
app.set('view engine', 'ejs');
app.set('views', 'public');



app.get('/main', (req: any, res: any) => {
  res.render('index');
});

// Start function
export const start = (port: number): Promise<void> => {
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, resolve);
  });
};
