const r               = require(process.cwd() + "/utils/r");
const logger          = require(process.cwd() + "/utils/logger");

function getDatabaseList(){
  return new Promise((resolve, reject)=>{
    r.db("rethinkdb")
      .dbList()
      .run()
      .then((result)=>{
        return resolve(result);
      })
      .error((error)=>{
        logger.error(error);
        return reject(error);
      });
  });
}

function getDatabaseConfig(db){
  return new Promise((resolve, reject)=>{
    r.db("rethinkdb")
      .table("table_config")
      .filter({name: db})
      .run()
      .then((result)=>{
        if(result.length !== 1){
          logger.silly(`config for '${db}' not found`);
          return resolve(false);
        }
        return resolve(result[0]);
      })
      .error((error)=>{
        logger.error(error);
        reject(error);
      });
  });
}

module.exports = ()=>{
  return new Promise(async (resolve, reject)=>{
    let collection = {};
    try {
      // could avoid doing this and just get the database config. Too lazy to change it.
      let dbs = await getDatabaseList();
      for(let i = 0; i < dbs.length; i++){
        let dbConfig = await getDatabaseConfig(dbs[i]);
        if(dbConfig){
          collection[dbConfig.id] = dbConfig;
        }
      }
      return resolve(collection);
    }catch(err){
      logger.error(err);
      return reject(err);
    }
  });
};