import React, { useState, useEffect } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import CartItem from "../CartItem";
import { updateCart } from "../../utils/utils";
// import Product from "../Product";

const Modal = ({ close }) => {
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [total, setTotal] = useState(0);

  const client = useApolloClient();

  const Currencies = gql`
    query currency {
      currency
    }
  `;

  const Products = gql`
    query products($currency: Currency!) {
      products {
        id
        price(currency: $currency)
      }
    }
  `;

  const changeCurrency = async (e) => {
    try {
      const curr = e.target.value;
      const { data } = await client.query({
        query: Products,
        variables: { currency: curr },
      });
      const obj = [...products];

      obj.forEach((e) => {
        const nValue = data.products.filter((elem) => elem.id === e.id);
        e.price = nValue[0].price;
      });
      setProducts(obj);
      setCurrency(curr);
    } catch (e) {
      console.log("error occured");
    }
  };

  const { loading, error, data } = useQuery(Currencies);

  const getCartProducts = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setProducts(cart);
  };

  const getTotal = () => {
    let total = 0;
    products.forEach((e) => {
      total = total + e.price * e.count;
    });
    setTotal(total);
  };

  const increaseCart = (id) => {
    let obj = JSON.parse(localStorage.getItem("cart"));
    obj.forEach((e) => {
      if (e.id === id) {
        updateCart(e);
      }
    });

    const obj2 = [...products];

    obj2.forEach((e) => {
      const nValue = obj.filter((elem) => elem.id === e.id);
      e.count = nValue[0].count;
    });
    setProducts(obj2);
    localStorage.setItem("cart", JSON.stringify(obj));
    getTotal();
  };

  const removeProduct = (id) => {
    const obj = JSON.parse(localStorage.getItem("cart"));

    const newObj = obj.filter((e) => e.id !== id);

    const nProduct = products.filter((e) => e.id !== id);

    setProducts(nProduct);
    getTotal();
    localStorage.setItem("cart", JSON.stringify(newObj));
  };

  const decreaseCart = (id) => {
    let obj = JSON.parse(localStorage.getItem("cart"));
    obj.forEach((e) => {
      if (e.id === id) {
        if (e.count === 1) {
          removeProduct(id);
        } else {
          e.count = e.count - 1;
          localStorage.setItem("cart", JSON.stringify(obj));

          const nProducts = [...products];
          nProducts.forEach((elem) => {
            if (elem.id === id) {
              elem.count = e.count;
            }
          });
          setProducts(nProducts);
          getTotal();
        }
      }
    });
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    getTotal();
  }, [products]);

  return (
    <React.Fragment>
      <section>
        <div className="modal">
          <div className="cart-wrapper bg-ash">
            <div className="cart-header">
              <div className="hide" onClick={close}>
                <span className="fas fa-angle-left"></span>
              </div>
              <div>
                <p>YOUR CART</p>
              </div>
              <div></div>
            </div>
            <select
              className="currency-selector"
              value={currency}
              onChange={changeCurrency}
            >
              {data &&
                data.currency.map((e, i) => {
                  return (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  );
                })}
            </select>
            <div className="cart-products">
              {products.length === 0 || null ? (
                <p className="center">
                  No products has been added. Add a product
                </p>
              ) : (
                products.map((e) => {
                  return (
                    <CartItem
                      key={e.id}
                      item={e}
                      curr={currency}
                      increase={() => {
                        increaseCart(e.id);
                      }}
                      decrease={() => {
                        decreaseCart(e.id);
                      }}
                      remove={() => {
                        removeProduct(e.id);
                      }}
                    />
                  );
                })
              )}
            </div>
            <div className="cart-total">
              <div className="subtotal">
                <p>Subtotal</p>
                <p>
                  {currency &&
                    `${currency === "USD" ? "$" : currency}${total}.00`}
                </p>
              </div>
              <button className="btn-cart">PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Modal;
