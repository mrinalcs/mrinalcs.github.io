--- 
title: "Seven Overlapping Circles Pattern with R"
description: "Create a visual pattern of seven overlapping circles using R and ggplot2, the circles drawn in around a central point the Seed of Life"
image: '184251.png'
date: '2025-04-18'
tags: [r-programming] 
---
 
![pattern of seven overlapping circles, each rendered in a distinct color, radiating from a central point](184251.png) 

Create this pattern, we use `ggplot2` to draw seven overlapping circles. One circle is centered at the origin, and six others are arranged around the perimeter, spaced at 60-degree intervals. 

```r
# Load required library
library(ggplot2)

# Function to generate points for a circle
circle_points <- function(center_x, center_y, radius, n_points = 100) {
  t <- seq(0, 2 * pi, length.out = n_points)
  x <- center_x + radius * cos(t)
  y <- center_y + radius * sin(t)
  data.frame(x = x, y = y)
}

# Parameters
R <- 50
n_points <- 100

# First circle: centered at (0, 0)
circle1 <- circle_points(0, 0, R, n_points)
circle1$circle <- "Circle 1"

# Six circles around the perimeter, spaced at 60-degree intervals
angles <- seq(0, 2 * pi, by = pi / 3)[-7]  # 0, 60, 120, 180, 240, 300 degrees
circles <- lapply(seq_along(angles), function(i) {
  center_x <- R * cos(angles[i])
  center_y <- R * sin(angles[i])
  data <- circle_points(center_x, center_y, R, n_points)
  data$circle <- paste0("Circle ", i + 1)
  data
})

# Combine data
plot_data <- do.call(rbind, c(list(circle1), circles))

# Plot
ggplot(plot_data, aes(x = x, y = y, color = circle)) +
  geom_path(size = 0.7) +
  scale_color_manual(values = c("Circle 1" = "blue", "Circle 2" = "red", "Circle 3" = "green", 
                                "Circle 4" = "purple", "Circle 5" = "orange", "Circle 6" = "cyan", 
                                "Circle 7" = "magenta")) +
  coord_equal() +
  theme_minimal() +
  theme(
    axis.title = element_blank(),
    axis.text = element_blank(),
    axis.ticks = element_blank(),
    panel.grid = element_blank(),
    legend.position = "none"
  )
```  

![seven overlapping, semi-transparent circles in various colors creating a layered pattern](184252.png) 