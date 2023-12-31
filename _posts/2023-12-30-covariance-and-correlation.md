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
| 2     |        20           |         -4                   |        100        | 
| 4     |        20           |          -2                    |         25        | 
| 6     |        20           |           0                    |          0        | 
| 8     |        20           |           2                    |         25        | 
| 10     |        20           |          4                    |        100        | 

$$ \bar{X} = 6 $$ & $$ \bar{Y} = 20 $$


## Correlation

$$ \rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y} $$


 