---
title: "Mrinal Chandra Sarkar"
description: "Student of M.Sc in Statistics at Visva Bharati, Shantiniketan."
image: "/assets/img/og/profile.jpg"
date: 2024-12-29 
seo:
    type: WebSite
---

M.Sc. in Statistics, Visva-Bharati University, Shantiniketan.
  


## Projects

Explore the projects I’ve been working on:

{% assign posts_with_project_tag = site.posts | where: "tags", "project" %}

<ul style="list-style-position: inside; padding-left: 0;">
  {% for post in posts_with_project_tag limit:3 %}
    <li style="margin-bottom: 10px;list-style-type: '&#128193;'">
    
      <span style="font-weight: bold;"><a style="text-decoration:none; color: var(--tc);" href="{{ post.url }}" >{{ post.title }}</a></span> : {{ post.description | truncate: 150 }}  <a href="{{ post.url }}" >read </a>
    </li>
  {% endfor %}
</ul>


## Contact

Feel free to reach out at <a href="mailto:mrinalcs@yahoo.com"  style='text-decoration:none;color:var(--t)'  class="icon-mail"> mrinalcs@yahoo.com</a>
 
 

Looking for something specific? Try <a href="/search" class="icon-search" style='text-decoration:none'>search</a>