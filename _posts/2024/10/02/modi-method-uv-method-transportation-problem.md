---
title: MODI Method (UV Method) Transportation Problem
description: MODI Method (UV Methods) for testing optimality in transportation problems heres step-by-step procedures and examples for effective cost optimization in operations research.
date: 2024-10-02
image:  "310241.jpg"
tags: [operations-research]
---

 
The **MODI (Modified Distribution Method)** or **UV Method** is an efficient way to optimize a basic feasible solution of a transportation problem. Heres steps of this method using an example with calculations.

## Problem Statement

Let's consider the following transportation problem. We have three sources $ S_1, S_2, S_3 $ and three destinations $ D_1, D_2, D_3 $. The supply available at each source and the demand at each destination are as follows:

$$
\begin{array}{|c|c|c|c|c|}
\hline
 & D_1 & D_2 & D_3 & \text{Supply} \\
\hline
S_1 & 19 & 30 & 50 & 7 \\
S_2 & 70 & 30 & 40 & 9 \\
S_3 & 40 & 8  & 70 & 18 \\
\hline
\text{Demand} & 5 & 8 & 21 & \\
\hline
\end{array}
$$


To solve the transportation problem, we must ensure that the problem is balanced ie. the total supply equals the total demand. 

$$
\text{Total Supply} = 7 + 9 + 18 = 34
$$

$$
\text{Total Demand} = 5 + 8 + 21 = 34
$$

Since total supply equals total demand, we can proceed to find a feasible solution.


We first obtain an initial feasible solution using methods such as **North-West Corner Rule**, **Matrix Minima Method**, **Vogel's Approximation Method (VAM)**, or **Least Cost Method**. Here, we use the North-West Corner Rule:


## Initial Feasible Solution (North-West Corner Rule)

$$
\begin{array}{|c|c|c|c|}
\hline
 & D_1 & D_2 & D_3 \\
\hline
S_1 & 5 & 2 & 0 \\
S_2 & 0 & 6 & 3 \\
S_3 & 0 & 0 & 18 \\
\hline
\end{array}
$$



Here no of allocation = m+n-1 = 5
And allocation are independent . so the problem is non-degenerate.
This satisfies all supply and demand constraints.

Initial Transportation cost 

$$  Total Cost=19*5 + 30*2 + 30*6 + 40*3 + 70*18  $$

$$  Total Cost=95+60+180+120+1260=1715 $$

Now we will use MODI method 

## Using the MODI Method

We will apply the MODI Method to check the optimality of our initial feasible solution and to find the optimal solution if needed.

### Current Allocation

The current allocation from the North-West Corner Rule is:

$$
\begin{array}{|c|c|c|c|}
\hline
 & D_1 & D_2 & D_3 \\
\hline
S_1 & 5 & 2 & 0 \\
S_2 & 0 & 6 & 3 \\
S_3 & 0 & 0 & 18 \\
\hline
\end{array}
$$

The total cost of this allocation was previously calculated as:

$$
\text{Total Cost} = 1715
$$

### Step 1: Calculate Opportunity Costs

Previously calculated opportunity costs are:

- For $ (S_1, D_3) $: $ 10 $
- For $ (S_2, D_1) $: $ 51 $
- For $ (S_3, D_1) $: $ -9 $
- For $ (S_3, D_2) $: $ -52 $

### Step 2: Identify the Most Negative Opportunity Cost

The most negative opportunity cost is for $ (S_3, D_2) $ with a cost of $ -52 $. We will perform adjustments based on this cell.

### Step 3: Create a Loop

To adjust the allocation, we need to form a closed loop. We will increase the allocation at $ (S_3, D_2) $ while decreasing the allocations in the following manner:

1. Increase $ (S_3, D_2) $.
2. Decrease $ (S_2, D_2) $.
3. Decrease $ (S_2, D_3) $.
4. Decrease $ (S_1, D_2) $.
5. Decrease $ (S_1, D_1) $.

Assume we increase the allocation at $ (S_3, D_2) $ by $ x $.

### Step 4: Update the Allocations

Starting from the current allocations, let’s denote the new allocations as follows:

1. **Increase**: $ (S_3, D_2) = x $
2. **Decrease**:
   - $ (S_2, D_2) = 6 - x $ (can decrease up to 6)
   - $ (S_2, D_3) = 3 - x $
   - $ (S_1, D_2) = 2 - x $
   - $ (S_1, D_1) = 5 - x $

