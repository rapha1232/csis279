import connection from "../config/_database.config.js";

const getAllTopics = (req, res) => {
  const UserID = req.query.UserID;

  const query = `SELECT t.*, 
         IF(l.UserID IS NOT NULL, true, false) AS likedByUser,
         IF(s.UserID IS NOT NULL, true, false) AS savedByUser
    FROM discussiontopics AS t
         LEFT JOIN Likes AS l
         ON t.TopicID = l.TopicID
         AND l.UserID = ?
         LEFT JOIN Saved AS s
         ON t.TopicID = s.TopicID
         AND s.UserID = ?;`;

  connection.query(query, [UserID, UserID], (err, result) => {
    if (err) {
      res.status(500).send({ err: err });
    } else {
      res.status(200).send(result);
    }
  });
};

const getTopicsWithFilter = (req, res) => {
  const UserID = req.query.UserID;
  const q = req.query.q;
  const search = req.query.search;

  let sql = `SELECT t.*, 
  IF(l.UserID IS NOT NULL, true, false) AS likedByUser,
  IF(s.UserID IS NOT NULL, true, false) AS savedByUser
FROM discussiontopics AS t
  LEFT JOIN Likes AS l
  ON t.TopicID = l.TopicID
  AND l.UserID = ?
  LEFT JOIN Saved AS s
  ON t.TopicID = s.TopicID
  AND s.UserID = ?`;

  if (search) {
    sql += ` WHERE t.Title LIKE ?`;
  }

  switch (q) {
    case "popular":
      sql += ` ORDER BY (SELECT COUNT(*) FROM likes WHERE likes.TopicID = t.TopicID) DESC;`;
      break;
    case "recent":
      sql += ` ORDER BY t.CreatedAt;`;
      break;
    case "name":
      sql += ` ORDER BY t.Title;`;
      break;
    case "old":
      sql += ` ORDER BY t.CreatedAt DESC;`;
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

const likeTopic = (req, res) => {
  const TopicID = req.query.TopicID;
  const UserID = req.query.UserID;
  connection.query(
    `UPDATE discussiontopics SET Likes = Likes + 1 WHERE TopicID = ${TopicID}`,
    (err1, result) => {
      if (err1) res.status(500).send(false);
      connection.query(
        `INSERT INTO likes(UserID, TopicID) VALUES (${UserID}, ${TopicID})`,
        (err2, result) => {
          if (err2) res.status(500).send(false);
          res.status(200).send(true);
        }
      );
    }
  );
};
const unlikeTopic = (req, res) => {
  const TopicID = req.query.TopicID;
  const UserID = req.query.UserID;
  connection.query(
    `UPDATE discussiontopics SET Likes = Likes - 1 WHERE TopicID = ${TopicID}`,
    (err, result) => {
      if (err) res.status(500).send(false);
      connection.query(
        `DELETE FROM likes WHERE TopicID = ${TopicID} and UserID = ${UserID}`,
        (err, result) => {
          if (err) res.status(500).send(false);
          res.status(200).send(true);
        }
      );
    }
  );
};

const saveTopic = (req, res) => {
  const TopicID = req.query.TopicID;
  const UserID = req.query.UserID;
  connection.query(
    `INSERT INTO saved(UserID, TopicID) VALUES (${UserID}, ${TopicID})`,
    (err, result) => {
      if (err) res.status(500).send(false);
      res.status(200).send(true);
    }
  );
};
const unsaveTopic = (req, res) => {
  const TopicID = req.query.TopicID;
  const UserID = req.query.UserID;
  connection.query(
    `DELETE FROM saved WHERE TopicID = ${TopicID} and UserID = ${UserID}`,
    (err, result) => {
      if (err) res.status(500).send(false);
      res.status(200).send(true);
    }
  );
};

export {
  getAllTopics,
  getTopicsWithFilter,
  likeTopic,
  unlikeTopic,
  saveTopic,
  unsaveTopic,
};
