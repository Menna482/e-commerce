import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // 🟢 نجيب المنتجات
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setProducts(data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  // ✅ اخفاء الرسالة بعد 3 ثواني
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 🟢 دالة الإضافة للكارت
  function handleAddToCart(product) {
    addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      imageCover: product.imageCover, // ✅統一
    });

    setMessage({ text: `${product.title} added to cart 🛒`, type: "success" });
  }

  // 🟢 دالة التبديل في الـ Wishlist
  function handleWishlist(product) {
    const isInWishlist = wishlist.some((item) => item.id === product._id);

    if (isInWishlist) {
      removeFromWishlist(product._id);
      setMessage({
        text: `${product.title} removed from wishlist 💔`,
        type: "error",
      });
    } else {
      addToWishlist({
        id: product._id,
        title: product.title,
        price: product.price,
        imageCover: product.imageCover, // ✅統一
      });
      setMessage({
        text: `${product.title} added to wishlist ❤️`,
        type: "success",
      });
    }
  }

  return (
    <div className="relative p-6">
      {/* ✅ الرسالة */}
      {message && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* ✅ المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isInWishlist = wishlist.some(
            (item) => item.id === product._id
          );

          return (
            <div
              key={product._id}
              className="group border rounded-lg p-4 relative cursor-pointer hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* صورة المنتج */}
              <img
                src={product.imageCover}
                alt={product.title}
                className="h-48 w-full object-contain mb-4"
              />

              {/* تفاصيل المنتج */}
              <p className="text-green-600 text-sm">{product.category?.name}</p>
              <h3 className="font-semibold text-base mb-1 truncate">
                {product.title}
              </h3>
              <p className="text-gray-700 mb-2">{product.price} EGP</p>

              {/* التقييم + القلب */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-yellow-500">
                  <AiFillStar className="mr-1" />
                  <span>{product.ratingsAverage}</span>
                </div>
                <button
                  className="text-gray-600 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                >
                  <FaHeart
                    size={18}
                    className={`transition ${
                      isInWishlist ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* زر Add to Cart */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="mt-auto px-4 py-2 bg-green-600 text-white rounded-lg transition hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
