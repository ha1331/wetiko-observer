const rethindbdash  = require("rethinkdbdash");
const config        = require(process.cwd() + "/config/config");
const r             = rethindbdash(config.rethinkdb);

module.exports      = r;
