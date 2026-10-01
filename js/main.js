const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const websitePicker = document.querySelector("#website-picker");
const websiteSelectionStatus = document.querySelector("#website-selection-status");
const websiteRequestButton = document.querySelector("#website-request");
const contactAddress = "hello@vicxdevelopers.com";

function createInquiryLink(websiteType, startingPrice) {
  const subject = encodeURIComponent(`Website enquiry: ${websiteType}`);
  const body = encodeURIComponent(`Hello Vic X Developers,\n\nI’m interested in a ${websiteType.toLowerCase()}, listed at ${startingPrice}. Please get in touch to discuss the details.\n\nThank you.`);
  return `mailto:${contactAddress}?subject=${subject}&body=${body}`;
}

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

if (websitePicker) {
  websitePicker.addEventListener("change", (event) => {
    if (event.target.name !== "website-type") return;

    const websiteType = event.target.value;
    const startingPrice = event.target.closest(".website-option").querySelector(".website-option-price").textContent.trim();
    websiteSelectionStatus.textContent = `Selected: ${websiteType} · ${startingPrice}`;
    websiteRequestButton.disabled = false;
    websiteRequestButton.querySelector(".request-label").textContent = `Request a ${websiteType.toLowerCase()}`;
  });

  websitePicker.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedOption = websitePicker.querySelector('input[name="website-type"]:checked');
    const websiteType = selectedOption?.value;
    const startingPrice = selectedOption?.closest(".website-option").querySelector(".website-option-price").textContent.trim();
    if (websiteType) window.location.href = createInquiryLink(websiteType, startingPrice);
  });
}