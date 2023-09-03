const showToast = (message, type = "success") => {
  const toastMarkup = `
        <div class="toast toast__${type}">
        ${
          type === "success"
            ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 toast__icon"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 toast__icon"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>'
        }
            <p class="toast__message">${message}</p>
        </div>
    `;

  const toasts = document.querySelectorAll(".toast");

  toasts.forEach(
    (toast, i) => (toast.style.transform = `translateY(-${(i + 1) * 10}rem)`)
  );

  document.body.insertAdjacentHTML("afterbegin", toastMarkup);

  setTimeout(() => {
    const toasts = Array.from(document.querySelectorAll(".toast")).reverse();

    toasts.at(0).remove();
  }, 2000);
};

export default showToast;
