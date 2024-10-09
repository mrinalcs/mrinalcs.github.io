---
title: Me
description: Me with my friends 
image: "/assets/img/62r.png"
---
 
<div class="container-me">
  {% assign image_dir = "assets/img/me/" %}
  {% for image in site.static_files %}
    {% if image.path contains image_dir %}
      <div class="image-container">
        <img src="{{ site.baseurl }}{{ image.path }}" class="img-fluid" alt="{{ image.name | replace: '-', ' ' | replace: '_', ' ' | replace: '.jpg', '' | replace: ' me ', ' Mrinal ' | capitalize }}">
        <em>{{ image.name | replace: '-', ' ' | replace: '_', ' ' | replace: '.jpg', '' | replace: ' me ', ' Mrinal ' | capitalize_all }}</em>
      </div>
    {% endif %}
  {% endfor %}
</div>

 
<style>
.container-me {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 15px;
}

.image-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
}

.container-me img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container em {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover em {
  opacity: 1;
}

.container-me img:hover {
  transform: scale(1.05);
}

</style>