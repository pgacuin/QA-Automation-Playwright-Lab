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
        // SOLUTION CODE FOR TODO:
        await page.fill('#requested-amount', '20000');
        await page.check('#doc-id'); // Only select Government ID, leave income and address unselected
        await page.click('#submit-loan-btn');

        const errorBanner = page.locator('#error-banner');
        await expect(errorBanner).toBeVisible();
        await expect(errorBanner).toContainText('Missing mandatory supporting document(s)');
    });

    // FR-002: Loan Eligibility Limit Validation
    test('TS-FR002-001 Prevent submission when requested amount exceeds eligibility limit', async ({ page }) => {
        // SOLUTION CODE FOR TODO:
        // User limit is 50,000; request 60,000 (exceeds limit)
        await page.fill('#requested-amount', '60000');
        await page.check('#doc-id');
        await page.check('#doc-income');
        await page.check('#doc-address');
        await page.click('#submit-loan-btn');

        const errorBanner = page.locator('#error-banner');
        await expect(errorBanner).toBeVisible();
        await expect(errorBanner).toContainText('exceeds approved eligibility limit');
    });

});
