import http from 'http';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = http.createServer(async (req, res) => {
  // check if the requested URL is the root URL '/'
  if (req.url === '/') {
    // read the contents of the index.html file
    try {
      const data = await fs.readFile(join(__dirname, 'index.html'), 'utf-8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error');
      console.error(err);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
