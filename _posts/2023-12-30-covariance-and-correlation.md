---
title: Covariance and Correlation
image: /img/blog/covariance-and-correlation.jpg
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

The correlation coefficient (r) scale between -1 and 1.

$$
\text{Cor}(X, Y) = \frac{\sum{(X_i - \bar{X})(Y_i - \bar{Y})}}{\sqrt{\sum{(X_i - \bar{X})^2} \sum{(Y_i - \bar{Y})^2}}}
$$




$$ \implies \text{Cor}(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y} $$

where standard deviation $$ (\sigma) $$

$$
\sigma = \sqrt{\frac{1}{N} \sum_{i=1}^{N}(X_i - \bar{X})^2} 
$$


Thats why correlation is often preferred over covariance due to its standardized nature, unit independence, and ease of interpretation.

## Comparison:

| Covariance                            | Correlation                               |
|------------------------|---------------------------------------|-------------------------------------------|
| Measures the degree of joint variability between two variables. | Standardized measure of the linear relationship between two variables. |
| $$\text{Cov}(X, Y) = \frac{\sum{(X_i - \bar{X})(Y_i - \bar{Y})}}{n-1}$$ | $$\text{Corr}(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y}$$ |
| Positive: Variables move in the same direction. Negative: Variables move in opposite directions. Zero: No linear relationship. | $$\rho = 1$$: Perfect positive correlation. $$\rho = -1$$: Perfect negative correlation. $$\rho = 0$$: No linear correlation. |
| Not normalized. In the units of the product of the original variables. | Normalized to a range of -1 to 1, making it unitless and easier to interpret. |
| Depends on the units of the variables. | Scale-independent, suitable for comparing relationships between variables measured in different units. |

