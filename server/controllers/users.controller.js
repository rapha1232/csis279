import connection from "../config/_database.config.js";

const getUserInfo = (req, res) => {
  const UserID = req.query.UserID;
  const sql = "SELECT * FROM starclub.users WHERE UserID = ?";
  const values = [UserID];
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send({ err: err });
    } else {
      res.status(200).send({ user: result[0] });
    }
  });
};

const getUserSaved = (req, res) => {
  const UserID = req.query.UserID;
  const sql = "SELECT * FROM starclub.saved WHERE UserID = ?";
  const values = [UserID];
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send({ err: err });
    } else {
      res.status(200).send({ saved: result });
    }
  });
};

export { getUserInfo, getUserSaved };
