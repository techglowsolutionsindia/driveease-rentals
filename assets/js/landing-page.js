/* Hero booking enquiry: client-side validation only, no live inventory or backend. */
(() => {
  "use strict";
  const form = document.getElementById("hero-booking");
  if (!form) return;
  const location = document.getElementById("hero-pickup-location");
  const pickup = document.getElementById("hero-pickup-date");
  const returning = document.getElementById("hero-return-date");
  const message = document.getElementById("hero-booking-message");
  const localToday = () => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };
  const showMessage = (text, success = false) => {
    message.textContent = text;
    message.hidden = false;
    message.classList.toggle("is-success", success);
  };
  const refreshDates = () => {
    const today = localToday();
    pickup.min = today;
    returning.min = pickup.value && pickup.value > today ? pickup.value : today;
    if (pickup.value && returning.value && returning.value < pickup.value)
      returning.value = "";
  };
  pickup.addEventListener("change", refreshDates);
  [location, pickup, returning].forEach((field) =>
    field.addEventListener("input", () => {
      field.removeAttribute("aria-invalid");
      message.hidden = true;
    }),
  );
  window.addEventListener("focus", refreshDates);
  refreshDates();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    refreshDates();
    const today = localToday();
    const fields = [location, pickup, returning];
    fields.forEach((field) => field.removeAttribute("aria-invalid"));
    const invalid = fields.find((field) => !field.value.trim());
    if (invalid) {
      invalid.setAttribute("aria-invalid", "true");
      showMessage("Please complete the pick-up location and both dates.");
      invalid.focus();
      return;
    }
    if (pickup.value < today || returning.value < pickup.value) {
      const field = pickup.value < today ? pickup : returning;
      field.setAttribute("aria-invalid", "true");
      showMessage(
        "Please select a valid pick-up date and a return date on or after it.",
      );
      field.focus();
      return;
    }
    const params = new URLSearchParams({
      pickupLocation: location.value,
      pickupDate: pickup.value,
      returnDate: returning.value,
    });

    window.location.href = `fleet.html?${params.toString()}#fleet-gallery`;
  });
})();

/* Cinematic car showcase: automatic crossfade, manual dots, and reduced-motion support. */
(() => {
  "use strict";
  const showcase = document.querySelector("#hero .hero-showcase");
  if (!showcase) return;

  const slides = [...showcase.querySelectorAll(".hero-showcase-slide")];
  const dots = [...showcase.querySelectorAll(".hero-showcase-dot")];
  const featureText = showcase.querySelector(".hero-feature-text");
  if (slides.length < 2 || slides.length !== dots.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let active = 0;
  let timer = null;
  let hovering = false;
  let focusWithin = false;

  const showSlide = (index) => {
    active = (index + slides.length) % slides.length;
    if (featureText)
      featureText.textContent =
        slides[active].dataset.feature || "Premium Car Rentals";
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === active);
      slide.setAttribute("aria-hidden", String(i !== active));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
      dot.setAttribute("aria-pressed", String(i === active));
    });
  };

  const stop = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  };

  /* ==================================================
     HERO SHOWCASE — AUTOMATIC ANIMATION CONTROL
  ================================================== */
  const resume = () => {
    stop();

    if (reducedMotion.matches || document.hidden || hovering) return;

    timer = window.setInterval(() => {
      showSlide(active + 1);
    }, 4800);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      dot.blur();
      resume();
    });
  });
  showcase.addEventListener("mouseenter", () => {
    hovering = true;
    stop();
  });
  showcase.addEventListener("mouseleave", () => {
    hovering = false;
    resume();
  });
  showcase.addEventListener("focusin", () => {
    focusWithin = true;
    stop();
  });
  showcase.addEventListener("focusout", (event) => {
    if (!showcase.contains(event.relatedTarget)) {
      focusWithin = false;
      resume();
    }
  });
  document.addEventListener("visibilitychange", resume);
  if (reducedMotion.addEventListener)
    reducedMotion.addEventListener("change", resume);
  else if (reducedMotion.addListener) reducedMotion.addListener(resume);
  showSlide(0);
  resume();
})();


/* =================================================
   07. PRICING PACKAGE POP-UP STARTED
================================================== */

