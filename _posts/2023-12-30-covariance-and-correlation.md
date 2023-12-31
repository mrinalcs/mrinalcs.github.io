---
title: Covariance and Correlation
---

Consider two random variables $$ X $$ and $$ Y $$ Here and we want to measure of the connection between two random variables and to what amount, they change together.

## Covariance

directional relationship, we define the covariance between $$ X $$ and $$ Y $$
, written $$ \text{Cov}(X,Y) $$

$$ \text{Cov}(X, Y) = \frac{\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})}{n-1} $$


| $$ X $$| $$ Y $$ | $$ X - \bar{X} $$ | $$ Y - \bar{Y} $$ | $$ (X - \bar{X})(Y - \bar{Y}) $$
|--------|---------------------|-------------------------------|-------------------| 
| 2     |        3           |         -4                   |        -7        | 28
| 4     |        7           |          -2                    |         -3        | 6
| 6     |        10           |           0                    |          0        | 0
| 8     |        13           |           2                    |         3       | 6
| 10     |       17           |          4                    |        7        | 28
| $$ \bar{X} = 6 $$   | $$ \bar{Y} = 10 $$   |  -  |  -  | $$ \sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})= 64 $$    |


Here we can see covariance is 64. By which we can n

## Correlation

$$ \rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y} $$


 