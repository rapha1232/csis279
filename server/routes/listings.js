// import connection from "../config/_database.config.js";
// import multer from "multer";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../uploads/"); // Set the destination folder for file uploads
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use the original file name
//   },
// });

// const upload = multer({ storage });

// const addListing = (req, res) => {
//   const date = new Date().toISOString().split("T")[0];
//   const listingData = {
//     title: req.body.formData.title,
//     description: req.body.formData.description,
//     price: req.body.formData.price,
//     image: req.body.formData.image,
//     sellerId: req.body.userId,
//     date: date,
//   };

//   //   const sql =
//   //     "INSERT INTO csis279.product_listings(seller_id, title, description, price, category_id, image, date_posted) VALUES (?, ?, ?, ?, ?, ?, ?)";
//   //   const values = [
//   //     listingData.sellerId,
//   //     listingData.title,
//   //     listingData.description,
//   //     listingData.price,
//   //     listingData.location,
//   //     listingData.image,
//   //     date,
//   //   ];

//   //   connection.query(sql, values, (err) => {
//   //     if (err) {
//   //       res.send({ error: err, user: null, message: "ERROR!" });
//   //     } else {
//   //       req.session.user = user;
//   //       res.send({ message: "Successfully created!", user: user });
//   //     }
//   //   });
//   console.log(listingData);
// };

// export { addListing };

import multer from "multer";
import express from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

const router = express.Router();

// Use the '/upload' route with the upload middleware to handle file uploads
router.post("/upload", upload.single("image"), (req, res) => {
  //   if (!req.file) {
  //     return res.status(400).json({ error: "No file uploaded" });
  //   }

  //   const date = new Date().toISOString().split("T")[0];
  //   const listingData = {
  //     title: req.body.formData.title,
  //     description: req.body.formData.description,
  //     price: req.body.formData.price,
  //     image: req.body.file.path, // Save the path to the uploaded file
  //     sellerId: req.body.userId,
  //     date: date,
  //   };

  // Save the file path in your MongoDB database or perform other operations as needed
  // For example:
  // const listing = new Listing(listingData);
  // listing.save((err, listing) => {
  //   if (err) {
  //     return res.status(500).json({ error: err });
  //   }
  //   return res.status(200).json({ success: true, listing });
  // });

  console.log(req.body);
});

export default router;
