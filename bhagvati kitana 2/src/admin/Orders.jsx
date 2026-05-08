import React, { useState, useEffect } from 'react';
import api from './api/axios';
import { toast } from 'react-toastify';
import { Eye, CheckCircle, Package, Clock } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('orders/');
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`orders/${orderId}/`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}><Clock size={12} style={{ marginRight: '4px' }}/>{status}</span>;
      case 'Packed':
        return <span style={{ backgroundColor: '#cff4fc', color: '#055160', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}><Package size={12} style={{ marginRight: '4px' }}/>{status}</span>;
      case 'Delivered':
        return <span style={{ backgroundColor: '#d1e7dd', color: '#0f5132', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}><CheckCircle size={12} style={{ marginRight: '4px' }}/>{status}</span>;
      default:
        return status;
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Order Management</h2>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Order ID</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Customer</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Date</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Total Amount</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#555' }}>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>#{order.id}</td>
                <td style={{ padding: '15px', color: '#333' }}>{order.customer_name}</td>
                <td style={{ padding: '15px', color: '#666' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '15px', color: '#2b8f32', fontWeight: 'bold' }}>₹{order.total_amount}</td>
                <td style={{ padding: '15px' }}>{getStatusBadge(order.status)}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ddd' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Packed">Packed</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#999' }}>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
