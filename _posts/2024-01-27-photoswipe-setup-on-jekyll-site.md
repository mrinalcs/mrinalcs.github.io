---
title: PhotoSwipe Setup on jekyll Site
description: Here's the setup process for the PhotoSwipe lightbox gallery on  Jekyll site
---

[PhotoSwipe Setup on a Jekyll Site](https://ryanarnaudin.com/blog/photoswipe-setup/){:rel="nofollow noopener noreferrer"}

[PhotoSwipe](https://photoswipe.com/){:rel="nofollow noreferrer"}

```
[![Example Image](assets/img-200.jpg)](assets/img-2500.jpg)
```

```  
<a href="assets/img-2500.jpg"><img src="assets/img-200.jpg" alt="Example Image"></a>
```

```
// Include Lightbox 
import PhotoSwipeLightbox from '/photoswipe/photoswipe-lightbox.esm.js';

const lightbox = new PhotoSwipeLightbox({
  //  select all images in a post or page
  gallery: '#main',

  // Elements within gallery only anchor with img only 
  children: 'a:has(img)',  //avoid other links

  // setup PhotoSwipe Core dynamic import
  pswpModule: () => import('/photoswipe/photoswipe.esm.js')
});
lightbox.init();
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KKEZwMW" data-user="mrinalcs" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mrinalcs/pen/KKEZwMW">
  PhotoSwipe basic demo (unpkg)</a> by Mrinal (<a href="https://codepen.io/mrinalcs">@mrinalcs</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>