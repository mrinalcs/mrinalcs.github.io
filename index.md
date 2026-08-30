---
title: "Mrinal Chandra Sarkar"
description: "Project Linked Person at the Sampling and Official Statistics Unit, Indian Statistical Institute, Kolkata, M.Sc Statistics at Visva Bharati, Shantiniketan."
image: "/assets/img/profile-square.png"
date: 2024-12-29 
last_modified_at: 2026-04-03
seo:
    type: WebSite
---

Project Linked Person at SOSU, ISI, Kolkata  

Previously, Data Analyst Trainee Intern at IDEAS-TIH, Kolkata.

M.Sc. in Statistics, Visva-Bharati University, Shantiniketan.
  


## Projects

Explore the projects I’ve been working on:



{% assign pinned_project = site.pinned_project %}

{% assign posts_with_project_tag = site.posts | where_exp: "post", "post.tags contains 'project'" %}

<ul class="project-list">
 {% for pinned_url in pinned_project %}
  {% for post in posts_with_project_tag %}
    {% if post.url == pinned_url %}
      <li>
        <a href="{{ post.url }}" class="project-link">
          {% if post.image %}
            <img src="{{ post.image }}" alt="{{ post.title }}" class="project-thumbnail">
          {% else %}
            No Image
          {% endif %}

          <div class="text-wrap">
            <p class="title">{{ post.title }}</p>
            <p class="desc">{{ post.description | truncate: 150 }}</p>
          </div>
        </a>
      </li>
     {% endif %}
  {% endfor %}
{% endfor %}
</ul>




## Contact

Feel free to reach out at <a href="mailto:mrinalcs@yahoo.com"  style='text-decoration:none;color:var(--t)'  class="icon-mail"> mrinalcs@yahoo.com</a>
 
 

Looking for something specific? Try <a href="/search" class="icon-search underline" style='text-decoration:none'>search</a>

<!-- 
<img src="assets/img/tech-stack.png" width="1080" height="720" alt="my tech stack" style="background: none;border:none; border-radius: 0;width: 50%;">
 -->
