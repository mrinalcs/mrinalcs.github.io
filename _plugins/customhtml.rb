Jekyll::Hooks.register :documents, :post_render do |document|
    if document.output_ext == ".html"
      content = document.output
  
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

      # Update the document content
      document.output = content
    end
  end