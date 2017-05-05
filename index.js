const config          = require("./config/config");
const logger          = require("./utils/logger");

/*
const NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 2048});
let pubKey = key.exportKey("public");
console.log("pubKey");
console.log(pubKey);
var aKey = new NodeRSA(pubKey);
let aa = aKey.encrypt("sdfsdfasadf", 'base64');
console.log("aa");
console.log(aa);

console.log("key.decrypt(aa, 'base64')");
console.log(key.decrypt(aa).toString());
*/

const init = require("./modules/init/index");

async function initObserver(){
  try{
    let clusterData = await init();
    config.clusterData = clusterData;
    require("./modules/socket/index");

  }catch(err){
    logger.error(err);
    process.exit();
  }
}
initObserver();