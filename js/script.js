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
      message: message,
    };

    // Log the object
    console.log("Form submitted", formData);
  });


// poduct slider
const slider = document.querySelector(".slider-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const products = document.querySelectorAll(".product-card");
const dotsContainer = document.querySelector(".slider-dots");

let currentIndex = 0;
let productsPerView = calculateProductsPerView(); 
let maxIndex = Math.ceil(products.length / productsPerView) -  (window.innerWidth < 768 ? 1 : 0) ;

// Function to calculate products per view based on the window width
function calculateProductsPerView() {
    return window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
}

// Create dots
function createDots() {
    dotsContainer.innerHTML = ''; 
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}
createDots();

// Update dots
function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

// Slide to specific index

function goToSlide(index) {
    currentIndex = index;
    const offset = -(currentIndex * (100 / productsPerView));
    slider.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Next slide
function nextSlide() {
    if (currentIndex < maxIndex) {
        goToSlide(currentIndex + 1);
    }else {
      goToSlide(0); // Loop back to start
    }
}

// Previous slide
function prevSlide() {
    if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
    }else {
      goToSlide(maxIndex); // Loop to end
    }
}

// Event listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto slide
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
});

slider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Window resize handler
window.addEventListener("resize", () => {
  const newProductsPerView = calculateProductsPerView();
  
  if (newProductsPerView !== productsPerView) {
      productsPerView = newProductsPerView;
      maxIndex = Math.ceil(products.length / productsPerView) - (window.innerWidth < 768 ? 1 : 0);
      currentIndex = Math.min(currentIndex, maxIndex); 
      goToSlide(currentIndex); 
      createDots(); 
  }
});
});
