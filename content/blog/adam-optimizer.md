---
title: "Adam — Adaptive Moment Estimation"
slug: "adam-optimizer"
date: "2024-12-01"
excerpt: "The optimizer that quietly powers most deep learning models. Combines momentum and per-parameter learning rates in one elegant update rule."
tags: ["Optimization", "Deep Learning"]
authors: ["Kingma & Ba"]
sourceTitle: "Adam: A Method for Stochastic Optimization (ICLR 2015)"
sourceUrl: "https://arxiv.org/abs/1412.6980"
---

## Why it matters

Plain SGD is finicky — pick the wrong learning rate and training either explodes or crawls. Adam combines **momentum** (smoothing gradients over time) with **per-parameter adaptive learning rates** (RMSProp-style), giving you a well-behaved optimizer that works out-of-the-box on a huge range of problems.

## Core idea

Keep running estimates of the first and second moments of the gradient (mean and uncentered variance). Use them to compute an adaptive step for each parameter, with bias correction so early training steps aren't artificially small.

## Why I care

Every CNN I trained — **Rice Leaf**, **Cotton Crop**, the **Fake News** classifier — used `tf.keras.optimizers.Adam`. It's the default for good reason: you can focus on model architecture and data, not on hand-tuning an optimizer schedule. Understanding *why* it just works is what makes the difference when a model stops converging and you need to debug the training loop.

## Read the paper

[arxiv.org/abs/1412.6980](https://arxiv.org/abs/1412.6980)
