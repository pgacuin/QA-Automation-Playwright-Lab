const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.welcomeHeading = '#welcome-heading';
        this.accountStatus = '#account-status';
        this.applyLoanBtn = '#apply-loan-btn';
        this.applicationHistoryLink = '#application-history-link';
    }

    async verifyDashboardLoaded() {
        await this.waitForElement(this.welcomeHeading);
    }

    async navigateToLoanApplication() {
        await this.page.click(this.applyLoanBtn);
    }

    async checkAccountStanding() {
        const status = await this.page.locator(this.accountStatus).textContent();
        return status;
    }
}

module.exports = DashboardPage;
