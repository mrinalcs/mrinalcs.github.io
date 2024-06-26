---
title: Overflow a markdown table 
tags: [web,tips]
---
 
Using HTML Class
You can wrap your markdown table in a `<div>` with a specific class and then style that class in your CSS.

```html
<div class="table-wrapper">
    
| Name     | Age | Location    |
|----------|-----|-------------|
| John     | 25  | New York    |
| Jane     | 28  | Los Angeles |
| Michael  | 30  | Chicago     |
    
</div>
```

```css
.table-wrapper {
  overflow-x: scroll;
}
```

## Using Inline Style
Alternatively, you can add an inline style directly to the `<div>` to make the table scrollable. 


```html
<div  style="overflow-x: scroll;">
    
| Name     | Age | Location    |
|----------|-----|-------------|
| John     | 25  | New York    |
| Jane     | 28  | Los Angeles |
| Michael  | 30  | Chicago     |
    
</div>
```

## Using a Jekyll Plugin
If you're using Jekyll, you can create a plugin to automatically wrap tables with a scrollable container.

```rb
[:posts, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_render do |item|
    if item.output_ext == ".html"
      content = item.output

      # Wrap <table> tags with a div with style="overflow-x:auto;"
      content.gsub!(/<table(.*?)>/m, '<div style="overflow-x:auto;"><table\1>')
      content.gsub!(/<\/table>/m, '</table></div>')

      # Update the item content
      item.output = content
    end
  end
end
```


## Using Only CSS for Table
You can also make the table scrollable using only CSS without modifying the HTML.


```css
table {
    display: block;
    width: 100%;
    width: max-content;
    max-width: 100%;
    overflow: auto;
}
```


## Related

1. [Is there a way to overflow a markdown table using HTML?](https://stackoverflow.com/questions/41076390/is-there-a-way-to-overflow-a-markdown-table-using-html)
3. [Plugin > Wrap element with another element](https://talk.jekyllrb.com/t/plugin-wrap-element-with-another-element/8737)
2. [Create (horizontally) scrollable tables using markdown syntax](https://talk.jekyllrb.com/t/create-horizontally-scrollable-tables-using-markdown-syntax/6805)

By following any of these methods, you can ensure that your markdown tables remain readable responsive and neatly contained within your web page layout.