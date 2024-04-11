const swup = new Swup({
    plugins: [new SwupPreloadPlugin()]
  }); // Initialize Swup

// Initialize MathJax after each page change
swup.hooks.on('page:view', () => {
    if (window.MathJax) {
        MathJax.typeset(); // Process math elements
    }
});

// Initialize components function
function init() {
    // Add your component initialization code here
}

// Run once when page loads
if (document.readyState === 'complete') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}

// Run after every additional navigation by Swup
swup.hooks.on('page:view', init);