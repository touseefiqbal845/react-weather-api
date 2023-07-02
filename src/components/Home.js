import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './style.css';
import products from './Product';

const Myshop = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('lowToHigh');

  const uniqueCategories = Array.from(new Set(products.map((item) => item.category)));

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredItems = products.filter((item) => {
    return (
      (!selectedCategory || item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

 const sortedItems = filteredItems.length > 0 ? [...filteredItems].sort((a, b) => {
  if (sortOrder === 'lowToHigh') {
    return a.price - b.price;
  } else if (sortOrder === 'highToLow') {
    return b.price - a.price;
  }
  return 0;
}) : [];

  const handleAddToCart = (product) => {
    navigate('/add', { state: { product, quantity: 1 } });
  };

  const renderItems = sortedItems.map((item) => (
    <Col key={item.id} lg={3} className="text-center product">
      <div className="product-inner">
        <div onClick={() => handleAddToCart(item)}>
          <img src={item.image} alt={`Image ${item.id}`} className="img-fluid" />
        </div>
        <h4>{item.name}</h4>
        <p>Category: {item.category}</p>
        <p>Price: {item.price}</p>
        <p>Description: {item.description}</p>
      </div>
    </Col>
  ));

  return (
    <>
      <div className="btn-sm">
        {uniqueCategories.map((category) => (
          <Button
            variant="primary"
            style={{ margin: '4px', padding: '25px' }}
            key={category}
            onClick={() => handleCategoryClick(category)}
            active={category === selectedCategory}
          >
            {category}
          </Button>
        ))}
        <Button
          variant="primary"
          style={{ margin: '4px', padding: '25px' }}
          key="all"
          onClick={() => setSelectedCategory(null)}
          active={!selectedCategory}
        >
          All
        </Button>
      </div>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form>
              <Form.Group controlId="search">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Serach Products"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group controlId="sortOrder">
                <Form.Label>Sort by Price</Form.Label>
                <Form.Select
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  style={{ borderRadius: '0', borderColor: '#ced4da' }}
                >
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className="d-flex justify-content-center align-items-center">
        <Row className="justify-content-center">
          {renderItems.length > 0 ? (
            renderItems
          ) : (
            <Col className="text-center">No items found.</Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Myshop;
