---
title: Mean vs. Median
description: When to Use Mean vs. Median
tags: math 
---

## Mean
The mean, often referred to as the average, is calculated by summing up all the values in a dataset and dividing the total by the number of observations. It is a measure of central tendency that gives us a sense of the typical value in a set

$$ \text{Mean} = \frac{\sum_{i=1}^{n} x_i}{n} $$

**Use Mean When:**

- The data is symmetrically distributed.
- Outliers have minimal impact on the overall trend.
- The data follows a normal distribution.

## Median
The median is the middle value of a dataset when it is ordered. To find the median, we arrange the values in ascending or descending order and identify the middle value. If the dataset has an even number of observations, the median is the average of the two middle values.

$$ \text{Median} = \begin{cases} 
      x_{\frac{n+1}{2}} & \text{if } n \text{ is odd} \\
      \frac{x_{\frac{n}{2}} + x_{\frac{n}{2} + 1}}{2} & \text{if } n \text{ is even} 
   \end{cases}
$$


**Use Median When:**

- The data is skewed or contains outliers.
- There is a concern about *extreme values* affecting the average.
- The distribution is not symmetrical.

## Example


### Exam Scores

Imagine a class of students with the following exam scores:
75,80,85,90,95,100

mean : 87.5

In this case, using the mean provides a good representation of the average score, and it aligns with the central tendency of the data.

### Household Incomes
Consider a dataset representing household incomes in a small town:
25000, 30000, 45000, 50000, 5000000

Mean = 1021000

Median = 45000

In this scenario, the mean is significantly influenced by the extremely high income of 5000000. Using the mean might not accurately represent the typical household income because it is heavily skewed by the outlier. The median, on the other hand, gives a more realistic picture of the central tendency, making it a better choice for this dataset.
