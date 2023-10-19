import connection from "../config/_database.config.js";
const addProductListing = (req, res) => {
  if (!req.files.image) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  var imageName = req.files.image.name;
  imageName = imageName.replace(/\s+/g, "-").toLowerCase();
  const image = req.files.image;
  let uploadPath =
    "C:/Users/raphy/Desktop/csis279/client/public/uploads/" + imageName;
  image.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
  });

  const listingData = {
    sellerId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    price: Number(req.body.price),
    category: Number(req.body.category),
    image: `/uploads/${imageName}`,
    date: req.body.date,
  };

  const sql =
    "INSERT INTO csis279.product_listings(seller_id, title, description, price, category_id, image, date_posted) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    listingData.sellerId,
    listingData.title,
    listingData.description,
    listingData.price,
    listingData.category,
    listingData.image,
    listingData.date,
  ];

  connection.query(sql, values, (err) => {
    if (err) {
      res.send({ error: err, message: "ERROR!" });
    } else {
      res.send({ message: "Successfully added!", success: true });
    }
  });
};

const myListings = (req, res) => {
  const userId = req.query.userId;
  const sql =
    "SELECT * FROM csis279.product_listings WHERE seller_id = ? ORDER BY date_posted DESC";
  const values = [userId];

  connection.query(sql, values, (err, results) => {
    if (err) {
      res.send({ error: err, message: "ERROR!" });
    } else {
      res.send({ listings: results });
    }
  });
};

const deleteListing = (req, res) => {
  const listingId = req.query.listingId;
  const sql = "DELETE FROM csis279.product_listings WHERE product_id = ?";
  const values = [listingId];

  connection.query(sql, values, (err) => {
    if (err) {
      res.send({ error: err, message: "ERROR!" });
    } else {
      res.status(200).send({ message: "Successfully deleted!", success: true });
    }
  });
};

const getListingData = (req, res) => {
  const listingId = req.query.listingId;
  const sql = "SELECT * FROM csis279.product_listings WHERE product_id = ?";
  const values = [listingId];

  connection.query(sql, values, (err, results) => {
    if (err || results.length === 0) {
      res.send({ error: err, message: "ERROR!" });
    } else {
      res.send({ listing: results[0] });
    }
  });
};

const editProductListing = (req, res) => {
  const listingData = {
    title: req.body.title,
    description: req.body.description,
    price: Number(req.body.price),
    category: Number(req.body.category),
    date: req.body.date,
    listingId: req.body.id,
  };

  const sql =
    "UPDATE csis279.product_listings SET title = ?, description = ?, price = ?, category_id = ?, date_posted = ? WHERE product_id = ?";
  const values = [
    listingData.title,
    listingData.description,
    listingData.price,
    listingData.category,
    listingData.date,
    listingData.listingId,
  ];

  connection.query(sql, values, (err) => {
    if (err) {
      res.send({ error: err, message: "ERROR!" });
    } else {
      res.send({ message: "Successfully updated!", success: true });
    }
  });
};

const getFeaturedListings = (req, res) => {
  const sql =
    "SELECT * FROM csis279.product_listings ORDER BY date_posted DESC LIMIT 8";

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.send({ error: err, message: "ERROR!" });
    } else {
      res.send({ listings: results });
    }
  });
};
export {
  addProductListing,
  myListings,
  deleteListing,
  getListingData,
  editProductListing,
  getFeaturedListings,
};
