import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./redux/slices/authSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Router>
      <AppNavbar isAuthenticated={!!user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/books" element={<Layout><ProductList /></Layout>} />
        <Route path="/book/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/add-product" element={<Layout><AddProduct /></Layout>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
