const { test, expect } = require('@playwright/test');
const users = require('../test-data/users.json');

test.describe('FinServe Portal - Dashboard Verification', () => {

    test('TC-003 Verify eligibility limit display on dashboard', async ({ page }) => {
        await page.goto('/login.html');
        await page.fill('#username', users.validCustomer.username);
        await page.fill('#password', users.validCustomer.password);
        await page.click('#login-button');

        await expect(page.locator('#eligibility-limit')).toHaveText('50,000');
    });

});
