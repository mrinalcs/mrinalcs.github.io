---
title: "Calculate Correlation Coefficient Manually"
description: "A step-by-step guide to calculating the correlation coefficient manually using a simple dataset."
date: 2024-09-21
image: "annotation-2024-09-21-194347.jpg"
tags: [stat]
---


Correlation coefficient is a numerical measure used to determine the relationship between two variables. The most commonly used correlation coefficient is Pearson's $r$, which measures the linear relationship between two datasets. Here we'll go through the process of calculating the correlation coefficient manually, using a simple dataset as an example.

## What is Correlation Coefficient?

The correlation coefficient is a number between -1 and 1 that describes the degree to which two variables are related. A value of 1 indicates a perfect positive correlation, -1 indicates a perfect negative correlation, and 0 indicates no correlation.


$$
r = \frac{\text{cov}(X, Y)}{\sqrt{\text{var}(X) \cdot \text{var}(Y)}}
$$


## Formula for Pearson's Correlation Coefficient

The formula for calculating Pearson's correlation coefficient ($r$) is:

$$
r = \frac{n(\sum xy) - (\sum x)(\sum y)}{\sqrt{[n \sum x^2 - (\sum x)^2][n \sum y^2 - (\sum y)^2]}}
$$

Where:
- $n$ = number of pairs of scores
- $x$ = variable X
- $y$ = variable Y

## Step-by-Step Calculation

Let's consider a simple dataset of five pairs of values:

| X | Y |
|---|---|
| 1 | 2 |
| 2 | 3 |
| 3 | 5 |
| 4 | 7 |
| 5 | 11 |

### Calculate the Necessary Sums

**Calculate $\sum x$, $\sum y$, $\sum xy$, $\sum x^2$, and $\sum y^2$**:


Using a Scientific Calculator that have a statistics mode (look for a "STAT" or "SD" mode). Switch to this  mode. Enter your data pairs $x$ and $y$ and find following values:

<!-- 
   - $\sum x = 1 + 2 + 3 + 4 + 5 = 15$
   - $\sum y = 2 + 3 + 5 + 7 + 11 = 28$
   - $\sum xy = (1 \times 2) + (2 \times 3) + (3 \times 5) + (4 \times 7) + (5 \times 11) = 106$
   - $\sum x^2 = 1^2 + 2^2 + 3^2 + 4^2 + 5^2 = 55$
   - $\sum y^2 = 2^2 + 3^2 + 5^2 + 7^2 + 11^2 = 208$
 -->
 
$$
\begin{align*}
\sum x & = 1 + 2 + 3 + 4 + 5 = 15 \\
\sum y & = 2 + 3 + 5 + 7 + 11 = 28 \\
\sum xy & = (1 \times 2) + (2 \times 3) + (3 \times 5) + (4 \times 7) + (5 \times 11) = 106 \\
\sum x^2 & = 1^2 + 2^2 + 3^2 + 4^2 + 5^2 = 55 \\
\sum y^2 & = 2^2 + 3^2 + 5^2 + 7^2 + 11^2 = 208
\end{align*}
$$

Number of pairs  $n = 5$

### Plug Values into the Formula

Now we can plug the values into the formula:

$$
\begin{align*}
r & = \frac{5(106) - (15)(28)}{\sqrt{[5(55) - (15)^2][5(208) - (28)^2]}} \\
  & = \frac{110}{113.14} \approx 0.97
\end{align*}
$$

## Conclusion

The correlation coefficient of approximately 0.97 indicates a strong positive correlation between variables $X$ and $Y$. This manual calculation not only enhances your understanding of the correlation coefficient but also allows you to verify results obtained through statistical software.

Try this method with your own datasets and explore the relationships between different variables!

## Note 

It's essential to recognize that correlation does not imply causation. For example, consider the relationship between liver health and wine consumption. While there may be a strong correlation between affluent individuals who consume wine and their liver health, this does not conclusively imply that wine consumption leads to better liver health. Wealthier individuals often have better access to healthcare and healthier lifestyles, which can contribute to their overall health status. This scenario illustrates the concept of multicollinearity, where multiple factors (confounding factors) can influence the relationship between the variables can interact in complex ways.
