import connection from "../config/_database.config.js";

const getCart = async (req, res) => {
  const userId = req.query.userId;
  const sql = "SELECT * FROM csis279.cart WHERE user_id = ?";
  const values = [userId];

  try {
    const results = await query(sql, values);

    const cart = {
      user_id: userId,
      products: [],
    };

    for (let i = 0; i < results.length; i++) {
      const product_id = results[i].product_id;
      const product = await getProductDetails(product_id);
      cart.products.push({
        cart_id: results[i].cart_id,
        product: product,
        quantity: results[i].quantity,
      });
    }

    res.send({ cart: cart });
  } catch (error) {
    res.status(500).send({ error: error, message: "ERROR!" });
  }
};

async function getProductDetails(product_id) {
  const sql2 = "SELECT * FROM csis279.product_listings WHERE product_id = ?";
  const values2 = [product_id];

  try {
    const results = await query(sql2, values2);
    return results[0];
  } catch (error) {
    throw error;
  }
}

function query(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

const deleteFromCart = (req, res) => {
  const productId = req.query.productId;
  const userId = req.query.userId;
  const sql = "DELETE FROM csis279.cart WHERE product_id = ? AND user_id = ?";
  const values = [productId, userId];

  connection.query(sql, values, (err) => {
    if (err) {
      res.send({ error: err, message: "ERROR!", success: false });
    } else {
      res.status(200).send({ success: true });
    }
  });
};

const addToCart = (req, res) => {
  const cartData = {
    productId: req.body.productId,
    userId: req.body.userId,
    quantity: req.body.q,
  };

  const sql =
    "INSERT INTO csis279.cart (product_id, user_id, quantity) VALUES (?, ?, ?)";
  const values = [cartData.productId, cartData.userId, cartData.quantity];

  connection.query(sql, values, (err) => {
    if (err) {
      res.status(500).send({ error: err, message: "ERROR!" });
    } else {
      res.status(200).send({ success: true, success: true });
    }
  });
};

const checkCart = (req, res) => {
  const productId = req.query.productId;
  const userId = req.query.userId;
  const sql = "SELECT * FROM csis279.cart WHERE product_id = ? AND user_id = ?";
  const values = [productId, userId];

  connection.query(sql, values, (err, results) => {
    if (err) {
      res.send({ error: err, message: "ERROR!" });
    } else if (results.length == 0) {
      res.send({ exists: false });
    } else {
      res.send({ exists: true });
    }
  });
};

export { getCart, deleteFromCart, addToCart, checkCart };
