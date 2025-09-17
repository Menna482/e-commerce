import React from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  // 🟢 إضافة المنتج للكارت مع تعديل الصورة
  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      id: item.id,
      image: item.imageCover, // ✅ عشان الكارت يقرأ الصورة صح
    });
    alert("✅ Added to cart");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty </p>
      ) : (
        <>
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg shadow"
              >
                {/* الصورة + التفاصيل */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageCover} // ✅ الصورة هنا من الـ wishlist
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.price} EGP</p>
                  </div>
                </div>

                {/* الأزرار */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* زرار مسح الكل */}
          <button
            onClick={clearWishlist}
            className="mt-6 bg-gray-800 text-white px-4 py-2 rounded"
          >
            Clear Wishlist
          </button>
        </>
      )}
    </div>
  );
}
