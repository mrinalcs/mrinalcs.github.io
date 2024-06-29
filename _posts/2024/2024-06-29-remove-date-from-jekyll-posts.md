---
title: "Remove Date from Jekyll Posts"
description: "How to remove the date from Jekyll post URLs and date from filenames."
date: 2024-06-29
tags: [jekyll,web,tips]
---

When working with Jekyll, you may want to remove the date from your post URLs and filenames for a cleaner and more modern URL structure. This can be achieved differently depending on whether you're working with collections or standard posts. Let's explore these methods in detail.


## Removing Dates from Collection Permalinks

For collections, like _blog, you can easily remove the date from the permalinks by setting the permalink attribute in your _config.yml file.


```yml

collections:
  blog:
    output: true
    permalink: /blog/:title

```

Create a New Post in Your Collection: When you create a new post in your `_blog` collection, you don't need to include the date in the filename. Simply name it `new-post.md`.

When you build your site, the URL for this post will be `/blog/new-post`, without any dates.

The resulting URL for the post will be:
 
```html
https://yourdomain.com/blog/new-post
```

## Removing Dates from Standard Posts

For standard posts, such as those typically stored in _posts, Jekyll requires the date in the filename  `_posts/2024-06-29-new-post.md`. To bypass this, you need a plugin.

Jekyll uses the date in the post filename to sort and organize posts. To remove the date and still maintain proper functionality, a plugin can intercept and adjust the filename and permalink structure.

## Create the Plugin

Add a new file named nodates.rb in the _plugins directory of your Jekyll site `_plugins/nodate.rb`.

```ruby

class Jekyll::PostReader
  def read_posts(dir)
    read_publishable(dir, "_posts", /.*\.(markdown|md)$/)
  end
  def read_drafts(dir)
    read_publishable(dir, "_drafts", /.*\.(markdown|md)$/)
  end
end

```

Remove Dates from Filenames: Rename your post files to remove the dates. For example, rename _posts/`2024-06-29-new-post.md` to `new-post.md`.

## Update Configuration

Ensure your _config.yml does not enforce dates in the permalinks.

```yaml
permalink: /:title
```

The resulting URL for the post will be:

https://yourdomain.com/new-post 
