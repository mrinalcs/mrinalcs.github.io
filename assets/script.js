document.addEventListener('DOMContentLoaded', function() {
    // Get all TOC links
    var tocLinks = document.querySelectorAll('#toc a');

    // Variable to store the currently active section
    var currentSection = null;

    // Function to add 'underline' class to a section
    function addUnderline(sectionId) {
        var targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('underline');
            currentSection = targetSection;
        }
    }

    // Function to remove 'underline' class from the current section
    function removeUnderline() {
        if (currentSection) {
            currentSection.classList.remove('underline');
            currentSection = null;
        }
    }

    // Function to handle anchor tag click
    function handleAnchorClick(anchor) {
        // Add 'click' event listener to anchor tags
        anchor.addEventListener('click', function(event) {
            // Prevent default anchor tag behavior
            event.preventDefault();

            // Remove 'underline' class from the current section
            removeUnderline();

            // Get the target ID from the href attribute
            var targetId = anchor.getAttribute('href').substring(1);

            // Add 'underline' class to the corresponding section
            addUnderline(targetId);

            // Scroll to the corresponding section
            var targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Update the URL with the section ID
            history.pushState({}, '', '#' + targetId);
        });
    }

    // Add click event listener to each TOC link
    tocLinks.forEach(function(link) {
        handleAnchorClick(link);
    });

    // Add click event listener to heading tags with id
    var headingTagsWithId = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    headingTagsWithId.forEach(function(heading) {
        // Wrap the heading content with an anchor tag
        var anchorTag = document.createElement('a');
        anchorTag.href = '#' + heading.id;

        // Move the heading's children to the anchor tag
        while (heading.firstChild) {
            anchorTag.appendChild(heading.firstChild);
        }

        heading.innerHTML = ''; // Clear the heading content
        heading.appendChild(anchorTag);

        // Call handleAnchorClick for each anchor tag
        handleAnchorClick(anchorTag);
    });

    // Initial underline state on page load (assuming the URL contains a section ID)
    if (window.location.hash) {
        var initialSectionId = window.location.hash.substring(1);
        addUnderline(initialSectionId);
    }
});
//  external link


document.addEventListener('DOMContentLoaded', function(){

    // HTML modal structure
    var modalHTML = `
        <div id="externalLinkModal" class="modal">
            <div class="modal-content">
                <h2>External Link</h2>
                <p id="linkInfo">Do you want to proceed to the external link?</p>
                <div class="modal-footer">
                    <button id="cancelBtn" class="button secondary">Cancel</button>
                    <a id="proceedBtn" class="button" href="#" target="_blank">Proceed</a>
                </div>
            </div>
        </div>
    `;

    // Append HTML modal structure to body
    var modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // Check for external links and attach event listener
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('tel:') && !isSameDomain(href)) {
            links[i].addEventListener('click', function(e){
                e.preventDefault();
                var modal = document.getElementById('externalLinkModal');
                var proceedBtn = document.getElementById('proceedBtn');
                var cancelBtn = document.getElementById('cancelBtn');
                var linkTitle = this.getAttribute('title') || this.textContent || this.innerText || 'Untitled';
                var linkURL = this.getAttribute('href');
                if (linkURL.startsWith('mailto:')) {
                    document.getElementById('linkInfo').innerHTML = 'Do you want to send an email to <b>' + linkURL.substring(7) + '</b>  ?';
                } else {
                    document.getElementById('linkInfo').innerHTML = 'Do you want to proceed this will take you to <b>' + linkTitle + '</b> (' + linkURL.replace(/[?&]ref=[^&]*/, '') + ') ?';
                }
                
                proceedBtn.href = linkURL;

                modal.style.display = 'block';
                cancelBtn.addEventListener('click', function(){
                    modal.style.display = 'none';
                });
                window.addEventListener('click', function(event) {
                    if (event.target == modal) {
                        modal.style.display = 'none';
                    }
                });
            });
        }
    }

    // Function to check if the given URL is from the same domain
    function isSameDomain(url) {
        var a = document.createElement('a');
        a.href = url;

        // Define an array of domains to exclude from comparison
        var excludedDomains = ['mrinalcs.github.io', 'localhost', '127.0.0.1', 'res.cloudinary.com'];

        // Check if the URL hostname is in the excludedDomains array
        for (var i = 0; i < excludedDomains.length; i++) {
            if (a.hostname.includes(excludedDomains[i])) {
                return true;
            }
        }
        
        return a.hostname === window.location.hostname;
    }
});
