import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
// Dummy product for demo; replace with API data or props
const dummyProduct = {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  description:
    'A novel of the Jazz Age, The Great Gatsby tells the story of the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.',
  category: 'Classic Literature',
  price: '$25.00',
  salesPrice: '$18.00',
  totalStocks: 20,
  image: 'https://m.media-amazon.com/images/I/914DQ26V6RL.jpg',
}

function ProductDetail() {
  const { id } = useParams()

  const dispatch = useDispatch()
  const { productDetails, status } = useSelector((state) => state.products)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  if (status === 'loading') return <p>Loading...</p>
  if (!productDetails) return <p>No product found.</p>

  const product = productDetails

  return (
    <Container className="mt-4">
      <Row>
        <Col md={5}>
          <Image
            src={product.image.secure_url}
            alt={product.title}
            fluid
            style={{ objectFit: 'contain', maxHeight: '500px', width: '100%' }}
          />
        </Col>

        <Col md={7}>
          <Card className="p-4 shadow-sm">
            <Card.Title as="h3">{product.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              by {product.author}
            </Card.Subtitle>
            <Card.Text className="mt-3">
              <strong>Description:</strong>
              <br />
              {product.description}
            </Card.Text>
            <Card.Text>
              <strong>Category:</strong> {product.category}
            </Card.Text>
            <Card.Text>
              <strong>Price:</strong>{' '}
              <del className="text-muted">{product.price}</del>{' '}
              <span className="text-success">{product.salePrice}</span>
            </Card.Text>
            <Card.Text>
              <strong>Stock:</strong>{' '}
              {product.totalStock > 0 ? (
                <span className='text-success'>{product.totalStocks} available</span>
              ) : (
                <span className="text-danger">Out of stock</span>
              )}
            </Card.Text>
            <Button variant="dark" disabled={product.totalStocks === 0}>
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail
