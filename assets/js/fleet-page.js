/* ==================================================
   01. FLEET PAGE INITIALIZATION START
================================================== */
(() => {
  "use strict";

  const page = document.getElementById("fleet-page");
  if (!page) return;

  const searchForm = document.getElementById("fleet-search-form");
  const pickupDate = document.getElementById("fleet-pickup-date");
  const returnDate = document.getElementById("fleet-return-date");
  const pickupLocation = document.getElementById("fleet-pickup-location");
  const searchMessage = document.getElementById("fleet-search-message");
  const filterButtons = [
    ...document.querySelectorAll(".fleet-filter-button[data-filter]"),
  ];
  const vehicleCards = [
    ...document.querySelectorAll(".fleet-vehicle-card[data-vehicle]"),
  ];
  const resultsCount = document.getElementById("fleet-results-count");
  const emptyMessage = document.getElementById("fleet-empty-message");
  const gallery = document.getElementById("fleet-gallery");

  const modal = document.getElementById("fleet-vehicle-modal");
  const modalPanel = modal?.querySelector(".fleet-modal-panel");
  const modalImage = document.getElementById("fleet-modal-image");
  const modalTitle = document.getElementById("fleet-modal-title");
  const modalCategory = document.getElementById("fleet-modal-category");
  const modalDescription = document.getElementById("fleet-modal-description");
  const modalSpecs = document.getElementById("fleet-modal-specs");
  const modalPrice = document.getElementById("fleet-modal-price");
  const modalBookButton = document.getElementById("fleet-modal-book-button");
  let previousFocus = null;
  let previousBodyOverflow = "";

  const localISODate = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const nextISODate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return localISODate(new Date(year, month - 1, day + 1));
  };

  const setMessage = (message, isError = false) => {
    if (!searchMessage) return;
    searchMessage.textContent = message;
    searchMessage.dataset.state = isError ? "error" : "success";
  };
  /* ==================================================
   01. FLEET PAGE INITIALIZATION END
================================================== */

  /* ==================================================
   02. PICK-UP AND RETURN DATE VALIDATION START
================================================== */
  const updateDateLimits = () => {
    if (!pickupDate || !returnDate) return;
    const today = localISODate();
    pickupDate.min = today;
    if (pickupDate.value && pickupDate.value < today) pickupDate.value = "";
    returnDate.min = nextISODate(pickupDate.value || today);
    if (returnDate.value && returnDate.value < returnDate.min)
      returnDate.value = "";
  };

  const searchParams = new URLSearchParams(window.location.search);

  const savedLocation = searchParams.get("pickupLocation");
  const savedPickupDate = searchParams.get("pickupDate");
  const savedReturnDate = searchParams.get("returnDate");

  if (pickupLocation && savedLocation) {
    const matchingOption = [...pickupLocation.options].find(
      (option) => option.value === savedLocation,
    );

    if (matchingOption) pickupLocation.value = savedLocation;
  }

  if (
    savedPickupDate &&
    savedReturnDate &&
    /^\d{4}-\d{2}-\d{2}$/.test(savedPickupDate) &&
    /^\d{4}-\d{2}-\d{2}$/.test(savedReturnDate) &&
    savedPickupDate >= localISODate() &&
    savedReturnDate > savedPickupDate
  ) {
    if (pickupDate) pickupDate.value = savedPickupDate;
    if (returnDate) returnDate.value = savedReturnDate;
  }

  updateDateLimits();

  pickupDate?.addEventListener("change", () => {
    updateDateLimits();
    setMessage("");
  });
  returnDate?.addEventListener("change", () => setMessage(""));

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    updateDateLimits();

    if (!pickupLocation?.value || !pickupDate?.value || !returnDate?.value) {
      setMessage(
        "Please select a location, pick-up date and return date.",
        true,
      );
      searchForm.reportValidity();
      return;
    }
    if (pickupDate.value < localISODate()) {
      setMessage("Pick-up date cannot be in the past.", true);
      pickupDate.focus();
      return;
    }
    if (returnDate.value <= pickupDate.value) {
      setMessage("Return date must be after the pick-up date.", true);
      returnDate.focus();
      return;
    }

    setMessage(
      "Dates selected. Browse the vehicles below and choose View Details to enquire. Availability is subject to confirmation.",
    );
    gallery?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  });
  /* ==================================================
   02. PICK-UP AND RETURN DATE VALIDATION END
================================================== */

  /* ==================================================
   03. VEHICLE CATEGORY FILTERING START
================================================== */
  const applyFilter = (category) => {
    let visibleCount = 0;
    vehicleCards.forEach((card) => {
      const show = category === "all" || card.dataset.category === category;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (resultsCount)
      resultsCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "vehicle" : "vehicles"}`;
    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });
  applyFilter("all");
  /* ==================================================
   03. VEHICLE CATEGORY FILTERING END
================================================== */

  /* ==================================================
   04. VEHICLE DETAILS POPUP START
================================================== */
  const getVehicleDetails = (card) => {
    const image = card.querySelector(".fleet-vehicle-image-button img");
    const title =
      card.querySelector(".fleet-vehicle-heading h3")?.textContent.trim() ||
      "Vehicle";
    const category =
      card.querySelector(".fleet-vehicle-category")?.textContent.trim() || "";
    const price =
      card
        .querySelector(".fleet-vehicle-price")
        ?.childNodes[0]?.textContent.trim() || "";
    const specs = [...card.querySelectorAll(".fleet-vehicle-specs span")].map(
      (item) => item.textContent.trim(),
    );
    return {
      id: card.dataset.vehicle,
      title,
      category,
      price,
      specs,
      imageSrc: image?.getAttribute("src") || "",
      imageAlt: image?.alt || title,
    };
  };

  const buildBookingLink = (vehicle) => {
    const params = new URLSearchParams({ vehicle: vehicle.title });
    if (pickupLocation?.value)
      params.set("pickupLocation", pickupLocation.value);
    if (
      pickupDate?.value &&
      returnDate?.value &&
      returnDate.value > pickupDate.value &&
      pickupDate.value >= localISODate()
    ) {
      params.set("pickupDate", pickupDate.value);
      params.set("returnDate", returnDate.value);
    }
    return `index.html?${params.toString()}#contact`;
  };

  const openModal = (vehicleId, trigger) => {
    if (
      !modal ||
      !modalPanel ||
      !modalImage ||
      !modalTitle ||
      !modalCategory ||
      !modalDescription ||
      !modalSpecs ||
      !modalPrice ||
      !modalBookButton
    )
      return;
    const card = vehicleCards.find(
      (item) => item.dataset.vehicle === vehicleId,
    );
    if (!card) return;
    const vehicle = getVehicleDetails(card);

    modalImage.src = vehicle.imageSrc;
    modalImage.alt = vehicle.imageAlt;
    modalTitle.textContent = vehicle.title;
    modalCategory.textContent = vehicle.category;
    modalDescription.textContent = `Explore the ${vehicle.title} for your next journey. Rental details are for demonstration purposes; availability is subject to confirmation.`;
    modalSpecs.replaceChildren();
    vehicle.specs.forEach((spec) => {
      const item = document.createElement("span");
      item.textContent = spec;
      modalSpecs.appendChild(item);
    });
    modalPrice.textContent = vehicle.price;
    modalBookButton.href = buildBookingLink(vehicle);

    previousFocus = trigger || document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".fleet-modal-close")?.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = previousBodyOverflow;
    if (previousFocus?.isConnected && typeof previousFocus.focus === "function")
      previousFocus.focus();
    previousFocus = null;
  };

  document.querySelectorAll("[data-open-vehicle]").forEach((button) => {
    button.addEventListener("click", () =>
      openModal(button.dataset.openVehicle, button),
    );
  });

  modal?.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal || modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = [
      ...modal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.getClientRects().length > 0);
    if (!focusable.length) {
      event.preventDefault();
      modalPanel?.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (
      event.shiftKey &&
      (document.activeElement === first ||
        document.activeElement === modalPanel)
    ) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (!modal.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
    }
  });
  /* ==================================================
   04. VEHICLE DETAILS POPUP END
================================================== */
})();
