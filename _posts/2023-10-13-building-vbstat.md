---
title: Building Vbstat
description: The making of VBSTAT a github page using jekyll to list Handouts and Notes
image: /img/blog/vbstat-home-page.jpg
---

I initially started with [vbstat.epizy.com](https://vbstat.epizy.com){:rel="nofollow" target="_blank"} and later on [vbstat.ml](https://vbstat.ml){:rel="nofollow" target="_blank"} which domain no more exist rather not free. So I've migrated to GitHub Pages.

My first commit was on **First commit** : **<time datetime="2023-09-24">September 24, 2023</time>** Initially, the aim was to compile handouts and notes from both students and faculty of BSc Statistics at Visva Bharati. Later on I learnt basics of Jekyll and wanted to built a website to use it. I have tried to modified a template from github which available in Branch [v1](https://github.com/mrinalcs/vbstat/tree/v1) . Later on I have created [v2](https://github.com/mrinalcs/vbstat/blob/baa4d3e6a9fd3d492257f123efd7e2277c2c147f) from scratch after making a html template using  Bootstrap. Followings are pdf notes which available in the page from previous.

- Calculus
- Demography and Vital Statistics
- Mathematical Analysis
- Multivariate Analysis and Nonparametric
- Operations Research
- Probability
- R Programming
- Sample Survey
- Stochastic Process
- Testing of Hypothesis
- Time Series Analysis


## Screenshots

### Home page
The home page includes a hero section with image carousel and a blockquote , another section which have an accordion and about section.

![Home Page Screen Short](/img/blog/vbstat-home-page.jpg)
*Vbstat home page*

### About page
All pages have a common sidebar with common tabs and reusable header and footer.

![About Page Screen Short](/img/blog/vbstat-about-page.jpg)
*Vbstat about page*

## Features

### Offline
This works if ones loaded the webpage it works offline as well. I intentionally add this as when offline I can access pdf files without downloading.

### Hotwire: Turbo
For smooth transition I have added HOTWIRE TURBO which  make possible pag e transition wihout refresh which I liked so added to this project. 

### Normalization of Url

For Student, Alumni page to fix username and url problem i write this plugin for GitHub, Facebook, Twitter, LinkedIn, Instagram, Google Scholar, personal websites, and YouTube.

### DistFilter

The purpose of this filter is to remove HTML comments from the default layout. Using gsub method with a regular expression to replace all HTML comment.

## Pages

Heres some special pages which took times.

### Faculty 
The layout is designed to feature promoted faculties at the top, followed by a comprehensive list of all faculties sort based on weight. 

###  Notes Page
This page is for listing all notes files by folders and a little addition adding file count. Later made every paper name as link to share a specefic section like [r-programming](https://vbstat.github.io/notes#r-programming)

<details>
  <summary>See Code</summary>
  <script src="https://gist.github.com/mrinalcs/9046ef5c8555c2450f244cbcd499e995.js"></script>
</details>

### Question Papers
This page dynamically list all question papers catagoried by sem and year based on folder. Additionaly there is filter to sort them out. Questionpaper > Year > Sem .
<details>
  <summary>See Code</summary>
  <script src="https://gist.github.com/mrinalcs/32755c35bdd408ffa0ab7a62032852a2.js"></script>
</details>

### Student page
This page automatically list student in this page by year based on the admissio date in the front matter in each students. Alumni pages are  also same by logic. 

<details>
  <summary>See Code</summary>
  <script src="https://gist.github.com/mrinalcs/872f48858f4b9cdb2513071ed7a22902.js"></script>
</details>

### Scholars page
This page is incomplete as I didn't have much information about. I didn't find any information on the Internet.

## Deploying
This reposetory [vbstat](https://github.com/mrinalcs/vbstat) was created by me and forked it from another github account and deployed to [https://vbstat.github.io](https://vbstat.github.io/)

## Seo
Used Jekyll-seo-tag for seo. I have added some images from internet. I have added all infromation which are already available on the Internet. One thing just do is bring all of them in one place.

![Google search result](/img/blog/vbstat-google-search-result.jpg)
*vbstat google search*

## Branches
I have created multiple branches only to keep revert if anything goes wrong when large changes done. So only contribute or check main branch.


##  Resources

* **Bootstrap v5.3.2**: <https://getbootstrap.com>
* **Google Fonts**: <http://fonts.google.com>
* **Font Awesome Free**: <https://fontawesome.com>
* **Hotwire Turbo**: <https://turbo.hotwired.dev>
* **Faculty info**: <https://www.visvabharati.ac.in>
* **Student name**: <https://vbu.ucanapply.com>
