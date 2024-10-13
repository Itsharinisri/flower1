import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../OrderSummary.css';

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    fetchUserData();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder({ ...order });
  };

  const handleEditChange = (e, itemId) => {
    const { name, value } = e.target;
    setEditingOrder(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, [name]: Number(value) } : item
      )
    }));
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, editingOrder);
      setOrders(orders.map(order => 
        order._id === editingOrder._id ? editingOrder : order
      ));
      setEditingOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="order-summary-container">
      <header className="shop-header">
        <h1 className="shop-name">A.M.K Flower Shop</h1>
      </header>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/flowershop">Flower Shop</Link></li>
          <li><Link to="/other">Other Page</Link></li>
        </ul>
      </nav>
      <div className="summary-container">
        <h1 className="summary-heading">Order Summary for {userData.userName}</h1>
        <div className="user-details">
          <h2>User Details</h2>
          <p><strong>User ID:</strong> {userData.userId}</p>
          <p><strong>Name:</strong> {userData.userName}</p>
        </div>
        <h2>Orders</h2>
        {orders.map(order => (
          <div key={order._id} className="order-item">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <h4>Items:</h4>
            {editingOrder && editingOrder._id === order._id ? (
              <ul>
                {editingOrder.items.map(item => (
                  <li key={item.id}>
                    {item.name} - 
                    Quantity: <input 
                      type="number" 
                      name="quantity" 
                      value={item.quantity} 
                      onChange={(e) => handleEditChange(e, item.id)}
                    /> - 
                    Price: <input 
                      type="number" 
                      name="price" 
                      value={item.price} 
                      onChange={(e) => handleEditChange(e, item.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>{item.name} - Quantity: {item.quantity} - Price: ₹{item.price}</li>
                ))}
              </ul>
            )}
            {editingOrder && editingOrder._id === order._id ? (
              <button onClick={handleSaveEdit}>Save</button>
            ) : (
              <button onClick={() => handleEdit(order)}>Edit</button>
            )}
            <button onClick={() => handleDelete(order._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;