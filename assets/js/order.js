document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  if (!form) return;

  const msg = document.getElementById("orderMsg");
  const agree = document.getElementById("agree");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!agree || !agree.checked) {
      if (msg) msg.textContent = "Please agree to the Terms before submitting.";
      return;
    }

    // Demo behavior only (v0)
    if (msg) {
      msg.textContent =
        "Reservation submitted (demo). Next step: wire this to email delivery (SES) or a secure form provider.";
    }

    form.reset();
  });
});