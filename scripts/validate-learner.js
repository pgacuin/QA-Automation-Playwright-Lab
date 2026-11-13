const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('  FinServe QA Lab - Mission 06 Enterprise Validator');
console.log('====================================================\n');

let score = 0;
const totalPoints = 100;

const a11yPath = path.join(__dirname, '..', 'tests', 'accessibility.spec.js');
const workflowPath = path.join(__dirname, '..', '.github', 'workflows', 'qa-pipeline.yml');

if (!fs.existsSync(a11yPath) || !fs.existsSync(workflowPath)) {
  console.error('❌ Missing required files: tests/accessibility.spec.js or qa-pipeline.yml');
  process.exit(1);
}

const a11yContent = fs.readFileSync(a11yPath, 'utf8');
const workflowContent = fs.readFileSync(workflowPath, 'utf8');

if (a11yContent.includes('TODO FOR LEARNER') || !a11yContent.includes('AxeBuilder')) {
  console.error('❌ Incomplete Accessibility Suite: Complete all TODOs in tests/accessibility.spec.js.');
  process.exit(1);
}
console.log('✅ Verified Axe-core Accessibility Suite (NFTS)');
score += 20;

if (!workflowContent.includes('promote-to-staging') || !workflowContent.includes('needs: qa-pipeline')) {
  console.error('❌ Incomplete Release Gate: Add promote-to-staging job with "needs: qa-pipeline" in qa-pipeline.yml.');
  process.exit(1);
}
console.log('✅ Verified Staging Release Promotion Gate (RELM)');
score += 20;

console.log('\n🚀 Executing Full Regression, UAT & Accessibility Suites...');
try {
  execSync('npx playwright test', { stdio: 'inherit' });
  score += 60;
} catch (error) {
  console.error('\n❌ Test Execution Failed. Review failing Playwright or Axe-core assertions.');
}

console.log(`\n====================================================`);
console.log(`  FINAL GRADE: ${score} / ${totalPoints}`);
console.log(`====================================================`);

if (score === 100) {
  console.log('\n====================================================');
  console.log(' 🏆 MASTER ENTERPRISE QA ACCOMPLISHMENT ACHIEVED!');
  console.log('====================================================');
  console.log('Credential: Senior-Ready QA Automation Engineer (SFIA Level 3)');
  console.log('Verified Competencies: TEST | BPTS | QUAS | NFTS | RELM');
  console.log('====================================================\n');
  process.exit(0);
} else {
  process.exit(1);
}
