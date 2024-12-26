---
title: Time Series Analysis of Crude Oil Prices in India
description: "Time series analysis using the ARIMA and SARIMA model, study from 2016-2021, revealing price fluctuations, forecasting insights, and the model's limitations"
image: '2612241.png'
date: 2024-12-26
categories: [Data Science, Time Series Analysis]
tags: [time-series,analysis,r-programming]
---

Crude oil is a core commodity that significantly impacts both the global and Indian economies. India is the **3rd largest oil importer**, relying on imports for about 70% of its crude oil needs. Oil accounts for approximately 30% of India's total energy consumption. This analysis explores the price trends of crude oil in India using time series techniques.

## Objectives 
- To analyze the trends in crude oil prices.
- To forecast crude oil prices. 

## Data Source
*   The data used in this study consists of monthly crude oil prices.
*   The data was collected from the websites of commodity exchanges (MCX India) from July 2016 to May 2021. Open the data [crude_oil_prices.csv](crude_oil_prices.csv).
  
## Descriptive Statistics 
- **Minimum price:** 1,603 INR
- **Maximum price:** 5,649 INR
- **Median price:** 3,919 INR
- **Mean price:** 3,852 INR 

![Crude Oil Price in India Jul 2016 - May 2021](2612242.png)

## ADF Test

```output
> adf_test <- tseries::adf.test(ts_data, alternative = "stationary")
> print(adf_test)
	Augmented Dickey-Fuller Test
data:  ts_data
Dickey-Fuller = -1.7516, Lag order = 3, p-value = 0.6751
alternative hypothesis: stationary
```

The initial ADF test yielded a **p-value of 0.6751**, which is higher than the significance level (0.05), indicating the series is **non-stationary**. 


```output
> ts_data_diff1 <- diff(ts_data)
> # Apply ADF test again on differenced series
> adf_test_diff1 <- adf.test(ts_data_diff1)
> print(adf_test_diff1)
	Augmented Dickey-Fuller Test
data:  ts_data_diff1
Dickey-Fuller = -4.0041, Lag order = 3, p-value = 0.01568
alternative hypothesis: stationary
```

Differencing was applied to the data, resulting in a **stationary series** with a **p-value of 0.01568**, which is less than 0.05 .


![Line graph showing ACF of Crude Oil Prices with significant spikes at lags 1, 12, and 13](2612244.png)

![Line graph showing PACF of Crude Oil Prices with significant spikes at lags 1, 2, 7, 12, and 13](2612245.png)




 
## References
- [https://www.investopedia.com/terms/c/crude-oil.asp](https://www.investopedia.com/terms/c/crude-oil.asp)
- [https://www.mcxindia.com/products/energy/crude-oil](https://www.mcxindia.com/products/energy/crude-oil)
- [https://www.statisticshowto.com/unit-root/](https://www.statisticshowto.com/unit-root/)
- [https://www.investopedia.com/articles/investing/072515/top-factors-reports-affect-price-oil.asp](https://www.investopedia.com/articles/investing/072515/top-factors-reports-affect-price-oil.asp)
