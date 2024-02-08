---
title: Correlation and Regression
image: /assets/img/correlation-and-regression/2024-02-08%20230312.jpg
description: Basic difference b/w regression predicts outcomes from variables, while correlation gauges linear relationships
---



## Correlation
Correlation measures the strength and direction of a linear relationship between two variables. It helps us understand how changes in one variable relate to changes in another. The correlation coefficient, ranging from -1 to 1, provides insights into the nature of the association. Remember, correlation does not imply causation; it simply quantifies the degree of connection.

$$
r = \frac{\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})}{\sqrt{\sum_{i=1}^{n}(X_i - \bar{X})^2} \sqrt{\sum_{i=1}^{n}(Y_i - \bar{Y})^2}}
$$





- Correlation measures the statistical relationship between two variables.
- It indicates the strength and direction of a linear relationship between them.
- Correlation coefficients range from -1 to 1, where -1 represents a perfect negative correlation, 1 represents a perfect positive correlation, and 0 indicates no correlation.


## Regression
Regression takes us a step further by modeling the relationship between a dependent variable and one or more independent variables. The resulting equation represents the best-fit line or curve, enabling us to predict the dependent variable's value based on given independent variables. While correlation provides insights into association, regression equips us with a predictive tool.



$$
Y = b_0 + b_1X + \varepsilon
$$


- Regression is a statistical method that analyzes the relationship between a dependent variable and one or more independent variables.
- It helps in predicting the value of the dependent variable based on the values of the independent variables.
- There are different types of regression (e.g., linear regression, logistic regression), each suited for specific types of relationships between variables.
