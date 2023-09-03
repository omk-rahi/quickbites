import axios from "axios";

import showToast from "./showToast";

const login = async (e) => {
  e.preventDefault();

  const loginBtn = document.querySelector(".login-btn");
  const formError = document.querySelector(".form__error");

  const email = document.querySelector(".login-email").value;
  const password = document.querySelector(".login-password").value;

  loginBtn.innerHTML = `
  <div class="loader"></div>
  `;

  try {
    const res = await axios({
      url: `${location.origin}/api/v1/login`,
      method: "POST",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showToast("Logged in successfully.");
      setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    const message = err.response.data.message;
    formError.textContent = message;
  } finally {
    loginBtn.innerHTML = "Login";
  }
};

export default login;
