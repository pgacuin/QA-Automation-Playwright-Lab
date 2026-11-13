const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('  FinServe QA Lab - Mission 04 UAT Sign-Off Validator');
console.log('====================================================\n');

let score = 0;
const totalPoints = 100;

console.log('🔍 Checking UAT acceptance criteria and test files...');
const requiredFiles = [
  'test-data/uat-criteria.json',
  'tests/uat-acceptance.spec.js'
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
  console.log('\n❌ UAT Setup Incomplete: Please create uat-criteria.json and uat-acceptance.spec.js.');
  process.exit(1);
}

score += 30;

console.log('\n🚀 Executing Playwright UAT Sign-Off Suite...');
try {
  execSync('npx playwright test tests/uat-acceptance.spec.js', { stdio: 'inherit' });
  score += 70;
} catch (error) {
  console.error('\n❌ UAT Verification Failed. Stakeholder acceptance criteria not met.');
}

console.log(`\n====================================================`);
console.log(`  FINAL MISSION 04 GRADE: ${score} / ${totalPoints}`);
console.log(`====================================================`);

if (score >= 80) {
  console.log('✅ All User Acceptance Testing criteria satisfied!');
  console.log('\n====================================================');
  console.log('  FINAL GRADE: 100 / 100 - MISSION 04 ACHIEVED!');
  console.log('====================================================');
  
  console.log('\n----------------------------------------------------');
  console.log(' 🏆 SFIA COMPETENCY & UAT ALIGNMENT');
  console.log('----------------------------------------------------');
  console.log('• User Acceptance Testing (UAT - Level 3):');
  console.log('  Validated FinServe business processes against formal stakeholder');
  console.log('  acceptance criteria and boundary thresholds.');
  console.log('----------------------------------------------------\n');

  process.exit(0);
} else {
  console.log('❌ MISSION NOT ACHIEVED: Please review failing acceptance criteria.');
  process.exit(1);
}
