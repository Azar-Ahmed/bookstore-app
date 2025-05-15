import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCart = ({ products }) => {
  return (
    <Row>
      {products.length === 0 ? (
        <Col>
          <p>No products found.</p>
        </Col>
      ) : (
        products.map((product) => (
          <Col md={3} key={product._id} className="mb-4">
            <Card>
              <Card.Img className='product-image' variant="top" src={product.image.secure_url} />
              <Card.Body>
                <Card.Title>
                  <Link to={`/book/${product._id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                    {product.title}
                  </Link>
                </Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {product.author}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ₹{product.salePrice}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
};

export default ProductCart;
