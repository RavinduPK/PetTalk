document.querySelectorAll('.input').forEach(input => {
  input.addEventListener('focus', () => {
    input.style.backgroundColor = "#f1f8e9";
  });
  input.addEventListener('blur', () => {
    input.style.backgroundColor = "white";
  });
});

// Format card number: xxxx xxxx xxxx xxxx
  const cardInput = document.getElementById("cardNumber");
  cardInput.addEventListener("input", function () {
    let value = cardInput.value.replace(/\D/g, "").substring(0, 16);
    cardInput.value = value
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  });

  // Limit CVV to 3 digits
  const cvvInput = document.getElementById("cvv");
  cvvInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").substring(0, 3);
  });

  // Format MM/YY input
  const expiryInput = document.getElementById("expiry");
  expiryInput.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "").substring(0, 4);
    if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    this.value = value;
  });

  // Form validation
  document.getElementById("payBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const card = cardInput.value.replace(/\s/g, "");
    const cvv = cvvInput.value;
    const expiry = expiryInput.value;
    const email = document.getElementById("email").value;

    const cardRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cardRegex.test(card)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }
    if (!cvvRegex.test(cvv)) {
      alert("CVV must be 3 digits.");
      return;
    }
    if (!expiryRegex.test(expiry)) {
      alert("Please enter a valid expiry date in MM/YY format.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    alert("Payment Successful!");
  });

  // Show real-time clock
  function updateTime() {
    const now = new Date();
    document.getElementById("currentTime").textContent = now.toLocaleString();
  }

  setInterval(updateTime, 1000);
  window.onload = updateTime;

  