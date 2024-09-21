---
title: Me
description: Me with my friends 
image: "/assets/img/62r.png"
---
 
<div class="container-me">

  {% assign image_dir = "assets/img/me/" %}
  {% for image in site.static_files %}
    {% if image.path contains image_dir %}
      <img src="{{ site.baseurl }}{{ image.path }}" class="img-fluid" alt="{{ image.name }}">
    {% endif %}
  {% endfor %}
</div>
 