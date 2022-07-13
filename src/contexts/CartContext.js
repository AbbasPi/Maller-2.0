import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "react-simple-snackbar";
import { BASE_URL } from "../utils/Constants";
import AuthContext from "./AuthContext";
const initValue = {
  carts: [],
  loading: true,
  empty: 0,
  total: 0,
  count: 0,
  addToCarts: (obj) => {},
  getCart: () => {},
  removeCart: (id) => {},
  increaseQty: (id) => {},
  reduceQty: (id) => {},
};
const CartContext = createContext(initValue);
export const CartProvider = ({ children }) => {
  const { isAuth, user } = useContext(AuthContext);
  const options = {
    position: "bottom-right",
    style: {
      backgroundColor: "#5D90E8",
      border: "1px",
      color: "white",
      fontFamily: "Poppins",
      fontSize: "17px",
      textAlign: "center",
      padding: "1px",
    },
    closeStyle: {
      color: "white",
      fontSize: "15px",
    },
  };
  const [openSnackbar] = useSnackbar(options);
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(404);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, user]);

  useEffect(() => {
    if (count !== products.length) {
      setCount(products.length);
    }
    setProducts(carts?.map((cart) => cart.product.id));
    setLoading(false);
    setEmpty(0);
    setTotal(
      carts.reduce(
        (total, item) => total + item.product.lowest * item.item_qty,
        0
      )
    );
  }, [carts, products.length]);

  const getCart = () => {
    if (isAuth === true) {
      axios
        .get(`${BASE_URL}/cart/my`, {
          headers: { Authorization: `${user.token_type} ${user.access_token}` },
        })
        .then((res) => {
          setCarts([...res.data]);
        })
        .catch(function (error) {
          if (error.response) {
            setEmpty(error.response.status);
          }
        });
    }
  };

  const addToCarts = (cart) => {
    if (isAuth === true) {
      if (!products.includes(cart)) {
        setProducts(products.push(cart));
      }
      openSnackbar("Added To Cart");
      axios
        .post(
          `${BASE_URL}/cart/my`,
          { product_id: cart, item_qty: 1 },
          {
            headers: {
              Authorization: `${user.token_type} ${user.access_token}`,
            },
          }
        )
        .then((res) => {
          getCart();
          setEmpty(0);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isAuth === false) {
      openSnackbar("Login To Add To Cart");
    }
  };

  const removeCart = (id) => {
    if (isAuth === true) {
      let temCart = carts;
      temCart = temCart.filter((item) => item.id !== id);
      setCarts(temCart);
      axios
        .delete(`${BASE_URL}/cart/item/delete/${id}`, {
          headers: { Authorization: `${user.token_type} ${user.access_token}` },
        })
        .then(() => {
          setTimeout(() => getCart(), 5000);
        })
        .catch((err) => {
          console.log(err);
        });
      if (count === 0) {
        setEmpty(404);
      }
    }
  };

  const increaseQty = (id) => {
    isAuth &&
      axios
        .post(
          `${BASE_URL}/cart/item/increase/${id}`,
          { params: { id: id } },
          {
            headers: {
              Authorization: `${user.token_type} ${user.access_token}`,
            },
          }
        )
        .then((res) => {
          getCart();
          setTotal(
            carts.reduce(
              (total, item) => total + item.product.lowest * item.item_qty,
              0
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    carts.forEach((item) => {
      if (item.id === id) {
        item.item_qty++;
      }
    });
  };

  const reduceQty = (id) => {
    isAuth &&
      axios
        .post(
          `${BASE_URL}/cart/item/reduce/${id}`,
          { params: { id: id } },
          {
            headers: {
              Authorization: `${user.token_type} ${user.access_token}`,
            },
          }
        )
        .then((res) => {
          getCart();
          setTotal(
            carts.reduce(
              (total, item) => total + item.product.lowest * item.item_qty,
              0
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    carts.forEach((item) => {
      if (item.id === id) {
        item.item_qty--;
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        carts: carts,
        loading: loading,
        total: total,
        count: count,
        empty: empty,
        addToCarts,
        removeCart,
        reduceQty,
        increaseQty,
        getCart,
        setCount,
        setEmpty,
        setCarts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
