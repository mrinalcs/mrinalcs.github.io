## Setup

```
gem install jekyll
gem install jekyll bundler
bundle exec jekyll serve
bundle exec jekyll serve --livereload
jekyll clean
jekyll s --drafts
jekyll serve --future
bundle exec jekyll serve --incremental --profile
bundle exec jekyll serve --verbose --livereload --incremental
$env:JEKYLL_ENV="production"; bundle exec jekyll serve
```

## Posts

```md
---
title: "Post Title"
description: "Short description"
image: "path_to_image"
date: YYYY-MM-DD HH:MM:SS
tags: [tag1, tag2]
---
```

Browse to <http://localhost:4000>

https://mrinalcs.github.io