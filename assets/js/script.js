// Initialize Swup
const swup = new Swup({
    containers: ['header', 'main'],
    plugins: [new SwupPreloadPlugin({ preloadVisibleLinks: true })]
  });

// Function to initialize MathJax after each page change
function initMathJax() {
    if (window.MathJax) {
        MathJax.typeset(); // Process math elements
    }
}

// Function to initialize PhotoSwipe after each page change
function initPhotoSwipe() {
    let customOptions = {};
    const closeSVGString = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 40 40" width="20px" height="20px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>';

    const options = Object.assign(
        {
            closeSVG: closeSVGString,
            zoom: false,
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
// Function to modify headings inside the article tag to have linkable IDs
function modifyHeadingsWithIds() {
    const article = document.querySelector('article');
    if (!article) {
        return;
    }

    const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
        const id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase(); // Generate ID from heading text
        heading.setAttribute('id', id); // Set ID attribute

        const anchor = document.createElement('a'); // Create anchor element
        anchor.setAttribute('href', '#' + id); // Set href attribute to link to the heading ID
        anchor.textContent = heading.textContent; // Set anchor text
        heading.innerHTML = ''; // Clear heading content
        heading.appendChild(anchor); // Append anchor inside the heading
    });
}


// Run once when page loads
function init() {
    initMathJax();
    initPhotoSwipe();
    modifyHeadingsWithIds();
    // Add your other initialization code here
}

if (document.readyState === 'complete') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}

// Run after every additional navigation by Swup
swup.hooks.on('page:view', init);
