import React, { useEffect, useState } from "react";
import axios from "axios";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data.data);
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="py-10 container mx-auto relative">
      {/* البانر */}
      {selectedBrand && (
        <div
          className="fixed inset-0 flex justify-center items-start pt-6 z-50 bg-transparent"
          onClick={() => setSelectedBrand(null)}
        >
          <div
            className="bg-white shadow-lg rounded-lg p-6 w-[90%] sm:w-[80%] md:w-[30%] border border-green-600 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* الصورة والاسم جنب بعض */}
            <div className="flex items-center justify-between mb-4 gap-4">
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="h-40 w-1/2 object-contain"
              />
              <h2 className="text-lg sm:text-xl font-semibold text-green-700 w-1/2 text-center">
                {selectedBrand.name}
              </h2>
            </div>

            {/* زر إغلاق تحت */}
      <div className="flex justify-center mt-2">
  <button
    onClick={() => setSelectedBrand(null)}
    className="w-32 bg-gray-300 text-gray-800 text-lg font-semibold py-2 rounded hover:bg-gray-400 transition"
  >
    Close
  </button>
</div>

          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Shop by Brand</h2>

      {/* شبكة الماركات */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => setSelectedBrand(brand)}
            className="border border-gray-200 rounded-md overflow-hidden cursor-pointer bg-white 
                       transition-all duration-300 hover:border-green-600 hover:shadow-lg hover:scale-105 transform"
          >
            <div className="w-full h-60 flex items-center justify-center overflow-hidden">
              <img
                src={brand.image}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-3 text-center bg-white">
              <p className="text-green-700 font-semibold text-lg">
                {brand.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brands;
