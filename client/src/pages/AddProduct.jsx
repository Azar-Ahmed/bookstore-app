import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
    salePrice: "",
    totalStock: "",
    image: null,
  });

  const { addProductStatus, addProductError } = useSelector((state) => state.products);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    await dispatch(addProduct(formData));
  };

  // Redirect on success
  useEffect(() => {
    if (addProductStatus === "succeeded") {
      navigate("/books");
    }
  }, [addProductStatus, navigate]);

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h3>Add New Book</h3>

      {addProductError && <Alert variant="danger">{addProductError}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" value={form.author} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option>Mystery</option>
            <option>Thriller</option>
            <option>Fantasy</option>
            <option>Romance</option>
            <option>Non-Fiction</option>
            <option>Classic Fiction</option>
            <option>Philosophical Fiction</option>
            <option>Self-help</option>

          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={form.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sales Price</Form.Label>
          <Form.Control type="number" name="salePrice" value={form.salePrice} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Stocks</Form.Label>
          <Form.Control type="number" name="totalStock" value={form.totalStock} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book Image</Form.Label>
          <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={addProductStatus === "loading"}>
          {addProductStatus === "loading" ? (
            <>
              <Spinner animation="border" size="sm" /> Uploading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
