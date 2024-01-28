---
title: PhotoSwipe Setup on jekyll Site
description: Here's the setup process for the PhotoSwipe lightbox gallery on  Jekyll site
---

## Install PhotoSwipe
- Download PhotoSwipe from [GitHub](https://github.com/dimsemenov/photoswipe){:rel="nofollow noopener noreferrer"} or install it via npm or yarn.
- Extract the downloaded files or install it using npm/yarn.\
best go throught the doc
[PhotoSwipe](https://photoswipe.com/){:rel="nofollow noreferrer"}


## Set up HTML Markup
You can make each image separate lightbox box or gallery in jekyll. You just have to `gallery` and `children`. First thing you have to do in `_layout` just add main tag or you can use div with id or class.And for image to add  you can do that using just markdown in jekyll thats it. 


```
[![Example Image](assets/img-200.jpg)](assets/img-2500.jpg)
```

The markdown will generate the following html markup , thats what we want.
```  
<a href="assets/img-2500.jpg"><img src="assets/img-200.jpg" alt="Example Image"></a>
```
## Basic JS
Now in your script just change `gallery: '#main'` according to your layout. To add class you can just put `'.main'` and for html tag `'main'`. 
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
## Output
<br>
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KKEZwMW" data-user="mrinalcs" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/mrinalcs/pen/KKEZwMW">
  PhotoSwipe basic demo (unpkg)</a> by Mrinal (<a href="https://codepen.io/mrinalcs">@mrinalcs</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>