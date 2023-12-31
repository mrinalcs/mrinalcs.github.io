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
