---
title: "Mrinal Chandra Sarkar"
description: "Student of M.Sc in Statistics at Visva Bharati, Shantiniketan."
image: "/assets/img/og/profile.jpg"
date: 2024-12-29 
seo:
    type: WebSite
---

M.Sc. in Statistics student at Visva-Bharati, Shantiniketan.
  


## Projects

Explore the projects I’ve been working on:

{% assign posts_with_project_tag = site.posts | where: "tags", "project" %}

<ul style="list-style-position: inside; padding-left: 0;">
  {% for post in posts_with_project_tag limit:3 %}
    <li style="margin-bottom: 10px;list-style-type: '&#128193;'">
    
      <span style="font-weight: bold;">{{ post.title }}</span> : {{ post.description | truncate: 150 }}  <a href="{{ post.url }}" >read </a>
    </li>
  {% endfor %}
</ul>


## Contact

Feel free to reach out at <a href="mailto:mrinalcs@yahoo.com"  style='text-decoration:none;color:var(--t)'  class="icon-mail-alt"> mrinalcs@yahoo.com</a>
 
Connect with me on <a href="https://www.linkedin.com/in/mrinalcs/" class="social-link" title="Connect with me on LinkedIn"  style='text-decoration:none'  class="icon-linkedin">LinkedIn</a> & <a href="https://github.com/mrinalcs" class="social-link" title="Check out my GitHub"  style='text-decoration:none'  class="icon-github-circled">GitHub</a> 

