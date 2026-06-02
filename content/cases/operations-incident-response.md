---
title_en: "SaaS Company Reduced Mean Time to Resolve Incidents by 63% With an AI Agent"
title_zh: "SaaS 公司借助 AI Agent 将平均故障解决时间缩短 63%"
summary_en: "An engineering team deployed an on-call agent that monitors alerts, correlates signals across services, pulls relevant runbooks, and drafts an incident summary in Slack — before the on-call engineer even opens their laptop."
summary_zh: "一个工程团队部署了值班 Agent，负责监控告警、关联各服务信号、调取相关运维手册，并在值班工程师打开电脑前就在 Slack 中生成故障摘要。"
comment_en: "The first 10 minutes of an incident are the most chaotic. Engineers are context-switching from sleep, gathering information, and trying to understand blast radius simultaneously. An agent that pre-populates all that context doesn't just save time — it reduces the cognitive load that causes mistakes."
comment_zh: "故障最初的 10 分钟最为混乱。工程师需要同时从睡眠中切换状态、收集信息、评估影响范围。预先整理好所有上下文的 Agent，不只是节省时间，更能减少导致失误的认知负荷。"
industry: "operations"
task: ["automation", "decision-support", "data-analysis"]
framework: "LangChain"
difficulty: "dev-required"
date: "2026-05-30T08:00:00Z"
source: "PagerDuty Blog"
source_url: "https://www.pagerduty.com/blog"
meta_title: "AI Incident Response Agent — 63% MTTR Reduction Case Study"
meta_description: "How a SaaS company used an AI agent to cut mean time to resolve from 47 minutes to 17 minutes by automating incident context gathering and runbook lookup."
---

## The Problem

A B2B SaaS company with 99.9% SLA commitments was handling 80–100 production incidents per month. Mean time to resolve (MTTR) was 47 minutes. On-call engineers spent the first 15–20 minutes of every incident just gathering context: reading logs, checking dashboards, finding the relevant runbook, and posting an initial status update. This was time not spent actually resolving the issue.

## The Agent Solution

They built an incident response agent integrated with PagerDuty, Datadog, and their Confluence runbooks. When an alert fires:

1. The agent queries Datadog for correlated anomalies in the 15 minutes before the alert
2. It identifies which services are affected based on dependency mapping
3. It searches Confluence for runbooks matching the alert type
4. It drafts an incident Slack thread with: alert summary, correlated signals, affected services, relevant runbook link, and suggested first diagnostic steps

All of this is ready in the Slack thread before the on-call engineer acknowledges the page.

## Results

- MTTR: 47 minutes → 17 minutes
- Time to first diagnostic action: 18 minutes → 3 minutes
- Incidents escalated to senior engineers: -41%
- On-call engineer satisfaction score: 2.8 → 4.2 out of 5
- Post-incident reports written by agent: 100% (was 40%)

## The Runbook Integration

The most valuable feature was runbook retrieval. Engineers previously couldn't find the right runbook under pressure. The agent's semantic search across 340 runbooks surfaces the right document 94% of the time. Engineers reported that having the runbook link in the initial thread changed their workflow fundamentally.

## Related Cases

- [E-Commerce Company Automates Supply Chain Exception Handling](/case/operations-supply-chain)
- [DevOps Team Automates Release Validation Pipeline](/case/operations-release-validation)
