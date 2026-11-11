const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('  FinServe QA Lab - Learner Submission Validator   ');
console.log('====================================================\n');

let score = 0;
const totalPoints = 100;
const testFiles = [
  'tests/login.spec.js',
  'tests/loan-application.spec.js',
  'tests/regression.spec.js'
];

// STEP 1: Check if TODO placeholders still exist
console.log('🔍 Checking code completion in test files...');
let missingCode = false;

testFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${file}`);
    missingCode = true;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const todoMatches = content.match(/\/\/\s*TODO/gi);
  if (todoMatches && todoMatches.length > 0) {
    console.warn(`⚠️  Uncompleted tasks in ${file}: ${todoMatches.length} TODO(s) remaining.`);
    missingCode = true;
  } else {
    console.log(`✅ ${file} contains completed test code.`);
  }
});

if (missingCode) {
  console.log('\n❌ Submission Incomplete: Please finish all TODO sections before running validation.');
  process.exit(1);
}

score += 30; // 30 points for code completion

// STEP 2: Execute Learner Playwright Test Suite
console.log('\n🚀 Executing Learner Playwright Suite...');
try {
  execSync('npx playwright test', { stdio: 'inherit' });
  score += 70; // 70 points for passing all test cases
} catch (error) {
  console.error('\n❌ Test Execution Failed. Playwright detected test failures or syntax errors.');
}

console.log(`\n====================================================`);
console.log(`  FINAL LEARNER GRADE: ${score} / ${totalPoints}`);
console.log(`====================================================`);

if (score >= 80) {
  console.log('✅ All Playwright assertion checks passed!');
  console.log('\n====================================================');
  console.log('  FINAL LEARNER GRADE: 100 / 100');
  console.log('====================================================');
  console.log('🎉 MISSION ACHIEVED: Submission Meets Quality Standards!');
  
  console.log('\n----------------------------------------------------');
  console.log(' 🏆 SFIA COMPETENCY & TESTING ALIGNMENT');
  console.log('----------------------------------------------------');
  console.log('• Functional Testing (TEST - Level 2/3):');
  console.log('  Validated specific business rules and functional requirements');
  console.log('  (such as FR-001 mandatory document validation and FR-002 loan');
  console.log('  eligibility limits) to ensure FinServe behaves correctly.');
  console.log('• Quality Assurance & Engineering (SWEN / DESN):');
  console.log('  Demonstrated professional discipline across automated test execution,');
  console.log('  script architecture, and quality lifecycle management.');
  console.log('----------------------------------------------------\n');

  process.exit(0);
} else {
  console.log('❌ MISSION NOT ACHIEVED: Please review failing test assertions.');
  process.exit(1);
}
