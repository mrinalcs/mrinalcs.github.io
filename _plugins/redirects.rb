require 'jekyll'

module Jekyll
  class RedirectsGenerator < Generator
    safe true

    def generate(site)
      # Load redirects from _data/redirect.yml
      redirects = site.data['redirects'] || []

      redirects.each do |redirect|
        # Ensure 'from' is treated as an array, even if it's a single string
        Array(redirect['from']).each do |from|
          # Automatically append .html if not present
          from = append_html_extension(from)
          create_redirect_page(site, from, redirect['to'])
        end
      end
    end

    def append_html_extension(path)
      path.end_with?('.html') ? path : "#{path}.html"
    end

    def create_redirect_page(site, from, to)
      # Correctly set the destination directory and filename
      filename = File.basename(from)
      dir = File.dirname(from)

      # Create a new page for the redirect
      page = PageWithoutAFile.new(site, site.source, dir, filename)

      page.data['layout'] = 'none'  # Use no layout for redirect pages
      page.data['redirect_to'] = to
      page.data['sitemap'] = false  # Exclude from sitemap

      # Create a meta refresh redirect
      page.content = <<~HTML
        <meta http-equiv="refresh" content="0; URL='#{to}'" />
        <link rel="canonical" href="#{to}'" />
        <title>Redirecting...</title>
      HTML

      # Add the redirect page to the site's pages
      site.pages << page
    end
  end
end
