import EmptyCart from "../../components/EmptyCart";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import plus from "../../components/assets/svg/plus.png";
import minus from "../../components/assets/svg/minus.png";
import "./cart.css";
import { BASE_URL } from "../../utils/Constants";
import Loading from "../../components/Loading";
import x from "../../components/assets/svg/x-symbol.svg";
import CartContext from "../../contexts/CartContext";
import AuthContext from "../../contexts/AuthContext";
import CartSection from "../../components/CartSection";

function Cart() {
  const {
    carts,
    removeCart,
    increaseQty,
    reduceQty,
    getCart,
    loading,
    empty,
    total,
  } = useContext(CartContext);
  const { isAuth, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    getCart();
    return () => getCart();
  }, [isAuth]);

  const checkout = () => {
    const item = [];
    carts.map((i) => item.push(i.id));
    axios
      .post(
        `${BASE_URL}/order`,
        { items: item },
        {
          headers: { Authorization: `${user.token_type} ${user.access_token}` },
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : empty === 404 ? (
        <EmptyCart />
      ) : (
        <div>
          <div className="container p-8 max-w-full mx-auto mt-20">
            <div className="w-full ">
              <div className="hidden lg:block">
                <div className="border-b flex justify-between mx-16">
                  <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl ">
                    Product Image
                  </div>
                  <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl ">
                    Product Description
                  </div>
                  <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl ml-24">
                    Quantity
                  </div>
                  <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl">
                    Remove
                  </div>
                  <div className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap text-2xl">
                    Price
                  </div>
                </div>
              </div>
              <CartSection
                carts={carts}
                increaseQty={increaseQty}
                plus={plus}
                reduceQty={reduceQty}
                minus={minus}
                removeCart={removeCart}
                x={x}
              />
            </div>
            <div className="mt-4 mx-auto max-w-sm lg:max-w-7xl border-t-2 flex items-center">
              <div className="py-4">
                <div className="flex space-x-4 items-center px-4 py-2">
                  <span className="text-xl text-gray-600 font-bold border-2 border-gray-300 p-3 py-4 uppercase">
                    Total: ${total}
                  </span>
                  <button
                    onClick={() => checkout()}
                    className="p-2 border border-cyan-500 py-4 text-xl items-center text-center text-white bg-cyan-500 rounded-md shadow hover:bg-cyan-600"
                  >
                    <Link to={"/checkout"}>Proceed to Checkout</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-40" />
        </div>
      )}
    </div>
  );
}

export default Cart;
