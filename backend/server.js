const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://sharini2:W4kpzmVH839Iyy59@flowercluster1.clvpv.mongodb.net/?retryWrites=true&w=majority&appName=flowercluster1";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  date: String,
  items: [{ id: Number, name: String, price: Number, quantity: Number }]
});

const Order = mongoose.model('Order', orderSchema);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running correctly' });
});

// Create a new user
app.post('/api/user', async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }
    const newUser = new User({ username, email });
    const user = await newUser.save();
    res.status(201).json({ userId: user._id, userName: user.username });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user', details: err.message });
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ error: 'No users found' });
    }
    res.json({ userId: user._id, userName: user.username });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ userId: user._id, userName: user.username });
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    console.log('Received order data:', req.body);
    
    // Validate the incoming data
    if (!req.body.userId || !req.body.name || !req.body.date || !Array.isArray(req.body.items)) {
      throw new Error('Invalid order data');
    }

    // Check if the user exists
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newOrder = new Order(req.body);
    const order = await newOrder.save();
    console.log('Order saved successfully:', order);
    res.json(order);
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Error placing order', details: err.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ msg: 'Order deleted' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong', details: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});