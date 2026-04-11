---
title: "AlexNet — The Paper That Started the Deep Learning Boom"
slug: "imagenet-cnn"
date: "2024-04-12"
excerpt: "The 2012 ImageNet-winning CNN that halved the error rate overnight and put GPU-trained deep nets on the map."
tags: ["Computer Vision", "CNN", "Deep Learning"]
authors: ["Krizhevsky, Sutskever, Hinton"]
sourceTitle: "ImageNet Classification with Deep Convolutional Neural Networks (NeurIPS 2012)"
sourceUrl: "https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html"
---

## Why it matters

AlexNet dropped the ImageNet top-5 error from 26% to 15% — an unheard-of jump at the time. It proved that **depth + GPUs + ReLU + dropout** was the recipe for image recognition, and every CNN architecture I've used since (VGG, ResNet, EfficientNet) is a descendant.

## Core ideas

- **ReLU activations** trained several times faster than tanh
- **Dropout** as a regularizer to prevent overfitting on limited data
- **GPU training** across two GTX 580s — this is what made the depth practical
- **Data augmentation** with random crops and flips

## Why I care

My **Rice Leaf Disease Detection** (92% accuracy) and **Cotton Crop Disease Detection** (89%) projects both use CNN architectures that trace directly back to AlexNet's playbook. Every time I write `ReLU` or reach for dropout, I'm standing on this paper.

## Read the paper

[NeurIPS 2012 proceedings](https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html)
