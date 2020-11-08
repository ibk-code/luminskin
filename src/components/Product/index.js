import React from "react";

const Product = ({ item, addCart }) => {
  return (
    <React.Fragment>
      <div className="products-item">
        <div>
          <img src={item.image_url} alt="Product description" />
          <p className="center title">{item.title}</p>
        </div>
        <p className="center">From ${item.price}.00</p>
        <button className="btn-cart solid" onClick={addCart}>
          Add to Cart
        </button>
      </div>
    </React.Fragment>
  );
};

export default Product;
