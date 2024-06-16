---
title: Matrices in LaTeX
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
 

$$
\begin{cases}                % Start of the cases environment
 1 & \text{if } i=j \\        % First case, returns 1 if i equals j
 0 & \text{otherwise}        % Second case, returns 0 otherwise
\end{cases}                  % End of the cases environment
$$


$$
\begin{align*}

M = \bordermatrix{~ & x & y \cr
              A & 1 & 0 \cr
              B & 0 & 1 \cr}

\end{align*}
$$

## Ref
- <https://www.overleaf.com/learn/latex/Matrices>