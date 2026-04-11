---
title: "Office Taskboard + Discord Automation"
slug: "office-taskboard"
summary: "Internal task-board that auto-DMs assignees on Discord with full status, comment, and escalation flows."
tags: ["Automation", "Personal Project"]
tech: ["n8n", "Webhooks", "Discord API", "JavaScript", "Data Tables"]
github: "https://github.com/ammarali-ai"
demo: ""
featured: true
order: 1
cover: "/images/projects/office-taskboard.png"
---

## Overview

A personal automation project that integrates an internal task board with Discord so teams can collaborate without context-switching between tools. When a manager assigns a task, the system instantly delivers a direct message to the assignee on Discord and keeps the entire team informed as the task moves forward.

## Features

- **Auto DM to assignees** — every new task triggers an immediate Discord DM to the right person.
- **Status update notifications** — progress changes are pushed to the team channel automatically.
- **Comment alerts** — comments on tasks notify all relevant participants.
- **Team-wide updates** — broadcast announcements when major milestones are hit.
- **Issue escalation system** — when an assignee flags a blocker, the task creator and manager are notified in real-time.

## Tech Stack

- **n8n** — workflow automation engine driving the entire pipeline
- **Webhooks** — receive task events from the board
- **Discord API** — send DMs and channel messages
- **JavaScript** — custom logic nodes inside n8n
- **Data Tables** — persist task assignments and metadata

## Outcome

Removed the need for manual status updates, reduced response time on blockers, and gave the team a single source of truth that lives where they already chat.
