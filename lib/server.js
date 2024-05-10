const { createServer } = require('http');
const { readFileSync, readdirSync, statSync } = require('fs');
const { basename, extname, resolve } = require('path');
const { liveReload, script } = require('./ws/server-ws.js');

const isProduction = 'production' === process.env.NODE_ENV;
const httpPort = 3000;

const root = resolve('src');
const indexPath = resolve(root, 'index.html');

const server = createServer();

function startServer() {
  server.on('request', listenerForRequest);
  server.listen(httpPort, () => {
    liveReload();
    console.log(`Server running on port ${httpPort} | Access http://localhost:${httpPort}`);
  });
}

function listenerForRequest(req, res) {
  const baseName = basename(req.url);
  const filePath = findFilePath(root, baseName);

  if (!baseName && !tryStat(filePath)?.isFile()) {
    const indexFile = readFileSync(indexPath, 'utf8') + script;
    res.end(indexFile);
    return;
  }

  const file = readFileSync(filePath, 'utf8');

  const type = setType(extname(basename(filePath)));

  res.setHeader('Content-Type', type);

  res.end(file);
}

function setType(extension) {
  const types = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.ico': 'image/x-icon',
  };

  return types[extension];
}

function findFilePath(root, fileName) {
  const files = readdirSync(root);
  let result = null;

  for (const file of files) {
    if (result && basename(result) === fileName) {
      break;
    }

    const filePath = resolve(root, file);

    if (tryStat(filePath)?.isDirectory()) {
      result = findFilePath(filePath, fileName);
    }

    if (file === fileName && tryStat(filePath)?.isFile()) {
      return filePath;
    }
  }

  return result;
}

function tryStat(path) {
  try {
    return statSync(path);
  } catch (e) {
    return undefined;
  }
}

startServer();
