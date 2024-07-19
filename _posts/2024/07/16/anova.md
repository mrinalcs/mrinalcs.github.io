---
title: Analysis of Variance (ANOVA)
description: anova
date: 2024-07-16
tags: [stat]
---

## One-Way Classified Data

### Fixed Effect Model:
- Assumes that the levels of the factor are the only levels of interest.
- The goal is to determine if there are significant differences between the group means.
- Model: 
$$ Y_{ij} = \mu + \alpha_i + \epsilon_{ij} $$
  - $ Y_{ij} $: Observation from group $ i $, replicate $ j $
  - $ \mu $: Overall mean
  - $ \alpha_i $: Effect of group $ i $ (fixed effect)
  - $ \epsilon_{ij} $: Random error

### Random Effect Model:
- Assumes that the levels of the factor are randomly selected from a larger population.
- The focus is on the variability among the group means.
- Model: 
$$ Y_{ij} = \mu + \alpha_i + \epsilon_{ij} $$
  - $ \alpha_i $: Random effect with $ \alpha_i \sim N(0, \sigma^2_\alpha) $

## Two-Way Classified Data (One Observation per Cell)

### Fixed Effect Model:
- Both factors have fixed levels.
- Model: 
$$ Y_{ijk} = \mu + \alpha_i + \beta_j + (\alpha\beta)_{ij} + \epsilon_{ijk} $$
  - $ \alpha_i $: Effect of factor A
  - $ \beta_j $: Effect of factor B
  - $ (\alpha\beta)_{ij} $: Interaction effect between A and B

### Random Effect Model:
- Both factors are random effects.
- Model: 
$$ Y_{ijk} = \mu + \alpha_i + \beta_j + (\alpha\beta)_{ij} + \epsilon_{ijk} $$
  - $ \alpha_i \sim N(0, \sigma^2_\alpha) $
  - $ \beta_j \sim N(0, \sigma^2_\beta) $

  - $(\alpha\beta)_{ij} \sim N(0, \sigma^2_{\alpha\beta})$

### Mixed Effect Model:
- One factor is fixed and the other is random.
- Model: 
$$ Y_{ijk} = \mu + \alpha_i + \beta_j + (\alpha\beta)_{ij} + \epsilon_{ijk} $$
  - $ \alpha_i $: Fixed effect
  - $ \beta_j \sim N(0, \sigma^2_\beta) $

## Two-Way Classified Data (m observations per cell)

### Fixed Effect Model:
- Both factors have fixed levels, and multiple observations per cell.
- Model: 
$$ Y_{ijkm} = \mu + \alpha_i + \beta_j + (\alpha\beta)_{ij} + \epsilon_{ijkm} $$

### Random Effect Model:
- Both factors are random effects, with multiple observations per cell.
- Model: 
$$ Y_{ijkm} = \mu + \alpha_i + \beta_j + (\alpha\beta)_{ij} + \epsilon_{ijkm} $$

### Mixed Effect Model:
- One factor is fixed and the other is random, with multiple observations per cell.
- Model: 

$$ Y_{ijkm} = \mu + \alpha_i + \beta_j + (\alpha\beta)_{ij} + \epsilon_{ijkm} $$
