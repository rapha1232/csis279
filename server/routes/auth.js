import connection from "../config/_database.config.js";
import bcrypt from "bcrypt";
const signin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: "Error signing in" });
      } else {
        if (result.length > 0) {
          const user = {
            id: result[0].user_id,
            firstName: result[0].user_firstName,
            lastName: result[0].user_lastName,
            email: result[0].email,
            password: result[0].password,
          };
          // Compare the provided password with the hashed password in the database
          bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
            if (bcryptErr) {
              res.status(500).send({ message: "Error signing in" });
            } else if (bcryptResult) {
              res.status(200).send({
                message: "Successfully signed in",
                success: true,
                user: user,
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  // Hash the user's password before storing it
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      res.status(500).send({ error: err, user: null });
      return;
    }

    user.password = hash;

    const sql =
      "INSERT INTO csis279.users(user_firstName, user_lastName, email, password) VALUES (?, ?, ?, ?)";
    const values = [user.firstName, user.lastName, user.email, user.password];

    connection.query(sql, values, (dbErr) => {
      if (dbErr) {
        res.status(500).send({ error: dbErr, user: null });
      } else {
        // Assuming you want to return a message and the user information upon successful registration
        res
          .status(200)
          .send({ message: "Successfully registered!", user: user });
      }
    });
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ message: "Successfully Logged Out" });
    }
  });
};

export { signin, signup, logout };
