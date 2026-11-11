const { test, expect } = require('@playwright/test');
const users = require('../test-data/users.json');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const LoanPage = require('../pages/LoanPage');

test.describe('FinServe Digital Lending Portal - Process Testing Suite (E2E Workflow)', () => {
    let loginPage;
    let dashboardPage;
    let loanPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        loanPage = new LoanPage(page);

        await loginPage.navigate();
        await loginPage.login(users.validCustomer.username, users.validCustomer.password);
        await dashboardPage.verifyDashboardLoaded();
    });

    test('TS-PROC-001 End-to-end complete loan application lifecycle workflow', async ({ page }) => {
        const standing = await dashboardPage.checkAccountStanding();
        expect(standing).toContain('Active');

        await dashboardPage.navigateToLoanApplication();
        await loanPage.submitLoanApplication(35000, ['id', 'income', 'address']);

        const successBanner = page.locator(loanPage.successBanner);
        await expect(successBanner).toBeVisible();
        await expect(successBanner).toContainText('Loan application submitted successfully');
    });
});
