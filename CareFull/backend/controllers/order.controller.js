// controllers/orderController.js

import Order from '../models/Order.js';

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { prescriptionId, userId, medication, dosage } = req.body;

    const newOrder = new Order({
      user: userId,
      prescription: prescriptionId,
      medication,
      dosage,
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order details
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('pharmacy')
      .populate('items.drug');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
