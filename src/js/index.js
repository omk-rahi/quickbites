import "../scss/main.scss";

import register from "./registerController";

import login from "./loginController";

import addToCart from "./addToCart";

import checkout from "./checkout";

const registerForm = document.querySelector(".register__form");
if (registerForm) registerForm.addEventListener("submit", register);

const loginForm = document.querySelector(".login__form");

if (loginForm) loginForm.addEventListener("submit", login);

const items = document.querySelector(".items");

if (items) {
  items.addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-to-cart")) return;
    const itemId = e.target.dataset.item;
    addToCart(itemId);
  });
}

const checkOutForm = document.querySelector(".checkout");

if (checkOutForm) checkOutForm.addEventListener("submit", checkout);
