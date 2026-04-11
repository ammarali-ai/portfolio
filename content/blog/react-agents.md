---
title: "ReAct — Reasoning + Acting for LLM Agents"
slug: "react-agents"
date: "2024-08-22"
excerpt: "The paper that showed LLMs could interleave chain-of-thought with tool calls, laying the groundwork for every modern AI agent framework including Claude Code and n8n AI nodes."
tags: ["LLM", "Agents", "Automation"]
authors: ["Yao et al."]
sourceTitle: "ReAct: Synergizing Reasoning and Acting in Language Models (ICLR 2023)"
sourceUrl: "https://arxiv.org/abs/2210.03629"
---

## Why it matters

Before ReAct, LLMs either *thought* (chain-of-thought) or *acted* (tool use), but not both in the same loop. ReAct introduced a simple prompt pattern — **Thought → Action → Observation → Thought** — that let models plan, call tools, observe results, and replan. Every agent framework I've used at Metaviz is a variation on this idea.

## Core idea

Interleave natural-language reasoning steps with discrete actions (search, API call, code execution). The reasoning keeps the agent on track; the actions give it grounded information that pure CoT can't produce.

## Why I care

At **Metaviz** I build automation workflows with **n8n**, **Claude Code**, and **Go High Level** that are effectively ReAct agents with a visual editor. Understanding the paper helps me design workflows where the LLM's reasoning trace is auditable and the tools are well-scoped — the difference between an agent that ships and one that hallucinates its way into prod.

## Read the paper

[arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)
