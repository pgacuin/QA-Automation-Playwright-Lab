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
        await page.fill('#requested-amount', '20000');
        // Only select Government ID, leave income and address unselected
        await page.check('#doc-id');
        await page.click('#submit-loan-btn');

        const errorBanner = page.locator('#error-banner');
        await expect(errorBanner).toBeVisible();
        await expect(errorBanner).toContainText('Missing mandatory supporting document(s)');
    });

    test('TS-FR001-002 Successful submission when all mandatory documents are attached', async ({ page }) => {
        await page.fill('#requested-amount', '20000');
        await page.check('#doc-id');
        await page.check('#doc-income');
        await page.check('#doc-address');
        await page.click('#submit-loan-btn');

        const successBanner = page.locator('#success-banner');
        await expect(successBanner).toBeVisible();
        await expect(successBanner).toContainText('Application Submitted Successfully');
    });

    // FR-002: Loan Eligibility Limit Validation
    test('TS-FR002-001 Prevent submission when requested amount exceeds eligibility limit', async ({ page }) => {
        // User limit is 50,000; request 60,000
        await page.fill('#requested-amount', '60000');
        await page.check('#doc-id');
        await page.check('#doc-income');
        await page.check('#doc-address');
        await page.click('#submit-loan-btn');

        const errorBanner = page.locator('#error-banner');
        await expect(errorBanner).toBeVisible();
        await expect(errorBanner).toContainText('exceeds approved eligibility limit');
    });

    test('TS-FR002-002 Allow submission when requested amount is exactly at eligibility limit', async ({ page }) => {
        // User limit is 50,000; request exactly 50,000 (Boundary condition)
        await page.fill('#requested-amount', '50000');
        await page.check('#doc-id');
        await page.check('#doc-income');
        await page.check('#doc-address');
        await page.click('#submit-loan-btn');

        const successBanner = page.locator('#success-banner');
        await expect(successBanner).toBeVisible();
        await expect(successBanner).toContainText('Application Submitted Successfully');
    });

});
