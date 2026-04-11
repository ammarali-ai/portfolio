---
title: "ResNet — Deep Residual Learning"
slug: "resnet"
date: "2024-05-18"
excerpt: "Skip connections made it possible to train 150+ layer networks without the vanishing gradient problem, winning ImageNet 2015."
tags: ["Computer Vision", "CNN", "Deep Learning"]
authors: ["He et al."]
sourceTitle: "Deep Residual Learning for Image Recognition (CVPR 2016)"
sourceUrl: "https://arxiv.org/abs/1512.03385"
---

## Why it matters

Before ResNet, stacking more layers actually made CNNs *worse* — gradients vanished on the way back. He and colleagues at Microsoft introduced **residual connections** (`y = F(x) + x`), and suddenly 152-layer networks trained cleanly and won ImageNet.

## Core idea

Instead of asking a block of layers to learn a full mapping, ask it to learn a **residual** — the difference from the identity. Skip connections give the optimizer a highway so information (and gradients) can flow even when the block hasn't learned anything useful yet.

## Why I care

ResNet is the default transfer-learning backbone for medical and agricultural imaging. In my crop disease projects I evaluated transfer-learned ResNet variants as one of the baselines against my custom CNN — the comparison directly influenced which approach I shipped.

## Read the paper

[arxiv.org/abs/1512.03385](https://arxiv.org/abs/1512.03385)
