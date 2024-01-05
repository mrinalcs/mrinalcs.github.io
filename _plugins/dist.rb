module Jekyll
    module DistFilter
      def dist(input)
        # Remove HTML comments
        output = input.gsub(/<!--(.*?)-->/m, "")
  
        # Remove meta tag with name="generator"
        output.gsub!(/<meta\s+name=["']generator["'][^>]*>/i, '<link rel="icon" href="/favicon.ico">')
  
        output.gsub!(/\s\/>/, '>')

        # Remove all empty spaces between HTML tags
        output.gsub!(/>\s+</, '><')
        
        output
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::DistFilter)
  