import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { HeroUIProvider } from "@heroui/react";
import CounterContextProvider from './contexts/counterContext.jsx'
import AuthContextProvider from './contexts/AuthContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { WishlistProvider } from './contexts/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>
        <AuthContextProvider>
           <CartProvider>
              <WishlistProvider>
          <App />
          </WishlistProvider>
          </CartProvider>
        </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode >,
)
