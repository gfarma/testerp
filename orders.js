const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderItem");
const Product = require('../models/Product');


// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [Partner, OrderDetail] }); // Include Partner and OrderDetail
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new order
router.post("/", async (req, res) => {
  try {
    const orderData = req.body;

    // Δημιουργία της παραγγελίας
    const order = await Order.create(orderData);

    // Δημιουργία των OrderDetails
    const products = orderData.products;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      // Βρες το προϊόν από τη βάση δεδομένων με βάση το ProductID
      let existingProduct = await Product.findByPk(product.id); 

      // Αν δεν υπάρχει το προϊόν, δημιουργήσε το (αν και δεν θα έπρεπε σε αυτό το σημείο)
      if (!existingProduct) {
        existingProduct = await Product.create({
          ProductName: product.name,
          // ... (άλλα πεδία του προϊόντος, π.χ. τιμή)
        });
      }

      await OrderDetail.create({
        OrderID: order.OrderID,
        ProductID: existingProduct.ProductID, 
        Quantity: product.quantity,
        Subtotal: product.total
      });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [Partner, OrderDetail] });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an order by ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { OrderID: req.params.id },
    });
    if (updated) {
      const updatedOrder = await Order.findByPk(req.params.id);
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { OrderID: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;