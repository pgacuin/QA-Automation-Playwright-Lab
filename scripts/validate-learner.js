const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('  FinServe QA Lab - Mission 05 Pipeline Capstone Validator');
console.log('====================================================\n');

let score = 0;
const totalPoints = 100;

console.log('🔍 Checking CI/CD pipeline configuration and full curriculum files...');
const requiredFiles = [
  '.github/workflows/qa-pipeline.yml',
  'tests/uat-acceptance.spec.js',
  'tests/process-workflow.spec.js',
  'pages/DashboardPage.js',
  'test-data/uat-criteria.json'
];

let missingFiles = false;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${file}`);
    missingFiles = true;
  } else {
    console.log(`✅ Found required file: ${file}`);
  }
});

if (missingFiles) {
  console.log('\n❌ Capstone Incomplete: Missing required pipeline or test files.');
  process.exit(1);
}

const workflowContent = fs.readFileSync(
  path.join(__dirname, '..', '.github/workflows/qa-pipeline.yml'),
  'utf8'
);
if (workflowContent.includes('TODO FOR LEARNER')) {
  console.error('❌ Incomplete workflow: Please replace all TODO FOR LEARNER placeholders in qa-pipeline.yml.');
  process.exit(1);
}

score += 30;

console.log('\n🚀 Executing Full Playwright Regression & UAT Suite...');
try {
  execSync('npx playwright test', { stdio: 'inherit' });
  score += 70;
} catch (error) {
  console.error('\n❌ Test Execution Failed. Playwright detected regressions.');
}

console.log(`\n====================================================`);
console.log(`  FINAL GRADE: ${score} / ${totalPoints}`);
console.log(`====================================================`);

if (score >= 80) {
  console.log('\n====================================================');
  console.log('  FINAL GRADE: 100 / 100 - CURRICULUM CAPSTONE ACHIEVED!');
  console.log('====================================================');
  
  console.log('\n====================================================');
  console.log(' 🚀 FinServe QA Automation Engineer — Portfolio Showcase');
  console.log('====================================================');
  console.log('Credential Earned: Junior-to-Mid QA Automation Engineer (SFIA Level 2–3)');
  console.log('Core Stack: JavaScript | Playwright | POM | GitHub Actions CI/CD');
  console.log('');
  console.log('✔ TEST (Functional Testing - Level 2/3):');
  console.log('  Engineered robust UI browser automation & regression suites.');
  console.log('✔ BPTS (Business Process Testing - Level 2/3):');
  console.log('  Validated E2E financial workflows & UAT stakeholder rules.');
  console.log('✔ QUAS (Quality Assurance - Level 3):');
  console.log('  Configured automated CI/CD release quality gates.');
  console.log('====================================================\n');

  process.exit(0);
} else {
  console.log('❌ MISSION NOT ACHIEVED: Please review failing pipeline test assertions.');
  process.exit(1);
}
