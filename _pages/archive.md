---
title: Archive
---


## Assets Folder
{% assign assets = site.static_files | where_exp: "file", "file.path contains '/assets/'" %}
<ul>
  {% for file in assets %}
    <li>{{ file.path | relative_url }}</li>
  {% endfor %}
</ul>

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
