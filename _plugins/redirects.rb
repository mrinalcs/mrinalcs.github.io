require 'jekyll'

module Jekyll
  class RedirectsGenerator < Generator
    def generate(site)
      # Define your redirects array here
      redirects = [
        { from: '/ts', to: '/time-series' },
        { from: '/r', to: '/r-programming' },
        { from: '/op', to: '/operations-research' },
      ]

      redirects.each do |redirect|
        create_redirect_page(site, redirect[:from], redirect[:to])
      end
    end

    def create_redirect_page(site, from, to)
      page = Page.new(site, site.source, '', 'index.html')

      page.data['layout'] = 'none'  # Use no layout for redirect pages
      page.data['redirect_to'] = to

      # Create a meta refresh redirect
      page.content = <<~HTML
        <meta http-equiv="refresh" content="0; URL='#{to}'" />
        <link rel="canonical" href="#{to}" />
        <title>Redirecting...</title>
      HTML

      # Set the directory for the redirect page
      page.dir = from

      # Add the redirect page to the site's pages
      site.pages << page
    end
  end
end
