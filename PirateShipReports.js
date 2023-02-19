/**
 * @file PirateShipReports.js
 * @author Waleed Judah
 * @desc This file exports a JavaScript class named `PirateShipReports` that provides an interface for retrieving and searching a list of reports from the Pirate Ship API.
 * @usage To use this class, create an instance and pass in the necessary cookies for making API requests. The class has several methods for searching the reports and retrieving information about them.
 * @cookie {
    "domain": "ship.pirateship.com",
    "expirationDate": 1676695947.30,
    "hostOnly": true,
    "httpOnly": true,
    "name": "pirate_id_########",
    }
 */
class PirateShipReports {
    constructor(cookies, cache = true) {
        this.cookies = cookies;
        this.cache = cache;
        this.reportsList = null;
    }
    async getAllReports() {
        const filteredReports = await this._getReports(() => true);
        return filteredReports;
    }
    async searchByTransactionType(transactionType) {
        return this._getReports(element => element.transaction_type.toLowerCase() === transactionType.toLowerCase());
    }
    async searchByPaymentId(paymentId) {
        return this._getReports(element => element.payment_id.toString().toLowerCase().includes(paymentId.toString().toLowerCase()));
    }
    async searchByReportId(reportId) {
        return this._getReports(element => element.id.toString().toLowerCase().includes(reportId.toString().toLowerCase()));
    }
    async searchByShipmentId(shipmentId) {
        return this._getReports(element => element.shipment_id.toString().toLowerCase().includes(shipmentId.toString().toLowerCase()));
    }
    async searchByReconciliationRunId(reconciliationRunId) {
        return this._getReports(element => element.reconciliation_run_id.toString().toLowerCase().includes(reconciliationRunId.toString().toLowerCase()));
    }
    async searchByBatchId(batchId) {
        return this._getReports(element => element.batch_id.toString().toLowerCase().includes(batchId.toString().toLowerCase()));
    }
    async searchByTitle(title) {
        return this._getReports(element => element.title.toLowerCase().includes(title.toLowerCase()));
    }
    async searchByAmount(amount) {
        return this._getReports(element => element.amount.toString().toLowerCase().includes(amount.toString().toLowerCase()));
    }
    async searchByBalance(balance) {
        return this._getReports(element => element.balance.toString().toLowerCase().includes(balance.toString().toLowerCase()));
    }
    async getReportsOnDate(date) {
        return this._getReports(element => {
            const createdAt = new Date(element.created_at);
            return createdAt.toISOString().substring(0, 10) === date;
        });
    }
    async getByTimePeriod(days) {
        const today = new Date();
        const timePeriod = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
        return this._getReports(element => new Date(element.created_at) >= timePeriod);
    }
    async getByDateRange(startDate, endDate) {
        return this._getReports(element => {
            const createdAt = new Date(element.created_at);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return createdAt >= start && createdAt <= end;
        });
    }
    async getReportsSorted(sortBy, order = 'asc') {
        const filteredReports = await this._getReports(() => true);
        const sortedReports = filteredReports.sort((a, b) => {
            if (order === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return b[sortBy] > a[sortBy] ? 1 : -1;
            }
        });
        return sortedReports;
    }
    async getTotalCount() {
        const filteredReports = await this._getReports(() => true);
        return filteredReports.length;
    }
    async _getReports(filterFunction) {
        if (!this.cookies) {
            return [{
                'Error': 'cookies are not set'
            }]
        }
        if (!this.cache || !this.reportsList) {
            try {
                this.reportsList = await this._getReportsList();
            } catch (error) {
                return [{
                    'Error': 'unable to retrieve reports'
                }]
            }
        }
        try {
            return this.reportsList.data.filter(filterFunction);
        } catch (error) {
            return [{
                'Error': 'unable to filter'
            }]
        }
    }
    async _getReportsList() {
        if (!this.reportsList) {
            const url = "https://ship.pirateship.com/reports/index/list";
            const data = "s=&take=100000&skip=0&page=1&pageSize=100000";
            try {
                const response = await fetch(url, {
                    headers: {
                        "accept": "application/json, text/javascript, */*; q=0.01",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-requested-with": "XMLHttpRequest",
                        "Cookie": this.cookies,
                    },
                    referrer: "https://ship.pirateship.com/reports",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: data,
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                });
                if (response.ok) {
                    this.reportsList = await response.json();
                } else {
                    throw new Error(`Error getting reports list: ${response.statusText}`);
                }
            } catch (error) {
                throw new Error(`Error getting reports list: ${error.message}`);
            }
        }
        return this.reportsList;
    }
}
module.exports = PirateShipReports;