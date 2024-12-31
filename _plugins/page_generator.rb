# _plugins/generate_pages.rb

module Jekyll
    class PageGenerator < Generator
      safe true
  
      def generate(site)
        site.pages.each do |page|
          # Check if the page has `generate: true` in the front matter
          next unless page.data['generate']
  
          # Get the count of pages to generate
          page_count = page.data['page_count'] || 0
  
          # Generate pages based on the count
          (1..page_count).each do |i|
            slug = "page#{i}"
            title = "Generated Page #{i}"
  
            # Create a new page
            new_page = GeneratedPage.new(site, site.source, page.dir, slug, title, page.data['layout'])
  
            # Add the generated page to the site
            site.pages << new_page
          end
        end
      end
    end
  
    # Custom page class for generated pages
    class GeneratedPage < Page
      def initialize(site, base, dir, slug, title, layout)
        @site = site
        @base = base
        @dir = dir
        @name = "#{slug}.html"
  
        # Read the YAML front matter defaults
        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), "#{layout}.html")
        self.data['title'] = title
      end
    end
  end
  