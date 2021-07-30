const path = require('path');
const cors = require('cors');
const express = require('express');
const http = require('http');
const router  = require('./router');

const HTTP_PORT = 8000;
const ASSETS_DIR = path.resolve(__dirname, '../assets');

const app = express();

app.use(cors());
app.use(express.static(ASSETS_DIR));
app.use(router);

const httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${HTTP_PORT}`);
});