(() => {
  "use strict";

  const modal = document.getElementById("pricing-details");
  const pricingSection = document.getElementById("pricing");

  if (!modal || !pricingSection) return;

  const title = document.getElementById("pricing-modal-title");
  const description = document.getElementById("pricing-modal-description");
  const image = document.getElementById("pricing-modal-image");
  const price = document.getElementById("pricing-modal-price");
  const duration = document.getElementById("pricing-modal-duration");
  const features = document.getElementById("pricing-modal-features");
  const closeButton = modal.querySelector(".pricing-modal-close");
  const enquireButton = document.getElementById("pricing-modal-enquire");

  if (
    !title || !description || !image || !price ||
    !duration || !features || !closeButton || !enquireButton ||
    typeof modal.showModal !== "function"
  ) return;

  const plans = {
    daily: {
      title: "Daily Drive",
      description:
        "A flexible rental package for meetings, errands, short trips and city travel.",
      image: "assets/images/pricing/pricing-daily-car.webp",
      price: "₹2,499",
      duration: "Per day",
      features: [
        "Well-maintained and clean rental vehicles",
        "Flexible pickup and drop-off arrangements",
        "Suitable for short-distance and city travel",
        "24/7 customer support",
        "Convenient daily rental duration",
        "Vehicle category subject to availability"
      ]
    },

    weekend: {
      title: "Weekend Escape",
      description:
        "Enjoy family outings, weekend road trips and relaxing getaways with added comfort.",
      image: "assets/images/pricing/pricing-weekend-suv.webp",
      price: "₹6,999",
      duration: "Per weekend (up to 3 days)",
      features: [
        "Spacious vehicles for families and groups",
        "Premium vehicle options",
        "Extra mileage allowance included",
        "Priority booking assistance",
        "Priority customer support",
        "Ideal for weekend trips and short holidays"
      ]
    },

    monthly: {
      title: "Monthly Saver",
      description:
        "A cost-effective long-term rental option for professionals, extended stays and regular commuting.",
      image: "assets/images/pricing/pricing-monthly-car.webp",
      price: "₹24,999",
      duration: "Per month",
      features: [
        "Cost-effective monthly rental package",
        "Suitable for long stays and regular commuting",
        "Regular vehicle servicing support",
        "Replacement assistance when applicable",
        "Dedicated account support",
        "Flexible long-term rental enquiries"
      ]
    }
  };

/* =================================================
   07. PRICING POP-UP — SCROLL POSITION TRACKING
================================================== */

  let previousFocus = null;
  let savedScrollPosition = 0;
  let navigateToContact = false;
  let previousScrollBehavior = "";

  /* =================================================
     07. PRICING POP-UP — OPEN AND LOCK BACKGROUND
  ================================================== */

  const openModal = (planKey) => {
    const plan = plans[planKey];
    if (!plan || modal.open) return;

    title.textContent = plan.title;
    description.textContent = plan.description;
    image.src = plan.image;
    image.alt = `${plan.title} rental package vehicle`;
    price.textContent = plan.price;
    duration.textContent = plan.duration;

    features.replaceChildren();
    plan.features.forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      features.appendChild(item);
    });

    previousFocus = document.activeElement;
    savedScrollPosition = window.scrollY;
    navigateToContact = false;
    previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    modal.showModal();
    document.documentElement.classList.add("pricing-modal-open");
    modal.scrollTop = 0;
    closeButton.focus({ preventScroll: true });
  };

  /* =================================================
     07. PRICING POP-UP — OPEN AND CLOSE BUTTONS
  ================================================== */

  pricingSection.querySelectorAll("[data-pricing-plan]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(button.dataset.pricingPlan);
    });
  });

  closeButton.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  /* =================================================
     07. PRICING POP-UP — RESTORE BACKGROUND POSITION
  ================================================== */

  modal.addEventListener("close", () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.documentElement.classList.remove("pricing-modal-open");

    window.scrollTo({ top: savedScrollPosition, left: 0, behavior: "instant" });
    document.documentElement.style.scrollBehavior = previousScrollBehavior;

    if (navigateToContact) {
      navigateToContact = false;
      const contact = document.getElementById("contact");
      if (contact) {
        history.replaceState(null, "", "#contact");
        contact.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "start"
        });
      }
      return;
    }

    if (previousFocus instanceof HTMLElement) {
      previousFocus.focus({ preventScroll: true });
    }
  });

  /* =================================================
     07. PRICING POP-UP — PROCEED TO ENQUIRY
  ================================================== */

  enquireButton.addEventListener("click", (event) => {
    event.preventDefault();
    navigateToContact = true;
    modal.close();
  });
})();

/* =================================================
   07. PRICING PACKAGE POP-UP ENDED
================================================== */


/* =================================================
   08. CUSTOMER TESTIMONIALS SECTION STARTED
================================================== */

