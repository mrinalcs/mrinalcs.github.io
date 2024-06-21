---
title: Config Mathjax
description: MathJax rendering mathematical expressions with specific fonts and options
image: /assets/img/config-mathjax/Annotation%202024-05-20%20235449.jpg
tags: [tool,web]
---
 
Here's how you can set up a basic configuration for MathJax, which usually meets most needs. For more detailed options, refer to the official documentation.

## Fonts

```html
<!-- configures MathJax.js v2.7.1 settings -->
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        // Configuration for HTML-CSS output
        "HTML-CSS": {
            // Specify that no fonts are pre-installed
            availableFonts: [],
            // Disable preferred fonts to ensure web fonts are used
            preferredFont: null,
            // Force the use of the Neo-Euler web font for rendering math
            webFont: "Neo-Euler"
        }
    });
</script>
```

**Mathjax with Neo-Euler Font**

![Mathjax with Neo-Euler Font](/assets/img/config-mathjax/Annotation%202024-06-21%20070631.jpg)
*Mathjax with Neo-Euler Font*
 

You can use the scale option within the "HTML-CSS" section of the configuration

```html
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        "HTML-CSS": {
            availableFonts: [],
            preferredFont: null,
            webFont: "Neo-Euler",
            scale: 120  // Adjust this value to set the desired font size (100 is the default)
        }
    });
</script>
```

![Mathjax Scale up Font](/assets/img/config-mathjax/Annotation%202024-06-21%20071243.jpg)
*Mathjax scaleup Font*
 

## Contextual Menu

If you want to disable the contextual menu, you can set the enableMenu option to false

```js
MathJax = {
  options: {
    enableMenu: false
  }
};
```

![Mathjax Contextual Menu](/assets/img/config-mathjax/Annotation%202024-06-21%20070337.jpg)
*Mathjax Contextual Menu*


## Mathjax in HTML: Cannot select equations

MathJax output can't be copied  from the page in version 3. Version 3 uses CSS with content properties in order to insert the characters into the page, and content text is not selectable in the page. [issues/2240](https://github.com/mathjax/MathJax/issues/2240) . Still you can use [Mathjax 2.7](https://docs.mathjax.org/en/v2.7-latest/) .

## References

- <https://www.mathjax.org/mathjax-v2-3-beta-now-available/>
- <https://docs.mathjax.org/en/latest/output/fonts.html>
- <https://stackoverflow.com/questions/66931266/mathjax-in-html-cannot-select-equations>
