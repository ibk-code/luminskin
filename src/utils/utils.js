export const updateCart = (e) => {
  e.count = e.count + 1;
};

export const decreaseCart = (e) => {
  if (e.count === 1) {
    console.log("remove from count");
  } else {
    e.count = e.count - 1;
  }
};
