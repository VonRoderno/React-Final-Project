import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { db } from '../firebase/config'
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; 

const HomePage = () => {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
  
    // State for editing fields
    const [editName, setEditName] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editQuantity, setEditQuantity] = useState('');

    // Refs for new item inputs
    const nameRef = useRef();
    const categoryRef = useRef();
    const quantityRef = useRef();

    // Fetch items from Firestore
    useEffect(() => {
      const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, "items"));
        const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(fetchedItems);
      };
      fetchItems();
    }, []);
  
    // Add new item to Firestore
    const handleAddItem = async () => {
      const newItem = {
        name: nameRef.current.value,
        category: categoryRef.current.value,
        quantity: quantityRef.current.value,
      };
  
      if (newItem.name && newItem.category && newItem.quantity) {
        const docRef = await addDoc(collection(db, "items"), newItem);
        setItems([...items, { id: docRef.id, ...newItem }]);
        nameRef.current.value = "";
        categoryRef.current.value = "";
        quantityRef.current.value = "";
      }
    };
  
    // Delete item from Firestore
    const handleDeleteItem = async (id) => {
      await deleteDoc(doc(db, "items", id));
      setItems(items.filter(item => item.id !== id));
    };
  
    // Start editing an item
    const handleEditItem = (item) => {
      setEditingItem(item.id);
      setEditName(item.name);
      setEditCategory(item.category);
      setEditQuantity(item.quantity);
    };
  
    // Save edited item to Firestore
    const handleSaveEdit = async () => {
      const updatedItem = {
        name: editName,
        category: editCategory,
        quantity: editQuantity,
      };
  
      if (updatedItem.name && updatedItem.category && updatedItem.quantity) {
        await updateDoc(doc(db, "items", editingItem), updatedItem);
        setItems(items.map(item => (item.id === editingItem ? { id: editingItem, ...updatedItem } : item)));
        setEditingItem(null);
      }
    };

    return (
      <div className="container">
        <h1 className="heading">Add Items in the Inventory</h1>
  
        {/* Add Item */}
        <div className="add-item">
          <input ref={nameRef} type="text" placeholder="Name" />
          <input ref={categoryRef} type="text" placeholder="Category" />
          <input ref={quantityRef} type="number" placeholder="Quantity" />
          <button onClick={handleAddItem}>Add</button>
        </div>
  
        {/* Table View */}
        <h1 className="heading">Inventory</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  {editingItem === item.id ? (
                    <>
                      <td><input value={editName} onChange={e => setEditName(e.target.value)} type="text" /></td>
                      <td><input value={editCategory} onChange={e => setEditCategory(e.target.value)} type="text" /></td>
                      <td><input value={editQuantity} onChange={e => setEditQuantity(e.target.value)} type="number" /></td>
                      <td><button onClick={handleSaveEdit}>Save</button></td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td className="action-buttons">
                        <img 
                           className="icon delete-icon"
                           onClick={() => handleDeleteItem(item.id)}
                           src={deleteIcon} alt="delete icon" 
                        />
                        <img 
                           className="icon edit-icon"
                           onClick={() => handleEditItem(item)}
                           src={editIcon} alt="edit icon" 
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default HomePage;
