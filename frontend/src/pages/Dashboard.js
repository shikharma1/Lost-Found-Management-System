import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { itemAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('all-items');
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    type: '',
  });
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: '',
    category: 'Electronics',
    contactInfo: '',
  });

  // Fetch all items
  const fetchAllItems = async () => {
    setLoading(true);
    try {
      const response = await itemAPI.getAllItems();
      setItems(response.data.items);
      setError('');
    } catch (err) {
      setError('Failed to load items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch my items
  const fetchMyItems = async () => {
    setLoading(true);
    try {
      const response = await itemAPI.getMyItems();
      setMyItems(response.data.items);
      setError('');
    } catch (err) {
      setError('Failed to load your items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search items
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = {};
      if (searchParams.name) params.name = searchParams.name;
      if (searchParams.category) params.category = searchParams.category;
      if (searchParams.type) params.type = searchParams.type;

      const response = await itemAPI.searchItems(params);
      setItems(response.data.items);
      setError('');
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form (create/update)
  const handleSubmitItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await itemAPI.updateItem(editingItem._id, formData);
        setMessage('Item updated successfully!');
        setEditingItem(null);
      } else {
        await itemAPI.createItem(formData);
        setMessage('Item created successfully!');
      }
      resetForm();
      setActiveTab('my-items');
      fetchMyItems();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      itemName: '',
      description: '',
      type: 'Lost',
      location: '',
      date: '',
      category: 'Electronics',
      contactInfo: '',
    });
    setEditingItem(null);
  };

  // Edit item
  const handleEditItem = (item) => {
    setFormData({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      location: item.location,
      date: item.date.split('T')[0],
      category: item.category,
      contactInfo: item.contactInfo,
    });
    setEditingItem(item);
    setActiveTab('add-item');
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemAPI.deleteItem(id);
        setMessage('Item deleted successfully!');
        fetchMyItems();
        setError('');
      } catch (err) {
        setError('Failed to delete item');
      }
    }
  };

  // Load items on mount
  useEffect(() => {
    if (activeTab === 'all-items') {
      fetchAllItems();
    } else if (activeTab === 'my-items') {
      fetchMyItems();
    }
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <div className="navbar-brand brand-logo">
            <span className="me-2" style={{ fontSize: 20 }}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            Lost & Found
          </div>
          <div className="d-flex align-items-center">
            <span className="me-3">
              <strong>{user.name}</strong>
            </span>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4 mb-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="list-group">
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === 'all-items' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('all-items')}
              >
                <i className="fa-solid fa-list me-2"></i> All Items
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === 'my-items' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('my-items')}
              >
                <i className="fa-solid fa-user me-2"></i> My Items
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === 'add-item' ? 'active' : ''
                }`}
                onClick={() => {
                  resetForm();
                  setActiveTab('add-item');
                }}
              >
                <i className="fa-solid fa-plus me-2"></i> Add Item
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === 'search' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('search')}
              >
                <i className="fa-solid fa-search me-2"></i> Search
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            {/* Messages */}
            {message && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {message}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMessage('')}
                ></button>
              </div>
            )}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError('')}
                ></button>
              </div>
            )}

            {/* Add Item Tab */}
            {activeTab === 'add-item' && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    {editingItem ? 'Update Item' : 'Add New Item'}
                  </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmitItem}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="itemName" className="form-label">
                          Item Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="itemName"
                          name="itemName"
                          value={formData.itemName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Blue Backpack"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="type" className="form-label">
                          Type *
                        </label>
                        <select
                          className="form-select"
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                        >
                          <option value="Lost">Lost</option>
                          <option value="Found">Found</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description *
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        required
                        placeholder="Detailed description of the item"
                      ></textarea>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">
                          Category *
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value="Electronics">Electronics</option>
                          <option value="Documents">Documents</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Books">Books</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="location" className="form-label">
                          Location *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          placeholder="Where was it lost/found?"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="date" className="form-label">
                          Date *
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="contactInfo" className="form-label">
                          Contact Info *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="contactInfo"
                          name="contactInfo"
                          value={formData.contactInfo}
                          onChange={handleInputChange}
                          required
                          placeholder="Phone or Email"
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading
                          ? editingItem
                            ? 'Updating...'
                            : 'Creating...'
                          : editingItem
                          ? 'Update Item'
                          : 'Create Item'}
                      </button>
                      {editingItem && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={resetForm}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* All Items Tab */}
            {activeTab === 'all-items' && (
              <div>
                <h5 className="mb-3">
                  All Items ({items.length})
                </h5>
                {loading && <div className="alert alert-info">Loading items...</div>}
                {items.length === 0 ? (
                  <div className="alert alert-info">No items found</div>
                ) : (
                  <div className="row">
                    {items.map((item) => (
                      <div className="col-md-6 mb-3" key={item._id}>
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title mb-0">{item.itemName}</h6>
                              <span
                                className={`badge ${
                                  item.type === 'Lost'
                                    ? 'bg-danger'
                                    : 'bg-success'
                                }`}
                              >
                                {item.type}
                              </span>
                            </div>
                            <p className="card-text text-muted small">
                              {item.description}
                            </p>
                            <div className="small">
                              <p className="mb-1">
                                <strong>Category:</strong> {item.category}
                              </p>
                              <p className="mb-1">
                                <strong>Location:</strong> {item.location}
                              </p>
                              <p className="mb-1">
                                <strong>Date:</strong>{' '}
                                {new Date(item.date).toLocaleDateString()}
                              </p>
                              <p className="mb-1">
                                <strong>Posted by:</strong> {item.user?.name}
                              </p>
                              <p className="mb-1">
                                <strong>Contact:</strong>{' '}
                                <a href={`mailto:${item.user?.email}`}>
                                  {item.user?.email}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* My Items Tab */}
            {activeTab === 'my-items' && (
              <div>
                <h5 className="mb-3">
                  My Items ({myItems.length})
                </h5>
                {loading && <div className="alert alert-info">Loading your items...</div>}
                {myItems.length === 0 ? (
                  <div className="alert alert-info">
                    You haven't posted any items yet.{' '}
                    <button
                      className="btn btn-link p-0"
                      onClick={() => setActiveTab('add-item')}
                    >
                      Add one now
                    </button>
                  </div>
                ) : (
                  <div className="row">
                    {myItems.map((item) => (
                      <div className="col-md-6 mb-3" key={item._id}>
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title mb-0">{item.itemName}</h6>
                              <span
                                className={`badge ${
                                  item.type === 'Lost'
                                    ? 'bg-danger'
                                    : 'bg-success'
                                }`}
                              >
                                {item.type}
                              </span>
                            </div>
                            <p className="card-text text-muted small">
                              {item.description}
                            </p>
                            <div className="small mb-3">
                              <p className="mb-1">
                                <strong>Category:</strong> {item.category}
                              </p>
                              <p className="mb-1">
                                <strong>Location:</strong> {item.location}
                              </p>
                              <p className="mb-1">
                                <strong>Date:</strong>{' '}
                                {new Date(item.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleEditItem(item)}
                              >
                                <i className="fa-solid fa-edit me-1"></i> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteItem(item._id)}
                              >
                                <i className="fa-solid fa-trash me-1"></i> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Search Tab */}
            {activeTab === 'search' && (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Search Items</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="searchName" className="form-label">
                          Item Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="searchName"
                          name="name"
                          value={searchParams.name}
                          onChange={handleSearchChange}
                          placeholder="Search by name..."
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="searchCategory" className="form-label">
                          Category
                        </label>
                        <select
                          className="form-select"
                          id="searchCategory"
                          name="category"
                          value={searchParams.category}
                          onChange={handleSearchChange}
                        >
                          <option value="">All Categories</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Documents">Documents</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Books">Books</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="searchType" className="form-label">
                          Type
                        </label>
                        <select
                          className="form-select"
                          id="searchType"
                          name="type"
                          value={searchParams.type}
                          onChange={handleSearchChange}
                        >
                          <option value="">All Types</option>
                          <option value="Lost">Lost</option>
                          <option value="Found">Found</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      <i className="fa-solid fa-search me-1"></i>{' '}
                      {loading ? 'Searching...' : 'Search'}
                    </button>
                  </form>

                  {items.length === 0 ? (
                    <div className="alert alert-info">
                      No results found. Try adjusting your search criteria.
                    </div>
                  ) : (
                    <div className="row">
                      {items.map((item) => (
                        <div className="col-md-6 mb-3" key={item._id}>
                          <div className="card h-100">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="card-title mb-0">
                                  {item.itemName}
                                </h6>
                                <span
                                  className={`badge ${
                                    item.type === 'Lost'
                                      ? 'bg-danger'
                                      : 'bg-success'
                                  }`}
                                >
                                  {item.type}
                                </span>
                              </div>
                              <p className="card-text text-muted small">
                                {item.description}
                              </p>
                              <div className="small">
                                <p className="mb-1">
                                  <strong>Category:</strong> {item.category}
                                </p>
                                <p className="mb-1">
                                  <strong>Location:</strong> {item.location}
                                </p>
                                <p className="mb-1">
                                  <strong>Contact:</strong>{' '}
                                  <a href={`mailto:${item.contactInfo}`}>
                                    {item.contactInfo}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// ...existing code...
