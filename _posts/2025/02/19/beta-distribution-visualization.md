---
title: "Beta Distribution Visualization"
description: "An interactive Shiny app to visualize the Beta distribution with adjustable parameters."
image: "192252.png"
date: 2025-02-19
tags: [stat]
toc: false
---

The Beta distribution is a continuous probability distribution defined on the interval [0, 1], and it is particularly useful in modeling random variables that represent proportions or probabilities. It is characterized by two positive shape parameters, **α (alpha)** and **β (beta)**, and is defined by the following probability density function (PDF):

$$
f(x; \alpha, \beta) = \frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\,\Gamma(\beta)} \; x^{\alpha-1}(1-x)^{\beta-1}
$$

Where:
- **$\alpha$**: Shape parameter (alpha)
- **$\beta$**: Shape parameter (beta)

The key summary statistics for the Beta distribution are given by:

**Mean:**

  $$
  \text{Mean} = \frac{\alpha}{\alpha + \beta}
  $$

**Variance:**

  $$
  \text{Variance} = \frac{\alpha \, \beta}{(\alpha+\beta)^2 (\alpha+\beta+1)}
  $$

**Mode:**

  $$
  \text{Mode} =
  \begin{cases}
  \frac{\alpha - 1}{\alpha + \beta - 2}, & \text{if } \alpha, \beta > 1 \\
  \text{undefined}, & \text{otherwise}
  \end{cases}
  $$

👉 [Beta Distribution Visualization](https://mrinalcs.shinyapps.io/beta-distribution-visualization/)

![Graph of a Beta Distribution with α=5.1 and β=2, showing the probability density function over the interval [0, 1]](192252.png)

**Key Features and How to Use:**
 
**Adjust *α* (Alpha):**  
  Modify the alpha parameter to see how it affects the shape of the distribution. Higher values of *α* shift the distribution towards 1.

**Adjust *β* (Beta):**  
  Modify the beta parameter to observe its impact. Higher values of *β* shift the distribution towards 0.

**Visualize the Probability Density:**  
  The plot dynamically updates to display the Beta PDF for the selected parameters, illustrating how the density function behaves over the interval [0, 1].

**Examine Summary Statistics:**  
  The app calculates and displays key summary statistics such as the mean, variance, and mode (when defined) of the distribution, offering further insights into its properties.
