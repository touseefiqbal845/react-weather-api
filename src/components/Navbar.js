import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

function Navbartop() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(existingCartItems);
  }, []);

  const location = useLocation();
  const currentPath = location.pathname;

  const hasProductsInCart = cartItems.length > 0;

  useEffect(() => {
    // Replace 'currentProductId' with the actual identifier for the current product
    const currentProductId = 'yourProductId';

    const currentProductInCart = cartItems.find(item => item.product.id === currentProductId);
    const currentProductQuantity = currentProductInCart ? currentProductInCart.quantity : 0;

    setCartItems(prevCartItems => {
      const updatedCartItems = prevCartItems.map(item => {
        if (item.product.id === currentProductId) {
          return { ...item, quantity: currentProductQuantity };
        }
        return item;
      });

      return updatedCartItems;
    });
  }, [currentPath, cartItems]);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="navbar">
       
          <Navbar.Brand>BRIGHTERS</Navbar.Brand>
          <Nav className="me-auto">
            
            <Link to="/">
              <Button variant="light" className="home">Product Listing</Button>
            </Link>

            <Link to="/add">
              <Button variant="light"  className="addcart">Add To Cart ({cartItems.length})</Button>
            </Link>
          </Nav>
     
      </Navbar>
    </>
  );
}

export default Navbartop;
