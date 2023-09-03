import axios from "axios";

const register = async (e) => {
  e.preventDefault();

  const registerBtn = document.querySelector(".register-btn");
  const formError = document.querySelector(".form__error");

  const name = document.querySelector(".register-name").value;
  const email = document.querySelector(".register-email").value;
  const password = document.querySelector(".register-password").value;

  registerBtn.innerHTML = `
  <div class="loader"></div>
`;

  try {
    const res = await axios({
      url: `${location.origin}/api/v1/register`,
      method: "POST",
      data: {
        name,
        email,
        password,
      },
    });

    location.assign("/");
  } catch (err) {
    const message = err.response.data.message;
    formError.textContent = message;
  } finally {
    registerBtn.innerHTML = "Register";
  }
};

export default register;
