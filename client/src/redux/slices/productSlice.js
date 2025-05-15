import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  filteredProducts: [],
  selectedCategory: [],
  selectedAuthor: [],
  priceRange: [],
  sortOption: 'asc',
  status: 'idle',
  error: null,
  productDetails: null, // for single product
  addProductStatus: 'idle',
  addProductError: null,
};

// Fetch filtered products
export const fetchFilteredProducts = createAsyncThunk(
  'products/fetchFilteredProducts',
  async (_, { getState, rejectWithValue }) => {
    const state = getState().products;
    const { selectedCategory, sortOption } = state;

    try {
      const response = await axios.get('http://localhost:5001/api/v1/product/filter', {
        params: {
          category: selectedCategory[0],
          sort: sortOption === 'lowToHigh' ? 'asc' : 'desc',
          page: 1,
          limit: 20,
        },
      });
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/product/${id}`);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

// Add new product
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // or wherever you're storing it
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // 🔐 send token here
        },
        withCredentials: true,
      };
      const response = await axios.post('http://localhost:5001/api/v1/product/add', productData, config);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Add product failed');
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAllProducts(state, action) {
      state.items = action.payload;
    },
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedAuthor(state, action) {
      state.selectedAuthor = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setSortOption(state, action) {
      state.sortOption = action.payload;
    },
    clearProductDetails(state) {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchFilteredProducts handlers
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredProducts = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // fetchProductById handlers
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.productDetails = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.productDetails = null;
      })

      // addProduct handlers
      .addCase(addProduct.pending, (state) => {
        state.addProductStatus = 'loading';
        state.addProductError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductStatus = 'succeeded';
        // Optionally add the new product to items or filteredProducts list:
        state.items.push(action.payload);
        state.filteredProducts.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductStatus = 'failed';
        state.addProductError = action.payload;
      });
  },
});

export const {
  setAllProducts,
  setFilteredProducts,
  setSelectedCategory,
  setSelectedAuthor,
  setPriceRange,
  setSortOption,
  clearProductDetails,
} = productSlice.actions;

export default productSlice.reducer;
