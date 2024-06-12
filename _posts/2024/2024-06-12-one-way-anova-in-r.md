---
title: One way ANOVA in R
description: "How to perform an ANOVA test in R to compare means, check assumptions, and interpret results."
tags: [r-programming,stat,analysis]
---
 
## Prepare Data
For this tutorial, we will use a built-in dataset mtcars in R. This dataset contains data on various car models, including variables like miles per gallon (mpg), number of cylinders (cyl), horsepower (hp), and more.

```R
# Load the mtcars dataset
data("mtcars")

# View the first few rows of the dataset
head(mtcars)

```

![output mtcars](/2024/06/12/1s6aJS3Tpdxq.png)
*The first few rows of the dataset*

## Check Assumptions

ANOVA has several assumptions:

1. Independence: The samples must be independent.
2. Normality: The dependent variable should be approximately normally distributed within each group.
3. Homogeneity of variances: The variances among the groups should be approximately equal.

### 1. Check for Normality
We can use the Shapiro-Wilk test to check for normality.

```R
# Shapiro-Wilk test for normality
shapiro.test(mtcars$mpg)
```
  
```R

shapiro.test(mtcars$mpg)

	Shapiro-Wilk normality test

data:  mtcars$mpg
W = 0.94756, p-value = 0.1229

```
Interpretation

Null Hypothesis (H0): The data is normally distributed.
Alternative Hypothesis (H1): The data is not normally distributed.

p-value = 0.1229  Since the p-value is greater than the common significance level of 0.05, we fail to reject the null hypothesis. We can assume the mpg data is approximately normally distributed.


### 2. Check for Homogeneity of Variances
The Bartlett test can be used to check for homogeneity of variances.
```R
# Bartlett test for homogeneity of variances
bartlett.test(mpg ~ cyl, data = mtcars)
```


## Perform ANOVA
Now, we perform the ANOVA test. We will compare the miles per gallon (mpg) across different numbers of cylinders (cyl).

```R 
# Perform ANOVA
anova_result <- aov(mpg ~ cyl, data = mtcars)

# Summary of ANOVA
summary(anova_result)

```

## Interpretation of Results
The summary of the ANOVA test will provide the F-statistic and p-value. If the p-value is less than the significance level (usually 0.05), we reject the null hypothesis and conclude that there is a significant difference between the group means.


