import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminDashboard.css';

const MenuSection = () => {
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [language, setLanguage] = useState('en');

  // New Menu Item state
  const [newItem, setNewItem] = useState({
    category_id: '',
    name_en: '',
    name_de: '',
    description_en: '',
    description_de: '',
    price: ''
  });

  // New Category state
  const [newCategory, setNewCategory] = useState({
    name_en: '',
    name_de: ''
  });

  // Categories state
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchMenu();
    
    fetchCategories();
    hideGlobalElements();
  }, [language]);

  const hideGlobalElements = () => {
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const sideIcons = document.querySelector('.floating-reservation-container');
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (sideIcons) sideIcons.style.display = 'none';
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.get(` https://api.chelanyrestaurant-berlin.de/api/menu?lang=${language}`);
      const formatted = res.data.map(category => ({
        category: category.name,
        items: category.items
      }));
      setMenu(formatted);
      if (formatted.length > 0) {
        setActiveCategory(formatted[0].category);
      }
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(" https://api.chelanyrestaurant-berlin.de/api/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post(' https://api.chelanyrestaurant-berlin.de/api/menu-items', newItem);
      alert("Item added!");
      fetchMenu();
      setNewItem({
        category_id: '',
        name_en: '',
        name_de: '',
        description_en: '',
        description_de: '',
        price: ''
      });
    } catch (err) {
      console.error("Failed to add item:", err);
      alert("Error adding item");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(` https://api.chelanyrestaurant-berlin.de/api/menu-items/${itemId}`);
      alert("Item deleted!");
      fetchMenu();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post(" https://api.chelanyrestaurant-berlin.de/api/categories", newCategory);
      alert("Category added successfully!");
      setNewCategory({ name_en: "", name_de: "" });
      fetchMenu();
      fetchCategories();
    } catch (err) {
      console.error("Category add error:", err);
      alert("Error adding category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category? All related items will be deleted too.")) return;
    try {
      await axios.delete(` https://api.chelanyrestaurant-berlin.de/api/categories/${categoryId}`);
      alert("Category deleted!");
      fetchCategories();
      fetchMenu();
    } catch (err) {
      console.error("Delete category error:", err);
      alert("Error deleting category");
    }
  };

  return (
    <div className="menu-admin-wrapper" style={{ minHeight: '90vh', backgroundColor: '#fafafa' }}>
      <div className="container py-5">
        <h2 className="text-center mb-5 text-danger fw-bold" style={{ fontSize: '2.5rem', letterSpacing: '1.2px' }}>
          🍽️ Manage Menu Items
        </h2>

        {/* Language Toggle */}
        <div className="d-flex justify-content-center mb-5 gap-3">
          <button
            className={`btn btn-sm ${language === "en" ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => setLanguage("en")}
            style={{ minWidth: '80px', fontWeight: '600' }}
          >
            English
          </button>
          <button
            className={`btn btn-sm ${language === "de" ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => setLanguage("de")}
            style={{ minWidth: '80px', fontWeight: '600' }}
          >
            German
          </button>
        </div>

        {/* Category Tabs with Delete Buttons */}
        <div className="d-flex flex-wrap gap-3 justify-content-center mb-5">
          {categories.map(({ id, name_en, name_de }) => {
            const categoryName = language === 'en' ? name_en : name_de;
            return (
              <div key={id} className="btn-group btn-group-sm shadow-sm" role="group" aria-label="Category with delete" style={{ borderRadius: '6px', overflow: 'hidden' }}>
                <button
                  type="button"
                  className={`btn ${activeCategory === categoryName ? "btn-danger" : "btn-outline-secondary"}`}
                  onClick={() => setActiveCategory(categoryName)}
                  style={{ minWidth: '100px', fontWeight: '600' }}
                >
                  {categoryName}
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteCategory(id)}
                  title="Delete Category"
                  style={{ padding: '0 12px', fontWeight: '700', fontSize: '1.1rem' }}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Item Cards */}
        {menu.filter(({ category }) => category === activeCategory).map(({ items, category }) => (
          <div key={category}>
            <h4 className="mb-4 text-center text-secondary" style={{ fontWeight: '600', letterSpacing: '0.5px' }}>{category}</h4>
            <div className="row gy-4">
              {items.map((item) => (
                <div className="col-md-6" key={item.id}>
                  <div className="card shadow border-0" style={{ borderRadius: '12px', transition: 'transform 0.2s', cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="card-title mb-2" style={{ fontWeight: '700', fontSize: '1.25rem' }}>{item.name}</h5>
                        <p className="card-text mb-2 text-muted" style={{ fontSize: '0.9rem' }}>{item.description}</p>
                        <strong className="text-success" style={{ fontSize: '1.1rem' }}>€ {item.price}</strong>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteItem(item.id)}
                        style={{ height: '32px', fontWeight: '600' }}
                        title="Delete Item"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add New Item */}
        <div className="card mt-5 shadow-sm border-0" style={{ borderRadius: '12px' }}>
          <div className="card-body">
            <h5 className="card-title mb-4 text-danger" style={{ fontWeight: '700', fontSize: '1.5rem' }}>➕ Add New Menu Item</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <select
                  className="form-control form-select"
                  value={newItem.category_id}
                  onChange={(e) => setNewItem({ ...newItem, category_id: e.target.value })}
                  style={{ borderRadius: '8px', padding: '8px 12px' }}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{language === 'en' ? cat.name_en : cat.name_de}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name (EN)"
                  value={newItem.name_en}
                  onChange={(e) => setNewItem({ ...newItem, name_en: e.target.value })}
                  style={{ borderRadius: '8px', padding: '8px 12px' }}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name (DE)"
                  value={newItem.name_de}
                  onChange={(e) => setNewItem({ ...newItem, name_de: e.target.value })}
                  style={{ borderRadius: '8px', padding: '8px 12px' }}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description (EN)"
                  value={newItem.description_en}
                  onChange={(e) => setNewItem({ ...newItem, description_en: e.target.value })}
                  style={{ borderRadius: '8px', padding: '8px 12px' }}
                />
              </div>
              <div className="col-md-3 mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description (DE)"
                  value={newItem.description_de}
                  onChange={(e) => setNewItem({ ...newItem, description_de: e.target.value })}
                  style={{ borderRadius: '8px', padding: '8px 12px' }}
                />
              </div>
              <div className="col-md-3 mt-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  style={{ borderRadius: '8px', padding: '8px 12px' }}
                />
              </div>
              <div className="col-md-12 mt-4 text-end">
                <button
                  className="btn btn-danger  btn-sm"
                  onClick={handleAddItem}
                  style={{ fontWeight: '700', padding: '8px 24px', borderRadius: '8px', boxShadow: '0 3px 8px rgba(84, 16, 16, 0.4)' }}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Category */}
        <div className="card mt-5 shadow-sm border-0" style={{ borderRadius: '12px' }}>
          <div className="card-body">
            <h5 className="card-title mb-4 text-danger" style={{ fontWeight: '700', fontSize: '1.5rem' }}>➕ Add New Category</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name (English)"
                  value={newCategory.name_en}
                  onChange={(e) => setNewCategory({ ...newCategory, name_en: e.target.value })}
                  style={{ borderRadius: '8px', padding: '8px 12px' }}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name (German)"
                  value={newCategory.name_de}
                  onChange={(e) => setNewCategory({ ...newCategory, name_de: e.target.value })}
                  style={{ borderRadius: '8px', padding: '8px 12px' }}
                />
              </div>
              <div className="col-md-12 mt-4 text-end">
                <button
                  className="btn btn-danger  btn-sm"
                  onClick={handleAddCategory}
                  style={{ fontWeight: '700', padding: '8px 24px', borderRadius: '8px', boxShadow: '0 3px 8px rgba(84, 16, 16, 0.4)' }}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MenuSection;
