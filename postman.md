# Postman Testing Guide for eBay Backend API

This guide provides comprehensive instructions for testing the eBay-like backend API using Postman. The API is built with Express.js, TypeScript, and MongoDB, featuring authentication, products, cart management, and coupons.

## Prerequisites

1. **Start the server**: Ensure the backend server is running on `http://localhost:5000` (default port).
   ```bash
   npm start
   # or
   npm run dev
   ```

2. **MongoDB**: Ensure MongoDB is running and connected (check `src/config/db.ts` for connection details).

3. **Postman**: Download and install Postman from [postman.com](https://www.postman.com/downloads/).

## Environment Setup in Postman

1. Create a new environment in Postman named "eBay Backend".
2. Add the following variables:
   - `base_url`: `http://localhost:5000`
   - `token`: (will be set after login or registration)
   - `user_id`: `user123` (sample user ID for testing)
   - `product_id`: (will be set after creating a product)
   - `coupon_code`: (will be set after creating a coupon)

## API Collection Structure

Import or create a new collection named "eBay Backend API" with the following folders and requests:

### 1. Authentication
#### POST Register
- **POST** Register
  - URL: `{{base_url}}/api/auth/register`
  - Headers: `Content-Type: application/json`
  - Body (raw JSON):
    ```json
    {
      "email": "test@example.com",
      "password": "password123",
      "role": "user"
    }
    ```
  - Expected Response:
    ```json
    {
      "success": true,
      "message": "User registered successfully",
      "data": {
        "user": {
          "id": "user_id",
          "email": "test@example.com",
          "role": "user"
        },
        "token": "jwt_token_here"
      }
    }
    ```
  - Error Response (400): `{"success": false, "message": "User already exists"}`

#### POST Register Admin
- **POST** Register Admin
  - URL: `{{base_url}}/api/auth/register`
  - Headers: `Content-Type: application/json`
  - Body (raw JSON):
    ```json
    {
      "email": "admin@example.com",
      "password": "admin123",
      "role": "admin"
    }
    ```
  - Expected Response: Similar to user registration but with role "admin"

#### POST Login
- **POST** Login
  - URL: `{{base_url}}/api/auth/login`
  - Headers: `Content-Type: application/json`
  - Body (raw JSON):
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
  - Expected Response:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "data": {
        "user": {
          "id": "user_id",
          "email": "test@example.com"
        },
        "token": "jwt_token_here"
      }
    }
    ```
  - Error Response (401): `{"success": false, "message": "Invalid credentials"}`

### 2. Health Check
- **GET** Health Check
  - URL: `{{base_url}}/api/health`
  - Expected Response: `{"status": "OK", "message": "Server is running"}`

### 3. Products
#### POST Create Product
- **POST** Create Product
  - URL: `{{base_url}}/api/products`
  - Headers:
    - `Content-Type: application/json`
    - `Authorization: Bearer {{token}}` (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDM2YzkzZWEzNzVlMjM5YmRkMWI5MCIsImVtYWlsIjoiYWRtaW4xMjNAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYxODMyMTUwLCJleHAiOjE3NjE4MzU3NTB9.3ldb4RG8iZNWY_dtiHk0eNaEDluIN_S8xPgFUHpaYC4)
  - Body (raw JSON):
    ```json
    {
      "name": "Sample Product",
      "price": 99.99,
      "description": "A sample product",
      "category": "Electronics",
      "stock": 10
    }
    ```
  - Expected Response:
    ```json
    {
      "success": true,
      "message": "Product created successfully",
      "data": {
        "_id": "product_id",
        "name": "Sample Product",
        "price": 99.99,
        "description": "A sample product",
        "category": "Electronics",
        "stock": 10,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
    ```
  - Error Response (403): `{"success": false, "message": "Access denied. Admin role required."}`

#### GET All Products
- **GET** Get Products
  - URL: `{{base_url}}/api/products`
  - Expected Response:
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "product_id",
          "name": "Sample Product",
          "price": 99.99,
          "description": "A sample product",
          "category": "Electronics",
          "stock": 10,
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z"
        }
      ]
    }
    ```

#### GET Product by ID
- **GET** Get Product by ID
  - URL: `{{base_url}}/api/products/{{product_id}}`
  - Expected Response: Similar to above but for a single product
  - Error Response (404): `{"success": false, "message": "Product not found"}`

### 4. Cart
#### POST Add to Cart
- **POST** Add to Cart
  - URL: `{{base_url}}/api/cart/add`
  - Headers: `Content-Type: application/json`
  - Body (raw JSON):
    ```json
    {
      "userId": "{{user_id}}",
      "productId": "{{product_id}}",
      "quantity": 2
    }
    ```
  - Expected Response:
    ```json
    {
      "success": true,
      "message": "Product added to cart successfully",
      "data": {
        "_id": "cart_id",
        "userId": "{{user_id}}",
        "items": [
          {
            "product": {
              "_id": "{{product_id}}",
              "name": "Sample Product",
              "price": 99.99,
              "description": "A sample product",
              "category": "Electronics",
              "stock": 10
            },
            "quantity": 2
          }
        ],
        "total": 199.98,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
    ```
  - Error Response (404): `{"success": false, "message": "Product not found"}`

#### GET Get Cart
- **GET** Get Cart
  - URL: `{{base_url}}/api/cart/{{user_id}}`
  - Expected Response: Similar to add to cart response
  - Empty Cart Response: `{"success": true, "data": {"items": [], "total": 0}}`

#### POST Apply Coupon
- **POST** Apply Coupon
  - URL: `{{base_url}}/api/cart/apply-coupon`
  - Headers: `Content-Type: application/json`
  - Body (raw JSON):
    ```json
    {
      "userId": "{{user_id}}",
      "couponCode": "{{coupon_code}}"
    }
    ```
  - Expected Response:
    ```json
    {
      "success": true,
      "message": "Coupon applied successfully",
      "data": {
        "_id": "cart_id",
        "userId": "{{user_id}}",
        "items": [...],
        "total": 180.00,
        "coupon": "coupon_id",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      },
      "discount": 20.00
    }
    ```
  - Error Response (404): `{"success": false, "message": "Invalid coupon code"}`
  - Error Response (400): `{"success": false, "message": "Coupon has expired"}`

### 5. Coupons
#### POST Create Coupon
- **POST** Create Coupon
  - URL: `{{base_url}}/api/coupons`
  - Headers:
    - `Content-Type: application/json`
    - `Authorization: Bearer {{token}}` (Admin token required)
  - Body (raw JSON):
    ```json
    {
      "code": "SAVE10",
      "discountType": "percentage",
      "discountValue": 10,
      "minPurchase": 50,
      "maxDiscount": 20,
      "expiryDate": "2024-12-31T23:59:59.000Z",
      "isActive": true
    }
    ```
  - Expected Response:
    ```json
    {
      "success": true,
      "message": "Coupon created successfully",
      "data": {
        "_id": "coupon_id",
        "code": "SAVE10",
        "discountType": "percentage",
        "discountValue": 10,
        "minPurchase": 50,
        "maxDiscount": 20,
        "expiryDate": "2024-12-31T23:59:59.000Z",
        "isActive": true,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    }
    ```
  - Error Response (403): `{"success": false, "message": "Access denied. Admin role required."}`
  - Error Response (400): `{"success": false, "message": "Coupon code already exists"}`

#### GET Get Coupon by Code
- **GET** Get Coupon by Code
  - URL: `{{base_url}}/api/coupons/{{coupon_code}}`
  - Expected Response: Similar to create coupon response
  - Error Response (404): `{"success": false, "message": "Coupon not found"}`

## Testing Scenarios

### Scenario 1: Authentication and Basic Product and Cart Flow
1. **Register Admin**: Register an admin user to obtain an admin JWT token.
2. **Register User**: Register a regular user.
3. **Login**: Login with admin credentials to get token.
4. **Health Check**: Verify server is running.
5. **Create Sample Data**: Use admin token to create products and coupons.
6. **Get Products**: Retrieve all products.
7. **Add to Cart**: Add a product to the cart.
8. **Get Cart**: Verify the cart contents.
9. **Apply Coupon**: Apply a discount coupon.
10. **Get Cart**: Check updated total with discount.

### Scenario 2: Error Handling
1. **Invalid Product ID**: Try GET `/api/products/invalid_id` → Should return 404.
2. **Invalid Coupon**: Try POST apply-coupon with wrong code → Should return 404.
3. **Empty Cart**: GET cart for non-existent user → Should return empty cart.

### Scenario 3: Coupon Validation
1. Create a coupon with expiry date in the past.
2. Try to apply it → Should fail (assuming validation in controller).
3. Create a coupon with minPurchase > cart total → Should not apply discount.

## Sample Data for Testing

### Products
```json
{
  "name": "iPhone 13",
  "price": 999.99,
  "description": "Latest iPhone model",
  "category": "Electronics",
  "stock": 50
}
```

### Coupons
```json
{
  "code": "WELCOME20",
  "discountType": "percentage",
  "discountValue": 20,
  "minPurchase": 100,
  "expiryDate": "2024-12-31T23:59:59.000Z"
}
```

## Notes

- All POST requests require `Content-Type: application/json` header.
- Authentication endpoints return a JWT token that can be stored in the `token` environment variable for use in authenticated requests (if needed in future endpoints).
- Cart operations use `userId` to identify user carts.
- Coupon codes are case-insensitive (converted to uppercase in controller).
- Responses follow a consistent format: `{success: boolean, data: object}` for success, `{success: false, message: string}` for errors.
- Use Postman's environment variables to store dynamic IDs (like product_id, coupon_code) after creation.

## Troubleshooting

- **Server not starting**: Check MongoDB connection and environment variables in `.env`.
- **404 Errors**: Ensure correct URLs and that data exists in the database.
- **Validation Errors**: Check request body matches the Zod schemas defined in route files.
- **CORS Issues**: The API includes CORS middleware, but ensure Postman is configured correctly.

This guide covers all endpoints and common testing scenarios. Adjust URLs and data as needed for your specific setup.
