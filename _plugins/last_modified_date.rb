# _plugins/last_modified_date.rb

Jekyll::Hooks.register :posts, :post_init do |post|
  commit_num = `git rev-list --count HEAD "#{ post.path }"`
  
  if commit_num.to_i > 1
    lastmod_date = `git log -1 --pretty="%ad" --date=iso "#{ post.path }"`
    post.data['last_modified_at'] = lastmod_date
  end
end
