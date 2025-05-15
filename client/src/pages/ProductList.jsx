import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFilteredProducts,
  setSelectedCategory,
  setSelectedAuthor,
  setPriceRange,
  setSortOption,
} from '../redux/slices/productSlice'

import ProductFilter from '../components/ProductFilter'
import ProductCart from '../components/ProductCard'

// Dummy categories and authors (these should also be fetched from the backend ideally)
const categories = [
  "Classic Fiction",
  "Fantasy",
  "Mystery",
  "Non-Fiction",
  "Philosophical Fiction",
  "Romance",
  "Self-help",
  "Thriller"
];

function ProductListPage() {
  const dispatch = useDispatch()
  const {
    filteredProducts,
    selectedCategory,
    selectedAuthor,
    priceRange,
    sortOption,
    status,
  } = useSelector((state) => state.products)

  // Fetch products from API on mount and when filters change
  useEffect(() => {
    dispatch(fetchFilteredProducts())
  }, [dispatch, selectedCategory, sortOption])

  const handleSortChange = (e) => {
    dispatch(setSortOption(e.target.value))
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={3}>
          <ProductFilter
            categories={categories}
            // authors={authors}
            selectedCategory={selectedCategory}
            setSelectedCategory={(val) => dispatch(setSelectedCategory(val))}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={(val) => dispatch(setSelectedAuthor(val))}
            priceRange={priceRange}
            setPriceRange={(val) => dispatch(setPriceRange(val))}
          />
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Showing {filteredProducts.length} results</h3>
            <div>
              <label htmlFor="sortPrice" className="mr-2">
                Sort by Price:
              </label>
              <select
                id="sortPrice"
                className="form-select"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
          <hr />
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'failed' ? (
            <p>Failed to load products.</p>
          ) : (
            <ProductCart products={filteredProducts} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductListPage
