# _plugins/add-tags.rb

module Jekyll
  class AddTagsGenerator < Generator
    safe true
    priority :high

    def generate(site)

      # Load YAML data file
      tag_map = site.data['add-tags'] || {}

      site.posts.docs.each do |post|

        # Get filename without extension
        slug = post.basename_without_ext

        # Skip if post not found in YAML
        next unless tag_map.key?(slug)

        # Ensure tags array exists
        post.data['tags'] ||= []

        # Add tags from YAML
        tag_map[slug].each do |tag|

          normalized_tag = tag.to_s.downcase.strip

          unless post.data['tags'].include?(normalized_tag)
            post.data['tags'] << normalized_tag
          end
        end
      end
    end
  end
end