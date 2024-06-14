module Jekyll
  class ArchiveGenerator < Generator
    safe true
    priority :high

    def generate(site)
      posts_by_year = {}
      posts_by_month = {}

      site.posts.docs.each do |post|
        year = post.date.strftime("%Y")
        month = post.date.strftime("%m")

        posts_by_year[year] ||= []
        posts_by_year[year] << post

        posts_by_month["#{year}/#{month}"] ||= []
        posts_by_month["#{year}/#{month}"] << post
      end

      generate_archive_pages(site, posts_by_year, "yearly")
      generate_archive_pages(site, posts_by_month, "monthly")
    end

    def generate_archive_pages(site, posts_by_period, period_type)
      posts_by_period.each do |period, posts|
        period_slug = period.downcase.tr(' ', '-')

        if period_type == "monthly"
          period_path = "#{period}.html"
        else
          period_path = "#{period}.html"
        end

        archive_page = ArchivePage.new(site, site.source, period_path, period, period_type, posts)
        site.pages << archive_page
      end
    end
  end

  class ArchivePage < Page
    def initialize(site, base, dir, period, period_type, posts)
      @site = site
      @base = base
      @dir = '' # No directory needed
      @name = dir

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'archive.html')
      self.data['period'] = period
      self.data['period_type'] = period_type
      self.data['posts'] = posts
      self.data['sitemap'] = false # Add sitemap: false to front matter
      self.data['title'] = "#{period_type.capitalize} Archive : #{period}"
      self.data['description'] = "Archive #{period}"
    end
  end
end
