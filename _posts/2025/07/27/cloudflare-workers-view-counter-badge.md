---
title: "Cloudflare Workers View Counter Badge"
description: "A fast, serverless badge system to count page views using Cloudflare Workers, D1, and Badgen."
date: 2025-07-27 
tags: [web]
image: "297251.jpg"
toc: false
---
 
Lets make a lightweight solution to create a view counter badge using Cloudflare Workers and Cloudflare D1, a serverless SQL database. This project generates SVG badges to display view counts, stores data persistently, and is easy to integrate into any webpage. Let’s dive into how it works, how to set it up.
 
So it will creat SVG badge displaying the number of views for a specific page or resource. It uses the [badgen](https://github.com/amio/badgen) library for badge rendering and Cloudflare D1 for persistent storage. The badge can be customized with query parameters for styling, making it versatile for various looks.

Here’s an example of what the default badge looks like:

<!-- <img src="https://view-counter-badge.mrinalcs.workers.dev" alt="Demo Badge" style="border-radius: 0px;">
 -->


  <img id="badgeImage" src="" alt="Badge Output" style="border-radius: 0px;" />

  <div class="controls" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 1rem;">
    <select id="label">
      <option value="Views">Views</option>
      <option value="Visitors">Visitors</option>
    </select>

    <select id="labelColor">
      <option value="555">gray</option>
      <option value="black">black</option>
      <option value="red">red</option>
      <option value="green">green</option>
      <option value="blue">blue</option>
    </select>

    <select id="color">
      <option value="blue">blue</option>
      <option value="green">green</option>
      <option value="red">red</option>
    </select>

    <select id="style">
      <option value="flat">flat</option>
      <option value="classic">classic</option>
    </select>

    <select id="scale">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>

    <button id="copyBtn" style="padding: 0.3rem 0.8rem; font-size: 0.9rem; cursor: pointer;">Copy URL</button>
  </div>

  <script>
    const baseURL = 'https://view-counter-badge.mrinalcs.workers.dev';
    const pageParam = 'page=demo';

    const label = document.getElementById('label');
    const labelColor = document.getElementById('labelColor');
    const color = document.getElementById('color');
    const style = document.getElementById('style');
    const scale = document.getElementById('scale');
    const badgeImage = document.getElementById('badgeImage');
    const copyBtn = document.getElementById('copyBtn');

    let currentURL = '';

    function updateBadge() {
      const labelValue = label.value;
      const query = `?${pageParam}&label=${encodeURIComponent(labelValue)}&labelColor=${labelColor.value}&color=${color.value}&style=${style.value}&scale=${scale.value}`;
      currentURL = `${baseURL}${query}`;

      badgeImage.style.opacity = 0.3;

      const tempImg = new Image();
      tempImg.onload = () => {
        badgeImage.src = currentURL;
        badgeImage.style.opacity = 1;
      };
      tempImg.src = currentURL;
    }

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(currentURL);
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = "Copy URL", 1500);
      } catch (err) {
        copyBtn.textContent = "Failed";
      }
    });

    [label, labelColor, color, style, scale].forEach(el =>
      el.addEventListener('input', updateBadge)
    );

    updateBadge();
  </script>

   
## Repository

[GitHub Repo](https://github.com/mrinalcs/view-counter-badge)


Once deployed, you can embed the badge in your website using markdown or HTML:

**Markdown**:
```markdown
![Views](https://view-counter-badge.<your-account>.workers.dev/?page=your-custom-id)
```

**HTML**:
```html
<img src="https://view-counter-badge.<your-account>.workers.dev/?page=your-custom-id" alt="views" />
```

Replace `your-custom-id` with a unique identifier for each page or project.

## Customization Options

The badge supports several query parameters for customization:

| Parameter   | Default | Allowed Values                      | Example                     |
|-------------|---------|-------------------------------------|-----------------------------|
| `page`      | `/`     | Any unique string                   | `?page=mrinal`              |
| `label`     | `Views` | Any string                          | `label=Visitors`            |
| `labelColor`| `555`   | CSS color (name or hex/RGB)         | `labelColor=black`          |
| `color`     | `blue`  | CSS color (name or hex/RGB)         | `color=green`               |
| `style`     | `flat`  | `flat`, `classic`                   | `style=classic`             |
| `scale`     | `1`     | Any positive number                 | `scale=2`                   |

For example:
```markdown
![Visitors](https://view-counter-badge.<your-account>.workers.dev/?page=blog&label=Visitors&color=green&style=classic&scale=1.5)
```
 
This View Counter Badge is a very simple for adding view tracking to your website. But to enable cross-origin usage securely (so your view badge only increments when embedded on your own site), you can implement CORS protection and Referrer/Origin header checks in your Cloudflare Worker. To avoid incrementing the view count for the same user repeatedly, you can use a combination of cookies and caching in the Cloudflare Worker also.