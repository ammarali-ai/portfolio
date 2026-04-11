---
title: "Word2Vec — Efficient Word Representations"
slug: "word2vec"
date: "2024-11-02"
excerpt: "The paper that made 'king - man + woman ≈ queen' a real thing, and gave NLP its first widely-used dense embeddings."
tags: ["NLP", "Embeddings"]
authors: ["Mikolov et al."]
sourceTitle: "Efficient Estimation of Word Representations in Vector Space (ICLR 2013)"
sourceUrl: "https://arxiv.org/abs/1301.3781"
---

## Why it matters

Before 2013, NLP relied on sparse bag-of-words features — one dimension per vocabulary word, no sense of meaning between them. Word2Vec trained compact, dense vectors where semantically related words cluster together and analogies become arithmetic. It was the first embedding approach to really scale.

## Core idea

Two lightweight objectives: **Skip-gram** (predict surrounding words from a center word) and **CBOW** (predict a center word from its context). Trained on billions of tokens with negative sampling, you get 200–300 dimensional vectors that capture surprising amounts of linguistic structure.

## Why I care

My **Fake News Detection** pipeline compared multiple representations before settling on BERT. Word2Vec + classical ML (SVM, logistic regression) was one of the baselines — a fast, cheap way to get a signal on whether the task was learnable at all, and a good reminder that not every NLP problem needs a transformer.

## Read the paper

[arxiv.org/abs/1301.3781](https://arxiv.org/abs/1301.3781)
