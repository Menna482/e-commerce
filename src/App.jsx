import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainLayout from './layouts/MainLayout'
import FeedPage from './pages/FeedPage'
import ProductsListPage from './pages/ProductsListPage'   // 👈 استيراد صفحة كل المنتجات
import ProductDetailsPage from './pages/ProductDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute'

import Categories from './pages/Categories'
import Brands from './pages/Brands'

// ✅ استيراد CartProvider
import { CartProvider } from './contexts/CartContext'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishListPage'


const router = createBrowserRouter([
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <ProtectedAuthRoute>
            <LoginPage />
          </ProtectedAuthRoute>
        )
      },
      {
        path: 'register',
        element: (
          <ProtectedAuthRoute>
            <RegisterPage />
          </ProtectedAuthRoute>
        )
      }
    ]
  },
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'products',
        element: (
          <ProtectedRoute>
            <ProductsListPage />   {/* 👈 صفحة عرض كل المنتجات */}
          </ProtectedRoute>
        )
      },
      {
        path: 'products/:id',
        element: (
          <ProtectedRoute>
            <ProductDetailsPage /> {/* 👈 صفحة تفاصيل المنتج */}
          </ProtectedRoute>
        )
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        )
      },
      {
        path: 'brands',
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        )
      },
      {
        path: 'carts',
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'wishlist',
        element: (
          <WishlistPage>
            <CartPage />
          </WishlistPage>
        )
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])

function App() {
  return (
    <>
      {/* 🛒 هنا لفيت التطبيق كله بالـ CartProvider */}
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  )
}

export default App
