"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// auto scroll testimonials
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".testimonials-list");
  const scrollAmount = container.clientWidth; // Scroll by container width
  let direction = 1; // 1 for forward, -1 for backward

  function autoScroll() {
    container.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });

    // Reverse direction when reaching the end
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      direction = -1;
    } else if (container.scrollLeft === 0) {
      direction = 1;
    }
  }

  setInterval(autoScroll, 3000); // Scroll every 3 seconds
});


// client variables
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("client-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close");

    // Select all images inside .clients-item
    document.querySelectorAll(".clients-item img").forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "flex"; // Show the modal
        modalImg.src = this.src; // Set clicked image in modal
      });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });



// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (
      selectedValue === filterItems[i].dataset.category.toLowerCase()
    ) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}


// page navigation variables for Navbar
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}


// Contact form 
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("mLbCdvil21jK1xqbT"); // Replace with your EmailJS Public Key

  const form = document.querySelector("[data-form]");
  const inputs = document.querySelectorAll("[data-form-input]");
  const submitButton = document.querySelector("[data-form-btn]");

  // Function to check if all fields are filled
  function checkInputs() {
    let allFilled = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
      }
    });
    submitButton.disabled = !allFilled;
  }

  // Add event listener to enable the button
  inputs.forEach((input) => {
    input.addEventListener("input", checkInputs);
  });

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const formData = {
      fullname: form.fullname.value,
      email: form.email.value,
      message: form.message.value,
    };

    // Send the email using EmailJS
    emailjs
      .send("service_n7wqhol", "template_b2hba1q", formData)
      .then(() => {
        alert("Message sent successfully!");
        form.reset();
        checkInputs(); // Disable button again
      })
      .catch((error) => {
        alert("Failed to send message. Please try again.");
        console.error("EmailJS Error:", error);
      });
  });
});
