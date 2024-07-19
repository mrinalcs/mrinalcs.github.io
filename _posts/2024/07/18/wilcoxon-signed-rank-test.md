---
title: "Wilcoxon Signed-Rank Test"
description:
date: 2024-07-18  
tags: [r-programming,stat]
---

## Introduction

The Wilcoxon Signed-Rank Test is a non-parametric statistical hypothesis test used to determine whether there is a significant difference between paired samples or a single samples and a known median. Unlike the t-test, it does not assume normality, making it robust for skewed or non-normal data distributions. Heres how to perform the Wilcoxon Signed-Rank Test both manually and using R programming.

## Manual Calculation of Wilcoxon Signed-Rank Test

To perform the Wilcoxon Signed-Rank Test manually, follow these steps:

- Step 1: Calculate the differences between paired observations or between a sample and the median.
- Step 2: Rank the absolute differences.
- Step 3: Assign ranks, handling ties appropriately.
- Step 4: Compute the signed ranks and the test statistic.


## Example

### One sample

```R
# Single sample data
sample <- c(7.2, 8.3, 5.6, 7.4, 7.8, 5.2, 9.1, 5.8)

# Known median
median_value <- 7.5

# Calculate differences from the median
differences <- sample - median_value

# Rank absolute differences
abs_diff_rank <- rank(abs(differences))

# Calculate signed ranks
signed_ranks <- ifelse(differences > 0, abs_diff_rank, -abs_diff_rank)

# Separate positive and negative ranks
positive_ranks <- signed_ranks[signed_ranks > 0]
negative_ranks <- signed_ranks[signed_ranks < 0]

# Compute T+ and T-
T_plus <- sum(positive_ranks)
T_minus <- sum(abs(negative_ranks))

# Calculate test statistic
T <- min(T_plus, T_minus)

# Output the results
cat("Test statistic (T):", T, "\n")

```

```Output
Differences: -0.3  0.8 -1.9 -0.1  0.3 -2.3  1.6 -1.7 
Absolute differences ranks: 2 5 8 1 2 9 6 7 
Signed ranks: -2  5 -8 -1  2 -9  6 -7 
T+: 13 
T-: 27

```

For a sample size of $n = 8$, refer to the Wilcoxon Signed-Rank Test tables to find the critical value $T_{\alpha}$ at a chosen significance level $\alpha$ (e.g., $\alpha = 0.05$).

We reject the null hypothesis $H_0$ if $T^+ < T_{\alpha}$.

### Paired sample

```R
# Paired data example
before <- c(51.2,46.5,24.1,10.2,65.3,92.1,30.3,49.2)
after <- c(45.8,41.3,15.8,11.1,58.5,70.3,31.6,35.4)

# Calculate differences
differences <- after - before

# Rank absolute differences
abs_diff_rank <- rank(abs(differences))

# Calculate signed ranks
signed_ranks <- ifelse(differences > 0, abs_diff_rank, -abs_diff_rank)

# Separate positive and negative ranks
positive_ranks <- signed_ranks[signed_ranks > 0]
negative_ranks <- signed_ranks[signed_ranks < 0]

# Compute T+ and T-
T_plus <- sum(positive_ranks)
T_minus <- sum(abs(negative_ranks))

# Output the results
cat("Differences:", differences, "\n")
cat("Absolute differences ranks:", abs_diff_rank, "\n")
cat("Signed ranks:", signed_ranks, "\n")
cat("T+: ", T_plus, "\n")
cat("T-: ", T_minus, "\n")

# Calculate test statistic
T <- min(T_plus, T_minus)

# Output the results
cat("Test statistic (T):", T, "\n")
```

```Output
Differences: -5.4 -5.2 -8.3  0.9 -6.8 -21.8  1.3 -13.8 
Absolute differences ranks: 4 3 7 1 5 8 2 6 
Signed ranks: -4 -3 -7 1 -5 -8 2 -6 
T+: 3 
T-: 33

```
Use the Wilcoxon Signed-Rank Test tables for the critical value $T_{\alpha}$ for the given sample size (8) and significance level.
 
Reject $H_0$ if $T^- < T_{\alpha}$ .


## Using Packages (wilcox.test)

The wilcox.test function in R simplifies the calculation:


```r 
# Using wilcox.test for single sample vs median
wilcox_result_single <- wilcox.test(sample, mu = median_value)
wilcox_result_single

```

```Output
> wilcox_result_single

	Wilcoxon signed rank test with continuity correction

data:  sample
V = 11.5, p-value = 0.4002
alternative hypothesis: true location is not equal to 7.5

```


```r 
# Using wilcox.test for paired data
wilcox_result <- wilcox.test(before, after, paired = TRUE)
wilcox_result
```

```Output
> wilcox_result

	Wilcoxon signed rank exact test

data:  before and after
V = 33, p-value = 0.03906
alternative hypothesis: true location shift is not equal to 0

```