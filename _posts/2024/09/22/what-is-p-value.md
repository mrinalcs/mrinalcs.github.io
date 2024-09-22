---
title: "What Is P Value ?"
description: "The p-value tells how likely it is that your results happened by chance"
date: 2024-09-21
image:  "Annotation 2024-09-22 112534.jpg"
tags: [stat]
---

The p-value tells how likely it is that your results happened by chance. So p-value is the probability of observing data at least as extreme as what you have, assuming that the null hypothesis is true.

It helps you decide whether to reject the null hypothesis. A small p-value indicates that the observed data is unlikely under the null hypothesis, suggesting that the alternative hypothesis might be true.

## Example

For example you want to test if a coin is fair (meaning it has an equal chance of landing on heads or tails).

- **Null Hypothesis (H0)**: The coin is fair (p = 0.5).
- **Alternative Hypothesis (H1)**: The coin is not fair (p ≠ 0.5).

p = probability of getting head 

**Experiment:** You toss the coin 10 times and record the results. Let's say you get 8 heads and 2 tails.


Here p-value is if the coin is fair, how likely is it that you would get 8 or more heads out of 10 flips?


If the p-value is high (e.g., p = 0.6), it means getting 8 heads is quite likely, even with a fair coin. Therefore, you don’t reject the null hypothesis, and the coin is likely fair.

If the p-value is small (e.g., p = 0.03), it means that getting 8 heads is very unlikely if the coin is fair. Therefore, you reject the null hypothesis and conclude the coin might be biased.

```mermaid
graph TD
    A[Flip Coin 10 Times] --> B{Number of Heads?}

    B --> |0| C0[Fair Coin]
    B --> |1| C1[Fair Coin]
    B --> |2| C2{p-value?}
    B --> |3| C3{p-value?}
    B --> |4| C4{p-value?}
    B --> |5| C5[Fair Coin]
    B --> |6| C6{p-value?}
    B --> |7| C7{p-value?}
    B --> |8| C8{p-value?}
    B --> |9| C9[Coin Biased]
    B --> |10| C10[Coin Biased]

    C2 --> |>= 0.05| D2[Fair Coin]
    C2 --> |< 0.05| E2[Coin Biased]

    C3 --> |>= 0.05| D3[Fair Coin]
    C3 --> |< 0.05| E3[Coin Biased]

    C4 --> |>= 0.05| D4[Fair Coin]
    C4 --> |< 0.05| E4[Coin Biased]

    C6 --> |>= 0.05| D6[Fair Coin]
    C6 --> |< 0.05| E6[Coin Biased]

    C7 --> |>= 0.05| D7[Fair Coin]
    C7 --> |< 0.05| E7[Coin Biased]

    C8 --> |>= 0.05| D8[Fair Coin]
    C8 --> |< 0.05| E8[Coin Biased]
```

## Why α = 0.05?

0.05 level of significance (α) was popularized by statisticians like Ronald Fisher in the early 20th century. It was chosen as a balance between being stringent enough to reduce the chance of false positives (Type I errors) while still allowing researchers to find statistically significant results.

If you set α = 0.05, you're allowing a 5% chance of incorrectly rejecting the null hypothesis when it is actually true. In clinical trials, a lower α (like 0.01) might be used to reduce the risk of falsely concluding a treatment is effective.


##  Why rejecting or failing to reject the null hypothesis ?

When you reject the null hypothesis, it suggests that there is sufficient evidence to support the alternative hypothesis, indicating a statistically significant difference or effect. However, It means the data you collected provides strong evidence against the null hypothesis.

Conversely, if you fail to reject the null hypothesis, it does not mean that the null hypothesis is true; instead, it suggests that there is not enough evidence to support the alternative hypothesis. In other words, failing to reject the null simply implies that any observed differences could be due to random chance, rather than a true effect. Thats whay we say failed to reject null hypothesis, not ~~Accept the null hypothesis~~ .