const http = require('http');

const port = 8081;

const server = http.createServer((req, res) => {
  const ip = res.socket.remoteAddress;
  const port = res.socket.remotePort;
  const msg = `Your IP address is ${ip} and your source port is ${port}. Boo2!`;
  console.log(msg);
  res.end(msg);
}).listen(port);