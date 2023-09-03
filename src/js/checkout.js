import axios from "axios";

import showToast from "./showToast";

const checkout = async (e) => {
  e.preventDefault();

  const phoneNumber = document.querySelector(".phone").value;
  const shippingAddress = document.querySelector(".address").value;

  try {
    const res = await axios({
      method: "POST",
      url: `${location.origin}/api/v1/orders`,
      data: {
        phoneNumber,
        shippingAddress,
      },
    });

    if (res.data.status === "success") {
      showToast("Order placed successfully");

      setTimeout(() => {
        location.assign("/orders");
      }, 1000);
    }
  } catch (err) {
    showToast(err.response.data.message, "error");
  }
};

export default checkout;
