import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './style.css'; // Import CSS file for styling

const AddToCart = () => {
  const location = useLocation();
  const { state } = location;
  console.log(state);

 
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(existingCartItems);
    const storedTotalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;
    setTotalPrice(storedTotalPrice);
  }, []);

  //  if (!state || !state.product || !state.quantity) {
  //   return <div>Go for Shoping</div>;
  //  }

  const addToCart = (product, quantity) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingCartItem = existingCartItems.find((item) => item.product.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      setCartItems(existingCartItems);
      console.log(`Adding ${quantity} ${product.name}(s) to the existing cart item.`);
    } else {
      const newCartItem = { product, quantity };
      const updatedCartItems = [...existingCartItems, newCartItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
      console.log(`Adding ${quantity} ${product.name}(s) to the cart.`);
    }

    const updatedTotalPrice = calculateTotalPrice(existingCartItems);
    localStorage.setItem('totalPrice', JSON.stringify(updatedTotalPrice));
    setTotalPrice(updatedTotalPrice);
  };

  const handleRemoveItem = (item) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = existingCartItems.filter((cartItem) => cartItem.product.id !== item.product.id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    console.log(`Removing ${item.product.name} from the cart.`);

    const updatedTotalPrice = calculateTotalPrice(updatedCartItems);
    localStorage.setItem('totalPrice', JSON.stringify(updatedTotalPrice));
    setTotalPrice(updatedTotalPrice);
  };

  const handleAddQuantity = (item) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingCartItem = existingCartItems.find((cartItem) => cartItem.product.id === item.product.id);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      setCartItems(existingCartItems);
      console.log(`Adding 1 quantity to ${item.product.name} in the cart.`);
    }

    const updatedTotalPrice = calculateTotalPrice(existingCartItems);
    localStorage.setItem('totalPrice', JSON.stringify(updatedTotalPrice));
    setTotalPrice(updatedTotalPrice);
  };

  const handleRemoveQuantity = (item) => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingCartItem = existingCartItems.find((cartItem) => cartItem.product.id === item.product.id);

    if (existingCartItem && existingCartItem.quantity > 1) {
      existingCartItem.quantity -= 1;
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      setCartItems(existingCartItems);
      console.log(`Removing 1 quantity from ${item.product.name} in the cart.`);
    }

    const updatedTotalPrice = calculateTotalPrice(existingCartItems);
    localStorage.setItem('totalPrice', JSON.stringify(updatedTotalPrice));
    setTotalPrice(updatedTotalPrice);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

 return (
    <div className="add-to-cart-container">
      {/* Render the second argument only when products are selected */}
      {state && state.product && state.quantity && (
        <div className="product-details">
          <h2>Add to Cart</h2>
          <div>
            <h4>Product Details</h4>
            <p>Name: {state.product.name}</p>
            <p>Price: {state.product.price}</p>
            <img src={state.product.image} style={{"width":"110px" ,"height":"70px"}}/>
            {/* <p>Quantity: {state.quantity}</p> */}
          </div>
          <div className="quantity-buttons">
            <Button  variant="info" onClick={() => handleAddQuantity(state)}>Add Quantity</Button>
              <Button variant="info" onClick={() => handleRemoveQuantity(state)}>Remove Quantity</Button>
          </div>
          <div className="add-to-cart-button">
            <button onClick={() => addToCart(state.product, state.quantity)}>Add to Cart</button>
          </div>
        </div>
      )}
      <div className="cart-items">
        <h2>Cart Items</h2>
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.product.id}
             item={item}
             onRemove={handleRemoveItem} 
            onAdd={handleAddQuantity} 
            onRemoveQuantity={handleRemoveQuantity} />
          ))}
        </div>
        <div className="total-price">
          <h2>Total Price: {totalPrice}</h2>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, onRemove, onAdd, onRemoveQuantity }) => {
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <h4>Product Details</h4>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Quantity: {quantity}</p>
      <div className="quantity-buttons">
        <button onClick={() => onAdd(item)}>+</button>
        <button onClick={() => onRemoveQuantity(item)}>-</button>
      </div>
      <button onClick={() => onRemove(item)}>Remove Item</button>
    </div>
  );
};

export default AddToCart;