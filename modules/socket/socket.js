const socketClient    = require("socket.io-client");

const logger          = require(process.cwd() + "/utils/logger");
const config          = require(process.cwd() + "/config/config");
const connectionUrl = `${config.clusterData.server.protocol}://${config.clusterData.server.host}:${config.clusterData.server.port}/observer`;
console.log(connectionUrl);
;
module.exports = socketClient(connectionUrl);