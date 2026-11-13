# 🎯 Mission 06: Enterprise Resilience, Accessibility (`NFTS`), & Release Promotion (`RELM`)

## 📋 Scenario & Objective
With functional, end-to-end business process (`BPTS`), and CI quality gates (`QUAS`) operational across Missions 01–05, the FinServe engineering board now mandates two final production-readiness criteria before public launch:
1. **Non-Functional Compliance (`NFTS`):** Auditing the application to ensure WCAG accessibility compliance for all users.
2. **Release Management (`RELM`):** Configuring a multi-stage deployment pipeline that promotes verified builds from the QA quality gate to a Staging environment.

In this advanced capstone extension, you will integrate automated Axe-core accessibility scanning into your Playwright suite and extend your GitHub Actions workflow to execute a gated staging promotion.

## 🏆 SFIA Competency Alignment
* **Non-Functional Testing (`NFTS` – Level 3):** Designing and executing automated accessibility audits within delivery cycles.
* **Release and Deployment (`RELM` – Level 3):** Enforcing release readiness criteria and managing environment promotion gates.

---

## 🛠️ Step-by-Step Instructions

### Step 1: Switch to the `mission-06` Branch
Branch off from your completed `mission-05` work in your terminal:
```bash
git checkout mission-05
git checkout -b mission-06
