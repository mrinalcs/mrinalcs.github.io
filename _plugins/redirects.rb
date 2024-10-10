require 'jekyll'

module Jekyll
  class RedirectsGenerator < Generator
    safe true  # Make this generator safe for use in sites
    priority :low  # Set priority if needed

    def generate(site)
      # Define your redirects array here
      redirects = [
        { from: '/t', to: '/time-series' },
        { from: '/op', to: '/operationresearch' },
      ]

      redirects.each do |redirect|
        create_redirect_page(site, redirect[:from], redirect[:to])
      end
    end

    def create_redirect_page(site, from, to)
      # Extract the page name from the `from` path
      page_name = from.tr('/', '_') + '.html'  # Replace '/' with '_' to create a valid filename

      page = Page.new(site, site.source, '', page_name)  # Use the page name for the HTML file

      page.data['layout'] = 'none'  # Use no layout for redirect pages
      page.data['redirect_to'] = to

      # Create a meta refresh redirect
      page.content = <<~HTML
        <meta http-equiv="refresh" content="0; URL='#{to}'" />
        <link rel="canonical" href="#{to}" />
        <title>Redirecting...</title>
      HTML

      # Set the directory for the redirect page (set to an empty string)
      page.dir = File.dirname(from)  # Keep it in the root directory

      # Add the redirect page to the site's pages
      site.pages << page
    end
  end
end
