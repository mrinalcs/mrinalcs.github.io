Jekyll::Hooks.register :documents, :post_init do |doc|
  git_dates_log_command = `git log --follow --format=%ad --date=iso-strict -- "#{doc.path}"`
  git_dates = git_dates_log_command.split("\n")
  doc.data["last_modified_at"] ||= git_dates.first
  doc.data["date"] ||= git_dates.last

  git_log_command = `git log --follow --format='%s' -- "#{doc.path}"`
  commit_messages = git_log_command.split("\n")
  doc.data["commit_messages"] = commit_messages
end