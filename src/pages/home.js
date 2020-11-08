import React, { useState } from "react";
import Seo from "../components/Seo/";
import { gql, useQuery } from "@apollo/client";
import Product from "../components/Product";
import Modal from "../components/Modal";
import { updateCart } from "../utils/utils";

const Home = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const addNewCart = (id, data) => {
    const obj = [...data];
    let cart = JSON.parse(localStorage.getItem("cart"));
    obj.forEach((e) => {
      if (e.id === id) {
        // e.count = 1;
        if (cart === null) {
          cart = [];
          cart.push({ ...e, count: 1 });
        } else {
          if (cart.filter((e) => e.id === id).length > 0) {
            cart.forEach((e) => {
              if (e.id === id) {
                updateCart(e);
              }
            });
          } else {
            cart.push({ ...e, count: 1 });
          }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });

    setOpen(true);
  };

  const Products = gql`
    query products {
      products {
        id
        title
        image_url
        price(currency: USD)
      }
    }
  `;

  let products;
  const { loading, error, data } = useQuery(Products);

  if (loading) {
    products = <div>Loading products ...</div>;
  } else if (error) {
    products = <div>{error.message}</div>;
  } else {
    products = (
      <div className="product-list">
        {data.products.map((e) => {
          return (
            <Product
              key={e.id}
              item={e}
              addCart={() => addNewCart(e.id, data.products)}
            />
          );
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Seo page="Home">
        <main id="main">
          <section>
            <div className="bg-white container">
              <h1 className="heading">All Products</h1>
              <p>A 360&#xb0; look at Lumin</p>
            </div>
          </section>
          <section>
            <div className="container bg-ash">{products}</div>
          </section>
          {open && <Modal close={closeModal}></Modal>}
        </main>
      </Seo>
    </React.Fragment>
  );
};

export default Home;
