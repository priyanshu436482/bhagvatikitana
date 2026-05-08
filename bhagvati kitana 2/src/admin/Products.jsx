import React, { useState, useEffect } from 'react';
import api from './api/axios';
import { toast } from 'react-toastify';
import { Edit, Trash2, Plus, Image as ImageIcon } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('products/');
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const openAddModal = () => {
    setFormData({ id: null, name: '', description: '', price: '', stock: '', category: '' });
    setImageFile(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
    });
    setImageFile(null);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`products/${id}/`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('category', formData.category);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await api.put(`products/${formData.id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product updated successfully');
      } else {
        await api.post('products/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product added successfully');
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update product' : 'Failed to add product');
    }
  };

  // Styles
  const buttonStyle = { padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
  const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Products Management</h2>
        <button onClick={openAddModal} style={{ ...buttonStyle, backgroundColor: '#2b8f32', color: 'white', display: 'flex', alignItems: 'center' }}>
          <Plus size={18} style={{ marginRight: '5px' }} /> Add Product
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Image</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Name</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Category</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Price</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#555' }}>Stock</th>
              <th style={{ padding: '15px', textAlign: 'center', color: '#555' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                  ) : (
                    <div style={{ width: '50px', height: '50px', backgroundColor: '#f1f1f1', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ImageIcon size={24} color="#ccc" />
                    </div>
                  )}
                </td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#333' }}>{product.name}</td>
                <td style={{ padding: '15px', color: '#666' }}>{product.category}</td>
                <td style={{ padding: '15px', color: '#2b8f32', fontWeight: 'bold' }}>₹{product.price}</td>
                <td style={{ padding: '15px', color: '#666' }}>{product.stock}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button onClick={() => openEditModal(product)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#0d6efd', marginRight: '15px' }}>
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#999' }}>No products found. Add your first product!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={inputStyle} />
              
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} required style={inputStyle} />
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Stock Quantity</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required style={inputStyle} />
                </div>
              </div>

              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" style={inputStyle}></textarea>

              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Product Image (Cloudinary)</label>
              <input type="file" onChange={handleImageChange} accept="image/*" style={inputStyle} />
              <small style={{ display: 'block', marginBottom: '15px', color: '#666' }}>{isEditing ? "Leave empty to keep existing image." : "Select an image to upload."}</small>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ ...buttonStyle, backgroundColor: '#f1f1f1', color: '#333' }}>Cancel</button>
                <button type="submit" style={{ ...buttonStyle, backgroundColor: '#2b8f32', color: 'white' }}>{isEditing ? 'Update Product' : 'Save Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
