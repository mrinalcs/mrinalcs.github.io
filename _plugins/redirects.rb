require 'jekyll'

module Jekyll
  class RedirectsGenerator < Generator
    safe true

    def generate(site)
      # Define your redirects array here
      redirects = [
        { from: '/ts.html', to: '/time-series' },
{ from: '/r', to: '/r-programming' },

        { from: '/or.html', to: '/operations-research' },
      ]

      redirects.each do |redirect|
        create_redirect_page(site, redirect[:from], redirect[:to])
      end
    end

    def create_redirect_page(site, from, to)
      # Create a new page for the redirect
      page = Page.new(site, site.source, '', from)

      page.data['layout'] = 'none'  # Use no layout for redirect pages
      page.data['redirect_to'] = to
page.data['sitemap'] = false
      
      # Create a meta refresh redirect
      page.content = <<~HTML
        <meta http-equiv="refresh" content="0; URL='#{to}'" />
        <link rel="canonical" href="#{to}" />
        <title>Redirecting...</title>
      HTML

      # Add the redirect page to the site's pages
      site.pages << page
    end
  end
end
