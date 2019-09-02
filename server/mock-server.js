
const app = require('./app');
const http = require('http');
const address = require('address');

/**
 * 小的mock服务器也可以开发node后端接口
 * @param port
 * @return {*}
 */
function mockServer(port=3002) {
  const mockPort =parseInt(process.env.mockPort || port, 10);
  app.set('port', mockPort);
  const server = http.createServer(app);
    // '192.168.0.2'

  server.listen(port,() => {
    console.log(`Api Server started on port http://${address.ip()}:${port}/mock`);
    console.log(`mock Server started on port http://${address.ip()}:${port}/mock`);
  });
  return server;
}

mockServer();

// function MockWebpackPlugin(port) {
//   this.port = port;
// }
//
// MockWebpackPlugin.prototype.apply = function (compiler) {
//   mockServer(this.port);
//   compiler.plugin("emit", (compilation, callback) => {
//     callback();
//   });
// };
// module.exports = MockWebpackPlugin;
