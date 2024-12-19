require 'fastimage'

[:documents, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_render do |item|
    if item.output_ext == ".html"
      site_source = item.site.source
      content = item.output
      baseurl = item.site.config['baseurl'] || ''

      # Match all <img> tags without width and height attributes
      content.gsub!(%r{<img\s+([^>]*?)src="([^"]+)"(?![^>]*(?:width|height))([^>]*?)>}i) do |match|
        attributes_before = Regexp.last_match(1).to_s.strip
        src = Regexp.last_match(2).to_s.strip
        attributes_after = Regexp.last_match(3).to_s.strip

        # Get full path to the image
        image_path = File.join(site_source, src)
        if !File.exist?(image_path)
          # Check if the image is in the new destination
          post_file = item.site.static_files.find do |f|
            f.is_a?(Jekyll::PostFiles::PostFile) && f.destination("").end_with?(src)
          end
          
          if post_file
            image_path = post_file.path
            # Update the src path to reflect the new destination
            src = post_file.destination("").sub(item.site.dest, "") # Adjust the src path based on the new destination
          end
        end

        if File.exist?(image_path)
          dimensions = FastImage.size(image_path)
          if dimensions
            width, height = dimensions
            # Prepend baseurl if it exists
            src = File.join(baseurl, src) unless baseurl.empty?
            # Replace the tag with dimensions and updated src
            %(<img #{attributes_before} src="#{src}" width="#{width}" height="#{height}" #{attributes_after}>)
          else
            match # Return original tag if dimensions can't be determined
          end
        else
          match # Return original tag if file doesn't exist
        end
      end

      item.output = content
    end
  end
end
