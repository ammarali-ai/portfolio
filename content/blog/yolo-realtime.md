---
title: "YOLO — You Only Look Once"
slug: "yolo-realtime"
date: "2024-10-08"
excerpt: "Reformulating object detection as a single regression problem made real-time detection practical. 45 FPS on a GPU, with one forward pass."
tags: ["Computer Vision", "Object Detection", "CNN"]
authors: ["Redmon, Divvala, Girshick, Farhadi"]
sourceTitle: "You Only Look Once: Unified, Real-Time Object Detection (CVPR 2016)"
sourceUrl: "https://arxiv.org/abs/1506.02640"
---

## Why it matters

Older detectors like R-CNN ran a classifier over hundreds of region proposals — accurate but slow. YOLO dropped the pipeline entirely: one CNN, one forward pass, bounding boxes + class probabilities straight out. That made object detection usable in real-time applications for the first time.

## Core idea

Divide the image into an S×S grid. Each cell predicts a fixed number of bounding boxes and class confidences. Train end-to-end with a single loss that balances localization, confidence, and classification.

## Why I care

My **Rice Leaf Disease** and **Cotton Crop Disease** classifiers answer *"what's in this image?"*. A YOLO-style detector would answer the harder, more deployable question: *"where on this leaf are the diseased spots, and which disease are they?"* — a natural next iteration that I'm exploring for field-deployed mobile apps.

## Read the paper

[arxiv.org/abs/1506.02640](https://arxiv.org/abs/1506.02640)
