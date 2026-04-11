---
title: "Attention Is All You Need — The Transformer"
slug: "attention-is-all-you-need"
date: "2024-02-10"
excerpt: "The 2017 paper that replaced recurrence with self-attention and became the foundation of every modern LLM including BERT, GPT, and Gemini."
tags: ["Deep Learning", "NLP", "Transformers"]
authors: ["Vaswani et al."]
sourceTitle: "Attention Is All You Need (NeurIPS 2017)"
sourceUrl: "https://arxiv.org/abs/1706.03762"
---

## Why it matters

Before 2017, sequence modeling in NLP meant RNNs and LSTMs — step-by-step processing that didn't parallelize well on GPUs. Vaswani and colleagues at Google Brain introduced the **Transformer**, an architecture built entirely on self-attention and feed-forward layers. It trained faster, scaled better, and outperformed everything that came before on translation benchmarks.

## Core idea — self-attention

Every token in a sentence computes **queries, keys, and values**, and attends to every other token in parallel. This captures long-range dependencies (e.g. subject-verb agreement across a 40-word sentence) in one operation.

## Why I care

I used BERT — a direct descendant of this paper — for my **Fake News Detection** project, where its multilingual understanding gave me 90% accuracy on adversarial headlines. Knowing how self-attention actually works turned BERT from a black-box API call into a tool I could reason about and tune.

## Read the paper

[arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
