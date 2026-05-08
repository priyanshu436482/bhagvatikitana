import React, { useState, useEffect } from 'react';
import api from './api/axios';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    total_orders: 0,
    total_customers: 0,
    total_revenue: 0,
    low_stock_alerts: 0,
    recent_orders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('dashboard/stats/');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const Card = ({ title, value, icon: Icon, color }) => (
    <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', flex: 1, minWidth: '200px' }}>
      <div style={{ backgroundColor: color, width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
        <Icon size={30} color="white" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '24px', color: '#333' }}>{value}</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold' }}>{title}</p>
      </div>
    </div>
  );

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>Dashboard Overview</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <Card title="Total Revenue" value={`₹${stats.total_revenue}`} icon={DollarSign} color="#2b8f32" />
        <Card title="Total Orders" value={stats.total_orders} icon={ShoppingCart} color="#0d6efd" />
        <Card title="Total Products" value={stats.total_products} icon={Package} color="#f59f00" />
        <Card title="Customers" value={stats.total_customers} icon={Users} color="#6f42c1" />
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 2, backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Recent Orders</h3>
          {stats.recent_orders.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', paddingBottom: '10px', color: '#666' }}>Order ID</th>
                  <th style={{ textAlign: 'left', paddingBottom: '10px', color: '#666' }}>Customer</th>
                  <th style={{ textAlign: 'left', paddingBottom: '10px', color: '#666' }}>Status</th>
                  <th style={{ textAlign: 'left', paddingBottom: '10px', color: '#666' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_orders.map(order => (
                  <tr key={order.id} style={{ borderTop: '1px solid #eee' }}>
                    <td style={{ padding: '15px 0' }}>#{order.id}</td>
                    <td style={{ padding: '15px 0' }}>{order.customer_name}</td>
                    <td style={{ padding: '15px 0' }}>
                      <span style={{ backgroundColor: order.status === 'Pending' ? '#fff3cd' : '#d1e7dd', color: order.status === 'Pending' ? '#856404' : '#0f5132', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '15px 0', fontWeight: 'bold' }}>₹{order.total_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>No recent orders.</p>
          )}
        </div>

        <div style={{ flex: 1, backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Alerts</h3>
          {stats.low_stock_alerts > 0 ? (
            <div style={{ backgroundColor: '#f8d7da', color: '#842029', padding: '15px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
              <Package size={20} style={{ marginRight: '10px' }} />
              <strong>{stats.low_stock_alerts} products</strong>&nbsp;are low on stock!
            </div>
          ) : (
            <div style={{ backgroundColor: '#d1e7dd', color: '#0f5132', padding: '15px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
              <Package size={20} style={{ marginRight: '10px' }} />
              All product stocks are looking good.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
