---
title: "Custom Pagination in Jekyll"
description: "Create a custom pagination plugin in Jekyll that generates .html files instead of using trailing slashes."
image: "2528.jpg"
date: 2025-02-08
tags: [jekyll,web,tips]
---
 
Jekyll’s default pagination plugin is great for generating paginated pages, but it has a major limitation—it only works with URLs like `/page/2/` instead of `/2.html`. For pagination with custom page filenames like 2.html, 3.html , and so on can be created with a custom pagination plugin. 

Pagination for categories, tags and collections `jekyll-paginate-v2` plugin can be used but this plugin is not supported by GitHub Pages. The following plugin creat blog page /blog and clean pagination.
  
## Create Jekyll Plugin  

Create a file named `_plugins/custom_pagination.rb` and add the following code:  

```ruby
module Jekyll
    class Pagination < Generator
      safe true
  
      def generate(site)
        if site.config['pagination']['active']
          paginate(site)
        end
      end
  
      def paginate(site)
        all_posts = site.posts.docs.reverse
        paginate_size = site.config['pagination']['paginate'].to_i
        total_pages = (all_posts.size / paginate_size.to_f).ceil
  
        (1..total_pages).each do |current_page|
          pager = Pager.new(site, current_page, all_posts, total_pages, paginate_size)
          index_page = HomeIndexPage.new(site, current_page)
          index_page.pager = pager
          site.pages << index_page
        end
      end
    end
  
    class Pager
      attr_reader :current_page, :total_pages, :posts, :previous_page, :next_page
  
      def initialize(site, current_page, all_posts, total_pages, paginate_size)
        @current_page = current_page
        @total_pages = total_pages
        start = (current_page - 1) * paginate_size
        @posts = all_posts.slice(start, paginate_size)
        @previous_page = current_page > 1 ? current_page - 1 : nil
        @next_page = current_page < total_pages ? current_page + 1 : nil
      end
  
      def to_liquid
        {
          'current_page' => @current_page,
          'total_pages' => @total_pages,
          'posts' => @posts,
          'previous_page' => @previous_page,
          'next_page' => @next_page
        }
      end
    end
  
    class HomeIndexPage < Page
      def initialize(site, current_page)
        @site = site
        @base = site.source
        @dir = '/'
        @name = current_page == 1 ? 'blog.html' : "blog/#{current_page}.html"
        self.process(@name)
        self.read_yaml(File.join(@base, '_layouts'), 'blog.html')
        self.data['title'] = "Page #{current_page}" if current_page > 1
      end
    end
  end
```

## Creat Blog Layout

Create a blog page layout named `_layouts/blog.html` and add the following code:  


```html
---
layout: default
title: Blog
---
<ul class="post-list">
  {% for post in paginator.posts %}
    <li>
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </li>
  {% endfor %}
</ul>

<div class="pagination">
  {% if paginator.previous_page %}
    {% if paginator.previous_page == 1 %}
      <a href="/blog">Previous</a>
    {% else %}
      <a href="/blog/{{ paginator.previous_page }}">Previous</a>
    {% endif %}
  {% endif %}

  <!-- Page numbers -->
  {% for page in (1..paginator.total_pages) %}
    {% if page == paginator.current_page %}
      <span class="current">{{ page }}</span>
    {% else %}
      {% if page == 1 %}
        <a href="/blog">1</a>
      {% else %}
        <a href="/blog/{{ page }}">{{ page }}</a>
      {% endif %}
    {% endif %}
  {% endfor %}

  {% if paginator.next_page %}
    <a href="/blog/{{ paginator.next_page }}">Next</a>
  {% endif %}
</div>
```


## Config

```yml
pagination:
  active: true
  paginate: 20  # Number of posts per page
```

With these steps, you now have a custom pagination solution that generates clean .html files for each page of your blog.