---
title: "Vbstat: Building an Academic Resource Site"
description: "The making of VBSTAT a github page using jekyll to list Handouts and Notes of Department of Statistics Visva-Bharati by Students."
image: "/assets/img/building-vbstat/vbstat-home-page.jpg"
date: 2023-12-02
revised: 2025-07-20
---

<!-- Initially started with [vbstat.epizy.com](https://vbstat.epizy.com){:rel="nofollow" target="_blank"} and later on [vbstat.ml](https://vbstat.ml){:rel="nofollow" target="_blank"} which domain no more exist rather not free. -->



Vbstat is a GitHub Pages website built with Jekyll to centralize handouts and notes for students and faculty. Initially hosted on vbstat.epizy.com and vbstat.ml, the site was migrated to GitHub Pages at vbstat.github.io due to domain constraints. The project began with a first commit on <time datetime="2023-09-24">September 24, 2023</time>, evolving from a simple repository of academic resources to a fully functional website with dynamic features and a custom design.

## Development Journey
The project started with the goal of compiling academic handouts and notes. Early development involved experimenting with a pre-existing GitHub template (available in the [v1 branch](https://github.com/mrinalcs/vbstat/tree/v1)). Over time, the site was rebuilt from scratch, as documented in a key [commit](https://github.com/mrinalcs/vbstat/blob/baa4d3e6a9fd3d492257f123efd7e2277c2c147f), to achieve greater customization and functionality. The site now hosts a collection of PDF notes covering topics such as [Calculus](https://vbstat.github.io/notes#calculus), [Demography and Vital Statistics](https://vbstat.github.io/notes#demography-and-vital-statistics), [Mathematical Analysis](https://vbstat.github.io/notes#mathematical-analysis), [Multivariate Analysis and Nonparametric](https://vbstat.github.io/notes#multivariate-analysis-and-nonparametric), [Operations Research](https://vbstat.github.io/notes#operations-research), [Probability](https://vbstat.github.io/notes#probability), [R Programming](https://vbstat.github.io/notes#r-programming), [Sample Survey](https://vbstat.github.io/notes#sample-survey), [Stochastic Process](https://vbstat.github.io/notes#stochastic-process), [Testing of Hypothesis](https://vbstat.github.io/notes#testing-of-hypothesis), [Time Series Analysis](https://vbstat.github.io/notes#time-series-analysis), accessible via the Notes page.
 
 

## Key Pages and Features

Heres are some special pages with functionality .

### Home page
The home page features a hero section with an image carousel, a blockquote, an accordion for interactive content, and an about section, creating an engaging entry point.

![Home Page Screen Short](/assets/img/building-vbstat/vbstat-home-page.jpg)
*Vbstat home page*

### About page
All pages have a common sidebar with common tabs and reusable header and footer.

![About Page Screen Short](/assets/img/building-vbstat/vbstat-about-page.jpg)
*Vbstat about page*




Heres some special pages which took times.

### Faculty 
The layout is designed to feature promoted faculties at the top, followed by a comprehensive list of all faculties sort based on weight. 

###  Notes Page
This page is for listing all notes files by folders and a little addition adding file count. Later made every paper name as link to share a specefic section like [r-programming](https://vbstat.github.io/notes#r-programming)

```
initialize folder_counts as empty
for each file in static_files
  if file is in /notes/ and not root /notes/
    extract folder_name from file path
    if folder_name not in folder_counts
      count files in folder_name
      display folder_name as link with file count
      append folder_name to folder_counts
    end if
  end if
end for
```

### Question Papers
This page organizes question papers by semester and year, with a filterable interface for sorting by year, semester, or file name. The layout uses a table structure with dynamic filtering, implemented as follows: . `QP > Year > Sem `

```
display filter input for text search
display dropdown for year filter
display dropdown for semester filter
for each file in /question-papers/
  extract year, semester, and file name from path
  if path has valid structure
    add year to year dropdown (unique)
    add semester to semester dropdown (unique)
    display file in table with year, semester, and link
  end if
end for

on filter input or dropdown change
  for each table row
    if row matches text, year, and semester filters
      show row
    else
      hide row
    end if
  end for
```

![Question paper page](/assets/img/building-vbstat/vbstat-question-paper-page.jpg)
*Sortable quesion paper page*

### Student page
This page automatically list student in this page by year based on the admissio date in the front matter in each students. Alumni pages are  also same by logic. 


```
for each student in students
  if student has admission_year
    calculate pass_out_year = admission_year + 3
    if current_year >= pass_out_year
      display student as alumnus
    else
      display student as current
    end if
  end if
end for
```

### Scholars page
The scholars page remains incomplete due to limited information to populate it.

## Additional Features 

### Offline
The site is designed to function offline after initial loading, allowing access to PDF files without downloading, enhancing usability in low-connectivity scenarios.

### Hotwire: Turbo
Hotwire Turbo is integrated for seamless page transitions without full refreshes, improving navigation speed and user experience.

### Normalization of Url
A custom plugin normalizes URLs for social media and academic platforms (e.g., GitHub, Google Scholar), ensuring consistent linking across student and alumni pages.

### DistFilter
The purpose of this filter is to remove HTML comments from the default layout. Using gsub method with a regular expression to replace all HTML comment.



## Deploying
This reposetory [vbstat](https://github.com/mrinalcs/vbstat) was created and forked it from [@vbstat](https://github.com/vbstat) github account and deployed to [https://vbstat.github.io](https://vbstat.github.io/). Multiple branches are maintained for safe experimentation, with the main branch serving as the primary contribution point.
 

![Google search result](/assets/img/building-vbstat/vbstat-google-search-result.jpg)
*vbstat google search*
 

##  Resources

* **Bootstrap v5.3.2**: <https://getbootstrap.com>
* **Google Fonts**: <http://fonts.google.com>
* **Font Awesome Free**: <https://fontawesome.com>
* **Hotwire Turbo**: <https://turbo.hotwired.dev>
* **Faculty info**: <https://www.visvabharati.ac.in>
* **Student name**: <https://vbu.ucanapply.com>
