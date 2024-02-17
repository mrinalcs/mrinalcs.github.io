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

      # Update external links
      content.gsub!(%r{<a\s+(?:[^>]*?\s+)?href="((?!mailto:|tel:|https?://mrinalcs.github.io|http://localhost:4000|/|#)[^"]*)"(?![^>]*?rel=)}, '<a href="\1?ref=mrinalcs.github.io" rel="nofollow noopener noreferrer"')

      
      # Update the item content
      item.output = content
    end
  end
end