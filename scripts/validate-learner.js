const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('  FinServe QA Lab - Mission 07 Master Capstone Grader');
console.log('====================================================\n');

let score = 0;
const totalPoints = 100;

const perfPath = path.join(__dirname, '..', 'tests', 'performance-sla.spec.js');
const adrPath = path.join(__dirname, '..', 'ARCHITECTURE-DECISIONS.md');
const a11yPath = path.join(__dirname, '..', 'tests', 'accessibility.spec.js');
const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'qa-pipeline.yml');

if (!fs.existsSync(perfPath) || !fs.existsSync(adrPath) || !fs.existsSync(a11yPath) || !fs.existsSync(workflowPath)) {
  console.error('❌ Missing required files across Missions 05–07.');
  process.exit(1);
}

const perfContent = fs.readFileSync(perfPath, 'utf8');
const adrContent = fs.readFileSync(adrPath, 'utf8');

if (perfContent.includes('TODO FOR LEARNER') || !perfContent.includes('Promise.all') || !perfContent.includes('toBeLessThan')) {
  console.error('❌ Incomplete Performance Spec: Complete all TODOs and concurrent load assertions in tests/performance-sla.spec.js.');
  process.exit(1);
}
console.log('✅ Verified Concurrent Performance & SLA Suite (PRTS)');
score += 20;

if (adrContent.includes('TODO FOR LEARNER') || adrContent.trim().length < 220) {
  console.error('❌ Incomplete Architecture Record: Complete all TODO sections in ARCHITECTURE-DECISIONS.md.');
  process.exit(1);
}
console.log('✅ Verified Architectural Decision Record (METL)');
score += 20;

console.log('\n🚀 Executing Complete Enterprise Suite (Functional, UAT, A11y & Performance)...');
try {
  execSync('npx playwright test', { stdio: 'inherit' });
  score += 60;
} catch (error) {
  console.error('\n❌ Test Execution Failed. Review failing Playwright, Axe-core, or SLA latency assertions.');
}

console.log(`\n====================================================`);
console.log(`  FINAL GRADE: ${score} / ${totalPoints}`);
console.log(`====================================================`);

if (score === 100) {
  console.log('\n====================================================');
  console.log(' 🏆 FULL-STACK ENTERPRISE QA CAPSTONE ACHIEVED!');
  console.log('====================================================');
  console.log('Credential Earned: Enterprise QA & Release Engineer (SFIA Level 3)');
  console.log('Core Stack: JavaScript | Playwright | POM | Axe-Core | GitHub Actions');
  console.log('');
  console.log('✔ TEST (Functional Testing): UI regression & POM architecture');
  console.log('✔ BPTS (Business Process Testing): E2E workflows & UAT validation');
  console.log('✔ QUAS (Quality Assurance): Automated CI/CD quality gates');
  console.log('✔ NFTS (Non-Functional Testing): Automated WCAG accessibility audits');
  console.log('✔ PRTS (Performance Testing): Concurrent load & SLA benchmarking');
  console.log('✔ RELM (Release Management): Gated Staging deployment promotion');
  console.log('✔ METL (Methods & Tools): Architectural trade-off documentation');
  console.log('====================================================\n');
  process.exit(0);
} else {
  process.exit(1);
}
