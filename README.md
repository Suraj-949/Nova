# NOVA — Mini E-Commerce Application

A clean, modern mini e-commerce web application built with **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router v7** as part of the React Developer Intern take-home assessment.

The application allows users to browse an extensive product catalog, search and filter products by category, view comprehensive product details, and manage their cart with persistent `localStorage` support.

---

## ✨ Features

- **Product Catalog Listing**: High-contrast, dark-themed 5-column product grid with product cards.
- **Search Functionality**: Real-time search across product titles, categories, and descriptions with an instant clear (`X`) button.
- **Category Filtering**: Dynamic category pills derived directly from the catalog.
- **Combined Search & Filters**: Search queries and category filters work seamlessly together.
- **Empty State Handling**:
  - **No Products Found**: Clean empty state with a one-click **"Clear Filters"** button when no items match search or category criteria.
  - **Empty Cart**: Intuitive empty cart display with a **"Continue Shopping"** action button.
  - **Product Not Found**: Informative fallback page with a **"Back to Products"** button for invalid product IDs.
- **Product Details Page (`/product/:id`)**:
  - Interactive multi-angle product gallery.
  - Star ratings with review count display.
  - Highlighted specifications and formatted prices.
  - Quantity selection before adding to cart.
  - Related product recommendations based on category.
  - Interactive toast notification on cart addition.
- **Shopping Cart (`/cart`)**:
  - Add items to the cart from both catalog cards and detail pages.
  - Increase/decrease product quantity with safety bounds.
  - Remove items from the cart.
  - Real-time calculation of total items and total price formatted in Indian Rupees (₹).
  - Order summary sidebar with subtotal, free shipping indicator, and total.
  - **Cart Persistence**: Automatically persists cart data using browser `localStorage` across page reloads.
- **Client-Side Routing**: Handled using `react-router-dom` with fallback redirect for unknown routes.

---

## 🛠️ Tech Stack

- **Core**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8
- **Routing**: React Router v7 (`react-router-dom`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React (`lucide-react`)
- **State Management**: React Context API (`ShopContext` + `ShopProvider`) with React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`)
- **Storage**: Browser `localStorage` API
- **Linter**: Oxlint

---

## 📁 Project Structure

```text
Nova/
├── src/
│   ├── components/
│   │   ├── CategoryFilter.jsx    # Category selection pills
│   │   ├── Footer.jsx            # Minimalist website footer
│   │   ├── Navbar.jsx            # Header with search, nav links & live cart badge
│   │   ├── ProductCard.jsx       # Individual product card (rating, image, price, add)
│   │   ├── ProductGallery.jsx    # Multi-angle image viewer for product details
│   │   ├── ProductGrid.jsx       # Product grid with "No products found" empty state
│   │   ├── QuantitySelector.jsx  # Stepper component (+ / -) with input sanitization
│   │   ├── Rating.jsx            # Star rating score and review count badge
│   │   ├── RelatedProducts.jsx   # "You might also like" recommendations
│   │   └── SearchBar.jsx         # Search input with clear (X) trigger
│   ├── context/
│   │   ├── shop.js               # ShopContext definition & useShop consumer hook
│   │   └── ShopProvider.jsx      # State management, cart calculations & localStorage sync
│   ├── data/
│   │   └── products.json         # Local dummy product catalog
│   ├── pages/
│   │   ├── Cart.jsx              # Shopping cart view with item list & order summary
│   │   ├── Home.jsx              # Main catalog page with search, filters & grid
│   │   └── ProductDetail.jsx     # Detailed product view with gallery & specifications
│   ├── App.jsx                   # Application layout, routes & fallback redirection
│   ├── index.css                 # Base styles & Tailwind CSS import
│   └── main.jsx                  # React DOM entry point
├── package.json                  # Dependencies and scripts
├── README.md                     # Project overview and setup documentation
└── vite.config.js                # Vite build and plugin configurations
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Run Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Suraj-949/Nova.git
   cd Nova
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📦 Product Data

Product data is stored locally in `src/data/products.json` without any external API or backend dependency.

Each product object adheres to the following structure:

```json
{
  "id": 1,
  "title": "Wireless Noise Cancelling Headphones",
  "category": "Electronics",
  "price": 12999,
  "rating": 4.7,
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "description": "Premium wireless headphones with active noise cancellation and up to 30 hours of battery life."
}
```

---

## 🛒 Cart Management & Persistence

Cart state is centralized using React's Context API (`ShopProvider.jsx`).

### Key Features:
- **`localStorage` Hydration**: The cart initializes via a lazy initializer (`useState(loadCart)`), safely reading and validating stored items from `nova-cart` in `localStorage`.
- **Automatic Synchronization**: A dedicated `useEffect` automatically serializes and writes `cartItems` to `localStorage` on any add, update, or remove operation.
- **Data Integrity & Fallback**:
  - Malformed JSON or private browsing restrictions are handled safely via `try/catch` with fallback to `[]`.
  - Stored items are verified against the catalog to refresh prices and discard stale entries.
  - Quantities are strictly coerced into positive integers (`Math.floor(n) >= 1`).

---

## 🧭 Routing

Client-side navigation is powered by `react-router-dom`:

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Product catalog with search and category filtering |
| `/product/:id` | `ProductDetail.jsx` | Full product view with gallery, highlights, and add to cart |
| `/cart` | `Cart.jsx` | Shopping cart list, quantity controls, and order summary |
| `*` | `<Navigate to="/" replace />` | Wildcard route redirecting invalid URLs to Home |

---

## 🎨 Design & Aesthetics

- **Dark-First Theme**: Crafted with high-contrast surfaces (`#0B0B0D` background, `#151515` cards, and `#292929` borders).
- **Vibrant Accent**: Electric orange (`#FF6B00`) for primary buttons, active badges, and highlights.
- **Micro-Interactions**: Hover transitions on product cards, category pills, wishlist buttons, and cart actions.
- **Typography & Formatting**: Clean typography with currency values formatted according to Indian numbering standards (`₹` with `en-IN` formatting).

---
