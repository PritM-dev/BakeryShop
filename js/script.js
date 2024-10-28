document.addEventListener("DOMContentLoaded", function () {
  // Log clicks on product cards
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("click", function () {
      console.log("Product clicked:", this.querySelector("h3").textContent);
    });
  });

  // Log form submissions
  const contactForm = document.querySelector("#contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
     // Get the input values
     const name = document.querySelector("#name").value;
     const email = document.querySelector("#email").value;
     const message = document.querySelector("#message").value;
 
    // Create an object to hold the form details
    const formData = {
      name: name,
      email: email,
      message: message
  };

  // Log the object
  console.log("Form submitted", formData);
  });
});
