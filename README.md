# NOVA — Mini E-Commerce Application

A modern, responsive mini e-commerce application built with React as part of a React Developer Internship take-home assessment.

The application allows users to browse products, search and filter products by category, view product details, and manage their shopping cart. Product data is stored locally in a JSON file, and cart data is persisted using browser `localStorage`.

## ✨ Features

* Browse products in a responsive grid
* Search products by name
* Filter products by category
* View detailed product information
* Add products to the shopping cart
* Remove products from the cart
* Increase or decrease product quantity
* Display total number of cart items
* Calculate total cart price
* Persist cart data using `localStorage`
* Responsive design for desktop, tablet, and mobile
* Loading skeleton states
* Empty search results state
* Empty cart state
* Product not found state
* Add-to-cart feedback notification
* Reusable React components

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* JavaScript (ES6+)
* Context API
* `useReducer`
* `localStorage`


## 📁 Project Structure

```text
src/
├── assets/
│
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── CategoryFilter.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── Rating.jsx
│   ├── QuantitySelector.jsx
│   ├── CartItem.jsx
│   ├── EmptyState.jsx
│   └── Loader.jsx
│
├── context/
│   └── CartContext.jsx
│
├── data/
│   └── products.json
│
├── hooks/
│   └── useLocalStorage.js
│
├── pages/
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   └── Cart.jsx
│
├── utils/
│   └── cartUtils.js
│
├── App.jsx
├── main.jsx
└── index.css
```

> The exact folder structure may vary depending on the final implementation.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js 18+
* npm


## 📦 Product Data

The application does not use a backend or external product API.

Product information is stored in:

```text
src/data/products.json
```

Each product contains information such as:

```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "category": "Electronics",
  "price": 2499,
  "rating": 4.5,
  "image": "/products/headphones.jpg",
  "description": "Premium wireless headphones with active noise cancellation."
}
```

## 🛒 Cart Management

Cart state is managed using React's Context API and `useReducer`.

The cart supports:

* Adding products
* Removing products
* Increasing quantity
* Decreasing quantity
* Calculating total items
* Calculating total price

Cart data is automatically stored in the browser's `localStorage`, allowing the cart to persist even after refreshing or reopening the page.

## 🔎 Search & Filtering

Users can:

* Search products by name
* Filter products by category
* Combine search and category filtering
* Clear filters when no products are found

The original product data remains unchanged while the displayed product list is derived from the active search and filter state.

## 🧭 Routing

React Router is used for application navigation.

Main routes include:

```text
/                    → Product Listing
/products/:id        → Product Details
/cart                → Shopping Cart
```

Invalid product IDs display a product-not-found state.

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The product grid, navigation, search, filters, product details, and cart layout adapt according to the screen size.

## ⚠️ State Handling

The application handles different UI states including:

### Loading State

Displays skeleton placeholders while product data is being prepared.

### Empty State

Displayed when:

* No products match the search
* No products match the selected category
* The shopping cart is empty

### Error / Not Found State

Displayed when a requested product does not exist.

## 🎨 UI Design

NOVA uses a dark-first visual design.

### Design characteristics

* Dark background
* Charcoal product cards
* Orange primary accent
* High-contrast typography
* Subtle borders
* Rounded cards
* Responsive layouts
* Minimal animations

The design focuses on usability and clarity rather than unnecessary visual effects.

## 🧩 Reusable Components

The application is structured around reusable components such as:

* `Navbar`
* `ProductCard`
* `ProductGrid`
* `SearchBar`
* `CategoryFilter`
* `Rating`
* `QuantitySelector`
* `CartItem`
* `OrderSummary`
* `EmptyState`
* `LoadingSkeleton`

This keeps the application modular and easier to maintain.

## 🧪 Testing Checklist

Before submitting the project, verify:

* [ ] Products load correctly
* [ ] Search works correctly
* [ ] Category filtering works
* [ ] Search + category filtering work together
* [ ] Empty search state appears
* [ ] Product details page works
* [ ] Invalid product ID shows not-found state
* [ ] Product can be added to cart
* [ ] Existing cart item quantity increases correctly
* [ ] Quantity can be increased/decreased
* [ ] Product can be removed
* [ ] Cart item count is correct
* [ ] Cart total price is correct
* [ ] Cart persists after page refresh
* [ ] Empty cart state works
* [ ] Layout works on mobile
* [ ] Layout works on tablet
* [ ] Layout works on desktop