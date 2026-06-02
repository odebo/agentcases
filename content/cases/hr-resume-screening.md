---
title_en: "HR Team Screens 10,000 Resumes in 2 Hours With an AI Agent"
title_zh: "HR 团队用 AI Agent 在 2 小时内筛选 1 万份简历"
summary_en: "A tech company receiving 10,000+ applications per role used a Claude-based agent to score resumes against job requirements, reducing time-to-shortlist from 3 weeks to 2 hours."
summary_zh: "一家每个岗位收到 1 万份以上简历的科技公司，使用 Claude Agent 对简历进行评分匹配，将入围名单确定时间从 3 周压缩至 2 小时。"
comment_en: "The real unlock isn't speed — it's consistency. Human screeners are inconsistent across 10,000 resumes (fatigue, bias, different interpretations of requirements). The agent applies the same rubric to resume #9,847 as it does to resume #1."
comment_zh: "真正的突破不是速度，而是一致性。人工筛选 1 万份简历难免出现疲劳、偏见和标准漂移。Agent 对第 9847 份简历的评分标准和第 1 份完全一致。"
industry: "hr"
task: ["automation", "decision-support"]
framework: "Claude"
difficulty: "low-code"
date: "2026-05-25T09:00:00Z"
source: "Greenhouse Blog"
source_url: "https://www.greenhouse.io/blog"
meta_title: "AI Resume Screening Agent — 10,000 Resumes in 2 Hours"
meta_description: "How a tech company used Claude to screen 10,000 resumes against job requirements, cutting time-to-shortlist from 3 weeks to 2 hours."
---

## The Problem

A fast-growing tech company posted a senior engineer role and received 10,847 applications in 72 hours. Their two-person recruiting team would typically spend 3 weeks doing first-pass screening — by which point top candidates had already accepted other offers.

## The Agent Solution

They built a screening agent using Claude that takes each resume as input alongside a structured job rubric (required skills, preferred experience, deal-breakers). The agent outputs a score from 1–10, a one-paragraph rationale, and a "proceed/skip/maybe" recommendation. The whole batch ran overnight.

## Results

- Time to shortlist: 3 weeks → 2 hours
- Resumes reviewed: 10,847
- Shortlist quality: hiring managers rated shortlisted candidates as "strong fit" 78% of the time, up from 61% with manual screening
- False negative rate (good candidates missed): estimated at under 5% based on audit

## The Rubric Design

The rubric was the hardest part. They spent a full day with the hiring manager converting vague requirements ("strong communicator") into measurable signals ("has given a conference talk, written a technical blog post, or managed cross-functional projects"). Garbage rubric = garbage shortlist.

## Bias Mitigation

The agent was explicitly instructed to ignore name, graduation year (a proxy for age), and university prestige. They ran an A/B audit comparing AI-screened shortlists to manually screened ones — the AI shortlist had 23% more diverse candidates by gender and educational background.

## Can You Do This Without Code?

Yes. Lever, Ashby, and Greenhouse all offer AI screening natively. For a DIY approach, a simple Claude or GPT-4 prompt with your rubric and resume text works immediately — no infrastructure needed for under 500 applications.

## Related Cases

- [AI Agent Automates Employee Onboarding](/case/hr-onboarding-automation)
- [HR Chatbot Answers Policy Questions](/case/hr-policy-chatbot)
