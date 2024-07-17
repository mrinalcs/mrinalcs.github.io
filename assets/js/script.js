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
  sendingMessage.textContent = 'Please wait...';

  const responseMessage = document.createElement('p');
  responseMessage.id = 'responseMessage';
  responseMessage.classList.add('hidden');
  responseMessage.textContent = 'Submitted successfully!';

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
      responseMessage.textContent = 'Failed. Please try again.';
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



// Function to initialize search
function initSearch() {
  let idx;
  let store = {};
  let lunrLoaded = false;
  let dataLoaded = false;

  function loadLunrAndData() {
    if (!lunrLoaded) {
      const scriptLunr = document.createElement('script');
      scriptLunr.src = '/assets/js/lunr.min.js';
      scriptLunr.onload = function() {
        lunrLoaded = true;
        if (dataLoaded) {
          initializeSearch();
        }
      };
      document.head.appendChild(scriptLunr);
    }

    if (!dataLoaded) {
      fetch('/data.json')
        .then(response => response.json())
        .then(data => {
          dataLoaded = true;
          storeData(data);
          if (lunrLoaded) {
            initializeSearch();
          }
        })
        .catch(error => console.error('Error fetching the data.json file:', error));
    }
  }

  function initializeSearch() {
    idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('tags');
      this.field('content');
    });

    Object.keys(store).forEach(index => {
      idx.add({
        'id': index,
        'title': store[index].title,
        'author': store[index].author,
        'tags': store[index].tags,
        'content': store[index].content
      });
    });

    const initialSearchTerm = getQueryVariable('query');
    if (initialSearchTerm) {
      document.getElementById('search-box').setAttribute("value", initialSearchTerm);
      performSearch(initialSearchTerm);
    }
  }

  function storeData(data) {
    data.forEach((post, index) => {
      store[index] = post;
    });
  }

  function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (results.length) {
      let appendString = '';
      for (let i = 0; i < results.length; i++) {
        const item = store[results[i].ref];
        const highlightedTitle = highlightMatch(item.title, query);
        const highlightedContent = highlightMatchInContent(item.content, query);

        appendString += `<li><a href="${item.url}" data-swup-link><h3>${highlightedTitle}</h3></a>`;
        appendString += `<p>${highlightedContent}</p></li>`;
      }
      searchResults.innerHTML = appendString;

      // Notify Swup.js of content update
      swup.triggerEvent('contentReplaced');
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function performSearch(query) {
    const results = idx.search(query);
    displaySearchResults(results, query);
    updateURL(query);
  }

  function updateURL(query) {
    const url = new URL(window.location);
    url.searchParams.set('query', query);
    history.replaceState(null, '', url.toString());
  }

  function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
    return null;
  }

  function highlightMatch(text, query) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map(part => part.toLowerCase() === query.toLowerCase() ? `<mark>${part}</mark>` : part).join('');
  }

  function highlightMatchInContent(content, query) {
    const index = content.toLowerCase().indexOf(query.toLowerCase());

    if (index === -1) {
      return content.length > 150 ? `${content.substring(0, 150)}...` : content;
    } else {
      const start = Math.max(index - 75, 0);
      const end = start + 150;
      const beforeMatch = content.substring(start, index);
      const match = content.substring(index, index + query.length);
      const afterMatch = content.substring(index + query.length, end);
      
      return `${start > 0 ? '...' : ''}${beforeMatch}<mark>${match}</mark>${afterMatch}${end < content.length ? '...' : ''}`;
    }
  }

  const searchBox = document.getElementById('search-box');
  if (searchBox) {
    searchBox.addEventListener('input', function(event) {
      const query = event.target.value;
      performSearch(query);
    });

    if (getQueryVariable('query')) {
      loadLunrAndData();
    }
  }
}


// copy clipboard

