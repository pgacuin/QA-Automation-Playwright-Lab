const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('  FinServe QA Lab - Mission 03 Process Testing Validator');
console.log('====================================================\n');

let score = 0;
const totalPoints = 100;

console.log('🔍 Checking Process Testing architecture and E2E workflow files...');
const requiredFiles = [
  'pages/DashboardPage.js',
  'tests/process-workflow.spec.js'
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
  console.log('\n❌ Architecture Incomplete: Please create DashboardPage.js and process-workflow.spec.js.');
  process.exit(1);
}

score += 30;

console.log('\n🚀 Executing Playwright E2E Process Test Suite...');
try {
  execSync('npx playwright test tests/process-workflow.spec.js', { stdio: 'inherit' });
  score += 70;
} catch (error) {
  console.error('\n❌ Test Execution Failed. Playwright detected process workflow failures.');
}

console.log(`\n====================================================`);
console.log(`  FINAL MISSION 03 GRADE: ${score} / ${totalPoints}`);
console.log(`====================================================`);

if (score >= 80) {
  console.log('✅ All Process Testing assertion checks passed!');
  console.log('\n====================================================');
  console.log('  FINAL GRADE: 100 / 100 - MISSION 03 ACHIEVED!');
  console.log('====================================================');

  console.log('\n----------------------------------------------------');
  console.log(' 🏆 SFIA COMPETENCY & PROCESS TESTING ALIGNMENT');
  console.log('----------------------------------------------------');
  console.log('• Process Testing (PROT - Level 3): Assessed multi-step workflow flows against business needs.');
  console.log('• Software Engineering & Testing (SWEN / TEST): Validated end-to-end transactional lifecycle states.');
  console.log('----------------------------------------------------\n');

  process.exit(0);
} else {
  console.log('❌ MISSION NOT ACHIEVED: Please review failing workflow assertions.');
  process.exit(1);
}
