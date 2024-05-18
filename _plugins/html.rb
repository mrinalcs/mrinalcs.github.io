[:posts, :pages].each do |hook|
    Jekyll::Hooks.register hook, :post_render do |item|
      if ENV['JEKYLL_ENV'] == 'production' && item.output_ext == ".html"
        content = item.output
  
        # Remove HTML comments
        #content.gsub!(/<!--(.*?)-->/m, "")
  
        # Remove meta tag with name="generator"
        content.gsub!(/<meta\s+name=["']generator["'][^>]*>/i, '')
  
        # Remove trailing spaces before self-closing tag (/>)
        content.gsub!(/\s\/>/, '>')
  
        # Remove all empty spaces between HTML tags
        #content.gsub!(/>[[:space:]]+</, '><')
  
        content.gsub!(/>[[:space:]]+{/, '>{')   # Remove spaces between ">" and "{"
          
        # Replace img src="/ with absolute path
        content.gsub!('img src="/', "img src=\"#{item.site.config['url']}/")
  
        # Replace a href="/ with site url
        content.gsub!('a href="/', "a href=\"#{item.site.config['url']}/")
        content.gsub!('href="/assets/', "href=\"#{item.site.config['url']}/assets/")

  
        # Add rel="nofollow noopener noreferrer" to anchor tags  and ref to external
        content.gsub!(%r{<a\s+href="((?!mailto:|tel:|#{Regexp.escape(item.site.config['url'])}|http://localhost:4000|/|#)[^"]*)"(?![^>]*?rel=)}, "<a href=\"\\1?ref=#{item.site.config['url'].gsub('https://', '')}\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"") if content.match?(%r{<a\s+href=})
  


        # Wrap <table> tags with <div class="table"> // style="overflow-x:auto;"
        content.gsub!(/<table(.*?)>/m, '<div style="overflow-x:auto;"><table\1>')
        content.gsub!(/<\/table>/m, '</table></div>')

        
        # Convert <p><img> to <figure><img><figcaption>
        content.gsub!(/<p><img(.*?)alt="(.*?)"(.*?)title="(.*?)"(.*?)><\/p>/m, '<figure><img\1 alt="\2"\3 title="\4"\5><figcaption>\4</figcaption></figure>')
   
        
        # Update the item content
        item.output = content
      end
    end
  end
