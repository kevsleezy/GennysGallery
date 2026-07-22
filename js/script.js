"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const menuIsOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", menuIsOpen);
    });

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
/* ---------- Portfolio Filtering ---------- */

const filterButtons = document.querySelectorAll(".filter-button");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(function (filterButton) {
                filterButton.classList.remove("active");
            });

            button.classList.add("active");

            portfolioItems.forEach(function (item) {
                const itemCategory = item.dataset.category;

                if (
                    selectedFilter === "all" ||
                    itemCategory === selectedFilter
                ) {
                    item.classList.remove("portfolio-item-hidden");
                } else {
                    item.classList.add("portfolio-item-hidden");
                }
            });
        });
    });
}
/* ---------- Portfolio Lightbox ---------- */

const lightbox = document.querySelector("#portfolio-lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxCategory = document.querySelector(".lightbox-category");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrevious = document.querySelector(".lightbox-previous");
const lightboxNext = document.querySelector(".lightbox-next");

const galleryItems = Array.from(
    document.querySelectorAll(".portfolio-item")
);

let currentLightboxIndex = 0;

function getVisibleGalleryItems() {
    return galleryItems.filter(function (item) {
        return !item.classList.contains("portfolio-item-hidden");
    });
}

function updateLightbox(item) {
    const imagePath = item.dataset.image;
    const imageTitle = item.dataset.title;
    const imageCategory = item.dataset.category;

    lightboxImage.src = imagePath;
    lightboxImage.alt = item.querySelector("img").alt;

    lightboxTitle.textContent = imageTitle;
    lightboxCategory.textContent = imageCategory;
}

function openLightbox(item) {
    const visibleItems = getVisibleGalleryItems();

    currentLightboxIndex = visibleItems.indexOf(item);

    updateLightbox(item);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    lightboxClose.focus();
}

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
}

function showPreviousImage() {
    const visibleItems = getVisibleGalleryItems();

    currentLightboxIndex--;

    if (currentLightboxIndex < 0) {
        currentLightboxIndex = visibleItems.length - 1;
    }

    updateLightbox(visibleItems[currentLightboxIndex]);
}

function showNextImage() {
    const visibleItems = getVisibleGalleryItems();

    currentLightboxIndex++;

    if (currentLightboxIndex >= visibleItems.length) {
        currentLightboxIndex = 0;
    }

    updateLightbox(visibleItems[currentLightboxIndex]);
}

if (
    lightbox &&
    lightboxImage &&
    lightboxTitle &&
    lightboxCategory &&
    lightboxClose &&
    lightboxPrevious &&
    lightboxNext &&
    galleryItems.length > 0
) {
    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            openLightbox(item);
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrevious.addEventListener("click", showPreviousImage);
    lightboxNext.addEventListener("click", showNextImage);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("open")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }
    });
}
/* ---------- Booking FAQ Accordion ---------- */

const faqQuestions = document.querySelectorAll(".faq-question");

if (faqQuestions.length > 0) {
    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const currentItem = question.closest(".faq-item");
            const currentIsOpen = currentItem.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach(function (item) {
                item.classList.remove("active");

                const itemQuestion = item.querySelector(".faq-question");

                if (itemQuestion) {
                    itemQuestion.setAttribute("aria-expanded", "false");
                }
            });

            if (!currentIsOpen) {
                currentItem.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }
        });
    });
}
/* ---------- Scroll Reveal Animation ---------- */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}
/* ---------- Interactive Service Area Map ---------- */

const serviceAreaMapElement = document.querySelector("#service-area-map");

if (serviceAreaMapElement && typeof L !== "undefined") {
    const serviceAreaMap = L.map("service-area-map", {
        scrollWheelZoom: false
    }).setView([32.95, -117.15], 9);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
    ).addTo(serviceAreaMap);

    const serviceArea = L.polygon(
        [
            [33.50, -117.60],
            [33.50, -116.10],
            [32.62, -116.10],
            [32.53, -117.30]
        ],
        {
            color: "#c9a568",
            weight: 2,
            fillColor: "#c9a568",
            fillOpacity: 0.13
        }
    ).addTo(serviceAreaMap);

    serviceArea.bindPopup(
        "<strong>GennysGallery Service Area</strong><br>Photography throughout San Diego County."
    );

    const locations = [
        {
            name: "Downtown San Diego",
            coordinates: [32.7157, -117.1611],
            description: "Central San Diego and surrounding communities."
        },
        {
            name: "Mira Mesa Studio",
            coordinates: [32.9156, -117.1439],
            description: "Studio photography sessions in Mira Mesa."
        },
        {
            name: "Oceanside",
            coordinates: [33.1959, -117.3795],
            description: "North County service area through Oceanside."
        }
    ];

    locations.forEach(function (location) {
        L.circleMarker(location.coordinates, {
            radius: 8,
            color: "#c9a568",
            weight: 2,
            fillColor: "#111111",
            fillOpacity: 1
        })
            .addTo(serviceAreaMap)
            .bindPopup(
                `<strong>${location.name}</strong><br>${location.description}`
            );
    });

    serviceAreaMap.fitBounds(serviceArea.getBounds(), {
        padding: [25, 25]
    });
    setTimeout(function () {
    serviceAreaMap.invalidateSize();
}, 400);

window.addEventListener("resize", function () {
    serviceAreaMap.invalidateSize();
});
}