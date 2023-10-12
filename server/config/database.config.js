import { createPool, createConnection } from "mysql2";
var config = require("./config");

var con;
var pool;

var db_config = {
  host: config.config.HOST,
  port: config.config.PORT,
  user: config.config.USER,
  password: config.config.PASSWORD,
  database: config.config.DB,
  connectionLimit: 100,
};

module.exports = {
  getPool: () => {
    if (pool) return pool;
    pool = createPool(db_config);
    return pool;
  },
  createCon: () => {
    if (con) return con;
    con = createConnection(db_config);
    con.connect((err) => {
      if (err) throw err;
      setTimeout(createCon, 2000);
    });
    con.on("error", (err) => {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        createCon();
      } else {
        throw err;
      }
      return con;
    });
  },
};
