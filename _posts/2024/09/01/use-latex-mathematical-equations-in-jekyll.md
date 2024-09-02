---
title: "Use LaTeX Mathematical Equations in Jekyll"
description: "How to integrating LaTeX mathematical equations into your Jekyll site using MathJax, Katex, SVG image format"
date: 2024-09-01 
tags: [latex]
---
 

If you're building a Jekyll site and need to include LaTeX mathematical equations, there are a few different methods you can use. In this post, we'll explore three popular options: MathJax, KaTeX, and rendering equations as SVG images.

##  Using MathJax

[MathJax](https://www.mathjax.org/) is a popular JavaScript library that displays LaTeX, MathML, and AsciiMath notation in web browsers. It's easy to set up in Jekyll.
 
Include the following script in your site in the specific pages where you want to use MathJax 

   ```html
   <script type="text/javascript" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
   </script>
   ```

 

##  Using KaTeX

[KaTeX](https://katex.org/) is another JavaScript library for rendering LaTeX equations. It’s known for its fast performance and small size compared to MathJax.

Add the following to your site's header 

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css">
   <script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.js"></script>
   <script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/contrib/auto-render.min.js"></script>
   <script>
       document.addEventListener("DOMContentLoaded", function() {
           renderMathInElement(document.body);
       });
   </script>
   ```

## Convert formulas to HTML

Add the following lines to your `_config.yml` file to enable KaTeX as the math engine 

```yml
kramdown:
  math_engine: katex
 ```
{: file='_config.yml'}
 

```html
<!-- KaTeX CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css">
```


##  Using SVG Image

If you prefer not to use JavaScript libraries, you can convert LaTeX equations to SVG images and embed them directly in your markdown files.

 
1. **Generate SVG Images**  
   Use a tool like [LaTeX to SVG](https://www.quicklatex.com/) to generate SVG images from your LaTeX code.

2. **Embed SVG in Markdown**  
   Download the SVG file and embed it in your markdown like this:

   ```markdown
   ![Equation](path/to/equation.svg)
   ```

   This method works well if you have a few static equations and want to keep your site fast.

## Conclusion


| **Feature**                        | **MathJax**                                                  | **KaTeX**                                                     | **KaTeX with Auto-rendering**                                  | **SVG Image Format**                                        |
|------------------------------------|--------------------------------------------------------------|----------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------------------------|
| **Rendering Speed**                | Slower                                                       | Faster                                                         | Faster                                                         | Instant (once image is loaded)                              |
| **File Size**                      | Larger (includes MathJax library)                            | Smaller (lighter KaTeX library)                                | Smaller (only KaTeX css)                                | Minimal (only SVG files)                                    |
| **Setup Complexity**               | Easy (include script on pages)                               | Moderate (include scripts and CSS)                             | Moderate (add config and include CSS)              | Easy (convert LaTeX to SVG and embed in markdown)           |
| **Dynamic Rendering**              | Yes                                                          | Yes                                                            | Yes                                                            | No (static images)                                          |
| **LaTeX Support**                  | Comprehensive (supports complex formulas)                    | Limited (supports most LaTeX but less comprehensive)           | Limited (supports most LaTeX but less comprehensive)           | None (limited to what’s converted to SVG)                   |
| **Best For**                       | Complex math notation on dynamic pages                       | Performance-focused sites with dynamic rendering               | GitHub Pages sites with auto-rendering (best if less latex)                         | Lightweight, static sites with few equations                |


Choosing the right method depends on your needs. MathJax and KaTeX are great for dynamic rendering, while SVG images work well for a lightweight, static site. Try out these methods and see which one suits your Jekyll site best!
