# bookstore-app-backend 

# Backend API Documentation

This repository contains backend APIs for User and Product management.

---

## Base URLs

- User APIs: `/api/v1/user`
- Product APIs: `/api/v1/product`

---

## Authentication

Some routes require users to be authenticated. Use the `Authorization` header with a valid token for these routes.

---

## User Routes

| Method | Endpoint           | Description               | Auth Required | Request Body                              |
|--------|--------------------|---------------------------|---------------|-------------------------------------------|
| POST   | `/signup`          | Register a new user        | No            | `{ username, email, password }`            |
| POST   | `/signin`          | User login                | No            | `{ email, password }`                       |
| GET    | `/signout`         | User logout               | Yes           | -                                         |
| PUT    | `/update`          | Update user profile       | Yes           | Fields to update (e.g., name, email)       |
| PUT    | `/change-password` | Change user password      | Yes           | `{ oldPassword, newPassword }`              |
| GET    | `/me`              | Get logged-in user info   | Yes           | -                                         |

---

## Product Routes

### Admin Routes (Require Authentication)

| Method | Endpoint           | Description                 | Request Body / Params                     |
|--------|--------------------|-----------------------------|------------------------------------------|
| GET    | `/`                | Get all products             | -                                        |
| POST   | `/add`              | Add new product              | Product details (name, price, etc.)      |
| PUT    | `/update/:id`       | Update product by ID         | Product ID in URL, updated product data  |
| DELETE | `/delete/:id`       | Delete product by ID         | Product ID in URL                         |

### Public Routes (No Authentication Required)

| Method | Endpoint           | Description                 | Query Params                             |
|--------|--------------------|-----------------------------|-----------------------------------------|
| GET    | `/filter`           | Get products by filter       | Filter criteria as query parameters      |
| GET    | `/:id`              | Get product details by ID    | Product ID in URL                        |

---

## Response Format

- All responses are in JSON format.
- Successful responses typically include a `success: true` field.
- Errors include `success: false` and an error message.

Example:

```json
{
  "success": true,
  "data": { ... }
}
