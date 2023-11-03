import connection from "../config/_database.config.js";

const getAllEvents = (req, res) => {
  const UserID = req.query.UserID;

  const query = `SELECT e.*, 
         IF(l.UserID IS NOT NULL, true, false) AS likedByUser,
         IF(s.UserID IS NOT NULL, true, false) AS savedByUser
    FROM events AS e
         LEFT JOIN Likes AS l
         ON e.EventID = l.EventID
         AND l.UserID = ?
         LEFT JOIN Saved AS s
         ON e.EventID = s.EventID
         AND s.UserID = ?;`;

  connection.query(query, [UserID, UserID], (err, result) => {
    if (err) {
      res.status(500).send({ err: err });
    } else {
      res.status(200).send(result);
    }
  });
};

const getEventsWithFilter = (req, res) => {
  const UserID = req.query.UserID;
  const q = req.query.q;
  const search = req.query.search;

  let sql = `SELECT e.*, 
  IF(l.UserID IS NOT NULL, true, false) AS likedByUser,
  IF(s.UserID IS NOT NULL, true, false) AS savedByUser
FROM events AS e
  LEFT JOIN Likes AS l
  ON e.EventID = l.EventID
  AND l.UserID = ?
  LEFT JOIN Saved AS s
  ON e.EventID = s.EventID
  AND s.UserID = ?`;

  if (search) {
    sql += ` WHERE e.Title LIKE ?`;
  }

  switch (q) {
    case "popular":
      sql += ` ORDER BY (SELECT COUNT(*) FROM Likes WHERE Likes.EventID = e.EventID) DESC;`;
      break;
    case "recent":
      sql += ` ORDER BY e.Date;`;
      break;
    case "name":
      sql += ` ORDER BY e.Title;`;
      break;
    case "old":
      sql += ` ORDER BY e.Date DESC;`;
      break;
    case "all":
      sql += "";
      break;
    default:
      res.status(400).send("Invalid filter");
      return;
  }

  const queryParams = search
    ? [UserID, UserID, `%${search}%`]
    : [UserID, UserID];

  connection.query(sql, queryParams, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
    } else {
      res.json(result);
    }
  });
};

const likeEvent = (req, res) => {
  const EventID = req.query.EventID;
  const UserID = req.query.UserID;
  connection.query(
    `UPDATE events SET Likes = Likes + 1 WHERE EventID = ${EventID}`,
    (err1, result) => {
      if (err1) res.status(500).send(false);
      connection.query(
        `INSERT INTO likes(UserID, EventID) VALUES (${UserID}, ${EventID})`,
        (err2, result) => {
          if (err2) res.status(500).send(false);
          res.status(200).send(true);
        }
      );
    }
  );
};
const unlikeEvent = (req, res) => {
  const EventID = req.query.EventID;
  const UserID = req.query.UserID;
  connection.query(
    `UPDATE events SET Likes = Likes - 1 WHERE EventID = ${EventID}`,
    (err, result) => {
      if (err) res.status(500).send(false);
      connection.query(
        `DELETE FROM likes WHERE EventID = ${EventID} and UserID = ${UserID}`,
        (err, result) => {
          if (err) res.status(500).send(false);
          res.status(200).send(true);
        }
      );
    }
  );
};

const saveEvent = (req, res) => {
  const EventID = req.query.EventID;
  const UserID = req.query.UserID;
  connection.query(
    `INSERT INTO saved(UserID, EventID) VALUES (${UserID}, ${EventID})`,
    (err, result) => {
      if (err) res.status(500).send(false);
      res.status(200).send(true);
    }
  );
};
const unsaveEvent = (req, res) => {
  const EventID = req.query.EventID;
  const UserID = req.query.UserID;
  connection.query(
    `DELETE FROM saved WHERE EventID = ${EventID} and UserID = ${UserID}`,
    (err, result) => {
      if (err) res.status(500).send(false);
      res.status(200).send(true);
    }
  );
};

export {
  getAllEvents,
  likeEvent,
  unlikeEvent,
  saveEvent,
  unsaveEvent,
  getEventsWithFilter,
};
