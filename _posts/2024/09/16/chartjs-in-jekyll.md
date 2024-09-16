---
title: Chartjs in Jekyll
description: Setup cjij
date: 2024-09-16
image:  
tags: [lib,jekyll]
---
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <script>
  document.addEventListener('DOMContentLoaded', function () {
  const charts = document.querySelectorAll('pre code');

  charts.forEach((block) => {
    if (block.textContent.trim().startsWith('language-chart')) {
      const chartData = block.textContent.trim().substring(6).trim();
      
      let chartConfig;
      try {
        chartConfig = JSON.parse(chartData);  // Assuming the config is JSON after the 'chart' keyword
      } catch (e) {
        console.error('Invalid chart config:', e);
        return;
      }
      
      const canvas = document.createElement('canvas');
      block.parentNode.replaceWith(canvas);  // Replace the code block with canvas

      const ctx = canvas.getContext('2d');
      new Chart(ctx, chartConfig);  // Create the chart with provided config
    }
  });
});

  </script>


```chart
{
  "type": "bar",
  "data": {
    "labels": ["January", "February", "March", "April", "May", "June"],
    "datasets": [{
      "label": "Sales",
      "data": [12, 19, 3, 5, 2, 3],
      "backgroundColor": [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      "borderWidth": 1
    }]
  },
  "options": {
    "scales": {
      "y": {
        "beginAtZero": true
      }
    }
  }
}
```