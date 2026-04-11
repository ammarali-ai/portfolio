---
title: "LoRA — Low-Rank Adaptation of Large Language Models"
slug: "lora-fine-tuning"
date: "2025-02-05"
excerpt: "Fine-tune a 175B-parameter model by training just 0.01% of the weights. The technique that made personal LLM fine-tuning practical."
tags: ["LLM", "Fine-tuning", "Efficient"]
authors: ["Hu et al."]
sourceTitle: "LoRA: Low-Rank Adaptation of Large Language Models (ICLR 2022)"
sourceUrl: "https://arxiv.org/abs/2106.09685"
---

## Why it matters

Full fine-tuning of a modern LLM needs tens of gigabytes of GPU memory and produces a full-size copy of the model per task — completely impractical for most developers. LoRA freezes the original weights and trains a tiny pair of low-rank matrices alongside each attention layer. You get 99% of the quality with 0.01% of the parameters and trainable weights small enough to share over email.

## Core idea

Inject rank-r update matrices (A and B) into specific weight matrices. During training, only A and B update; the base model stays frozen. At inference, you can merge them back in for zero added latency, or keep them separate and swap adapters for different tasks.

## Why I care

At **Metaviz** I build automation flows that use LLMs as reasoning engines. LoRA is the practical path to a fine-tuned model specialized on company-specific workflows — far cheaper than retraining from scratch, and fully compatible with the open models we deploy.

## Read the paper

[arxiv.org/abs/2106.09685](https://arxiv.org/abs/2106.09685)
