---
title: Open External Links in New Tab in Jekyll
description: How to open external links in a new tab in Jekyll, especially when GitHub Pages restricts certain plugins.
image: "/2024/06/26/jtb.png"
tags: [web,tips]
---


There is already a plugin, but dont work with github pages as it support limited no of plugins. But you can creat a custom plugin to automate.


[Jekyll Target Blank](https://github.com/keithmifsud/jekyll-target-blank)
 

## When Add ref and target="_blank" Attributes

External Links: Add attributes to links that lead to external websites or domains not controlled by your Jekyll site.

Example:

```html
[Example](https://example.com) 
or
<a href="https://example.com">Example</a>
```

After modification:

```html 
<a href="https://example.com?ref=example.com" target="_blank" rel="nofollow noopener noreferrer">Example</a>

```

This enhance User Experience by opening external links in new tabs, preventing users from navigating away from your site unintentionally.

 

## When Not to Add ref and target="_blank" Attributes 

Internal Links: Links within your own site's domain or subdomains.

```md
[About](/about)

[Section 1](#section-1)

[Contact Us](mailto:info@example.com)

[Localhost About](http://localhost:4000/about)

[Call Us](tel:+1234567890)

```

```html
<!-- After modification: -->
<a href="/about">About</a>
<a href="#section-1">Section 1</a>
<a href="mailto:info@example.com">Contact Us</a>
<a href="http://localhost:4000/about">Localhost About</a>
<a href="tel:+1234567890">Call Us</a>
```
 

## Creating a Custom Plugin

To automate opening external links in a new tab, you can make a custom plugin. Here's a simplified approach:

 **Create a Plugin File**: In your Jekyll project, create a new file, e.g., `external_links.rb` inside `_plugins` folder.

```ruby
[:documents, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_render do |item|
    if item.output_ext == ".html"
      content = item.output
      site_url = item.site.config['url']
      
      # Add rel="nofollow noopener noreferrer" to external anchor tags and ref parameter
      content.gsub!(%r{<a\s+href="((?!mailto:|tel:|#{Regexp.escape(site_url)}|http://localhost:4000|/|#)[^"]+)"(?![^>]*rel=)}, 
                    "<a href=\"\\1?ref=#{site_url.gsub('https://', '')}\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"")

      # Update the item content
      item.output = content
    end
  end
end 

``` 

The `[:documents, :pages].each do |hook|` line iterates over an array containing `:documents` and `:pages`. This suggests it's registering a hook for both Jekyll documents and pages.


`content.gsub!(%r{<a\s+href="((?!mailto:|tel:|#{Regexp.escape(site_url)}|http://localhost:4000|/|#)[^"]+)"(?![^>]*rel=):` Uses a regex to identify external links (not mailto, tel, internal links, or anchors) and adds `rel="nofollow noopener noreferrer"` attributes. It also appends a ref parameter with a simplified site URL.


## Whitelisting domains

You may want to whitelist some domains. The whitelist array contains domains that should be excluded from having the `rel` attributes added. This ensures that trusted domains or local links do not have unnecessary attributes.

```ruby

[:documents, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_render do |item|
    if item.output_ext == ".html"
      content = item.output
      site_url = item.site.config['url']
      whitelist = ['cloudinary.com', 'example.com', 'localhost', 'mailto:', 'tel:']  # whitelist domains

      # Add rel="nofollow noopener noreferrer" to external anchor tags and ref parameter
      content.gsub!(%r{<a\s+href="((?!#{whitelist.map { |d| Regexp.escape(d) }.join('|')})[^"]+)"(?![^>]*rel=)}, 
                    "<a href=\"\\1?ref=#{site_url.gsub('https://', '')}\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"")

      # Update the item content
      item.output = content
    end
  end
end

``` 

This script is a comprehensive customization for Jekyll, enhancing HTML output by adjusting paths, modifying external link behavior, transforming specific HTML patterns, and cleaning up markup. It's designed to be used within a Jekyll plugin or configuration file to automate these modifications across documents and pages during the rendering process. Adjustments like these can help maintain consistency and enhance functionality across a Jekyll-powered website.  


Optionly you can do using JavaScript [Open External Links in New Tab](/open-external-links-in-new-tab)

Thats all