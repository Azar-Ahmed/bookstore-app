import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedCategory,
  setPriceRange,
  fetchFilteredProducts,
} from '../redux/slices/productSlice';

const ProductFilter = () => {
  const dispatch = useDispatch();

  const { selectedCategory, priceRange } = useSelector(
    (state) => state.products
  );

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

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const updated = selectedCategory.includes(category)
      ? selectedCategory.filter((cat) => cat !== category)
      : [...selectedCategory, category];
    dispatch(setSelectedCategory(updated));
    dispatch(fetchFilteredProducts());
  };

  const handlePriceRangeChange = (e) => {
    const range = e.target.value;
    const updated = priceRange.includes(range)
      ? priceRange.filter((price) => price !== range)
      : [...priceRange, range];
    dispatch(setPriceRange(updated));
    dispatch(fetchFilteredProducts());
  };

  return (
    <div className="border p-3 shadow-sm rounded">
      <h4>Filters</h4>
      <hr />
      <h5>Category</h5>
      {categories.map((category) => (
        <div key={category} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={category}
            value={category}
            checked={selectedCategory.includes(category)}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label" htmlFor={category}>
            {category}
          </label>
        </div>
      ))}
      <hr />

      <h5>Price</h5>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="price1"
          value="0-100"
          checked={priceRange.includes("0-100")}
          onChange={handlePriceRangeChange}
        />
        <label className="form-check-label" htmlFor="price1">
          ₹0 - ₹100
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="price2"
          value="100-200"
          checked={priceRange.includes("100-200")}
          onChange={handlePriceRangeChange}
        />
        <label className="form-check-label" htmlFor="price2">
          ₹100 - ₹200
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="price3"
          value="200-500"
          checked={priceRange.includes("200-500")}
          onChange={handlePriceRangeChange}
        />
        <label className="form-check-label" htmlFor="price3">
          ₹200 - ₹500
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="price4"
          value="500+"
          checked={priceRange.includes("500+")}
          onChange={handlePriceRangeChange}
        />
        <label className="form-check-label" htmlFor="price4">
          ₹500+
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
