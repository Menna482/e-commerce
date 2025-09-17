import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ProductDetailsPage() {
  const { id } = useParams(); // 👈 نجيب الـ id من الرابط
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* صورة المنتج */}
        <div className="flex justify-center">
          <img
            src={product.imageCover}
            alt={product.title}
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-green-600 font-semibold text-lg mb-2">
            {product.price} EGP
          </p>
          <div className="flex items-center text-yellow-500 mb-6">
            <AiFillStar className="mr-1" />
            <span>{product.ratingsAverage}</span>
          </div>

          <button
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            onClick={() => addToCart({ ...product, id: product._id })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
