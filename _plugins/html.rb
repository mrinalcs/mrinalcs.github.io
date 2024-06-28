[:documents, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_render do |item|
    if item.output_ext == ".html"
      content = item.output
      site_url = item.site.config['url']
      baseurl = item.site.config['baseurl']
      env = Jekyll.env

      
      if baseurl
        content.gsub!(%r{(src|href)="/}, '\1="' + baseurl + '/')
      end

       if env == 'production'
      
      # Add rel="nofollow noopener noreferrer" to external anchor tags and ref parameter
      content.gsub!(%r{<a\s+href="((?!mailto:|tel:|#{Regexp.escape(site_url)}|http://localhost:4000|/|#)[^"]+)"(?![^>]*rel=)}, 
                    "<a href=\"\\1?ref=#{site_url.gsub('https://', '')}\" target=\"_blank\" rel=\"nofollow noopener noreferrer\"")


      # Remove trailing spaces before self-closing tag (/>)
      content.gsub!(/\s\/>/, '>')

       # Remove all empty spaces between HTML tags
       #content.gsub!(/>[[:space:]]+</, '><')
 
       content.gsub!(/>[[:space:]]+{/, '>{')   # Remove spaces between ">" and "{"
      
       # Remove HTML comments
       content.gsub!(/<!--(.*?)-->/m, "")
  
       
      # Remove multiple line gaps
      content.gsub!(/\n{2,}/, "\n")

      end

      # Convert <p><img><em> to <figure><img><figcaption><em>
      content.gsub!(/<p><img((?:(?!<\/p>|<em>).)*)<em>((?:(?!<\/p>|<em>).)*)<\/em><\/p>/m, '<figure><img\1<figcaption>\2</figcaption></figure>')


      # Update the item content
      item.output = content
    end
  end
end
