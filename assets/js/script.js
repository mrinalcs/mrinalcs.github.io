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


    // Function to initialize on initial page load
    function init() {
      initMathJax();
      initMermaid();
      initFormSubmission();
      initLightenseImages();
    }

    // Call init() on initial page load
    document.addEventListener('DOMContentLoaded', init);

    // Call init() on each page transition
    swup.hooks.on('page:view', init);