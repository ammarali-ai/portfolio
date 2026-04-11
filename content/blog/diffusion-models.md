---
title: "Denoising Diffusion Probabilistic Models"
slug: "diffusion-models"
date: "2025-01-12"
excerpt: "The paper behind Stable Diffusion, DALL·E 2, and Midjourney. Turn noise into images by learning to reverse a gradual corruption process."
tags: ["Generative AI", "Computer Vision"]
authors: ["Ho, Jain, Abbeel"]
sourceTitle: "Denoising Diffusion Probabilistic Models (NeurIPS 2020)"
sourceUrl: "https://arxiv.org/abs/2006.11239"
---

## Why it matters

Before diffusion, image generation was dominated by GANs — powerful but hard to train and prone to mode collapse. DDPM introduced a simple alternative: corrupt real images with noise step by step, then train a neural network to reverse that process. The result is stable training, state-of-the-art sample quality, and the architecture behind nearly every modern text-to-image model.

## Core idea

Forward process: add a tiny bit of Gaussian noise T times (T ≈ 1000) until an image becomes pure noise. Reverse process: a U-Net learns to predict the noise added at each step, letting you denoise all the way back to a sample from the data distribution. Simple MSE loss, no adversarial tricks.

## Why I care

My computer vision work (rice leaf and cotton crop classifiers) uses discriminative CNNs to **recognize** images. Diffusion is the generative counterpart — and a natural next step for data augmentation on small agricultural datasets, where synthetic diseased-leaf images could materially boost model robustness.

## Read the paper

[arxiv.org/abs/2006.11239](https://arxiv.org/abs/2006.11239)
