const express = require('express');
const router = express.Router();
const OrderItem = require('../models/OrderItem');

// Get all order items
router.get('/', async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.json(orderItems); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new order item
router.post('/', async (req, res) => {
  try {
    const orderItem = await OrderItem.create(req.body);
    res.status(201).json(orderItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single order item by ID
router.get('/:id', async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (orderItem) {
      res.json(orderItem);
    } else {
      res.status(404).json({ message: 'Order item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an order item by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await OrderItem.update(req.body, {
      where: { OrderItemID: req.params.id },
    });
    if (updated) {
      const updatedOrderItem = await OrderItem.findByPk(req.params.id);
      res.json(updatedOrderItem);
    } else {
      res.status(404).json({ message: 'Order item not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an order item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await OrderItem.destroy({
      where: { OrderItemID: req.params.id },
    });
    if (deleted) {
      res.json({ message: 'Order item deleted' });
    } else {
      res.status(404).json({ message: 'Order item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;