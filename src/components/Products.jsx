import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";

const Products = () => {
  const [skip, setSkip] = useState(0);
  const { data } = useFetch(`/products`, { limit: 8, skip: skip }, [skip]);
  const dispatch = useDispatch();

  const onChange = (page) => {
    setSkip(page);
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {data?.products?.map((product) => (
          <div
            key={product.id}
            className="relative bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-60 object-contain"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                {product.name}
              </h2>
              <p className="text-gray-700 text-lg">${product.price}</p>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE_WISHLIST", payload: product })
                }
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <FaHeart size={20} />
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "ADD_TO_CART", payload: product })
                }
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-green-50 text-gray-600 hover:text-green-500 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <FaShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-4">
        <Pagination
          align="center"
          current={skip}
          onChange={onChange}
          defaultCurrent={1}
          total={50}
        />
        <br />
      </div>
    </>
  );
};

export default Products;
