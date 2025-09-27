# _plugins/page_views.rb
require "json"
require "net/http"
require "uri"

module Jekyll
  class PageViewsGenerator < Generator
    safe true
    priority :low

    API_URL = "https://page-view-counter-cloudflare-d1.mrinalcs.workers.dev/all"

    def generate(site)
      return unless Jekyll.env == "production"  

      views_data = fetch_views
      return unless views_data

      site.pages.each { |page| attach_views(page, views_data) }
      site.posts.docs.each { |post| attach_views(post, views_data) }
    end

    private

    def fetch_views
      uri = URI(API_URL)
      res = Net::HTTP.get_response(uri)
      return nil unless res.is_a?(Net::HTTPSuccess)

      JSON.parse(res.body)
    rescue => e
      Jekyll.logger.warn "PageViews:", "Failed to fetch (#{e.message})"
      nil
    end

    def attach_views(doc, views_data)
      # Normalize: remove trailing slash unless root
      path = doc.url.chomp("/")
      path = "/" if path.empty?

      match = views_data.find { |v| v["url"].chomp("/") == path }

      doc.data["views"] = match ? match["count"] : 0
    end
  end
end
