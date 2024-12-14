---
title: "How to Convert Data to Time Series Format"
description: "Different methods for converting different format raw data into time series format in R"
image: "1312241.jpg"
date: 2024-12-14
tags: [time-series,r-programming]
---

When analyzing time series data in R, converting raw data into a proper time series format seems complex. This can become complex, especially when the data comes in various forms, such as yearly, monthly, daily, hourly, or even with specific start and end timestamps. Also the data could be in different structures such as data frames with columns of values and time stamps, or simply an array without explicit timestamps.

## Simple Numeric Vector

R provides a built-in function `ts()` for creating time series objects. It is suitable for data with regular time intervals


```r
# Monthly sales data (e.g., from January to December)
sales <- c(120, 150, 130, 160, 180, 170, 190, 200, 210, 220, 250, 240)
sales_ts <- ts(sales, start = c(2023, 1), frequency = 12) # monthly data
```

`start = c(2023, 1)`: Specifies that the time series starts in **January 2023**. The first element (2023) is the year, and the second element (1) is the month (January).

`frequency = 12`: Indicates that the data is **monthly** (12 months in a year).


## Using the zoo Package

```r
library(zoo)
dates <- as.Date(c("2024-01-01", "2024-01-03", "2024-01-05"))
values <- c(5, 10, 15)
data <- zoo(values, order.by = dates)
```



## Data Frame with Dates

Like above if data frame format with date and value columns, Utilise Sales values only using the `ts()` function to create a time series object.

```r
# Monthly sales data
sales <- data.frame(
  Month = as.Date(c('2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01', 
                    '2020-05-01', '2020-06-01', '2020-07-01', '2020-08-01',
                    '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01')),
  Sales = c(120, 150, 130, 160, 180, 170, 190, 200, 210, 220, 250, 240)
)
sales_ts <- ts(sales_data$Sales, start = c(2020, 1), frequency = 12)
```

| Period Type | Periods per Year |
|---|---|
| Quarterly | 4 |
| Monthly | 12 |
| Weekly | 52 (approx.) |
| Daily | 365 (or 366 for leap years) |

For daily or weekly data spanning multiple years, we use packages like `zoo` or `xts` to handle exact dates.
 
## Daily Or Weekly Data for Multiple Years

The code converts a `data.frame` containing monthly sales data into a zoo object, which is used for irregular and regular time-series data in R. In following code `sales$Month<-as.Date(sales$Month)`   



```r
library(zoo)
sales <- data.frame(
  Month = as.Date(c('2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01', 
                    '2020-05-01', '2020-06-01', '2020-07-01', '2020-08-01',
                    '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01')),
  Sales = c(120, 150, 130, 160, 180, 170, 190, 200, 210, 220, 250, 240)
)
# Convert the data frame to a zoo object
sales_zoo <- zoo(sales$Sales, order.by = sales$Month)
```


```r
library(xts)

sales <- data.frame(
  Month = as.Date(c('2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01', 
                    '2020-05-01', '2020-06-01', '2020-07-01', '2020-08-01',
                    '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01')),
  Sales = c(120, 150, 130, 160, 180, 170, 190, 200, 210, 220, 250, 240)
)
# Convert the data frame to an xts object
sales_ts <- xts(sales$Sales, order.by = sales$Month)
```

## Hourly Data


To handle hourly data in R using the zoo package, we generate a sequence of hourly timestamps starting from a specified date and by setting the by = "hour" argument we can creat a timeseries data.

```r 
library(zoo) 
sales <- c(10, 20, 30, 50)  
# Start date and time 
start_time <- as.POSIXct("2024-01-01 00:00:00")

# Create a sequence of hourly timestamps
timestamps <- seq(from = start_time, by = "hour", length.out = length(sales))

#Create the zoo object
hourly_sales <- zoo(sales, order.by = timestamps)
```
