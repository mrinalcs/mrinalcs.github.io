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
<ul class="project-list">
  {% for post in posts_with_project_tag limit:3 %}
    <li>
      <a href="{{ post.url }}" class="project-link">
        {% if post.image %}
          <img src="{{ post.image }}" alt="{{ post.title }}" class="project-thumbnail">
        {% else %}
          No Image
        {% endif %}

        <div class="text-wrap">
          <div class="title">{{ post.title }}</div>
          <div class="desc"><p>{{ post.description | truncate: 150 }}</p></div>
        </div>
      </a>
    </li>
  {% endfor %}
</ul>




## Contact

Feel free to reach out at <a href="mailto:mrinalcs@yahoo.com"  style='text-decoration:none;color:var(--t)'  class="icon-mail"> mrinalcs@yahoo.com</a>
 
 

Looking for something specific? Try <a href="/search" class="icon-search" style='text-decoration:none'>search</a>