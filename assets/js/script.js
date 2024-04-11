// Initialize Swup
const swup = new Swup();

// Function to initialize MathJax after each page change
function initMathJax() {
    if (window.MathJax) {
        MathJax.typeset(); // Process math elements
    }
}

// Function to initialize PhotoSwipe after each page change
function initPhotoSwipe() {
    let customOptions = {};
    const options = Object.assign(
        {
            gallery: "article",
            children: "a.photo-swipe",
            photo_scale: 2,
            pswpModule: PhotoSwipe,
        },
        customOptions
    );

    const galleryEl = document.querySelector(options.gallery);
    if (!galleryEl) {
        return;
    }

    const imgEls = [];
    const els = galleryEl.querySelectorAll("img:not(.emoji)");
    els.forEach((el) => {
        if (el.src.trim() == "") {
            return;
        }
        if (!imgEls.includes(el)) {
            imgEls.push(el);
        }
    });

    if (imgEls.length === 0) {
        return;
    }

    imgEls.forEach((imgEl) => {
        // Wait for the image to load before calculating dimensions
        imgEl.addEventListener('load', () => {
            const width = imgEl.naturalWidth * options.photo_scale;
            const height = imgEl.naturalHeight * options.photo_scale;
            const caption = imgEl.getAttribute("caption") || imgEl.alt;

            // Add data attributes to the anchor element
            const anchorEl = document.createElement('a');
            anchorEl.className = "photo-swipe";
            anchorEl.href = imgEl.src;
            anchorEl.setAttribute("data-pswp-width", width);
            anchorEl.setAttribute("data-pswp-height", height);
            anchorEl.setAttribute("data-pswp-caption", caption);
            anchorEl.setAttribute("target", "_blank");

            // Replace the image element with the anchor element
            imgEl.parentNode.replaceChild(anchorEl, imgEl);
            anchorEl.appendChild(imgEl); // Reappend the image inside the anchor
        });
    });

    var lightbox = new PhotoSwipeLightbox(options);
    lightbox.init();
}

// Initialize MathJax and PhotoSwipe after each page change
 

// Run once when page loads
function init() {
    initMathJax();
    initPhotoSwipe();
    // Add your other initialization code here
}

if (document.readyState === 'complete') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}

// Run after every additional navigation by Swup
swup.hooks.on('page:view', init);
