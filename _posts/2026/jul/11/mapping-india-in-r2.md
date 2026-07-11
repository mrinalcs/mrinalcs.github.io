---
title: 'Mapping India in R (Part 2): With the mapindia Package' 
description: Mapping India’s 36 Divisions accurately using the mapindia package, skipping the hassle of manual GeoJSON files.
image: 'mapindia_cover.png'
date: 2026-07-11 
tags: [r-programming, ggplot2, mapindia] 
---

In [Part 1](/mapping-india-in-r), we discussed the challenges of finding an accurate map of India that correctly represents the official government boundaries, including Jammu & Kashmir and Ladakh. We solved this by manually sourcing a reliable GeoJSON file and merging it with our data using the `sf` package.

While that method works perfectly, managing external spatial files and manually handling CRS (Coordinate Reference System) transformations can get tedious. 

What if there was a package that handled all of this natively? Enter **`mapindia`**.

### The mapindia Package
Created by Shubham Dutta, the `mapindia` package (backed by the `mapindiatools` data container) is designed specifically to solve this problem. It provides ready-to-use, official boundaries for India’s states and districts right out of the box, and it is built to integrate seamlessly with `ggplot2`.

Because it borrows design philosophies from popular spatial packages like `usmap`, mapping demographics becomes a one-liner rather than a complex spatial join process.

### Installation

Currently, you can install the required packages directly from GitHub using `pak` or `devtools`:

```r
# Install pak if you haven't already
# install.packages("pak")

# Install the data backend and the main plotting package
pak::pak("shubhamdutta26/mapindiatools")
pak::pak("shubhamdutta26/mapindia")
```
 

### Recreating the Literacy Map

Let's recreate the exact same literacy rate map from Part 1. Notice how we no longer need the `sf` library, the external GeoJSON file, or the `st_transform()` step to fix longitude/latitude distortions. `mapindia` handles the spatial geometry internally.

```r
# required libraries
library(mapindia)
library(ggplot2)
library(readxl)

# Read Excel literacy data (same as before)
literacy_data <- read_excel("India_Literacy_Rate_By_State.xlsx")

# Plot the map directly using plot_india
plot_india(
  data = literacy_data, 
  regions = "states", 
  values = "Literacy Rate (%)"
) +
  scale_fill_gradient(low = "yellow", high = "blue") +  # gradient from yellow to blue
  labs(
    title = "Map of India with Literacy Rate by State",
    fill = "Literacy Rate (%)"
  ) +
  theme_minimal() +
  theme(
    legend.position = "right",
    # plot_india removes axes by default, keeping your code even cleaner!
    panel.grid.major = element_blank(),  
    panel.grid.minor = element_blank()  
  )

```

### Why use this over the manual GeoJSON method?

1. **Lightweight & Fast:** The heavy spatial data is stored efficiently in the `mapindiatools` backend using `.gpkg` formats, making your main scripts lighter.
2. **Standardized Codes:** It internally manages 2-digit state codes and 5-digit district codes, making it much harder to mess up merges due to slight spelling differences in state names (e.g., "Orissa" vs. "Odisha").
3. **No CRS Headaches:** The mapping coordinates are pre-calculated and projected correctly for the Indian subcontinent.

If you are regularly working with Indian demographic or geographical data in R, transitioning to `mapindia` will make your workflow significantly cleaner.

[code](https://github.com/mrinalcs/mapping-india-in-r)

```

```