const { test, expect } = require('@playwright/test');
const users = require('../test-data/users.json');

test.describe('FinServe Digital Lending Portal - Requirement Validation Suite', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login.html');
        await page.fill('#username', users.validCustomer.username);
        await page.fill('#password', users.validCustomer.password);
        await page.click('#login-button');
        await page.click('#apply-loan-btn');
    });

    // FR-001: Mandatory Document Validation
    test('TS-FR001-001 Prevent submission when mandatory documents are missing', async ({ page }) => {
        // TODO FOR LEARNER: 
        // 1. Fill '#requested-amount' with '20000'
        // 2. Check ONLY '#doc-id' (leave income and address unselected)
        // 3. Click '#submit-loan-btn'
        // 4. Assert that '#error-banner' is visible and contains 'Missing mandatory supporting document(s)'
    });

    // FR-002: Loan Eligibility Limit Validation
    test('TS-FR002-001 Prevent submission when requested amount exceeds eligibility limit', async ({ page }) => {
        // TODO FOR LEARNER:
        // 1. Fill '#requested-amount' with '60000' (exceeds 50,000 limit)
        // 2. Check all three mandatory documents
        // 3. Click '#submit-loan-btn'
        // 4. Assert that '#error-banner' contains 'exceeds approved eligibility limit'
    });
});
