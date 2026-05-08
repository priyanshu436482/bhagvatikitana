import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, LogOut, Store } from 'lucide-react';
import { AuthContext } from './context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
  ];

  return (
    <div style={{ width: '250px', height: '100vh', backgroundColor: '#fff', borderRight: '1px solid #eee', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '70px', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #eee' }}>
        <Store style={{ color: '#2b8f32', marginRight: '10px' }} />
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Admin Panel</span>
      </div>
      
      <div style={{ flex: 1, padding: '20px 0' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              color: isActive ? '#2b8f32' : '#666',
              backgroundColor: isActive ? '#f0fdf4' : 'transparent',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
              borderRight: isActive ? '3px solid #2b8f32' : 'none'
            })}
          >
            <item.icon style={{ marginRight: '15px', width: '20px', height: '20px' }} />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
        <button
          onClick={() => logout(navigate)}
          style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '12px', color: '#dc3545', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          <LogOut style={{ marginRight: '10px', width: '20px', height: '20px' }} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
