const logger          = require(process.cwd() + "/utils/logger");
const config          = require(process.cwd() + "/config/config");

const socket          = require(process.cwd() + "/modules/socket/socket.js");

module.exports = ()=>{
  return new Promise(async(resolve, reject)=>{
    try{

    }catch(err){
      logger.error(err);
    }
  })
};
