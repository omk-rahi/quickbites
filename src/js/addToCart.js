import axios from "axios";

import showToast from "./showToast";

const addToCart = async (itemId) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${location.origin}/api/v1/cart`,
      data: {
        itemId,
      },
    });

    if (res.status === 200) {
      const cartCount = res.data.data.cart.items.length;
      showToast("Item added to cart");
      document.querySelector(".cart-count").textContent = cartCount;
    }
  } catch (err) {
    if (err.response.status === 401) {
      location.assign("/login");
    }
  }
};

export default addToCart;
