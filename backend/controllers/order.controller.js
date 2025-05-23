// controllers/orderController.js

import Order from '../models/order.model.js';
import Drug from '../models/drug.model.js';

// Create new order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // From auth middleware
    const { items, deliveryAddress } = req.body;
    const prescriptionImage = req.file?.path; // From multer middleware

    // Validate required fields
    if (!items || !items.length || !deliveryAddress) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['items', 'deliveryAddress']
      });
    }

    // Check stock availability and calculate total
    let total = 0;
    const orderItems = [];
    for (const item of items) {
      const medicine = await Drug.findById(item.medicineId);
      if (!medicine) {
        return res.status(400).json({ 
          error: `Medicine with ID ${item.medicineId} not found` 
        });
      }
      if (medicine.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${medicine.name}`,
          available: medicine.stock,
          requested: item.quantity
        });
      }
      
      // Deduct stock
      medicine.stock -= item.quantity;
      await medicine.save();

      // Add to order items
      orderItems.push({
        drug: item.medicineId,
        quantity: item.quantity,
        price: medicine.price,
        subtotal: medicine.price * item.quantity
      });
      total += medicine.price * item.quantity;
    }

    const newOrder = new Order({
      user: userId,
      items: orderItems,
      deliveryAddress,
      prescriptionImage,
      total,
      status: "pending"
    });

    await newOrder.save();
    res.status(201).json({ 
      message: "Order placed successfully!",
      order: {
        id: newOrder._id,
        total,
        status: newOrder.status
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders for a user with optional status filter
export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    let query = { user: userId };
    if (status) {
      query.status = status.toLowerCase();
    }

    const orders = await Order.find(query)
      .populate('items.drug', 'name price')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch orders',
      details: err.message 
    });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Order.findById(orderId)
      .populate('items.drug')
      .populate('user', 'fullName email');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user owns this order or is a pharmacist
    if (order.user._id.toString() !== userId && req.user.role !== 'pharmacist') {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch order',
      details: err.message 
    });
  }
};

// Update order status (pharmacist only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status',
        validStatuses 
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if status update is valid
    if (order.status === 'cancelled') {
      return res.status(400).json({ error: 'Cannot update cancelled order' });
    }

    // Update status
    order.status = status;
    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }
    await order.save();

    res.status(200).json({
      message: 'Order status updated successfully',
      order: {
        id: order._id,
        status: order.status,
        updatedAt: order.updatedAt
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to update order status',
      details: err.message 
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id; // From auth middleware

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user owns this order
    if (order.user.toString() !== userId) {
      return res.status(403).json({ error: 'Not authorized to cancel this order' });
    }

    // Check if order can be cancelled (only pending or processing orders)
    if (!['pending', 'processing'].includes(order.status.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Order cannot be cancelled',
        message: 'Only pending or processing orders can be cancelled'
      });
    }

    // Update order status to cancelled
    order.status = 'cancelled';
    order.cancelledAt = new Date();
    await order.save();

    // If order had items, return them to inventory
    if (order.items && order.items.length > 0) {
      for (const item of order.items) {
        const medicine = await Drug.findById(item.drug);
        if (medicine) {
          medicine.stock += item.quantity;
          await medicine.save();
        }
      }
    }

    res.status(200).json({
      message: 'Order cancelled successfully',
      order: {
        id: order._id,
        status: order.status,
        cancelledAt: order.cancelledAt
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to cancel order',
      details: err.message 
    });
  }
};
