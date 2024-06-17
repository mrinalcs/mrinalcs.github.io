module Jekyll
  module SortNumbersFilter
    def sort_numbers(input)
      # Ensure input is an array of strings
      numbers = input.map(&:to_s)

      # Sort the numbers
      sorted_numbers = numbers.sort_by(&:to_i)

      # Return sorted numbers as array of strings
      sorted_numbers
    end

    def sort_numbers_reverse(input)
      # Ensure input is an array of strings
      numbers = input.map(&:to_s)

      # Sort the numbers in reverse order
      sorted_numbers = numbers.sort_by(&:to_i).reverse

      # Return sorted numbers as array of strings
      sorted_numbers
    end
  end
end

Liquid::Template.register_filter(Jekyll::SortNumbersFilter)
