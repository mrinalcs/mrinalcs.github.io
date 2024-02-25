module Jekyll
    class TagsGenerator < Generator
      safe true
      priority :high
  
      def generate(site)
        if site.layouts.key? 'tag'
          site.tags.keys.each do |tag|
            write_tag_index(site, tag)
          end
        end
      end
  
      def write_tag_index(site, tag)
        index = TagPage.new(site, site.source, tag)
        index.render(site.layouts, site.site_payload)
        index.write(site.dest)
        site.pages << index
      end
    end
  
    class TagPage < Page
      def initialize(site, base, tag)
        @site = site
        @base = base
        @dir  = tag.downcase # Directory name will be the lowercase tag name
        @name = 'index.html'
  
        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'tag.html')
        self.data['tag'] = tag
        self.data['title'] = "Posts tagged #{tag}"
        self.data['permalink'] = "/#{tag.downcase}" # Set the permalink without the 'tags/' prefix
      end
    end
  end
  