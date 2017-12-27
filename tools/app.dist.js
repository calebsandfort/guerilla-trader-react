const express = require('express'),
  path  = require('path'),
  compression = require('compression');

/*eslint-disable no-console */

const port = 8080;
const app = express.createServer();

app.use(compression());
app.use(express.static(__dirname));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started port: ${port}`);
  }
});
