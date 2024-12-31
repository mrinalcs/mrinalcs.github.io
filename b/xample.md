---
layout: default
title: Paginated Posts
---

<h1>Paginated Posts</h1>

{% assign posts_per_page = 5 %}
{% assign total_posts = site.posts.size %}
{% assign total_pages = total_posts | divided_by: posts_per_page | ceil %}

{% for page_num in (1..total_pages) %}
  <h2>Page {{ page_num }}</h2>
  <ul>
    {% assign start_index = posts_per_page | times: page_num | minus: posts_per_page %}
    {% assign end_index = posts_per_page | times: page_num %}
    
    {% for post in site.posts offset: start_index limit: posts_per_page %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%Y-%m-%d" }})
      </li>
    {% endfor %}
  </ul>
{% endfor %}
