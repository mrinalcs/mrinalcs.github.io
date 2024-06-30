---
title: Matrices in LaTeX
description: Create matrices in LaTeX using various environments and commands, including matrix types, matrix operations, and useful tips for formatting.
tags: [latex]
---
 

| Type                        | LATEX markup                                   | Renders as                                                      |
|-----------------------------|-----------------------------------------------|-----------------------------------------------------------------|
| Plain                       | <code>\begin{matrix}<br>1 & 2 & 3\\<br>a & b & c<br>\end{matrix}</code> | $$\begin{matrix} 1 & 2 & 3\\ a & b & c \end{matrix}$$             |
| Parentheses; round brackets | <code>\begin{pmatrix}<br>1 & 2 & 3\\<br>a & b & c<br>\end{pmatrix}</code> | $$\begin{pmatrix} 1 & 2 & 3\\ a & b & c \end{pmatrix}$$             |
| Brackets; square brackets   | <code>\begin{bmatrix}<br>1 & 2 & 3\\<br>a & b & c<br>\end{bmatrix}</code> | $$\begin{bmatrix} 1 & 2 & 3\\ a & b & c \end{bmatrix}$$             |
| Braces; curly brackets      | <code>\begin{Bmatrix}<br>1 & 2 & 3\\<br>a & b & c<br>\end{Bmatrix}</code> | $$\begin{Bmatrix} 1 & 2 & 3\\ a & b & c \end{Bmatrix}$$             |
| Pipes                       | <code>\begin{vmatrix}<br>1 & 2 & 3\\<br>a & b & c<br>\end{vmatrix}</code> | $$\begin{vmatrix} 1 & 2 & 3\\ a & b & c \end{vmatrix}$$             |
| Double pipes                | <code>\begin{Vmatrix}<br>1 & 2 & 3\\<br>a & b & c<br>\end{Vmatrix}</code> | $$\begin{Vmatrix} 1 & 2 & 3\\ a & b & c \end{Vmatrix}$$             |

[more](https://www.overleaf.com/learn/latex/Matrices#amsmath_matrix_environments)
 


## Matrix with Dots
Sometimes, you might want to include dots in your matrix to indicate a pattern. You can use the `\cdots`, `\ddots`, and `\vdots` commands for this.

```latex
\begin{pmatrix}
1 & 2 & \cdots & n \\
2 & 4 & \cdots & 2n \\
\vdots & \vdots & \ddots & \vdots \\
n & 2n & \cdots & n^2 \\
\end{pmatrix}

```

$$
\begin{pmatrix}
1 & 2 & \cdots & n \\
2 & 4 & \cdots & 2n \\
\vdots & \vdots & \ddots & \vdots \\
n & 2n & \cdots & n^2 \\
\end{pmatrix}
$$

and

```latex
\begin{bmatrix}
x_{11} & x_{12} & x_{13} & \dots & x_{1n} \\
x_{21} & x_{22} & x_{23} & \dots & x_{2n} \\
\dots & \dots & \dots & \dots & \dots \\
x_{d1} & x_{d2} & x_{d3} & \dots & x_{dn}
\end{bmatrix}
=
\begin{bmatrix}
x_{11} & x_{12} & x_{13} & \dots & x_{1n} \\
x_{21} & x_{22} & x_{23} & \dots & x_{2n} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
x_{d1} & x_{d2} & x_{d3} & \dots & x_{dn}
\end{bmatrix}
```

$$ 
 
\begin{bmatrix}
x_{11} & x_{12} & x_{13} & \dots & x_{1n} \\
x_{21} & x_{22} & x_{23} & \dots & x_{2n} \\
\dots & \dots & \dots & \dots & \dots \\
x_{d1} & x_{d2} & x_{d3} & \dots & x_{dn}
\end{bmatrix}
=
\begin{bmatrix}
x_{11} & x_{12} & x_{13} & \dots & x_{1n} \\
x_{21} & x_{22} & x_{23} & \dots & x_{2n} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
x_{d1} & x_{d2} & x_{d3} & \dots & x_{dn}
\end{bmatrix}
$$


## Matrix Multiplication
To represent matrix multiplication, you can use the `\times` command or leave a space between matrices.

```latex
\begin{pmatrix}
1 & 2 \\
3 & 4 \\
\end{pmatrix}
\times
\begin{pmatrix}
5 & 6 \\
7 & 8 \\
\end{pmatrix}
```

$$
\begin{pmatrix}
1 & 2 \\
3 & 4 \\
\end{pmatrix}
\times
\begin{pmatrix}
5 & 6 \\
7 & 8 \\
\end{pmatrix}
$$

## Matrix Transpose and Inverse
To represent the transpose of a matrix, you can use the `^T` command.
```latex
\begin{pmatrix}
1 & 2 \\
3 & 4 \\
\end{pmatrix}^T

```

$$
\begin{pmatrix}
1 & 2 \\
3 & 4 \\
\end{pmatrix}^T
$$
 
```latex 
\begin{aligned}
\mathbf{A}
&=
\begin{bmatrix}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{bmatrix}
\\
\mathbf{A}^T
&=
\begin{bmatrix}
\cos \theta & \sin \theta \\
-\sin \theta & \cos \theta
\end{bmatrix}
\\
\mathbf{A}^{-1}
&=
\begin{bmatrix}
\cos \theta & \sin \theta \\
-\sin \theta & \cos \theta
\end{bmatrix}
\end{aligned}

 ```

$$
\begin{aligned}
\mathbf{A}
&=
\begin{bmatrix}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{bmatrix}
\\
\mathbf{A}^T
&=
\begin{bmatrix}
\cos \theta & \sin \theta \\
-\sin \theta & \cos \theta
\end{bmatrix}
\\
\mathbf{A}^{-1}
&=
\begin{bmatrix}
\cos \theta & \sin \theta \\
-\sin \theta & \cos \theta
\end{bmatrix}
\end{aligned}
$$

## Ref
- <https://www.overleaf.com/learn/latex/Matrices>
- <https://tex.stackexchange.com>
- <https://www.geeksforgeeks.org/matrices-in-latex>