import React from "react";
import { Form } from "react-bootstrap";

function ImageUpload({ label, name, onChange }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
      />
    </Form.Group>
  );
}

export default ImageUpload;
