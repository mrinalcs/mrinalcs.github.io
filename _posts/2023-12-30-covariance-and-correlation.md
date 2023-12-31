---
title: Covariance and Correlation
---

Consider two random variables $$ X $$ and $$ Y $$ Here and we want to measure of the connection between two random variables and to what amount, they change together.

## Covariance

We define the covariance between $$ X $$ and $$ Y $$
, written $$ \text{Cov}(X,Y) $$

$$ \text{Cov}(X, Y) = \frac{\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})}{N} $$


| $$ X $$| $$ Y $$ | $$ X - \bar{X} $$ | $$ Y - \bar{Y} $$ | $$ (X - \bar{X})(Y - \bar{Y}) $$
|--------|---------------------|-------------------------------|-------------------| 
| 2     |        3           |         -4                   |        -7        | 28
| 4     |        7           |          -2                    |         -3        | 6
| 6     |        10           |           0                    |          0        | 0
| 8     |        13           |           2                    |         3       | 6
| 10     |       17           |          4                    |        7        | 28
| $$ \bar{X} = 6 $$   | $$ \bar{Y} = 10 $$   |     |     | $$ \sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})= 68 $$    |


Here we can see covariance is 13.6. By which indicates a positive relationship between $$ X $$ and $$ Y $$. However,covariance is that it doesn't provide a standardized measure of the relationship   it doesn't give information about the strength of the relationship or how dependent one variable is on the other.

For a standardized measure of the strength and direction of the linear relationship, we have to use correlation.

## Correlation

$$ \rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y} $$


 