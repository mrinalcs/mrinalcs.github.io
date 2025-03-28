---
layout: null
sitemap: false
---
import Swup from './swup/swup@4.6.1/dist/Swup.module.js?module';
import SwupPreloadPlugin from './swup/@swup/preload-plugin@3.2.10/dist/index.module.js?module';
// import SwupScrollPlugin from './swup/@swup/scroll-plugin@3.3.2/dist/index.module.js?module';

const swup = new Swup({
  animationSelector: '[class*="transition-"]',

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
  if (document.body.innerHTML.match(/\\\(|\\\[|\\begin{.*?}|\$/)) {
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
  let searchInitialized = false;
  let searchDeferred = [];

  function loadLunrAndData() {
    if (document.getElementById('search-results') && !searchInitialized) {
      searchInitialized = true;

      if (!lunrLoaded) {
        const scriptLunr = document.createElement('script');
        scriptLunr.src = '/assets/js/lunr.min.js';
        scriptLunr.onload = function () {
          lunrLoaded = true;
          if (dataLoaded) {
            initializeSearch();
            processDeferredSearches();
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
              processDeferredSearches();
            }
          })
          .catch(error => console.error('Error fetching the data.json file:', error));
      }
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

    handleInitialSearch();
  }

  function storeData(data) {
    data.forEach((post, index) => {
      store[index] = post;
    });
  }

  function handleInitialSearch() {
    const initialSearchTerm = getQueryVariable('query');
    if (initialSearchTerm) {
      searchDeferred.push(() => performSearch(initialSearchTerm));
    } else {
      processDeferredSearches();
    }
  }

  function processDeferredSearches() {
    searchDeferred.forEach(searchFn => searchFn());
    searchDeferred = [];
  }

  function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (results.length) {
      let appendString = '';
      results.forEach(result => {
        const item = store[result.ref];
        const highlightedTitle = highlightMatch(item.title, query);
        const highlightedContent = highlightMatchInContent(item.content, query);

        appendString += `<li><a href="${item.url}" data-swup-link><h3>${highlightedTitle}</h3></a>`;
        appendString += `<p>${highlightedContent}</p></li>`;
      });
      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
    updatePageTitle(query);
  }

  function performSearch(query) {
    if (!idx || !store) return;
    const results = idx.search(query);
    displaySearchResults(results, query);
    // No need to manually update URL, Swup handles this.
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

  function updatePageTitle(query) {
    document.title = `Search results for "${query}"`;
  }

  function handleSwupEvents() {
    document.addEventListener('swup:contentReplaced', () => {
      const query = getQueryVariable('query');
      if (query) {
        performSearch(query);
      } else {
        // Reset search results if there’s no query in the URL
        document.getElementById('search-results').innerHTML = '';
      }
    });
  }

  function handleSwupIntegration() {
    if (window.swup) {
      handleSwupEvents();
    } else {
      const checkSwup = setInterval(() => {
        if (window.swup) {
          clearInterval(checkSwup);
          handleSwupEvents();
        }
      }, 100);
    }
  }

  loadLunrAndData();

  const searchBox = document.getElementById('search-box');
  if (searchBox) {
    searchBox.addEventListener('input', function (event) {
      const query = event.target.value;
      performSearch(query);
    });

    handleInitialSearch();
  }

  handleSwupIntegration();
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

        // Reset the button text after 1 seconds
        setTimeout(function () {
          copyButton.innerText = 'Copy';
        }, 1000);
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

function initNotes() {
  const noteSection = document.getElementById('note-section');
  if (noteSection) {
      // Format note timestamp
      function formatDate(stringDate) {
          const date = new Date(stringDate);
          const now = new Date();
          const diffMs = now - date;
          const diffSeconds = Math.floor(diffMs / 1000);
          const diffMinutes = Math.floor(diffSeconds / 60);
          const diffHours = Math.floor(diffMinutes / 60);

          if (diffHours >= 24) {
              const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
              return date.toLocaleDateString(undefined, options);
          } else if (diffHours >= 1) {
              return `(${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago)`;
          } else if (diffMinutes >= 1) {
              return `(${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago)`;
          } else {
              return `(just now)`;
          }
      }

      // Escape HTML characters
      function escapeHtml(text) {
          const map = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#039;'
          };
          return text.replace(/[&<>"']/g, (m) => map[m]);
      }

      // Parse CSV to note objects
      function parseCsv(data) {
          const lines = data.trim().split('\n');
          const result = [];
          let currentNote = [];

          lines.forEach(line => {
              if (line.startsWith('"')) {
                  if (currentNote.length > 0) {
                      result.push(currentNote.join('\n'));
                  }
                  currentNote = [line];
              } else {
                  currentNote.push(line);
              }
          });

          if (currentNote.length > 0) {
              result.push(currentNote.join('\n'));
          }

          return result.map(note => {
              const values = note.match(/(?:[^,"']+|"(?:\\.|[^"])*"|'(?:\\.|[^'])*')+/g);
              if (values.length < 4) return null;

              const timestamp = values[0].replace(/"/g, '');
              const name = values[1].replace(/"/g, '');
              const noteText = values[2].replace(/"/g, '').replace(/\\n/g, '\n');
              const isAuthor = values[3].replace(/"/g, '');

              return { timestamp, name, note: noteText, isAuthor };
          }).filter(note => note !== null);
      }

      // Display notes
      function displayNotes(notes) {
          const noNotes = document.getElementById('notes-list');
          const noteSection = document.getElementById('noteSection');

          if (!notes) {
              if (visibleNotes.length === 0) {
                  noNotes.style.display = 'block';
                  noNotes.textContent = "There are currently no notes on this post. Be the first to add one below.";
              }
              return;
          }

          const noteList = parseCsv(notes);

          noteList.forEach(element => {
              if (visibleNotes.includes(JSON.stringify(element))) {
                  return;
              }

              // Determine the appropriate badge
              const authorBadge = element.isAuthor === "TRUE" 
                  ? `<span class="name">${escapeHtml(element.name)} <span class="author-badge">Author</span></span>` 
                  : `<span class="name">${escapeHtml(element.name)}</span>`;

              const newItem = document.createElement('div');
              newItem.className = 'note-item';
              newItem.innerHTML = `
                  <p class="note-name">
                      ${authorBadge}
                      <small>${formatDate(element.timestamp)}</small>
                  </p>
                  <div>
                      <p>${escapeHtml(element.note).replace(/\r?\n/g, '<br />')}</p>
                  </div>
              `;

              newItem.style.display = 'none';
              noteSection.appendChild(newItem);
              newItem.style.display = 'block';
              visibleNotes.push(JSON.stringify(element));

              noNotes.style.display = 'none';
          });
      }

      // Reload notes
      function reloadNotes() {
          const sqlStatement = encodeURIComponent(`SELECT A, C, D, E WHERE B = '${thisPageUrl}'`);
          fetch(`https://docs.google.com/spreadsheets/d/1hVRP9tYl8f4bsBjJP52hv74DwZ2pYpatxaNMG2rNY_M/gviz/tq?tqx=out:csv&sheet=notes&tq=${sqlStatement}&headers=0`)
              .then(response => response.text())
              .then(response => displayNotes(response));
      }

      // Get cookie by name
      function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
      }

      // Set a cookie
      function setCookie(name, value, days) {
          const d = new Date();
          d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
          const expires = `expires=${d.toUTCString()}`;
          document.cookie = `${name}=${value};${expires};path=/`;
      }

      // Check for banned words
      async function checkBannedWords(note) {
          const bannedWords = await fetch('/assets/js/bannedwords.json').then(res => res.json());
          const lowerNote = note.toLowerCase();
          const foundWords = bannedWords.filter(word => lowerNote.includes(word));
          return foundWords;
      }

      // Rate limit notes (2 in 5 minutes)
      function canPostNote() {
          const noteHistory = JSON.parse(getCookie('noteHistory') || '[]');
          const now = Date.now();
          const fiveMinutesAgo = now - 5 * 60 * 1000;

          const recentNotes = noteHistory.filter(time => time > fiveMinutesAgo);

          if (recentNotes.length >= 2) {
              return false;
          }

          recentNotes.push(now);
          setCookie('noteHistory', JSON.stringify(recentNotes), 1);

          return true;
      }

      // Post a new note
      async function postNote(event) {
          event.preventDefault();
          const username = document.getElementById('note-name').value;
          const note = document.getElementById('note-content').value;

          const bannedWords = await checkBannedWords(note);
          if (bannedWords.length > 0) {
              alert(`Please avoid using the following words: ${bannedWords.join(', ')}. Kindly modify your note and try again.`);
              return;
          }

          if (!canPostNote()) {
              alert("You've reached the limit of 2 notes in 5 minutes. Please wait for 5 minutes before posting again.");
              return;
          }

          setCookie('notePosterName', username, 365);

          fetch(`https://docs.google.com/forms/d/e/1FAIpQLSehE6misroMb1QUK57ReR8JeO_eVxztTlojKRcXCbWDwYtHTQ/formResponse`, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: encodeFormData({
                  "entry.46315812": thisPageUrl,
                  "entry.361353560": username,
                  "entry.1184144290": note
              })
          }).then(() => {
              document.getElementById('note-content').value = '';
              reloadNotes();
          }).catch(error => console.log(error));
      }

      // Encode form data
      function encodeFormData(data) {
          return Object.keys(data)
              .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
              .join('&');
      }

      // Initialize notes on load
      const thisPageUrl = window.location.href.split(/[?#]/)[0];
      let visibleNotes = [];

      reloadNotes();

      document.addEventListener('swup:contentReplaced', () => {
          reloadNotes();
      });

      const noteForm = document.getElementById('note-form');
      if (noteForm) {
          noteForm.addEventListener('submit', postNote);
      }

      const notePosterName = getCookie('notePosterName');
      if (notePosterName) {
          document.getElementById('note-name').value = notePosterName;
      }
  }
}
















function initExtLinkHandler() {
  // Function to open the modal
  function openModal(link) {
    // Check if the modal already exists
    let modal = document.getElementById('extLink');
    if (!modal) {
      // Create the modal dynamically
      modal = document.createElement('div');
      modal.id = 'extLink';
      modal.className = 'modal';

      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';



      const messageP = document.createElement('p');
      messageP.id = 'modalMessage';
      modalContent.appendChild(messageP);

      const linkInfoP = document.createElement('p');
      linkInfoP.id = 'linkInfo';
      modalContent.appendChild(linkInfoP);

      const buttonContainer = document.createElement('p');

      const cancelLink = document.createElement('span');
      cancelLink.id = 'modalCancel';
      cancelLink.innerHTML = 'Cancel';
      buttonContainer.appendChild(cancelLink);

      const confirmLink = document.createElement('a');
      confirmLink.id = 'modalConfirm';
      confirmLink.textContent = 'Yes, Proceed';
      confirmLink.target = '_blank'; // Open in a new tab
      buttonContainer.appendChild(confirmLink);

      modalContent.appendChild(buttonContainer);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Event listeners for dynamically created elements 
      cancelLink.addEventListener('click', closeModal);

      // Close modal on outside click
      window.addEventListener('click', function (event) {
        if (event.target === modal) {
          closeModal();
        }
      });

      // Close modal on ESC key press
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeModal();
        }
      });
    }

    // Populate modal and display it
    const modalContent = modal.querySelector('.modal-content');
    const modalMessage = document.getElementById('modalMessage');
    const modalConfirm = document.getElementById('modalConfirm');
    const linkInfo = document.getElementById('linkInfo');

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable body scroll

    setTimeout(() => {
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
      const displayText = link.textContent.trim();
      const urlWithoutParams = link.href.replace(/\?ref=.*$/, ''); // Get URL without query parameters
      if (displayText === urlWithoutParams) {
        linkInfo.textContent = displayText;
      } else {
        linkInfo.textContent = displayText + ' (' + urlWithoutParams + ')';
      }
    }

    // Set the href of modalConfirm to the clicked link
    modalConfirm.href = link.href;

    // Handle confirmation click
    modalConfirm.onclick = function (event) {
      event.preventDefault(); // Prevent default action
      closeModal();
      window.open(link.href, '_blank'); // Open link in a new tab
    };
  }

  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('extLink');
    if (!modal) return;

    const modalContent = modal.querySelector('.modal-content');
    modal.style.opacity = '0';
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Re-enable body scroll
    }, 200); // Adjust the timeout to match the transition duration
  }

  // Add click event listeners to external links
  document.querySelectorAll('a[href^="http"][target="_blank"], a[href^="mailto:"], a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      openModal(link);
    });
  });
}

function initInlineScript(container = document) {
  // Clear previously executed scripts
  container.querySelectorAll('script[data-executed="true"]').forEach(script => {
    script.removeAttribute('data-executed'); // Reset the executed attribute
  });

  // Find all script tags within the given container (default: entire document)
  const scriptElements = container.querySelectorAll('script:not([data-executed])');

  scriptElements.forEach((script) => {
    // Mark the script as executed to avoid re-execution
    script.setAttribute('data-executed', 'true');

    // Check the script type (default: 'text/javascript')
    const scriptType = script.getAttribute('type') || 'text/javascript';

    // Skip known non-executable script types silently
    if (['application/ld+json', 'module'].includes(scriptType)) {
      return;
    }

    // Handle inline scripts
    if (!script.src) {
      try {
        eval(script.textContent);
      } catch (error) {
        console.error('Error executing inline script:', error);
      }
    } else {
      // Handle external scripts
      const newScript = document.createElement('script');
      newScript.src = script.src;
      newScript.type = scriptType;
      newScript.async = script.async || false;
      newScript.defer = script.defer || false;

      if (scriptType === 'module') {
        newScript.type = 'module'; // Handle ES module scripts
      }

      newScript.onload = () => {
        console.log(`External script loaded: ${script.src}`);
      };

      newScript.onerror = (error) => {
        console.error(`Error loading external script: ${script.src}`, error);
      };

      document.head.appendChild(newScript);
    }
  });
}


function initAnimatePageContent(container = document) {
    // Intersection Observer for animations
    const elements = document.querySelectorAll('h3, h2, p, li,pre');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => {
      observer.observe(element);
    });
}

function initRoughNotation() {
  if (typeof RoughNotation === 'undefined') {
    const script = document.createElement('script');
    script.src = "/assets/js/rough-notation.iife.js";
    script.onload = applyRoughNotation;
    document.head.appendChild(script);
  } else {
    applyRoughNotation();
  }

  function applyRoughNotation() {
    const { annotate } = RoughNotation;
    const links = document.querySelectorAll('main a');

    // Get the CSS variable value for the color (--c)
    const computedStyle = getComputedStyle(document.documentElement);
    const underlineColor = computedStyle.getPropertyValue('--c').trim() || 'white';

    // Intersection Observer for the underline effect on external links
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target;
          const href = link.getAttribute('href');

          // Only apply underline if the link is external (starts with http)
          if (href && href.startsWith('http')) {
            if (!link._underlineAnnotation) {
              const annotation = annotate(link, {
                type: 'underline',
                color: underlineColor,
                animationDuration: 800
              });
              annotation.show();
              link._underlineAnnotation = annotation;
            }
          }
        }
      });
    }, { threshold: 0.1 });

    // Process each link in <main>
    links.forEach(link => {
      const href = link.getAttribute('href');

      // For external links, observe them to trigger the underline on scroll
      if (href && href.startsWith('http')) {
        observer.observe(link);
      }

      // Hover events only restore/hide underline if it exists (box effect removed)
      link.addEventListener('mouseenter', () => {
        // Hide the underline annotation if it exists
        if (link._underlineAnnotation) {
          link._underlineAnnotation.hide();
        }
      });

      link.addEventListener('mouseleave', () => {
        // Restore the underline for external links if it exists
        if (link._underlineAnnotation) {
          link._underlineAnnotation.show();
        }
      });
    });
  }
}


    // Function to initialize on initial page load
    function init() {
      initInlineScript(document.body); 
      initMathJax();
      initMermaid();
      initRoughNotation();
      initFormSubmission();
      initLightenseImages();
      initPhotoswipe(); 
      initSearch();
      initCodeCopyBtn();
      initTimeAgo();
      initNotes();
      initAnimatePageContent();
      initExtLinkHandler();
      {% if jekyll.environment == 'production' %}
      initGoogleTagManager();
      {% endif %}
    }

    // Call init() on initial page load
    document.addEventListener('DOMContentLoaded', init);

    // Call init() on each page transition
    swup.hooks.on('page:view', init);
