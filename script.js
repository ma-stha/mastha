"use strict";

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");
const formBtnLabel = formBtn.querySelector("span");

// add event to all form input fields
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

// submit the form over AJAX so the page never navigates away
form.addEventListener("submit", function (e) {
  e.preventDefault();

  formBtn.setAttribute("disabled", "");
  formBtnLabel.textContent = "Sending...";
  formStatus.textContent = "";
  formStatus.classList.remove("is-error", "is-success");

  const ajaxAction = form.action.replace(
    "formsubmit.co/",
    "formsubmit.co/ajax/"
  );

  fetch(ajaxAction, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new FormData(form),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Request failed");
      return response.json();
    })
    .then(() => {
      formStatus.textContent =
        "Thanks — your message has been sent. I'll get back to you soon.";
      formStatus.classList.add("is-success");
      form.reset();
      formBtnLabel.textContent = "Send Message";
    })
    .catch(() => {
      formStatus.textContent =
        "Something went wrong. Please email me directly at manjilstha1123@gmail.com.";
      formStatus.classList.add("is-error");
      formBtnLabel.textContent = "Send Message";
      formBtn.removeAttribute("disabled");
    });
});

// page navigation variables
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

const projectItems = document.querySelectorAll(".project-item");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal content selectors
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalKeyFeatures = document.querySelector("[data-modal-key-features]");
const modalTechnologies = document.querySelector("[data-modal-technologies]");
const modalLink = document.querySelector("[data-modal-link]");

// Modal toggle function
const toggleModal = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Add click event to project items
projectItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Fetch data attributes
    const title = item.dataset.title;
    const description = item.dataset.description;
    const keyFeatures = JSON.parse(item.dataset.keyfeatures);
    const technologies = JSON.parse(item.dataset.technologies);
    const link = item.dataset.link;

    // Update modal content
    modalTitle.textContent = title;
    modalText.innerHTML = `<p>${description}</p>`;

    // Populate key features
    modalKeyFeatures.innerHTML = keyFeatures
      .map((feature) => `<li>${feature}</li>`)
      .join("");

    // Populate technologies
    modalTechnologies.textContent = technologies.join(", ");

    // Update project link
    modalLink.href = link;
    modalLink.textContent = "View Project";

    toggleModal();
  });
});

// Add click event to close button and overlay
modalCloseBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

// animate the "Core Expertise" progress bars in as they scroll into view
const skillBars = document.querySelectorAll(".skill-progress-fill");

const skillBarObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const bars = entry.target.querySelectorAll(".skill-progress-fill");
      bars.forEach((bar, index) => {
        setTimeout(() => {
          bar.classList.add("in-view");
        }, index * 150);
      });

      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.3 }
);

if (skillBars.length) {
  skillBarObserver.observe(document.querySelector(".skill .skills-list"));
}
