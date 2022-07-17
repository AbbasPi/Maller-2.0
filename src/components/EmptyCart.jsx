import React from "react";
import { Link } from "react-router-dom";

function EmptyCart(props) {
  return (
    <div className="font-[Poppins]">
      <div className="my-64">
        <h3 className="font-bold text-4xl">Your Cart Is Empty</h3>
        <p className="text-xl mt-6 ">Add Some Products</p>
        <button className="bg-cyan-500 p-2 my-2 hover:bg-cyan-700 rounded-md">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/products"
          >
            Go To Products
          </Link>
        </button>
        <p className="ecp"> </p>
        <button className="bg-white border p-2 my-2 rounded-md hover:bg-gray-200">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/checkout"
          >
            Checkout
          </Link>
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;