(() => {
  "use strict";

  const section = document.getElementById("testimonials");
  if (!section) return;

  const viewport = section.querySelector(".testimonials-viewport");
  const track = section.querySelector(".testimonials-grid");
  const cards = [...section.querySelectorAll(".testimonial-card")];
  const previous = section.querySelector(".testimonials-prev");
  const next = section.querySelector(".testimonials-next");
  const dotsContainer = section.querySelector(".testimonials-dots");
  const status = section.querySelector(".testimonials-status");

  if (
    !viewport ||
    !track ||
    !cards.length ||
    !previous ||
    !next ||
    !dotsContainer
  ) {
    return;
  }

  let currentIndex = 0;
  let visibleCards = 3;

  const getVisibleCards = () => {
    if (window.matchMedia("(max-width: 600px)").matches) return 1;
    if (window.matchMedia("(max-width: 1100px)").matches) return 2;
    return 3;
  };

  const getMaxIndex = () => Math.max(0, cards.length - visibleCards);

  const getStep = () => {
    if (cards.length < 2) return 0;

    const first = cards[0].getBoundingClientRect();
    const second = cards[1].getBoundingClientRect();

    return second.left - first.left;
  };

  const updateCarousel = () => {
    const maxIndex = getMaxIndex();

    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

    const step = getStep();
    track.style.transform = `translate3d(${-currentIndex * step}px, 0, 0)`;

    previous.disabled = currentIndex === 0;
    next.disabled = currentIndex === maxIndex;

    const dots = [...dotsContainer.querySelectorAll(".testimonials-dot")];

    dots.forEach((dot, index) => {
      const active = index === currentIndex;

      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-pressed", String(active));

      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    cards.forEach((card, index) => {
      const visible =
        index >= currentIndex && index < currentIndex + visibleCards;

      card.setAttribute("aria-hidden", String(!visible));
    });

    if (status) {
      const first = currentIndex + 1;
      const last = Math.min(currentIndex + visibleCards, cards.length);

      status.textContent = `Showing testimonials ${first} to ${last} of ${cards.length}.`;
    }
  };

  const createDots = () => {
    dotsContainer.replaceChildren();

    const positions = getMaxIndex() + 1;

    for (let index = 0; index < positions; index++) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "testimonials-dot";
      dot.setAttribute(
        "aria-label",
        `Show testimonials starting at ${index + 1}`,
      );
      dot.setAttribute("aria-controls", "testimonials-grid");

      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    }
  };

  const refreshCarousel = () => {
    const newVisibleCards = getVisibleCards();

    if (newVisibleCards !== visibleCards) {
      visibleCards = newVisibleCards;
      createDots();
    }

    updateCarousel();
  };

  previous.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  next.addEventListener("click", () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateCarousel();
    }
  });

  section.addEventListener("keydown", (event) => {
    const target = event.target;

    if (
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
    ) {
      return;
    }

    if (event.key === "ArrowLeft" && currentIndex > 0) {
      event.preventDefault();
      currentIndex--;
      updateCarousel();
    }

    if (event.key === "ArrowRight" && currentIndex < getMaxIndex()) {
      event.preventDefault();
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener("resize", refreshCarousel);

  visibleCards = getVisibleCards();
  createDots();
  updateCarousel();
})();

/* =================================================
   08. CUSTOMER TESTIMONIALS SECTION ENDED
================================================== */

/* =================================================
   09. CONTACT / CTA SECTION STARTED
================================================= */
(() => {
  "use strict";
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbz_UIss86nNYQLrePjU8RU5YGAgMbaN82pTjf6w5NItAWnfKrOoAMhTXJjkzGDSLdGc/exec";
  const form = document.getElementById("contact-enquiry-form");
  if (!form) return;
  const pickup = document.getElementById("contact-pickup-date");
  const returning = document.getElementById("contact-return-date");
  const phone = document.getElementById("contact-phone");
  const status = document.getElementById("contact-form-status");
  const submit = form.querySelector('button[type="submit"]');
  if (!pickup || !returning || !phone || !status || !submit) return;

  const originalButton = submit.innerHTML;
  let submitting = false;
  let hideTimer = null;
  // Preserve an unconfirmed request ID so retries cannot create duplicate rows.
  let pendingId = null;
  let pendingFingerprint = null;
  const today = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
  };
  const updateDates = () => {
    pickup.min = today();
    returning.min = pickup.value && pickup.value > today() ? pickup.value : today();
  };
  const feedback = (message, type) => {
    clearTimeout(hideTimer);
    status.textContent = message;
    status.hidden = false;
    status.classList.toggle("is-success", type === "success");
    status.classList.toggle("is-error", type === "error");
    status.setAttribute("role", type === "error" ? "alert" : "status");
    if (type === "success") hideTimer = setTimeout(() => { status.hidden = true; }, 5000);
  };
  const lockButton = (locked) => {
    submitting = locked;
    submit.disabled = locked;
    submit.setAttribute("aria-busy", String(locked));
    submit.innerHTML = locked ? "Submitting your enquiry, please wait..." : originalButton;
  };
  const receipt = (requestId) => new Promise((resolve, reject) => {
    const callback = "bookingCallback_" + requestId.replace(/-/g, "_");
    const script = document.createElement("script");
    let finished = false;
    const finish = (error, value) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      delete window[callback];
      script.remove();
      if (error) reject(error); else resolve(value);
    };
    window[callback] = (value) => finish(null, value);
    script.onerror = () => finish(new Error("Confirmation unavailable"));
    const timeout = setTimeout(() => finish(new Error("Confirmation timed out")), 12000);
    script.src = ENDPOINT + "?callback=" + encodeURIComponent(callback) +
      "&requestId=" + encodeURIComponent(requestId) + "&t=" + Date.now();
    document.head.appendChild(script);
  });
  const confirmSaved = async (id) => {
    // A short polling window allows Apps Script to finish writing after POST.
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const result = await receipt(id);
        if (result && result.saved === true) return result;
      } catch (error) {
        // Keep checking: an unavailable receipt is not proof of failure.
      }
      if (attempt < 4) await new Promise(resolve => setTimeout(resolve, 1800));
    }
    return null;
  };
  pickup.addEventListener("change", updateDates);
  window.addEventListener("focus", updateDates);
  form.addEventListener("input", () => { if (!submitting) status.hidden = true; });
  updateDates();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting) return;
    updateDates();
    if (!form.reportValidity()) return;
    if (pickup.value < today() || returning.value < pickup.value) {
      const invalid = pickup.value < today() ? pickup : returning;
      invalid.setCustomValidity("Please select valid rental dates.");
      invalid.reportValidity();
      invalid.setCustomValidity("");
      return;
    }
    const normalizedPhone = phone.value.trim().replace(/\s+/g, " ");
    const phoneMatch = normalizedPhone.match(/^\+([1-9]\d{0,2}) ([0-9]{4,14})$/);
    if (!phoneMatch || (phoneMatch[1] === "91" && !/^[6-9]\d{9}$/.test(phoneMatch[2])) ||
        (phoneMatch[1] !== "91" && (phoneMatch[1].length + phoneMatch[2].length < 8 ||
        phoneMatch[1].length + phoneMatch[2].length > 15))) {
      phone.setCustomValidity("Enter a valid phone number, e.g. +91 9876543210.");
      phone.reportValidity();
      phone.setCustomValidity("");
      return;
    }
    const payload = new URLSearchParams(new FormData(form));
    payload.set("phone", normalizedPhone);
    payload.set("website", "");
    const fingerprint = payload.toString();
    const samePending = pendingId && pendingFingerprint === fingerprint;
    const id = samePending ? pendingId : crypto.randomUUID();
    pendingId = id;
    pendingFingerprint = fingerprint;
    payload.set("requestId", id);
    lockButton(true);
    feedback("Submitting your enquiry, please wait...", "loading");
    try {
      // Apps Script POST responses cannot reliably be read cross-origin.
      // A separate GET receipt must verify the saved row before success.
      {
        try {
          await fetch(ENDPOINT, {
            method: "POST", mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: payload.toString()
          });
        } catch (error) {
          // Even if fetch fails, the request may have reached the server.
        }
      }
      const result = await confirmSaved(id);
      if (result) {
        feedback("Your rental enquiry was received successfully. Reference: " + result.enquiryId +
          ". This is not a confirmed booking.", "success");
        form.reset();
        phone.value = "+91 ";
        pendingId = null;
        pendingFingerprint = null;
        updateDates();
      } else {
        feedback("We could not confirm whether your enquiry was saved. Please do not submit it again yet. Contact us to check its status.", "error");
      }
    } catch (error) {
      feedback("Confirmation is unavailable. Please do not resubmit yet; contact us to check your enquiry.", "error");
    } finally {
      lockButton(false);
    }
  });
})();
/* =================================================
   09. CONTACT / CTA SECTION ENDED
================================================= */
