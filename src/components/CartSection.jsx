import React from "react";
import { Link } from "react-router-dom";

function CartSection({
  carts,
  map,
  product,
  id,
  images,
  image,
  name,
  increaseQty,
  plus,
  reduceQty,
  minus,
  removeCart,
  x,
  lowest,
}) {
  return (
    <div>
      {carts?.map((product) => {
        return (
          <div
            key={product?.id}
            className="bg-gray-100 rounded-xl max-w-full lg:mx-16 lg:flex justify-between
                         items-center p-6 mt-8"
          >
            <div>
              <Link
                className="flex justify-center my-3"
                to={`/product/${product.product.id}`}
              >
                <img
                  src={product?.product.images[0].image}
                  alt={product?.product.name}
                  className="object-contain w-96 h-36 lg:w-36 rounded-2xl bg-gray-100"
                />
              </Link>
            </div>
            <Link
              className="flex justify-center my-3"
              to={`/product/${product.product.id}`}
            >
              <div className=" text-xl font-semibold text-center w-96">
                {product?.product.name}
              </div>
            </Link>
            <div className="flex items-center justify-between space-x-6 font-semibold ">
              <img
                alt=""
                onClick={() => increaseQty(product.id)}
                src={plus}
                className="w-8 hover:cursor-pointer"
              />
              <span className="text-3xl font-[Poppins] text-black text-center lg:whitespace-nowrap">
                {product.item_qty}
              </span>
              <img
                alt=""
                onClick={() => reduceQty(product.id)}
                src={minus}
                className="w-8 hover:cursor-pointer"
              />
            </div>
            <div className="p-4 px-6 text-center lg:whitespace-nowrap">
              <button
                onClick={() => removeCart(product.id, product.product.id)}
              >
                <img className="border p-4" src={x} alt="" />
              </button>
            </div>
            <div className="lg:p-4 lg:px-6 text-3xl font-[Poppins] text-black text-center lg:whitespace-nowrap">
              ${product?.product.lowest}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CartSection;
