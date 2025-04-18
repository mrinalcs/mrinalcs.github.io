# Chart.js Chart Types Example

This page demonstrates all major Chart.js chart types using codeblocks with the `language-chartjs` syntax. Each chart is rendered automatically by the `initChart` function, with colors adapted to the site's theme (light or dark).

## 1. Bar Chart (Vertical)

A vertical bar chart showing sales data for different products.

```chartjs
new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [{
      label: 'Sales (Units)',
      backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
      data: [150, 200, 100, 250]
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Product Sales (Units)'
      }
    }
  }
});
```

## 2. Bar Chart (Horizontal)

A horizontal bar chart (using legacy `horizontalBar` for compatibility with `initChart` fix).

```chartjs
new Chart(document.getElementById("horizontal-bar-chart"), {
  type: 'horizontalBar',
  data: {
    labels: ['Africa', 'Asia', 'Europe'],
    datasets: [{
      label: 'Population (millions)',
      backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
      data: [2478, 5267, 734]
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Population in 2050 (millions)'
      }
    }
  }
});
```

## 3. Line Chart

A line chart showing monthly revenue over a year.

```chartjs
new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue ($)',
      borderColor: '#3e95cd',
      backgroundColor: 'rgba(62, 149, 205, 0.2)',
      data: [5000, 6000, 5500, 7000, 8000, 7500, 9000, 8500, 9500, 10000, 11000, 12000],
      fill: true
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Monthly Revenue (2025)'
      }
    }
  }
});
```

## 4. Pie Chart

A pie chart showing market share of different companies.

```chartjs
new Chart(document.getElementById("pie-chart"), {
  type: 'pie',
  data: {
    labels: ['Company A', 'Company B', 'Company C', 'Company D'],
    datasets: [{
      label: 'Market Share (%)',
      backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
      data: [40, 30, 20, 10]
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Market Share (%)'
      }
    }
  }
});
```

## 5. Doughnut Chart

A doughnut chart showing expense categories.

```chartjs
new Chart(document.getElementById("doughnut-chart"), {
  type: 'doughnut',
  data: {
    labels: ['Rent', 'Utilities', 'Salaries', 'Marketing'],
    datasets: [{
      label: 'Expenses ($)',
      backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
      data: [2000, 800, 3000, 1200]
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Expense Categories ($)'
      }
    }
  }
});
```

## 6. Radar Chart

A radar chart comparing skills across two employees.

```chartjs
new Chart(document.getElementById("radar-chart"), {
  type: 'radar',
  data: {
    labels: ['Communication', 'Technical', 'Leadership', 'Creativity', 'Teamwork'],
    datasets: [
      {
        label: 'Employee A',
        backgroundColor: 'rgba(62, 149, 205, 0.2)',
        borderColor: '#3e95cd',
        data: [80, 90, 70, 85, 75]
      },
      {
        label: 'Employee B',
        backgroundColor: 'rgba(142, 94, 162, 0.2)',
        borderColor: '#8e5ea2',
        data: [70, 80, 85, 65, 90]
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Employee Skills Comparison'
      }
    }
  }
});
```

## 7. Polar Area Chart

A polar area chart showing customer satisfaction scores.

```chartjs
new Chart(document.getElementById("polar-area-chart"), {
  type: 'polarArea',
  data: {
    labels: ['Service', 'Quality', 'Price', 'Support'],
    datasets: [{
      label: 'Satisfaction Score',
      backgroundColor: ['rgba(62, 149, 205, 0.5)', 'rgba(142, 94, 162, 0.5)', 'rgba(60, 186, 159, 0.5)', 'rgba(232, 195, 185, 0.5)'],
      data: [85, 90, 75, 80]
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Customer Satisfaction Scores'
      }
    }
  }
});
```

## 8. Bubble Chart

A bubble chart showing project metrics (time, cost, impact).

```chartjs
new Chart(document.getElementById("bubble-chart"), {
  type: 'bubble',
  data: {
    datasets: [
      {
        label: 'Project A',
        backgroundColor: 'rgba(62, 149, 205, 0.5)',
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 }
        ]
      },
      {
        label: 'Project B',
        backgroundColor: 'rgba(142, 94, 162, 0.5)',
        data: [
          { x: 15, y: 25, r: 20 },
          { x: 35, y: 20, r: 12 }
        ]
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Project Metrics (Time vs Cost vs Impact)'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (weeks)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cost ($K)'
        }
      }
    }
  }
});
```

## 9. Scatter Chart

A scatter chart showing test scores vs study hours.

```chartjs
new Chart(document.getElementById("scatter-chart"), {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Student Scores',
        backgroundColor: '#3e95cd',
        data: [
          { x: 5, y: 60 },
          { x: 10, y: 80 },
          { x: 15, y: 90 },
          { x: 8, y: 70 },
          { x: 12, y: 85 }
        ]
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Test Scores vs Study Hours'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Study Hours'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Test Score'
        }
      }
    }
  }
});
```

---

These charts demonstrate the versatility of Chart.js. The `initChart` function will:
- Hide each codeblock and render the chart in its place.
- Adjust colors (text, grid lines) based on the theme (light or dark) using CSS variables `--c` and `--b`.
- Ensure responsiveness by setting the chart width  width to the full available width of the parent container.
- Fix legacy `horizontalBar` types by converting to `bar` with `indexAxis: 'y'`.