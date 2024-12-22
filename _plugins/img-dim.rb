require 'fastimage'
# Register hooks for documents and pages in Jekyll
[:documents, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_render do |item|
    # Check if the output is an HTML file
    if item.output_ext == ".html"
      site_source = item.site.source
      content = item.output
      # Find all <img> tags missing width and height attributes
      content.gsub!(%r{<img\s+([^>]*?)src="([^"]+)"(?![^>]*(?:width|height))([^>]*?)>}i) do |match|
        # Capture the tag attributes and the image source
        attributes_before = Regexp.last_match(1).to_s.strip
        src = Regexp.last_match(2).to_s.strip
        attributes_after = Regexp.last_match(3).to_s.strip
        # Determine the full path of the image
        image_path = File.join(site_source, src)
        unless File.exist?(image_path)
          # If the image doesn't exist in the source folder, check the post files
          post_file = item.site.static_files.find { |f| f.is_a?(Jekyll::PostFiles::PostFile) && f.destination("").end_with?(src) }
          image_path = post_file.path if post_file
        end
        if File.exist?(image_path)
          # Get image dimensions using the FastImage gem
          dimensions = FastImage.size(image_path)
          if dimensions
            width, height = dimensions
            # Add width and height attributes to the <img> tag
            %(<img#{attributes_before} src="#{src}" width="#{width}" height="#{height}" #{attributes_after}>)
          else
            match # Keep the original tag if dimensions can't be determined
          end
        else
          match # Keep the original tag if the file doesn't exist
        end
      end
      # Update the content with the modified HTML
      item.output = content
    end
  end
end