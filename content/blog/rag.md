---
title: "RAG — Retrieval-Augmented Generation"
slug: "rag"
date: "2025-03-08"
excerpt: "Give an LLM access to a searchable knowledge base and it stops hallucinating facts. The architecture behind every 'chat with your docs' product."
tags: ["LLM", "Retrieval", "NLP"]
authors: ["Lewis et al."]
sourceTitle: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (NeurIPS 2020)"
sourceUrl: "https://arxiv.org/abs/2005.11401"
---

## Why it matters

LLMs are great at fluency but bad at facts — they confidently hallucinate anything not in their training data, and retraining them on fresh data costs millions. RAG sidesteps both problems: at query time, retrieve relevant passages from an external index, stuff them into the prompt, and let the model generate its answer conditioned on the retrieved evidence. Cheap, up-to-date, and auditable.

## Core idea

Two components, one loop. A **retriever** (dense embeddings + vector search) fetches the top-k most relevant chunks for the user's question. A **generator** (the LLM) reads the chunks alongside the query and writes the answer. Both can be trained end-to-end or used zero-shot with off-the-shelf components.

## Why I care

The **"Ask my CV"** chatbot on this very portfolio is a miniature RAG system — my CV is the knowledge base, the user's question is the query, and Gemini generates grounded answers that can't hallucinate facts not in my resume. Understanding the underlying paper helps me design better retrieval systems at Metaviz where accuracy matters more than eloquence.

## Read the paper

[arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401)
