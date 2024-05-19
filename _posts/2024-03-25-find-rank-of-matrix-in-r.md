---
title:  Find rank of matrix in R
description: How to find rank of a matrix in R programming using different way.
tags: [r-programming]
---

## Matrix Rank

Rank of a matrix is the dimension of the vector space spanned by its columns or rows. In simpler terms, it represents the maximum number of linearly independent rows or columns in the matrix. A matrix is said to have full rank if its rank equals the number of rows or columns, indicating that none of its rows or columns can be expressed as a linear combination of the others.

## Computing using the qr() Function

```
# Create a sample matrix mat with dimensions 3x4.
mat <- matrix(c(1, 2, 3, 4, 2, 4, 6, 8, 3, 6, 9, 12), nrow = 3)

# Compute the rank of the matrix by QR decomposition
rank_mat <- qr(mat)$rank

# Print the rank of the matrix
print(rank_mat)
```

## Output
![output of above code](/assets/img/find-rank-of-matrix-in-r/Annotation%202024-03-25%20113822.jpg)

Find rank using rankMatrix function in **Matrix package**.

```
library(Matrix)
mat <- matrix(c(1, 2, 3, 4, 2, 4, 6, 8, 3, 6, 9, 12), nrow = 3)
rankMatrix(mat)
```

``` output
[1] 3
```
