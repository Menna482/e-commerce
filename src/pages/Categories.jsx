import React, { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="py-10 container mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">Shop by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="border rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition bg-white"
          >
            {/* الصورة */}
            <div className="w-full h-72 bg-white flex items-center justify-center overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* اسم الكاتيجوري */}
            <div className="p-3 text-center bg-white">
              <p className="text-green-700 font-semibold text-lg">
                {cat.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
