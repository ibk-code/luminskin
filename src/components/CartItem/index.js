import React from "react";

const CartItem = ({ item, curr, decrease, increase, remove }) => {
  return (
    <React.Fragment>
      <div className="cart-item">
        <div className="cart-head">
          <p>{item && item.title}</p>
          <span className="remove" onClick={remove}>
            &times;
          </span>
        </div>
        {item && <img src={item.image_url || " "} alt="Product description" />}
        <div className="cart-count">
          <div className="count">
            <span onClick={decrease}>-</span>
            <span>{item && item.count}</span>
            <span onClick={increase}>+</span>
          </div>
          <div>
            <p>
              {curr &&
                `${curr === "USD" ? "$" : curr}${item.price * item.count}.00`}
              {/* 29 */}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartItem;
