import connection from "../config/_database.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signin = (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  connection.query(
    "SELECT * FROM starclub.users WHERE Email = ?",
    [Email],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: "Error signing in" });
      } else {
        if (result.length > 0) {
          const user = {
            UserID: result[0].UserID,
            FirstName: result[0].FirstName,
            LastName: result[0].LastName,
            Email: result[0].Email,
            Password: result[0].Password,
          };

          bcrypt.compare(Password, user.Password, (bcryptErr, bcryptResult) => {
            if (bcryptErr) {
              console.log(bcryptErr.message);
              res.status(500).send({ message: "Wrong Password" });
            } else if (bcryptResult) {
              req.session.user = user;
              const token = jwt.sign(
                { userId: user.UserID },
                process.env.SECRET_KEY
              );
              res.status(200).send({
                message: "Successfully signed in",
                success: true,
                user: user,
                token: token,
              });
            } else {
              res.status(500).send({ message: "Wrong email or password" });
            }
          });
        } else {
          res.status(500).send({ message: "Wrong email or password" });
        }
      }
    }
  );
};

const signup = (req, res) => {
  const user = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
  };

  bcrypt.hash(user.Password, 10, (err, hash) => {
    if (err) {
      res.status(500).send({ error: "hash error", user: null });
      return;
    }

    user.Password = hash;

    const sql =
      "INSERT INTO starclub.users(FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?); SELECT LAST_INSERT_ID() AS UserID;";
    const values = [user.FirstName, user.LastName, user.Email, user.Password];

    connection.query(sql, values, (dbErr, results) => {
      if (dbErr) {
        res.status(500).send({ error: dbErr, user: null });
      } else if (results.length > 0) {
        user.UserID = results[0].UserID;
        req.session.user = user;
        const token = jwt.sign({ userId: user.UserID }, process.env.SECRET_KEY);
        res.status(200).send({
          success: true,
          message: "Successfully registered!",
          user: user,
          token: token,
        });
      }
    });
  });
};

const signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ message: "Error Logging Out" });
    } else {
      res.send({ message: "Successfully Logged Out" });
    }
  });
};

export { signin, signup, signout };
