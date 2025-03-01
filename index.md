---
title: "Mrinal Chandra Sarkar"
description: "Student of M.Sc in Statistics at Visva Bharati, Shantiniketan."
image: "/assets/img/og/profile.jpg"
date: 2024-12-29 
seo:
    type: WebSite
---

Student of M.Sc in Statistics at Visva Bharati, Shantiniketan.
 
## Skills

<ul style="list-style-type: none;padding-left: 0;list-style-position: inside;">
  <li> <strong>Statistical Analysis</strong>: Descriptive, ANOVA, Regression Analysis, Time Series, Principal Component Analysis, Stochastic Processes</li>
  <li> <strong>Programming Languages:</strong> R Programming, C, Python, SQL</li>
  <li> <strong>Tools:</strong> R Studio, Jupyter Notebook, MS Excel, Word, Overleaf (LaTeX), Git</li>
</ul>


## Projects
Explore my projects on [Github](https://github.com/mrinalcs) to see what I've been working on. Here are a few highlights:

{% assign posts_with_project_tag = site.posts | where: "tags", "project" %}

<ul style="list-style-position: inside; padding-left: 0;">
  {% for post in posts_with_project_tag limit:3 %}
    <li style="margin-bottom: 10px;list-style-type: '&#10045;'">
      <span style="font-weight: bold;">{{ post.title }}</span> : {{ post.description | truncate: 150 }} <a href="{{ post.url }}">read</a>
    </li>
  {% endfor %}
</ul>


## Contact

Connect with me on [LinkedIn](https://www.linkedin.com/in/mrinalcs/) 

Feel free to reach out at [mrinalcs@yahoo.com](mailto:mrinalcs@yahoo.com)

Download CV[![Mrinal Chandra Sarkar CV](/assets/img/cv.png)](/assets/doc/cv.pdf "Download Mrinal Chandra Sarkar CV")