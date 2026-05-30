--- 
title: "Kalman Filter" 
description: "Kalman Filter for tracking, prediction, and noisy sensor data understanding and intuition."
date: "2026-05-09"
tags: [tracking,estimation]
published: False
---


If you already understand Kalman Filters programmatically, especially from reading tracking implementations like SORT, the mechanics may already feel intuitive. Though it dont gives intuition why it works. The predict and update cycle becomes much easier to follow once you see how motion and uncertainty are represented mathematically.

This note is for building intuition behind *why* Kalman Filters work. You will finds many resources how to Implement it. 


Let suppose you have a point in a 2D space. It can move along x and y axis. So we can think it have some potion and velocity , do you think that 
  