const request     = require("request-promise-native");
const logger      = require(process.cwd() + "/utils/logger");

module.exports = (params)=>{
  return new Promise(async (resolve, reject)=>{
    let options = {
      method: "POST",
      uri: `${params.protocol}://${params.host}:${params.port}/api/observer/v1/init`,
      body: {
        api_key: params.apiKey
      },
      json: true
    };
    try{
      let result = await request(options);
      logger.silly(result);
      if(result.success){
        return resolve(result.clusterData);
      }
      return reject(new Error(result.error));
    }catch (err){
      logger.error(err);
      reject(err);
    }
  });
};