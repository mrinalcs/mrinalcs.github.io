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

<style>
.project-list {
  list-style: none;
  padding-left: 0;
}

.project-list li {
  margin-bottom: 20px;
}

.project-link {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
  color: var(--tc);
  border-radius: 8px;
  padding: 10px;
  transition: background 0.2s;
}

.project-link:hover {
  background: rgba(0, 0, 0, 0.05); /* light hover effect */
}

.project-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.project-content {
  max-width: 100%;
}

.project-content .title {
  font-weight: bold;
  margin-bottom: 4px;
}
</style>

<ul class="project-list">
  {% for post in posts_with_project_tag limit:3 %}
    <li>
      <a href="{{ post.url }}" class="project-link">
        {% if post.image %}
          <img src="{{ post.image }}" alt="{{ post.title }}" class="project-thumbnail">
        {% else %}
          <img src="/assets/default-thumbnail.jpg" alt="default" class="project-thumbnail">
        {% endif %}
        
        <div class="project-content">
          <div class="title">{{ post.title }}</div>
          <div class="desc">{{ post.description | truncate: 150 }}</div>
        </div>
      </a>
    </li>
  {% endfor %}
</ul>



## Contact

Feel free to reach out at <a href="mailto:mrinalcs@yahoo.com"  style='text-decoration:none;color:var(--t)'  class="icon-mail"> mrinalcs@yahoo.com</a>
 
 

Looking for something specific? Try <a href="/search" class="icon-search" style='text-decoration:none'>search</a>