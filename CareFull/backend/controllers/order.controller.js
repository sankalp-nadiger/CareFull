// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
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


export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('pharmacy')
      .populate('items.drug');
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
