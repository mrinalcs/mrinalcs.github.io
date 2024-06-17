---
layout: null
sitemap: false
---
import Swup from './swup/swup@4.6.1/dist/Swup.module.js?module';
import SwupPreloadPlugin from './swup/@swup/preload-plugin@3.2.10/dist/index.module.js?module';
// import SwupScrollPlugin from './swup/@swup/scroll-plugin@3.3.2/dist/index.module.js?module';

const swup = new Swup({
  animationSelector: null,


  containers: ["header","main", "link[rel='canonical']"],
  plugins: [new SwupPreloadPlugin({ preloadVisibleLinks: true }),
    
  // new SwupScrollPlugin({
  //   animateScroll: false,
  //   shouldResetScrollPosition: (link) => !link.matches('.backlink')
  // })

]

});


// Function to initialize MathJax
function initMathJax() {
  // Check for mathematical syntax in the page content
  if (document.body.innerHTML.match(/\\\(|\\\[|\\begin{.*?}/)) {
    if (typeof MathJax === 'undefined') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '{{ "/assets/js/mathjax/MathJax.js?config=TeX-AMS_CHTML-full" | relative_url }}';
      script.onload = () => {
        MathJax.Hub.Config({
          tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true
          },
          CommonHTML: { scale: 90 },
          SVG: { scale: 90 },
          showMathMenu: false,
          showProcessingMessages: false,
          messageStyle: 'none'
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Initial typeset after loading
      };
      document.head.appendChild(script);
    } else {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Re-render math on subsequent transitions
    }
  }
}


    
// Function to initialize Mermaid
function initMermaid() {
  // Check if there are elements with the class '.language-mermaid'
  if (document.querySelector('.language-mermaid')) {
    // Function to set the Mermaid configuration based on the color scheme
    const setMermaidConfig = () => {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = prefersDarkScheme ? 'dark' : 'default';
      mermaid.initialize({ theme });
    };

    // Check if Mermaid is already defined
    if (typeof mermaid === 'undefined') {
      // Load the Mermaid library dynamically
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '{{ "/assets/js/mermaid.min.js" | relative_url }}';
      document.head.appendChild(script);
      
      // Initialize Mermaid after the library is loaded
      script.onload = function() {
        // Set the Mermaid configuration
        setMermaidConfig();

        // Replace <pre><code> with <div class="mermaid">
        document.querySelectorAll('pre code.language-mermaid').forEach((code) => {
          const div = document.createElement('div');
          div.className = 'mermaid';
          div.textContent = code.textContent;
          code.parentNode.replaceWith(div);
          mermaid.init(undefined, div); // Render the Mermaid diagram
        });
      };
    } else {
      // Set the Mermaid configuration
      setMermaidConfig();

      // Replace <pre><code> with <div class="mermaid">
      document.querySelectorAll('pre code.language-mermaid').forEach((code) => {
        const div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = code.textContent;
        code.parentNode.replaceWith(div);
        mermaid.init(undefined, div); // Render the Mermaid diagram
      });
    }
  }
}



// Function to handle form submission
function initFormSubmission() {
  const form = document.getElementById('contactForm');
  const formContainer = document.getElementById('formContainer');
  if (!form || !formContainer) return;

  // Create and insert the "Sending..." and "Form submitted successfully!" messages
  const sendingMessage = document.createElement('p');
  sendingMessage.id = 'sendingMessage';
  sendingMessage.classList.add('hidden');
  sendingMessage.textContent = 'Sending...';

  const responseMessage = document.createElement('p');
  responseMessage.id = 'responseMessage';
  responseMessage.classList.add('hidden');
  responseMessage.textContent = 'Form submitted successfully!';

  // Insert the messages just after the form container
  formContainer.insertAdjacentElement('afterend', sendingMessage);
  formContainer.insertAdjacentElement('afterend', responseMessage);

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    formContainer.classList.add('hidden'); // Hide the form
    sendingMessage.classList.remove('hidden'); // Show the sending message

    fetch('https://docs.google.com/forms/d/e/1FAIpQLScAtxQW8cK268Lq6Ui8vUvei-0tIzdFjgMQaK4Ll-pMPRNkVw/formResponse', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    }).then(() => {
      sendingMessage.classList.add('hidden'); // Hide the sending message
      responseMessage.classList.remove('hidden'); // Show the success message
    }).catch(error => {
      sendingMessage.classList.add('hidden'); // Hide the sending message
      responseMessage.textContent = 'Form submission failed. Please try again.';
      responseMessage.classList.remove('hidden'); // Show the error message
      console.error('Error!', error.message);
    });
  });
}


        // Function to initialize Lightense Images
        function initLightenseImages() {
          if (document.querySelector('article img')) {
              if (typeof Lightense === 'undefined') {
                  const script = document.createElement('script');
                  script.src = '{{ "/assets/js/lightense.min.js" | relative_url }}';
                  script.onload = () => {
                      Lightense('article img', {
                        background: 'var(--b)'
                    });
                  };
                  document.head.appendChild(script);
              } else {
                  Lightense('article img', {
                    background: 'var(--b)'
                });
              }
          }
      }