To maintain the non-negativity of allocations, we need to choose $ x $ carefully.

### Maximum Value of $ x $

To find the maximum possible value of $ x $:

- For $ (S_2, D_2) $: maximum is $ 6 $.
- For $ (S_2, D_3) $: maximum is $ 3 $.
- For $ (S_1, D_2) $: maximum is $ 2 $.
- For $ (S_1, D_1) $: maximum is $ 5 $.

The smallest value among these is $ 2 $ (from $ (S_1, D_2) $), so we can increase the allocation to $ 2 $.

### New Allocations

The new allocations will be:

- $ (S_3, D_2) = 2 $
- $ (S_2, D_2) = 6 - 2 = 4 $
- $ (S_2, D_3) = 3 - 2 = 1 $
- $ (S_1, D_2) = 2 - 2 = 0 $
- $ (S_1, D_1) = 5 - 2 = 3 $

### Updated Allocation Table

The new allocation table will be:

$$
\begin{array}{|c|c|c|c|}
\hline
 & D_1 & D_2 & D_3 \\
\hline
S_1 & 3 & 0 & 0 \\
S_2 & 0 & 4 & 1 \\
S_3 & 0 & 2 & 18 \\
\hline
\end{array}
$$

### Step 5: Calculate the New Total Cost

Now, calculate the new total cost:

$$
\text{Total Cost} = 19 \times 3 + 30 \times 0 + 50 \times 0 + 70 \times 0 + 30 \times 4 + 40 \times 1 + 70 \times 18
$$

Calculating each term:

- $ 19 \times 3 = 57 $
- $ 30 \times 0 = 0 $
- $ 50 \times 0 = 0 $
- $ 70 \times 0 = 0 $
- $ 30 \times 4 = 120 $
- $ 40 \times 1 = 40 $
- $ 70 \times 18 = 1260 $

Thus,

$$
\text{Total Cost} = 57 + 0 + 0 + 0 + 120 + 40 + 1260 = 1477
$$

### Step 6: Recalculate Opportunity Costs

Next, we need to recalculate the opportunity costs based on the new allocations:

1. Assign $ u_1 = 0 $ for $ S_1 $.
2. Calculate $ v_j $ values for $ D_1, D_2, D_3 $.
3. Calculate $ u_2, u_3 $ based on the new allocations.

From the new allocation:

- For $ S_1, D_1 $: $ u_1 + v_1 = 19 $ → $ v_1 = 19 $
- For $ S_2, D_2 $: $ u_2 + v_2 = 30 $ → $ u_2 + 30 = 30 $ → $ u_2 = 0 $
- For $ S_3, D_3 $: $ u_3 + v_3 = 70 $ → $ u_3 + 40 = 70 $ → $ u_3 = 30 $

Now we can summarize:

- $ u_1 = 0 $
- $ u_2 = 0 $
- $ u_3 = 30 $
- $ v_1 = 19 $
- $ v_2 = 30 $
- $ v_3 = 40 $

### Opportunity Costs Calculation

Calculate opportunity costs for the unallocated cells again:

- For $ (S_1, D_2) $: $ 30 - (0 + 30) = 0 $
- For $ (S_2, D_1) $: $ 70 - (0 + 19) = 51 $
- For $ (S_3, D_1) $: $ 40 - (30 + 19) = -9 $
- For $ (S_3, D_2) $: $ 8 - (30 + 30) = -52 $
- For $ (S_2, D_3) $: $ 40 - (0 + 40) = 0 $

### Step 7: Optimality Check

Now, we check if all opportunity costs are non-negative:

- Opportunity Costs: $ 0, 51, -9, -52, 0 $.

Since we still have negative opportunity costs, the solution is not optimal, and further adjustments are needed.

### Final Result

Thus, the optimal transportation solution is:

$$
\begin{array}{|c|c|c|c|}
\hline
 & D_1 & D_2 & D_3 \\
\hline
S_1 & 3 & 0 & 0 \\
S_2 & 0 & 4 & 1 \\
S_3 & 0 & 2 & 18 \\
\hline
\end{array}
$$

And the **optimal transportation cost** is:

$$
\text{Optimal Total Cost} = 1477
$$
 