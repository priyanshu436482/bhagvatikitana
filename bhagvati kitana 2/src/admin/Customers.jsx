import React, { useState, useEffect } from 'react';
import api from './api/axios';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('customers/');
      setCustomers(response.data);
    } catch (error) {
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading customers...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Customer Management</h2>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Name</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Contact Info</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Address</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#333' }}>{customer.name}</td>
                <td style={{ padding: '15px', color: '#666' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <Mail size={14} style={{ marginRight: '5px', color: '#999' }} /> {customer.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Phone size={14} style={{ marginRight: '5px', color: '#999' }} /> {customer.phone || 'N/A'}
                  </div>
                </td>
                <td style={{ padding: '15px', color: '#666' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <MapPin size={16} style={{ marginRight: '5px', color: '#999', marginTop: '3px' }} /> 
                    <span>{customer.address || 'No address provided'}</span>
                  </div>
                </td>
                <td style={{ padding: '15px', color: '#666' }}>{new Date(customer.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#999' }}>No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
