const request     = require("request-promise-native");
const fs          = require("fs");
const args        = require("optimist").argv;

const logger      = require(process.cwd() + "/utils/logger");
const fetchConfig = require("./fetchConfig");


/**
 *
 * @returns {Promise} resolves to a config
 */

function getParamsFromArgs(){
  let params = {
    protocol: "http"
  };
  if(args.api_key){
    logger.silly("--api_key found");
    params.apiKey = args.api_key;
  }
  if(args.server_host){
    logger.silly("--server_host found");
    params.host = args.server_host;
  }
  if(args.server_port){
    logger.silly("--server_host found");
    params.port = args.server_port;
  }
  if(args.server_protocol){
    logger.silly("--server_protocol found");
    params.protocol = args.server_protocol;
  }
  return params;
}

function fetchConfigFromServer(params){
  return new Promise(async (resolve, reject)=>{
    if (!params.apiKey) {
      logger.error("No api_key, could not init");
      process.exit();
    }
    if (!params.host) {
      logger.error("No server host, could not init");
      process.exit();
    }
    if (!params.port) {
      logger.silly("No server port, could not init");
      process.exit();
    }
    try {
      config = await fetchConfig(params);
      console.log(config);
      if (args.persist_config) {
        logger.info("persist_config set, writing the file");
        fs.writeFileSync(process.cwd() + "/config.json",
          JSON.stringify(config));
      }
      resolve(config);
    } catch (err) {
      logger.error(err);
      return reject(err);
    }
  });
}

module.exports = function(){
  return new Promise(async(resolve, reject)=>{
    let config = false;
    let persistingConfig = {};
    if (fs.existsSync(process.cwd() + "/config.json")) {
      logger.silly("config found, fetching");
      try{
        persistingConfig = JSON.parse(fs.readFileSync(process.cwd() + "/config.json"));
        logger.silly("persisting config parsed succesfully");
      }catch (err){
        logger.error("failed to parse persisting config");
        process.exit();
      }
    }

    if(!persistingConfig && !args.init){
      logger.error("persisting config not found and --init not set, can't continue");
      process.exit();
    }

    if(args.init){
      if(!persistingConfig.server ||
        (persistingConfig.server && args.force_init)) {
        let params = Object.assign({},
          persistingConfig.server,
          getParamsFromArgs());
        try{
          config = await fetchConfigFromServer(params);
        }catch(err){
          logger.error(err);
          reject(err);
        }
      }else{
        logger.info("init requested, but persisting config.json was found while --force_init was not set, can't fetch new config from server");
      }
    }
    if(!args.init && persistingConfig.server){
      config = persistingConfig;
    }
    if(!config.server){
      return reject(new Error("config not found"));
    }
    return resolve(config);
  });
};