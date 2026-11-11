const { test, expect } = require('@playwright/test');
const users = require('../test-data/users.json');

test.describe('FinServe Digital Lending Portal - Full Regression Suite', () => {

    // FR-003: Duplicate Active Application Prevention
    test('TS-FR003-001 Prevent duplicate active application for same loan product', async ({ page }) => {
        // Log in as customer who already has an active Personal Loan
        await page.goto('/login.html');
        await page.fill('#username', users.customerWithActiveApp.username);
        await page.fill('#password', users.customerWithActiveApp.password);
        await page.click('#login-button');

        await page.click('#apply-loan-btn');
        await page.selectOption('#loan-product', 'Personal Loan');
        await page.fill('#requested-amount', '10000');
        await page.check('#doc-id');
        await page.check('#doc-income');
        await page.check('#doc-address');
        await page.click('#submit-loan-btn');

        const errorBanner = page.locator('#error-banner');
        await expect(errorBanner).toBeVisible();
        await expect(errorBanner).toContainText('You already have an active application for Personal Loan');
    });

    test('TS-FR003-002 Allow application for a different loan product even if another product is active', async ({ page }) => {
        await page.goto('/login.html');
        await page.fill('#username', users.customerWithActiveApp.username);
        await page.fill('#password', users.customerWithActiveApp.password);
        await page.click('#login-button');

        await page.click('#apply-loan-btn');
        await page.selectOption('#loan-product', 'Auto Loan'); // Different product
        await page.fill('#requested-amount', '10000');
        await page.check('#doc-id');
        await page.check('#doc-income');
        await page.check('#doc-address');
        await page.click('#submit-loan-btn');

        const successBanner = page.locator('#success-banner');
        await expect(successBanner).toBeVisible();
        await expect(successBanner).toContainText('Application Submitted Successfully');
    });

});
