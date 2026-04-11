---
title: "Chain-of-Thought Prompting"
slug: "chain-of-thought"
date: "2025-02-20"
excerpt: "Asking an LLM to 'think step by step' doesn't just feel more intelligent — it measurably improves accuracy on math, logic, and reasoning benchmarks."
tags: ["LLM", "Prompting", "Reasoning"]
authors: ["Wei et al."]
sourceTitle: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (NeurIPS 2022)"
sourceUrl: "https://arxiv.org/abs/2201.11903"
---

## Why it matters

Wei and colleagues at Google showed that simply prepending a few worked examples with intermediate reasoning steps (rather than jumping straight to answers) dramatically boosted LLM performance on arithmetic, commonsense, and symbolic reasoning tasks. The improvement wasn't subtle — GSM8K math accuracy jumped from 18% to 57% on PaLM 540B.

## Core idea

Give the model examples of the *reasoning process*, not just input-output pairs. The model learns in-context that it should produce intermediate steps before the final answer, and the act of generating those steps seems to engage capabilities that a direct-answer prompt leaves dormant.

## Why I care

Every automation at **Metaviz** that uses Claude or Claude Code benefits from this. When I ask an agent to triage a CRM lead or decide which branch of an n8n workflow to take, I explicitly structure the prompt with "think about X first, then Y, then output a JSON decision" — and the reliability of the output goes up significantly. CoT is the single most useful prompt engineering primitive I apply daily.

## Read the paper

[arxiv.org/abs/2201.11903](https://arxiv.org/abs/2201.11903)