function initCodeCopyBtn() {
  // Select all code blocks
  var codeBlocks = document.querySelectorAll('pre.highlight');

  // Loop through each code block
  codeBlocks.forEach(function (codeBlock) {
    // Get the parent div containing file or language information
    var parentDiv = codeBlock.closest('div.highlighter-rouge');

    // Create a container for positioning the button
    var buttonContainer = document.createElement('div');
    buttonContainer.className = 'copy-container';

    // Create the copy button
    var copyButton = document.createElement('button');
    copyButton.className = 'copy';
    copyButton.type = 'button';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.innerText = 'Copy';

    // Create the display label (for file name or language)
    var label = document.createElement('div');
    label.className = 'code-label';

    // Check for file name or use language as fallback
    var fileName = parentDiv.getAttribute('file');
    var language = parentDiv.getAttribute('class').split(' ')[0].replace('language-', '');
    label.innerText = fileName ? fileName : language;

    // Append the label and button to the container
    buttonContainer.appendChild(label);
    buttonContainer.appendChild(copyButton);

    // Insert the container after the code block
    codeBlock.parentNode.insertBefore(buttonContainer, codeBlock);

    // Add event listener for the copy button
    copyButton.addEventListener('click', function () {
      var code = codeBlock.querySelector('code').innerText.trim();
      window.navigator.clipboard.writeText(code).then(function() {
        // On success, change the button text to 'Copied'
        copyButton.innerText = 'Copied';

        // Reset the button text after 4 seconds
        setTimeout(function () {
          copyButton.innerText = 'Copy';
        }, 4000);
      }, function() {
        // Handle the error case
        copyButton.innerText = 'Failed';
      });
    });
  });
}

function initTimeAgo() {
  // Select all time elements
  var postTimeElements = document.querySelectorAll('time');
  
  // Loop through each time element
  postTimeElements.forEach(function (postTimeElem) {
    // Get the datetime attribute value
    var postDateTime = postTimeElem.getAttribute('datetime');
    if (!postDateTime) return;

    // Parse the datetime string to a Date object
    var postDate = new Date(postDateTime);
    var currentDate = new Date();

    // Calculate the time difference in various units
    var timeDiff = currentDate.getTime() - postDate.getTime();
    var secondsDiff = timeDiff / 1000;
    var minutesDiff = secondsDiff / 60;
    var hoursDiff = minutesDiff / 60;
    var daysDiff = hoursDiff / 24;
    var monthsDiff = daysDiff / 30;
    var yearsDiff = monthsDiff / 12;

    // Determine the appropriate time ago format
    var timeAgoText = '';
    if (yearsDiff >= 1) {
      timeAgoText = Math.floor(yearsDiff) + ' year' + (Math.floor(yearsDiff) > 1 ? 's' : '') + ' ago';
    } else if (monthsDiff >= 1) {
      timeAgoText = Math.floor(monthsDiff) + ' month' + (Math.floor(monthsDiff) > 1 ? 's' : '') + ' ago';
    } else if (daysDiff >= 1) {
      timeAgoText = Math.floor(daysDiff) + ' day' + (Math.floor(daysDiff) > 1 ? 's' : '') + ' ago';
    }

    // Append the time ago text to the time element
    if (timeAgoText) {
      postTimeElem.textContent += ' (' + timeAgoText + ')';
    }
  });
}

