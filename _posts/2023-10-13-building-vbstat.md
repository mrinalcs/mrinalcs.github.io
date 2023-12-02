---
title: Building Vbstat
image: /img/blog/vbstat-home-page.jpg
---

**First commit** : **<time datetime="2023-09-24">September 24, 2023</time>** 
Initial object was keeping Handouts and Notes by students and faculty of BSc Statistics VisvaBharati. Later on I learnt basics of Jekyll and wanted to built a website to use it. I have tried to modified a template from github which available in Branch v1[^1] . Later on I have created (v2) from scratch and made a html template using  Bootstrap. Followings are which available in the page

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


## Screenshot
### Home page
The home page includes a hero section with image carousel and a blockquote , another section which have an accordion and about section.

![VBSTAT Home page](/img/blog/vbstat-home-page.jpg)
*vbstat home page*

### About page
All pages have a common sidebar with common tabs and reusable header and footer.

![VBSTAT about page](/img/blog/vbstat-about-page.jpg)
*vbstat about page*

## Features
### Offline
This works if ones loaded the webpage it works offline as well. I intentionally add this as when offline I can access pdf files without downloading.

### HOTWIRE: TURBO
For smooth transition I have added HOTWIRE TURBO which  make possible pag e transition wihout refresh which I liked so added to this project. 

###  Notes Page
This page is for listing all notes files by folders and a little addition adding file count. Later made every paper name as link to share a specefic section like [r-programming](https://vbstat.github.io/notes#r-programming)

<details>
  <summary>See Code</summary>
  <script src="https://gist.github.com/mrinalcs/9046ef5c8555c2450f244cbcd499e995.js"></script>
</details>

### Question Papers
This page dynamically list all question papers catagoried by sem and year based on folder. Additionaly there is filter to sort them out.
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
This page is incomplete as I didn't have much information about. I didn't find any information in public.

## Deploying
This reposetory [vbstat](https://github.com/mrinalcs/vbstat) was created by me and forked it from another github account and deployed to [https://vbstat.github.io](https://vbstat.github.io/)

## SEO
I have added Jekyll-seo-tag for seo. I have added some images from internet. I have added all infromation which are already available in public. Its comes in first place if searched with exact term. 

![vbstat google search result](/img/blog/vbstat-google-search-result.jpg)
*vbstat google search*

## Branches
I have created multiple branches only to keep revert if anything goes wrong when large changes done. So only contribute or check main branch.


##  Resources

* **Bootstrap v4.5**: <https://getbootstrap.com>
* **Google Fonts**: <http://fonts.google.com>
* **Font Awesome Free**: <https://fontawesome.com>

---

[^1]: [https://github.com/mrinalcs/vbstat/tree/v1](https://github.com/mrinalcs/vbstat/tree/v1).
[^2]: [baa4d3e6a9fd3d492257f123efd7e2277c2c147f](https://github.com/mrinalcs/vbstat/blob/baa4d3e6a9fd3d492257f123efd7e2277c2c147f).