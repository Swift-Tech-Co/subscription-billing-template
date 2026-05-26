# Contributing

Thank you for your interest in contributing. This repository is part of the Swift Tech Co. open source network covering FinTech platforms, AI automation, algorithmic trading systems, SaaS infrastructure, DevOps tooling, and more.

Contributions in any language, framework, or format that improve accuracy, functionality, documentation, or real-world usefulness are welcome.

---

## Languages and Technologies We Work In

This repo network covers the full stack of technologies we use across our projects:

**Systems and Performance**
- C / C++ — low-latency execution engines, HFT infrastructure, system programming
- Rust — high-performance financial systems, memory-safe infrastructure, WebAssembly
- Go — cloud infrastructure, microservices, API gateways, DevOps tooling

**Backend and Data**
- Python — AI/ML pipelines, data science, quant research, scripting, backtesting engines
- Java — enterprise software, Android development, Spring Boot APIs
- Node.js / TypeScript — REST and GraphQL APIs, real-time WebSocket services, backend SaaS
- SQL (PostgreSQL, MySQL, SQLite) — database schema, query optimisation, migrations
- MQL4 / MQL5 — MetaTrader Expert Advisors, custom indicators, trading scripts

**Frontend and Mobile**
- JavaScript / TypeScript — React, Vue, Next.js, Svelte, browser tooling
- Swift — iOS app development, native Apple platform apps
- Kotlin / Java — Android app development, cross-platform mobile
- C# — Windows applications, Unity, .NET enterprise systems
- HTML / CSS — standalone tools, GitHub Pages demos, documentation UIs

**Infrastructure and Cloud**
- Bash / Shell — deployment scripts, automation, CI/CD pipelines
- PowerShell — Windows automation, DevOps tooling
- Dockerfile / Docker Compose — containerisation, local dev environments
- Kubernetes (YAML/Helm) — production orchestration, manifests, Helm charts
- Terraform / Pulumi — infrastructure as code, cloud provisioning
- Nginx / Caddy — reverse proxy configs, production server setup

**Blockchain and Crypto**
- Solidity — EVM smart contracts, DeFi protocols, token standards
- Rust (Solana/Near) — high-performance on-chain programs
- TypeScript (Ethers.js / Web3.js) — DeFi frontends, wallet integrations, on-chain tooling

**AI and Data Science**
- Python (PyTorch, TensorFlow, LangChain, Hugging Face) — model training, inference, RAG pipelines
- Jupyter Notebooks — research, data analysis, quant strategy prototyping
- R — statistical analysis, quantitative research, financial modelling

---

## Ways to Contribute

**Code**
- Bug fixes and correctness improvements
- New features or additional calculation logic
- Performance improvements
- Language ports (e.g. rewriting a Python script in Go for production performance)
- Additional integrations or API support

**Data and Research**
- Updated fee rates, benchmark figures, or regulatory data with sources
- New datasets or expanded coverage for existing datasets
- Verified corrections to existing data with citations

**Documentation**
- Improve explanations, usage examples, or architecture notes
- Add diagrams or visual explanations of complex logic
- Translate documentation to other languages

**Tests**
- Unit tests for calculation logic
- Integration tests for API behaviour
- Edge case coverage for financial formulas

**DevOps and Infrastructure**
- CI/CD pipeline improvements
- Docker or Kubernetes config improvements
- Security hardening

---

## Getting Started

1. Fork this repository
2. Clone your fork locally
3. Create a branch: `git checkout -b feature/your-improvement`
4. Make your changes
5. Test locally before submitting
6. Open a pull request with a clear description of what changed and why

---

## Code Style Guidelines

Follow the conventions of the language in use:

- **Python** — PEP 8, type hints on public functions, docstrings for modules and classes
- **TypeScript / JavaScript** — ESLint + Prettier, explicit types, no `any` unless unavoidable
- **Go** — `gofmt`, idiomatic Go, exported functions documented
- **Rust** — `cargo fmt`, `cargo clippy` clean, no `unwrap()` in production paths
- **SQL** — lowercase keywords, explicit column lists (no `SELECT *`), indexed foreign keys
- **Solidity** — NatSpec comments, reentrancy guards, follow Checks-Effects-Interactions pattern
- **Shell / Bash** — `set -euo pipefail`, quote variables, avoid subshell where possible

No em dashes or en dashes in user-visible text. Use "to" for ranges and commas or colons instead of dashes in flowing copy.

---

## Reporting Issues

Open a GitHub Issue with:
- What you expected to happen
- What actually happened
- Language, runtime version, and operating system
- Steps to reproduce
- Relevant error output or logs

---

## Data Sources

When updating rates, costs, benchmarks, or regulatory data, include your source in the PR description. Acceptable sources:

- Official platform or provider documentation
- Regulatory body publications
- Industry analyst reports (Gartner, IDC, Forrester, McKinsey)
- Peer-reviewed academic research
- Verified government publications

---

## Security Vulnerabilities

Do not open a public issue for security vulnerabilities. Email **swifttechcocanada@gmail.com** directly with:

- A description of the vulnerability
- Steps to reproduce
- Potential impact

We will respond within 48 hours.

---

**Built and maintained by [Swift Tech Co.](https://swifttechco.com)**

FinTech Platforms | Quantitative Finance | Blockchain and DeFi | Custom Software and Mobile Apps | SaaS Platforms | AI Automation | Cloud Infrastructure | Cybersecurity | SEO and Marketing | API Integration

[Services](https://swifttechco.com/services) | [About](https://swifttechco.com/about) | [Partnerships](https://swifttechco.com/partnerships) | [Blog](https://swifttechco.com/blog) | [Contact](https://swifttechco.com/contact)
