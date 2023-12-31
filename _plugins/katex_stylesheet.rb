module Jekyll
    class KatexStylesheet < Liquid::Tag
      def render(context)
        page_content = context.environments.first["page"]["content"]
        if page_content.include? 'katex'
          return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">'
        else
          return ''
        end
      end
    end
  end
  
  Liquid::Template.register_tag('katex_stylesheet', Jekyll::KatexStylesheet)
  