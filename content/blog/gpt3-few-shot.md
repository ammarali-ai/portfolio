---
title: "GPT-3 — Language Models are Few-Shot Learners"
slug: "gpt3-few-shot"
date: "2024-09-14"
excerpt: "The paper that showed scaling alone turns a language model into a few-shot learner — no fine-tuning required. Prompt engineering as we know it started here."
tags: ["LLM", "NLP", "Prompting"]
authors: ["Brown et al."]
sourceTitle: "Language Models are Few-Shot Learners (NeurIPS 2020)"
sourceUrl: "https://arxiv.org/abs/2005.14165"
---

## Why it matters

Before GPT-3, adapting a language model to a new task meant collecting thousands of labeled examples and fine-tuning. Brown and colleagues at OpenAI trained a 175B-parameter model and showed it could do new tasks from just a few examples in the prompt — the now-familiar "few-shot" pattern. That single result reshaped how practitioners think about building NLP systems.

## Core idea — in-context learning

Instead of updating weights, you give the model a task description plus a handful of input/output pairs in the prompt, and it picks up the pattern at inference time. Scale is what makes this work: the capability emerges sharply around the 10B+ parameter range.

## Why I care

At **Metaviz** I build automation workflows with **Claude** and **Claude Code**. Everything I do with them — zero-shot classification, intent routing inside n8n, drafting replies — is in-context learning in production. Knowing the original result helps me write prompts that actually leverage what the model is good at, instead of fighting it.

## Read the paper

[arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165)
