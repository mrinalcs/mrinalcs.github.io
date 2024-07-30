---
title: "Fixing Swup.js URL Not Changing When Shared"
description: "Explore a common issue with Swup.js where the URL doesn't change when shared in a browser, and learn a simple way to fix it by updating canonical URLs."
tags: [web, tips]
image: "11851835.jpg"
---

If you are using Swup.js for page transitions, you may encounter an issue where the URL doesn't update when the page is shared in a browser. This problem can be frustrating, but it's a common issue with a straightforward solution.

## Understanding the Issue

When using Swup.js, page transitions occur smoothly within the browser, but the URL in the address bar may not reflect the current page after a transition. This happens because Swup.js typically updates the page title dynamically but may not update the canonical URL or other metadata crucial for sharing.

## Why Does This Happen?

Swup.js primarily focuses on updating parts of the page without necessarily updating the entire HTML document, including the canonical URL. When sharing a page, browsers often rely on the canonical URL to determine the shared link's destination.

## The Solution: Updating the Canonical URL

To ensure that the URL updates correctly when sharing pages transitioned via Swup.js, you can update the canonical URL by adding that tag as containers. This ensures that browsers and sharing platforms recognize the correct URL to share.

### Implementation Example

```javascript
const swup = new Swup({
  containers: ["your-container", "link[rel='canonical']"]
});
```

In this example:

Replace "your-container" with the selector of the container where Swup.js performs transitions.
Adding "link[rel='canonical']" to the containers array instructs Swup.js to update the canonical URL along with the content transition.

### Using Swup.js Head Plugin
Alternatively, you can use the Swup.js Head Plugin to update the entire <head> section of your document, including the canonical URL. This method ensures that all metadata, including titles, descriptions, and canonical URLs, are updated correctly.

```javascript
import SwupHeadPlugin from 'swup-head-plugin';

const swup = new Swup({
  plugins: [new SwupHeadPlugin()]
});
```

## Conclusion

By updating the canonical URL along with Swup.js transitions, you ensure that shared links accurately reflect the current page content. This simple adjustment can significantly improve the usability and shareability of your dynamically loaded pages.

For more detailed information and updates on Swup.js, visit the official [Swup.js](https://swup.js.org/) website.
