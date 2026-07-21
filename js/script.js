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