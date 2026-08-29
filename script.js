const nav = document.querySelector(".nav");
const toggle = document.querySelector(".menu-toggle");
const contactModal = document.querySelector(".contact-modal");
const closeModal = document.querySelector(".modal-close");
const contactForm = document.querySelector(".contact-form");
const modalTriggers = document.querySelectorAll("[data-open-contact]");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a, .footer a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const openContactModal = () => {
  if (!contactModal) return;
  contactModal.showModal();
  document.body.classList.add("modal-open");
  contactModal.querySelector("input")?.focus();
};

const closeContactModal = () => {
  contactModal?.close();
  document.body.classList.remove("modal-open");
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    nav?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    openContactModal();
  });
});

closeModal?.addEventListener("click", closeContactModal);

contactModal?.addEventListener("click", (event) => {
  if (event.target === contactModal) closeContactModal();
});

contactModal?.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = contactForm.querySelector(".form-note");
  const submitButton = contactForm.querySelector(".form-submit");
  const formData = new FormData(contactForm);

  if (note) note.textContent = "Enviando solicitud...";
  if (submitButton) submitButton.disabled = true;

  fetch(contactForm.action, {
    method: contactForm.method,
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo enviar la solicitud.");
      if (note) {
        note.textContent = "Solicitud recibida. Nuestro equipo VIP te contactará en breve.";
      }
      contactForm.reset();
    })
    .catch(() => {
      if (note) {
        note.textContent = "No se pudo enviar. Intenta nuevamente o escribe a info@aeroluxes.com.";
      }
    })
    .finally(() => {
      if (submitButton) submitButton.disabled = false;
    });
});
