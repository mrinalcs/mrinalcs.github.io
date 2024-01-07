module Jekyll
    class Mathjax < Liquid::Tag
      def render(context)
        page_content = context.environments.first["page"]["content"]
        if page_content.include? '\['
          return '
          <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
            MathJax.Hub.Config({
              showMathMenu: false
            });
          </script>'
        else
          return ''
        end
      end
    end
  end
  
  Liquid::Template.register_tag('mathjax', Jekyll::Mathjax)
  