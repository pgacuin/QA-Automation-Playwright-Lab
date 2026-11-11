const { test, expect } = require('@playwright/test');
const users = require('../test-data/users.json');

test.describe('FinServe Portal - Authentication Tests', () => {

    test('TC-001 Verify successful customer login', async ({ page }) => {
        await page.goto('/login.html');
        await page.fill('#username', users.validCustomer.username);
        await page.fill('#password', users.validCustomer.password);
        await page.click('#login-button');

        await expect(page.locator('#dashboard')).toBeVisible();
        await expect(page.locator('#user-display')).toHaveText(users.validCustomer.username);
    });

    test('TC-002 Verify invalid password failure', async ({ page }) => {
        await page.goto('/login.html');
        await page.fill('#username', users.validCustomer.username);
        await page.fill('#password', 'WrongPassword999');
        await page.click('#login-button');

        const errorMsg = page.locator('#error-message');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toHaveText('Invalid username or password.');
    });

});
