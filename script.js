const toggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector(".mobile-nav");

function closeMobileNav() {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute("aria-expanded", "false");
  mobileNav.hidden = true;
}

if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav =
      mobileNav.contains(event.target) || toggle.contains(event.target);

    if (!clickedInsideNav) {
      closeMobileNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const finalSubject =
      subject || `Portfolio inquiry from ${name || "Website Visitor"}`;

    const body = [
      "Hi Eric,",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailtoUrl =
      `mailto:kimeric717@gmail.com` +
      `?subject=${encodeURIComponent(finalSubject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  });
}

const projectCards = document.querySelectorAll(".project");
let projectTimer = null;

function closeAllProjects() {
  projectCards.forEach((card) => card.classList.remove("is-open"));
}

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    clearTimeout(projectTimer);
    closeAllProjects();

    projectTimer = setTimeout(() => {
      card.classList.add("is-open");
    }, 500);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(projectTimer);
    card.classList.remove("is-open");
  });

  const popout = card.querySelector(".project-popout");
  if (popout) {
    popout.addEventListener("mouseenter", () => {
      clearTimeout(projectTimer);
      closeAllProjects();
      card.classList.add("is-open");
    });

    popout.addEventListener("mouseleave", () => {
      card.classList.remove("is-open");
    });
  }
});
