---
title: Archive
description: All post and pages
---


## Pages
{% assign pages = site.pages %}
<ul>
  {% for page in pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

## Posts
{% assign posts = site.posts %}
<ul>
  {% for post in posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
