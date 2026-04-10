import { loadComponentToBody } from "/utilities/loadComponent.js";

// -----------------------------
// INIT
// -----------------------------
export async function initContactModal() {
  if (document.getElementById("contactModal")) return;

  await loadComponentToBody("/components/contactModal.html");

  setupModal();
}

// -----------------------------
// SETUP
// -----------------------------
function setupModal() {
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("closeContact");
  const form = document.getElementById("contactForm");

  if (!modal) {
    console.error("Modal not found");
    return;
  }

  // CLOSE BUTTON
  closeBtn?.addEventListener("click", close);

  // CLICK OUTSIDE
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  // -----------------------------
  // GLOBAL TRIGGER (works with dynamic header)
  // -----------------------------
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-contact-trigger]");
    if (!trigger) return;

    e.preventDefault();
    open();
  });

  // -----------------------------
  // NETLIFY AJAX SUBMIT
  // -----------------------------
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = form.querySelector("button");
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const formData = new FormData(form);

      // Netlify needs this explicitly
      formData.append("form-name", "contact");

      await fetch("/", {
        method: "POST",
        body: formData,
      });

      form.reset();
      close();
      showThankYouPopup();

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    button.disabled = false;
    button.textContent = originalText;
  });
}

// -----------------------------
// MODAL CONTROLS
// -----------------------------
function getModal() {
  return document.getElementById("contactModal");
}

export function open() {
  getModal()?.classList.remove("hidden");
}

export function close() {
  getModal()?.classList.add("hidden");
}

// -----------------------------
// THANK YOU POPUP
// -----------------------------
function showThankYouPopup() {
  // Create popup
  const popup = document.createElement("div");
  popup.className = "contact-modal";

  popup.innerHTML = `
    <div class="contact-message">
      <button class="contact-close">&times;</button>
      <h2>Thank you!</h2>
      <p>Your message has been sent.</p>
      <p>Closing in <span id="countdown">5</span>...</p>
    </div>
  `;

  document.body.appendChild(popup);

  const closeBtn = popup.querySelector(".contact-close");
  closeBtn.addEventListener("click", () => location.reload());

  // Countdown
  let time = 5;
  const countdownEl = popup.querySelector("#countdown");

  const interval = setInterval(() => {
    time--;
    countdownEl.textContent = time;

    if (time <= 0) {
      clearInterval(interval);
      location.reload();
    }
  }, 1000);
}