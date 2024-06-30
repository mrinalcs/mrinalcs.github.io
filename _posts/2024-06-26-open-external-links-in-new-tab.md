---
title: Open External Links in New Tab
description: How to automatically open external links in a new tab using HTML attributes and JavaScript, ensuring a seamless browsing experience for your website visitors.
tags: [web,tips]
---

Why Bother Opening Links in a New Tab?
First off, why would you want to do this? Well, opening links in a new tab can be really handy because:

It keeps visitors on your site. They can check out the external link and easily come back.
It’s less disruptive. Users don't lose their place on your site while they explore other resources.

## `target` Attribute
The trick is in the HTML anchor `(<a>)` tag's `target` attribute. By setting this attribute, you can control where the link opens.

Here's the basic idea

```html
<a href="URL" target="_blank">Link Text</a>
```

href: This is where you put the URL you want to link to.
target="_blank": This tells the browser to open the link in a new tab.

## Adding rel="noopener noreferrer"
There’s one more thing to make it even better: adding `rel="noopener noreferrer"`. This is important for security because:

- ``noopener`` prevents the new page from being able to mess with your original page.
- `noreferrer` stops the new page from seeing where the user came from.
Here's how you do it:

```html
<a href="URL" target="_blank" rel="noopener noreferrer">Link Text</a> 
```


## Automating with JavaScript
If you have a lot of links, manually adding `target="_blank"` to each one can be tedious. Luckily, you can use a bit of JavaScript to set this attribute automatically for all links on your page. Here’s how:

```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  });
</script>
```


## External Links Only

Obviously you dont want internal links to open in other tab so apply to external links only

```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });
</script>

```

`if (link.hostname !== window.location.hostname) { ... }:` This checks if the link's hostname is different from the current site's hostname, applying the attributes only to external links.


## Whitelisting Domains
```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    const whitelistedDomains = ['linkedin.com', 'github.com']; // Add your whitelisted domains here
    
    links.forEach(link => {
      const linkHostname = new URL(link.href).hostname;
      if (whitelistedDomains.some(domain => linkHostname.includes(domain))) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });
</script>
```

`if (whitelistedDomains.some(domain => linkHostname.includes(domain))) { ... }: `This checks if the link’s hostname is in the whitelisted domains array and applies the attributes only to those links.


## Starting with http
```html
<script>
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (link.href.includes('http')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
</script>
```

That's It!

And that's all there is to it! Just by adding this little script, you can ensure that only links to specific domains open in a new tab, keeping your site visitor-friendly and secure.
