---
title: Mrinal Chandra Sarkar
image: /assets/img/og/mrinal_vv2mkl_Thumbnail.jpg
description: Student of M.Sc in Statistics at Visva Bharati, Shantiniketan.
seo:
    type: WebSite
---


I am from [India, West Bengal](https://maps.app.goo.gl/CLBrAaFLwJKZy9H86) currently pursuing my Master's degree in Statistics at Visva Bharati, Shantiniketan.

<br>
## Projects

Explore my projects on [Github](https://github.com/mrinalcs) to see what I've been working on. Here are a few highlights:

{% assign posts_with_project_tag = site.posts | where: "tags", "project" %}

{% for post in posts_with_project_tag limit:3 %}
- **[{{ post.title }}]({{ post.url }})**: {{ post.description  | markdownify | strip_html | strip_newlines }}
{% endfor %}
 
- **Project 1:** A detailed analysis of [Project 1 Description]
- **Project 2:** Implementation of [Project 2 Description]
- **Project 3:** Insights into [Project 3 Description]
 
<br>

## Blog

I occasionally write about statistics, data science, and places. Check out my latest posts:

{% assign posts_with_stat_tag = site.posts | where: "tags", "stat" %}

{% for post in posts_with_stat_tag limit:3 %}
- **[{{ post.title }}]({{ post.url }})**: {{ post.date | date: "%B %d, %Y" }}
{% endfor %}


<br>

## Skills

- **Statistical Analysis**
- **Programming Languages:** R, C, Python
- **Tools:** Excel, LaTeX

<br>
## Online Profiles

- **[Facebook](https://www.facebook.com/mrinalcs)**
- **[Github](https://github.com/mrinalcs)**
- **[LinkedIn](https://www.linkedin.com/in/mrinalcs)**
<br>

## Resume

Interested in my professional background? Feel free to [download my CV](assets/cv.pdf).
<br> 


