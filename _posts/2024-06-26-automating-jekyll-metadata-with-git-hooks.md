---
title: "Automating Jekyll Metadata with Git Hooks"
description: Automate Jekyll metadata using Git hooks, capturing commit history and setting last modified dates for enhanced content management.
date: 2024-06-26
image: "/assets/img/2024/06/26/automating-jekyll-metadata-with-git-hooks.png"
tags: [web,tips,metadata]
---

Integrating Git commit history and metadata into your Jekyll site can greatly enhance the informational value of your content. By using Jekyll hooks, you can automate the process of capturing commit history and setting metadata such as the last modified date and commit messages for your documents. 

## What Are Jekyll Hooks?

Jekyll hooks allow you to run custom code at different stages of the site's lifecycle. By using hooks, you can extend the functionality of your Jekyll site in a flexible and powerful way.

## Using  :documents :post_init  Hook

The `:documents, :post_init` hook runs after a document is initialized. You can use this hook to capture Git commit history and metadata for each document.

### Code Implementation

Add the following code to a plugin file in your Jekyll project, such as `_plugins/git_metadata.rb`:

```ruby
Jekyll::Hooks.register :documents, :post_init do |doc|
  git_dates_log_command = `git log --follow --format=%ad --date=iso-strict -- "#{doc.path}"`
  git_dates = git_dates_log_command.split("\n")
  doc.data["last_modified_at"] ||= git_dates.first
  doc.data["date"] ||= git_dates.last

  git_log_command = `git log --follow --format='%s' -- "#{doc.path}"`
  commit_messages = git_log_command.split("\n")
  doc.data["commit_messages"] = commit_messages
end
```

### jekyll Luquid

Get date and Last modified date

```html
<strong>Created on:</strong> {{ page.date | date: "%B %d, %Y" }}
<strong>Last modified on:</strong> {{ page.last_modified_at | date: "%B %d, %Y" }}
```
Get all commit messages

```html
<h2>Commit History</h2>
<ul>
 {% for message in page.commit_messages %}
  <li>{{ message }}</li>
 {% endfor %}
</ul>

```

## Commits with Dates and Author


To include commit messages with dates and authors in your Jekyll posts, you'll need to modify the Jekyll hook to capture this additional information from Git.

```ruby
Jekyll::Hooks.register :documents, :post_init do |doc|
  git_log_command = `git log --follow --format='%h - %an, %ad: %s' --date=iso-strict -- "#{doc.path}"`
  commit_log = git_log_command.split("\n")
  
  doc.data["commit_log"] = commit_log
end

```


```html
<h2>Commit History</h2>
<ul>
 {% for commit in page.commit_log %}
   <li>{{ commit | markdownify }}</li>
 {% endfor %}
</ul>

```



## Avoid if not already set

By using this approach, your Jekyll site will automatically fetch and set the last modified date and creation date based on Git commit history for every document, including index.md and other pages, enhancing the automated management of metadata across your site.


```ruby
[:documents, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_init do |doc|
  git_dates_log_command = `git log --follow --format=%ad --date=iso-strict -- "#{doc.path}"`
  git_dates = git_dates_log_command.split("\n")
  
  doc.data["last_modified_at"] ||= git_dates.first unless doc.data.key?("last_modified_at")
  doc.data["date"] ||= git_dates.last unless doc.data.key?("date")
 end
end
```

It ensure that the Git hook checks if the last_modified_at and date fields are already populated in the document data before assigning them, you can modify the code to include checks before assigning values.

Don't forget to add for github pages `workflows/jekyll.yml`.

```yml
# workflows/jekyll.yml
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
```

The `fetch-depth` parameter specifies the depth of the git fetch operation. Setting `fetch-depth` to `0` fetches all history for all branches and tags.