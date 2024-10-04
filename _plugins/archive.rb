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
          year, month = period.split('/')
          short_month_name = Date::ABBR_MONTHNAMES[month.to_i] # Get short month name
          full_month_name = Date::MONTHNAMES[month.to_i] # Get full month name
          period_display = "#{short_month_name} #{year}"  # Format as "Oct 2024"
          period_path = "#{period}.html"
        else
          period_display = period
          period_path = "#{period}.html"
        end

        archive_page = ArchivePage.new(site, site.source, period_path, period_display, period_type, posts, full_month_name)
        site.pages << archive_page
      end
    end
  end

  class ArchivePage < Page
    def initialize(site, base, dir, period, period_type, posts, full_month_name)
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
      self.data['title'] = "Archive : #{period}" # Use short month name for title
      self.data['description'] = "Archive for #{full_month_name} #{period.split('/').first}" # Full month name for description
    end
  end
end