{% if jekyll.environment == 'production' %}

// Function to initialize Google Tag Manager
function initGoogleTagManager() {
  // Check if the script has already been added
  if (!document.querySelector('[src="https://www.googletagmanager.com/gtag/js?id={{ site.gtag }}"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id={{ site.gtag }}';
    document.head.appendChild(script);
  }

  // Initialize Google Tag Manager
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ site.gtag }}');
}

{% endif %}



// Function to initialize PhotoSwipe
function initPhotoswipe() {
  const gallery = document.querySelector('#my-gallery');
  if (!gallery) return;

  // Function to set data-size attribute
  function setDataSize() {
    const images = gallery.querySelectorAll('a');
    images.forEach((link) => {
      const img = link.querySelector('img');
      const scale = 10; // Set your desired photo scale here
      img.onload = () => {
        const width = Math.max(img.naturalWidth, img.width) * scale;
        const height = Math.max(img.naturalHeight, img.height) * scale;
        link.setAttribute('data-size', `${width}x${height}`);

        const altText = img.getAttribute('alt');
link.setAttribute('data-caption', altText);

      };
      // If the image is already loaded
      if (img.complete) {
        img.onload();
      }
    });
  }

  // Check if PhotoSwipe has already been loaded
  if (!document.querySelector('link[href="{{ "/assets/js/photoswipe/photoswipe.css" | relative_url }}"]')) {
    // Load PhotoSwipe CSS
    const photoswipeCss = document.createElement('link');
    photoswipeCss.rel = 'stylesheet';
    photoswipeCss.href = '{{ "/assets/js/photoswipe/photoswipe.css" | relative_url }}';
    document.head.appendChild(photoswipeCss);

    const defaultSkinCss = document.createElement('link');
    defaultSkinCss.rel = 'stylesheet';
    defaultSkinCss.href = '{{ "/assets/js/photoswipe/default-skin.css" | relative_url }}';
    document.head.appendChild(defaultSkinCss);

    // Load PhotoSwipe JS
    const photoswipeJs = document.createElement('script');
    photoswipeJs.src = '{{ "/assets/js/photoswipe/photoswipe.min.js" | relative_url }}';
    document.head.appendChild(photoswipeJs);

    const photoswipeUiJs = document.createElement('script');
    photoswipeUiJs.src = '{{ "/assets/js/photoswipe/photoswipe-ui-default.min.js" | relative_url }}';
    document.head.appendChild(photoswipeUiJs);

    const photoswipeSimplifyJs = document.createElement('script');
    photoswipeSimplifyJs.src = '{{ "/assets/js/photoswipe/photoswipe-simplify.js" | relative_url }}';
    photoswipeSimplifyJs.onload = () => {
      setDataSize();
      // Initialize PhotoSwipe
      photoswipeSimplify.init({
        history: false,
        bgOpacity: .7,
        // zoomEl: false,
        shareEl: false,
        fullscreenEl: false,
        //  closeEl: false,
        captionEl: true
      });
    };
    document.head.appendChild(photoswipeSimplifyJs);
  } else {
    setDataSize();
    // Initialize PhotoSwipe
    photoswipeSimplify.init({
      history: false,
      bgOpacity: .7,
      // zoomEl: false,
      shareEl: false,
      fullscreenEl: false,
      //  closeEl: false,
      captionEl: true
    });
  }
}


// Function to initialize visit count
function initCount() {
  // Check if the visitCount element exists on the page
  const visitCountElement = document.getElementById('visitCount');
  if (!visitCountElement) return; // Exit if element doesn't exist

  // Function to create a page_id from the domain and path, excluding query and fragment
  function createPageId() {
      // Get the hostname and path from the URL
      const hostname = window.location.hostname;
      const path = window.location.pathname;

      // Combine hostname and path, remove slashes and dots, and encode the result to create a valid page_id
      const combined = hostname + path;
      const page_id = combined.replace(/[\/.]/g, '_');

      return page_id;
  }

  // Function to fetch visit count from backend PHP for a specific page_id
  function fetchVisitCount(page_id) {
      fetch('https://mrinalvbu.000webhostapp.com/counter.php?page_id=' + encodeURIComponent(page_id))
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.text();
          })
          .then(count => {
              // Update the visit count on the page
              visitCountElement.textContent = count;
          })
          .catch(error => {
              console.error('Error fetching visit count:', error);
          });
  }

  // Generate the page_id and fetch visit count on initial load
  const page_id = createPageId();
  fetchVisitCount(page_id);
}
 

    // Function to initialize on initial page load
    function init() {
      initMathJax();
      initMermaid();
      initFormSubmission();
      initLightenseImages();
      initPhotoswipe(); 
      initCount();
      {% if jekyll.environment == 'production' %}
      initGoogleTagManager();
      {% endif %}
    }

    // Call init() on initial page load
    document.addEventListener('DOMContentLoaded', init);

    // Call init() on each page transition
    swup.hooks.on('page:view', init);