const winston     = require("winston");

const config      = require("../config/config");

/**
 * don't know, but maybe we should consider adding rethinkdb transport?
 */

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true
    })
  ],
  level     : config.winston.logLevel,
  levels    : config.winston.levels,
  colors    : config.winston.colors
});