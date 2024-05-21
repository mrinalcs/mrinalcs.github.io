---
title: Config Mathjax
description: MathJax rendering mathematical expressions with specific fonts and options
image: /assets/img/config-mathjax/Annotation%202024-05-20%20235449.jpg
tags: [tool,web]
---
 
Here's how you can set up a basic configuration for MathJax, which usually meets most needs. For more detailed options, refer to the official documentation.

## Fonts

```
  <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      "HTML-CSS": {
        availableFonts: [],
        preferredFont: null, // force Web fonts
        webFont: "Neo-Euler"
      }
    });
  </script>
```

**Mathjax with Neo-Euler Font**

<iframe height="300" style="width: 100%;" scrolling="no" title="Mathjax with  Neo-Euler Font" src="https://codepen.io/mrinalcs/embed/QWRNNXz?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/mrinalcs/pen/QWRNNXz">
  Mathjax with  Neo-Euler Font</a> by Mrinal (<a href="https://codepen.io/mrinalcs">@mrinalcs</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
 
 

## Contextual Menu
If you want to disable the contextual menu, you can set the enableMenu option to false
```
MathJax = {
  options: {
    enableMenu: false
  }
};
```

## Mathjax in HTML: Cannot select equations

MathJax output can't be copied  from the page in version 3. Version 3 uses CSS with content properties in order to insert the characters into the page, and content text is not selectable in the page. [issues/2240](https://github.com/mathjax/MathJax/issues/2240) . Still you can use [Mathjax 2.7](https://docs.mathjax.org/en/v2.7-latest/) .

## References

- <https://www.mathjax.org/mathjax-v2-3-beta-now-available/>
- <https://docs.mathjax.org/en/latest/output/fonts.html>
- <https://stackoverflow.com/questions/66931266/mathjax-in-html-cannot-select-equations>