function initComments() {
  const commentSection = document.getElementById('comment-section');
  if (commentSection) {
      // Function to format the comment's date to our desired format
      function formatDate(stringDate) {
          const dateTimeParts = stringDate.split(' ');
          const datePart = dateTimeParts[0]; // Date part like "7/12/2024"
          let timePart = dateTimeParts[1]; // Time part like "23:32:54"

          // Parse hours, minutes, and seconds from time part
          const [hours, minutes, seconds] = timePart.split(':');

          // Convert hours to 12-hour format and determine AM/PM
          let ampm = 'AM';
          let formattedHours = parseInt(hours, 10);
          if (formattedHours >= 12) {
              ampm = 'PM';
              if (formattedHours > 12) {
                  formattedHours -= 12;
              }
          }
          if (formattedHours === 0) {
              formattedHours = 12; // 12 AM case
          }

          // Format time in HH:mm:ss AM/PM format
          timePart = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

          return `${datePart} at ${timePart}`;
      }

      // Function to escape HTML special characters
      function escapeHtml(text) {
          var map = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#039;'
          };
          return text.replace(/[&<>"']/g, function(m) { return map[m]; });
      }

      // Function to parse CSV data
      function parseCsv(data) {
          const lines = data.trim().split('\n');
          const result = [];

          lines.forEach(line => {
              const values = line.split(',');
              const timestamp = values[0].replace(/"/g, ''); // Remove double quotes around timestamp
              const name = values[1].replace(/"/g, ''); // Remove double quotes around name
              const comment = values[2].replace(/"/g, ''); // Remove double quotes around comment

              result.push({ timestamp, name, comment });
          });

          return result;
      }

      // Function to display comments
      function displayComments(comments) {
          const noComments = document.getElementById('no-comments');
          const commentSection = document.getElementById('commentSection');

          if (!comments) {
              if (visibleComments.length === 0) {
                  noComments.style.display = 'block';
              }
              return;
          }

          const commentList = parseCsv(comments);

          commentList.forEach(element => {
              if (visibleComments.includes(JSON.stringify(element))) {
                  return;
              }

              const newItem = document.createElement('div');
              newItem.className = 'comment-item';
              newItem.innerHTML = `
                  <p class="commenter-name">${escapeHtml(element.name)}<small>${formatDate(element.timestamp)}</small></p>
                  <div>
                      <p>${escapeHtml(element.comment).replace(/\r?\n/g, '<br />')}</p>
                  </div>
              `;

              newItem.style.display = 'none';
              commentSection.appendChild(newItem);
              newItem.style.display = 'block';
              visibleComments.push(JSON.stringify(element));

              noComments.style.display = 'none';
          });
      }

      // Function to reload comments
      function reloadComments() {
          const sqlStatement = encodeURIComponent(`SELECT A, C, D, E WHERE B = '${thisPageUrl}'`);
          fetch(`{{ site.comment-read }}/gviz/tq?tqx=out:csv&sheet=comments&tq=${sqlStatement}&headers=0`)
              .then(response => response.text())
              .then(response => displayComments(response));
      }

      // Function to encode form data
      function encodeFormData(data) {
          return Object.keys(data)
              .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
              .join('&');
      }

      // Function to get a cookie value by name
      function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
      }

      // Function to set a cookie
      function setCookie(name, value, days) {
          const d = new Date();
          d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
          const expires = `expires=${d.toUTCString()}`;
          document.cookie = `${name}=${value};${expires};path=/`;
      }

      // Function to post a comment
      function postComment(event) {
          event.preventDefault();
          const username = document.getElementById('comment-name').value;
          const comment = document.getElementById('comment-comment').value;

          setCookie('commenterName', username, 365);

          fetch(`{{ site.comment-post }}/formResponse`, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: encodeFormData({
                  "{{ site.comment-post-fields[0] }}": thisPageUrl,
                  "{{ site.comment-post-fields[1] }}": username,
                  "{{ site.comment-post-fields[2] }}": comment
              })
          }).then(() => {
              document.getElementById('comment-comment').value = '';
              reloadComments();
          }).catch(error => console.log(error));
          return false;
      }

      // Initialize comments on initial page load
      const thisPageUrl = window.location.href;
      let visibleComments = [];

      reloadComments();

      // Reload comments when navigating with Swup.js
      document.addEventListener('swup:contentReplaced', () => {
          reloadComments();
      });

      // Attach submit event listener to comment form
      const commentForm = document.getElementById('comment-form');
      if (commentForm) {
          commentForm.addEventListener('submit', postComment);
      }

      // Pre-fill the username field if the cookie exists
      const commenterName = getCookie('commenterName');
      if (commenterName) {
          document.getElementById('comment-name').value = commenterName;
      }
  }
}

function initExtLinkHandler() {
  // Check if the modal already exists
  var existingModal = document.getElementById('myModal');
  if (!existingModal) {
    // Create the modal elements
    var modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';
    
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    var closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.innerHTML = '&times;';
    modalContent.appendChild(closeSpan);
    
    var messageP = document.createElement('p');
    messageP.id = 'modalMessage';
    modalContent.appendChild(messageP);
    
    var linkInfoP = document.createElement('p');
    linkInfoP.id = 'linkInfo';
    modalContent.appendChild(linkInfoP);
    
    var buttonContainer = document.createElement('p');
    
    var cancelLink = document.createElement('a');
    cancelLink.href = '#';
    cancelLink.id = 'modalCancel';
    cancelLink.textContent = 'Cancel';
    buttonContainer.appendChild(cancelLink);
    
    var confirmLink = document.createElement('a');
    confirmLink.href = '#';
    confirmLink.id = 'modalConfirm';
    confirmLink.textContent = 'Yes, Proceed';
    confirmLink.target = '_blank'; // Open in a new tab
    buttonContainer.appendChild(confirmLink);
    
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  // Get the modal and its elements
  var modal = document.getElementById('myModal');
  var modalContent = modal.querySelector('.modal-content');
  var closeSpan = modal.querySelector('.close');
  var modalMessage = document.getElementById('modalMessage');
  var modalConfirm = document.getElementById('modalConfirm');
  var modalCancel = document.getElementById('modalCancel');
  var linkInfo = document.getElementById('linkInfo');

  // Function to open modal and handle link click
  function openModal(link) {
    modal.style.display = 'block';
    setTimeout(function() {
      modal.style.opacity = '1';
      modalContent.style.opacity = '1';
      modalContent.style.transform = 'translateY(0)';
    }, 50);

    // Determine the message based on the link type
    if (link.href.startsWith('mailto:')) {
      modalMessage.textContent = 'Do you want to send an email to this address?';
      linkInfo.textContent = link.href.replace('mailto:', '');
    } else if (link.href.startsWith('tel:')) {
      modalMessage.textContent = 'Do you want to call this number?';
      linkInfo.textContent = link.href.replace('tel:', '');
    } else {
      modalMessage.textContent = 'Do you want to proceed to this link?';
      var displayText = link.textContent.trim();
      var urlWithoutParams = link.href.replace(/\?ref=.*$/,''); // Get URL without query parameters
      var params = link.href.split('?')[1]; // Get query parameters

      // Check if display text matches the URL and decide whether to show parentheses
      if (displayText === urlWithoutParams) {
        linkInfo.textContent = displayText;
      } else {
        linkInfo.textContent = displayText + ' (' + link.href + ')';
      }
    }

    // Set the href of modalConfirm to the clicked link
    modalConfirm.href = link.href;

    // Handle click on modalConfirm (proceed to external link)
    modalConfirm.onclick = function(event) {
      event.preventDefault(); // Prevent default action to handle it manually
      closeModal();
      window.open(link.href, '_blank'); // Open link in a new tab
    };

    // Handle click on modalCancel
    modalCancel.onclick = function(event) {
      event.preventDefault();
      closeModal();
    };
  }

  // Function to close modal
  function closeModal() {
    modal.style.opacity = '0';
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(-10px)';
    setTimeout(function() {
      modal.style.display = 'none';
    }, 200); // Adjust the timeout to match the transition duration
  }

  // Add click event listeners to external links
  document.querySelectorAll('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      openModal(link);
    });
  });

  // Close modal if clicked outside the modal content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal if ESC key is pressed
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  // Close modal when clicking the close icon (×)
  closeSpan.addEventListener('click', function() {
    closeModal();
  });
}




    // Function to initialize on initial page load
    function init() {
      initMathJax();
      initMermaid();
      initFormSubmission();
      initLightenseImages();
      initPhotoswipe(); 
      initSearch();
      initCodeCopyBtn();
      initTimeAgo();
      initComments();
      initExtLinkHandler();
      {% if jekyll.environment == 'production' %}
      initGoogleTagManager();
      {% endif %}
    }

    // Call init() on initial page load
    document.addEventListener('DOMContentLoaded', init);

    // Call init() on each page transition
    swup.hooks.on('page:view', init);