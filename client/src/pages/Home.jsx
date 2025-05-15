import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Carousel, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { fetchFilteredProducts } from '../redux/slices/productSlice'; // ✅ Update path if needed

const carouselItems = [
  {
    image: 'https://booksalmirah.com/wp-content/uploads/2023/08/alfons-morales-YLSwjSy7stw-unsplash-1.jpg',
    caption: 'Discover Classic Literature',
  },
  {
    image: 'https://booksalmirah.com/wp-content/uploads/2023/08/alfons-morales-YLSwjSy7stw-unsplash-1.jpg',
    caption: 'Top Programming Picks',
  },
  {
    image: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/booksbookshed-c35d6c7bc2f118403bc5f35d151cc087.jpg',
    caption: 'Magical Worlds Await',
  },
];

const categories = [
  'All',
  'Mystery',
  'Thriller',
  'Fantasy',
  'Romance',
  'Non-Fiction',
  'Classic Fiction',
  'Philosophical Fiction',
  'Self-help',
];

function Home() {
  const dispatch = useDispatch();
  const { filteredProducts, status } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleProducts, setVisibleProducts] = useState([]);

  // ✅ Fetch products on first load
  useEffect(() => {
    dispatch(fetchFilteredProducts());
  }, [dispatch]);

  // ✅ Update visible products on category or product change
  useEffect(() => {
    if (selectedCategory === 'All') {
      setVisibleProducts(filteredProducts);
    } else {
      setVisibleProducts(
        filteredProducts.filter(
          (product) => product.category === selectedCategory
        )
      );
    }
  }, [selectedCategory, filteredProducts]);

  return (
    <Container fluid>
      <Carousel className="mb-4">
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`Slide ${index + 1}`}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h5>{item.caption}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-flex flex-wrap justify-content-center mb-4 gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'dark' : 'outline-dark'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {status === 'loading' ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <ProductCard products={visibleProducts} />
      )}
    </Container>
  );
}

export default Home;
