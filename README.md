# 🏦 FinServe Enterprise QA Automation Lab

Welcome to the FinServe QA Automation Curriculum. Across five missions, you will evolve from basic functional scripting to enterprise CI/CD pipeline automation.

## 🗺️ Mission Roadmap
- **Mission 01 (`mission-01`):** Functional Testing & Core Assertions
- **Mission 02 (`mission-02`):** Page Object Model (POM) Architecture
- **Mission 03 (`mission-03`):** End-to-End Process Workflow Testing
- **Mission 04 (`mission-04`):** User Acceptance Testing (UAT) & Boundary Rules
- **Mission 05 (`mission-05`):** **CI/CD Pipeline & Quality Gate Capstone** (You will configure GitHub Actions to automatically run and gate your test suites on every push!)

## 🚀 General Workflow Rules for All Missions
1. **Switch branches:** Always check out the correct mission branch (`git checkout mission-0X`).
2. **Start your local server:** Keep the application running during local test execution:
   ```bash
   npx http-server banking-app -p 3000 &
