---
title: "BERT — Bidirectional Pre-training for Language Understanding"
slug: "bert-pretraining"
date: "2024-03-05"
excerpt: "How masked language modeling and next-sentence prediction unlocked transfer learning for NLP and powered a whole generation of classifiers."
tags: ["NLP", "Transfer Learning", "Transformers"]
authors: ["Devlin et al."]
sourceTitle: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding (NAACL 2019)"
sourceUrl: "https://arxiv.org/abs/1810.04805"
---

## Why it matters

BERT showed that a single pre-trained encoder could be fine-tuned on almost any NLP task — classification, QA, NER — with only a task-specific head on top. That moved NLP from "train a new model per task" to "fine-tune a foundation model", the pattern that still dominates today.

## Core idea — bidirectional MLM

Instead of left-to-right language modeling, BERT randomly masks tokens and asks the model to predict them from context **on both sides** at once. Pair that with next-sentence prediction and you get representations that understand grammar, coreference, and semantic relations.

## Why I care

My **Fake News Detection** pipeline uses multilingual BERT as the encoder and a linear classifier on top. Understanding *why* BERT works — and why its contextual embeddings beat traditional bag-of-words — was what pushed my accuracy from ~80% with SVM to 90% with the hybrid approach.

## Read the paper

[arxiv.org/abs/1810.04805](https://arxiv.org/abs/1810.04805)
