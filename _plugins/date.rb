if Jekyll.env == "production"
[:documents, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_init do |doc|
  git_dates_log_command = `git log --follow --format=%ad --date=iso-strict -- "#{doc.path}"`
  git_dates = git_dates_log_command.split("\n")
  
  if git_dates.any?
    doc.data["last_modified_at"] ||= git_dates.first unless doc.data.key?("last_modified_at")
    doc.data["date"] ||= git_dates.last unless doc.data.key?("date")
  end
 end
end
end