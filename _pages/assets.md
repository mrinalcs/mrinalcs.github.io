---
title: Assets
---

<ul>
  {% for file in site.static_files %}
    {% if file.path contains '/assets/' %}
      <li><a href="{{ file.path | relative_url }}">{{ file.path | remove_first: '/' }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
