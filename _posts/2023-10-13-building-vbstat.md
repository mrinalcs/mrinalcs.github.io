---
title: Building Vbstat
description: The making of VBSTAT a github page using jekyll to list Handouts and Notes
image: /assets/img/building-vbstat/vbstat-home-page.jpg
redirect_from:
  - /blog/building-vbstat
---

<!-- I initially started with [vbstat.epizy.com](https://vbstat.epizy.com){:rel="nofollow" target="_blank"} and later on [vbstat.ml](https://vbstat.ml){:rel="nofollow" target="_blank"} which domain no more exist rather not free. So I've migrated to GitHub Pages. -->


My first commit was on **<time datetime="2023-09-24">September 24, 2023</time>** Initially, the aim was to compile handouts and notes from both students and faculty. Later on I learnt Jekyll and wanted to built  webpages. Earlier tried to modified a template from github which available in Branch [v1](https://github.com/mrinalcs/vbstat/tree/v1) . Later on I have created from scratch which you can see in this [commit](https://github.com/mrinalcs/vbstat/blob/baa4d3e6a9fd3d492257f123efd7e2277c2c147f). Followings are pdf notes which available in the page from previous.

[Calculus](https://vbstat.github.io/notes#calculus), [Demography and Vital Statistics](https://vbstat.github.io/notes#demography-and-vital-statistics), [Mathematical Analysis](https://vbstat.github.io/notes#mathematical-analysis), [Multivariate Analysis and Nonparametric](https://vbstat.github.io/notes#multivariate-analysis-and-nonparametric), [Operations Research](https://vbstat.github.io/notes#operations-research), [Probability](https://vbstat.github.io/notes#probability), [R Programming](https://vbstat.github.io/notes#r-programming), [Sample Survey](https://vbstat.github.io/notes#sample-survey), [Stochastic Process](https://vbstat.github.io/notes#stochastic-process), [Testing of Hypothesis](https://vbstat.github.io/notes#testing-of-hypothesis), [Time Series Analysis](https://vbstat.github.io/notes#time-series-analysis)



## Pages

### Home page
The home page includes a hero section with image carousel and a blockquote , another section which have an accordion and about section.

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
<ul class="list-group">
    {% assign folder_counts = "" %}
    {% for folder in site.static_files %}
      {% if folder.path contains '/note/' and folder.path != '/note/' %}
        {% assign parts = folder.path | split: '/' %}
        {% assign foldername = parts[2] %}
        {% unless folder_counts contains foldername %}
          {% assign file_count = 0 %}
          {% for file in site.static_files %}
            {% if file.path contains '/note/' and file.path contains foldername %}
              {% assign file_count = file_count | plus: 1 %}
            {% endif %}
          {% endfor %}
          <li class="list-group-item d-flex justify-content-between align-items-center">
           <a href="?p={{ foldername }}">{{ foldername }}</a>
            <span class="badge badge-primary badge-pill">{{ file_count }}</span>
          </li>
          {% assign folder_counts = folder_counts | append: foldername | append: ";" %}
        {% endunless %}
      {% endif %}
    {% endfor %}
  </ul>
```

### Question Papers
This page dynamically list all question papers catagoried by sem and year based on folder. Additionaly there is filter to sort them out. Questionpaper > Year > Sem .

```
<div class="row">
  <div class="col-md-6">
    <input type="text" id="filter-input" class="form-control" placeholder="Filter by Year, Semester, or Files">
  </div>
  <div class="col-md-3">
    <select id="year-dropdown" class="form-control">
      <option value="">Filter by Year</option>
      {% assign years = "" | split: "" %}
      {% for file in site.static_files %}
        {% if file.path contains '/question-papers/' %}
          {% assign parts = file.path | split: '/' %}
          {% if parts.size == 5 %}
            {% assign year = parts[2] %}
            {% unless years contains year %}
              <option value="{{ year }}">{{ year }}</option>
              {% capture years %}{{ years }}{{ year }}{% endcapture %}
            {% endunless %}
          {% endif %}
        {% endif %}
      {% endfor %}
    </select>
  </div>
  <div class="col-md-3">
    <select id="semester-dropdown" class="form-control">
      <option value="">Filter by Semester</option>
      {% assign semesters = "" | split: "" %}
      {% for file in site.static_files %}
        {% if file.path contains '/question-papers/' %}
          {% assign parts = file.path | split: '/' %}
          {% if parts.size == 5 %}
            {% assign semester = parts[3] %}
            {% unless semesters contains semester %}
              <option value="{{ semester }}">{{ semester }}</option>
              {% capture semesters %}{{ semesters }}{{ semester }}{% endcapture %}
            {% endunless %}
          {% endif %}
        {% endif %}
      {% endfor %}
    </select>
  </div>
</div>
<br>
<table class="table table-bordered">
  <thead>
    <tr>
      <th>Year</th>
      <th>Semester</th>
      <th>Files</th>
    </tr>
  </thead>
  <tbody>
    {% assign folder_path = '/question-papers/' %}
    {% for file in site.static_files %}
      {% if file.path contains folder_path %}
        {% assign parts = file.path | split: '/' %}
        {% if parts.size == 5 %}
          <tr>
            <td>{{ parts[2] }}</td>
            <td>{{ parts[3] }}</td>
            <td><a href="{{ file.path }}">{{ parts[4] }}</a></td>
          </tr>
        {% endif %}
      {% endif %}
    {% endfor %}
  </tbody>
</table>


<script>
document.getElementById('filter-input').addEventListener('keyup', filterTable);
document.getElementById('year-dropdown').addEventListener('change', filterTable);
document.getElementById('semester-dropdown').addEventListener('change', filterTable);

function filterTable() {
  var searchText = document.getElementById('filter-input').value.toLowerCase();
  var yearFilter = document.getElementById('year-dropdown').value.toLowerCase();
  var semesterFilter = document.getElementById('semester-dropdown').value.toLowerCase();
  var rows = document.querySelectorAll('.table tbody tr');

  for (var i = 0; i < rows.length; i++) {
    var year = rows[i].querySelector('td:nth-child(1)').textContent.toLowerCase();
    var semester = rows[i].querySelector('td:nth-child(2)').textContent.toLowerCase();
    var files = rows[i].querySelector('td:nth-child(3)').textContent.toLowerCase();

    var yearMatch = year.includes(yearFilter) || yearFilter === '';
    var semesterMatch = semester.includes(semesterFilter) || semesterFilter === '';
    var textMatch = year.includes(searchText) || semester.includes(searchText) || files.includes(searchText);

    if (yearMatch && semesterMatch && textMatch) {
      rows[i].style.display = 'table-row';
    } else {
      rows[i].style.display = 'none';
    }
  }
}
</script>
```

![](/assets/img/building-vbstat/vbstat-question-paper-page.jpg)
*Sortable quesion paper page*

### Student page
This page automatically list student in this page by year based on the admissio date in the front matter in each students. Alumni pages are  also same by logic. 


```
ug alumni
  {% for student in site.students %}
    {% if student.ug %}
      {% capture current_year %}{{ "now" | date: "%Y" }}{% endcapture %}
      {% assign current_year = current_year | plus: 0 %}
      {% assign pass_out_year = student.ug | plus: 3 %}
    
      {% if current_year >= pass_out_year %}
        <li>{{ student.title }} (UG: {{ student.ug }})</li>
      {% endif %}
    {% endif %}
  {% endfor %}
```

### Scholars page
This page is incomplete as I didn't have much information about. I didn't find any information on the Internet.


## Features

### Offline
This works if ones loaded the webpage it works offline as well. I intentionally add this as when offline I can access pdf files without downloading.

### Hotwire: Turbo
For smooth transition I have added HOTWIRE TURBO which  make possible pag e transition wihout refresh which I liked so added to this project. 

### Normalization of Url

For Student, Alumni page to fix username and url problem i write this plugin for GitHub, Facebook, Twitter, LinkedIn, Instagram, Google Scholar, personal websites, and YouTube.

### DistFilter

The purpose of this filter is to remove HTML comments from the default layout. Using gsub method with a regular expression to replace all HTML comment.



## Deploying
This reposetory [vbstat](https://github.com/mrinalcs/vbstat) was created by [me]({{site.url}}) and forked it from [@vbstat](https://github.com/vbstat) github account and deployed to [https://vbstat.github.io](https://vbstat.github.io/)

## Seo
Used Jekyll-seo-tag for seo. I have added all infromation which are already available on the Internet. One thing just do is bring all of them in one place.

![Google search result](/assets/img/building-vbstat/vbstat-google-search-result.jpg)
*vbstat google search*

## Branches
I have created multiple branches only to keep revert if anything goes wrong when large changes done. So only contribute or check main branch.


##  Resources

* **Bootstrap v5.3.2**: <https://getbootstrap.com>
* **Google Fonts**: <http://fonts.google.com>
* **Font Awesome Free**: <https://fontawesome.com>
* **Hotwire Turbo**: <https://turbo.hotwired.dev>
* **Faculty info**: <https://www.visvabharati.ac.in>
* **Student name**: <https://vbu.ucanapply.com>
