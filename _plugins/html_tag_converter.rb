[:posts, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_render do |item|
    if item.output_ext == ".html"
      content = item.output

      # Remove HTML comments
      content.gsub!(/<!--(.*?)-->/m, "")

      # Remove meta tag with name="generator"
      content.gsub!(/<meta\s+name=["']generator["'][^>]*>/i, '')

      # Remove trailing spaces before self-closing tag (/>)
      content.gsub!(/\s\/>/, '>')

      # Remove all empty spaces between HTML tags
      content.gsub!(/>[[:space:]]+</, '><')

      # Replace img src="/ with img src="https://mrinalcs.github.io/
      content.gsub!('img src="/', 'img src="https://mrinalcs.github.io/')

      # Replace a href="/ with a href="https://mrinalcs.github.io/
      content.gsub!('a href="/', 'a href="https://mrinalcs.github.io/')

      # Add ?ref=mrinalcs.github.io to external links
      content.gsub!(%r{<a\s+(?!.*\b(?:href=|href=\s*/|\s*['"]\s*internal|\s*['"]\s*/|\s*['"]\s*#))[^>]*href=(['"])(https?://\S*?)\1[^>]*>}i, '<a href=\1\2?ref=mrinalcs.github.io\1 target="_blank" rel="noopener noreferrer">')


      # Update the item content
      item.output = content
    end
  end
end