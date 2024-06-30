---
title: "LaTeX in R Markdown"
description: "How to incorporate LaTeX into your R Markdown documents for mathematical notation." 
image:  
tags: [latex,r-programming]
---
 
R Markdown is a powerful tool for creating reports and presentations, but it can be used to get LaTeX output. It can generate `.html` `.docx` `.pdf` from RMarkdown file. 

## Installing 

R Markdown utilise MikTex, tinytex etc. to generate pdf output. To use LaTeX in R Markdown, you'll need to install the following packages:

- rmarkdown (already there)
- tinytex (or install `MikTeX `on your machine.)


Now `File > New File > RMarkdown` creat a markdown file. Remeber it will creat outputs in same folder you saved the `.Rmd` file.

Now this will creat a bolder plate  for you. Remove all just keep frontmatter part and write your document.

```markdown
---
title: "My New Document"
author: "Mrinal Chandra Sarkar"
date: "2024-06-30"
output: pdf_document
---
```


### Example

```markdown
## Introduction

The binomial distribution is a fundamental concept in probability theory and statistics. It describes the number of successes in a fixed number of independent trials, each with a constant probability of success.

Mathematical Formulation

Let $X$ be the number of successes in $n$ trials, with probability of success $p$ in each trial. The probability mass function (PMF) of the binomial distribution is given by:

$$f(x) = P(X = x) = \binom{n}{x} p^x (1-p)^{n-x}$$

where $\binom{n}{x}$ is the binomial coefficient.

## Properties

-   Mean: $E(X) = np$
-   Variance: $Var(X) = np(1-p)$
-   Standard Deviation: $\sigma = \sqrt{np(1-p)}$

## Applications

The binomial distribution has numerous applications in various fields, including:

-   Finance: modeling stock prices, risk management
-   Biology: modeling population growth, genetics
-   Medicine: modeling disease prevalence, treatment outcomes

```

### Output 

![r markdown pdf output](2024-06-30%20at%2021.41.20_127ab6f3.jpg)
*sample R Markdown pdf output sample*

Thats it write latex as use syntax `$` `\( ` and `$$` `\[` for inline and block math like in mathjax.

## Adding Packages

You can enhance LaTeX's capabilities by including additional packages. To add a package, use the header-includes field in the YAML front matter.

```markdown
---
title: "My New Document"
author: "Mrinal Chandra Sarkar"
date: "2024-06-30"
output: pdf_document
header-includes:
   - \usepackage{amsmath}
---
```


## Visual Editor

R Studio has visual editor feature. Its very handy to see output instantly without delay. To use this toogle `Source` and `Visual` options.

![R Markdown Visual editor for latex syntax for pdf of binomial equation](2024-06-30%20at%2022.41.20_127ab6f3.jpg)
*R Markdown Latex Visual editor*


Now you are ready to go . 