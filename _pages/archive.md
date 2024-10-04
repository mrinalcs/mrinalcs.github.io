---
title: Archive
description: All post and pages
---


## Pages
{% assign pages = site.pages %}
<ul>
  {% for page in pages %}
    {% unless page.url == '/archive' %}
     <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
    {% endunless %}
  {% endfor %}
</ul>

## Posts
{% assign posts = site.posts %}
<ul>
  {% for post in posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>


<h2>Yearly</h2>
<ul>
  {% assign years = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
  {% for year_group in years %}
    <li><a href="/{{ year_group.name }}">{{ year_group.name }}</a></li>
  {% endfor %}
</ul>

<h2>Monthly</h2>
<ul>
  {% assign months = site.posts | group_by_exp:"post", "post.date | date: '%Y/%m'" %}
  {% for month_group in months %}
    <li><a href="/{{ month_group.name }}">{{ month_group.name | replace: '/', '/' }}</a></li>
  {% endfor %}
</ul>