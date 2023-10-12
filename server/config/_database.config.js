import { createConnection } from "mysql2";

const config = {
  PORT: 3307,
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "root18",
  DB: "csis279",
  multipleStatements: true,
};

const connection = createConnection({
  host: config.HOST,
  port: config.PORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  multipleStatements: config.multipleStatements,
  dateStrings: true,
  typeCast: function castField(field, useDefaultTypeCasting) {
    if (field.type === "BIT" && field.length === 1) {
      var bytes = field.buffer();

      return bytes[0] === 1;
    }

    return useDefaultTypeCasting();
  },
});

function handleDisconnect() {
  connection.connect((error) => {
    if (error) {
      console.log(error);
      setTimeout(handleDisconnect, 3000);
    } else {
      console.log(
        "==========================================================="
      );
      console.log(">>> Successfully connected to the database");
      console.log(
        "==========================================================="
      );
    }
  });

  connection.on("error", function (err) {
    console.log(err);
    if (err.code == "PROTOCOL_CONNECTION_LOST" || err.code == "ECONNRESET") {
      console.log("DATABASE CONNECTION LOST");
      handleDisconnect();
    } else {
      handleDisconnect();
      throw err;
    }
  });
}

handleDisconnect();

export default connection;
