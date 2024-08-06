const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { Op } = require("sequelize");

// Get all products
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [
          { ProductName: { [Op.like]: `%${search}%` } },
          { EshopSKU: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const products = await Product.findAll({ where: whereClause });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new product (on-the-fly)
router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { ProductID: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { ProductID: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;