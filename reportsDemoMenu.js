const readLineSync = require("readline-sync");
const PirateShipAuth = require('../auth/PirateShipAuth.js');
const PirateShipReports = require('./PirateShipReports');
const psAuth = new PirateShipAuth();
const psReports = new PirateShipReports(psAuth.cookies, false);

async function showMenu() {
    console.log("\n\x1b[33m --- PirateShip Reports API - Demo Menu ---\n");
    console.log("   1.  \x1b[32mGet All Reports\x1b[33m");
    console.log("   2.  \x1b[32mGet Reports Sorted by Field\x1b[33m");
    console.log("   3.  \x1b[32mSearch Reports by Transaction Type\x1b[33m");
    console.log("   4.  \x1b[32mSearch Reports by Payment ID\x1b[33m");
    console.log("   5.  \x1b[32mSearch Reports by Report ID\x1b[33m");
    console.log("   6.  \x1b[32mSearch Reports by Shipment ID\x1b[33m");
    console.log("   7.  \x1b[32mSearch Reports by Reconciliation Run ID\x1b[33m");
    console.log("   8.  \x1b[32mSearch Reports by Batch ID\x1b[33m");
    console.log("   9.  \x1b[32mSearch Reports by Title\x1b[33m");
    console.log("  10.  \x1b[32mSearch Reports by Amount\x1b[33m");
    console.log("  11.  \x1b[32mSearch Reports by Balance\x1b[33m");
    console.log("  12.  \x1b[32mGet Reports by Time Period\x1b[33m");
    console.log("  13.  \x1b[32mGet Reports by Date Range\x1b[33m");
    console.log("  14.  \x1b[32mGet Reports on a Specific Date\x1b[33m");
    console.log("  15.  \x1b[32mGet Total Count\x1b[33m");
    console.log("  16.  \x1b[32mExit\x1b[33m");
    console.log("\n\x1b[33m - - - - - - - - - - - - - - - - - - - - - -\n");

    const choice = readLineSync.question("\x1b[33mEnter your choice below and press enter: \x1b[0m\n");

    switch (choice) {
        case "1":
            try {
                const reports = await psReports.getAllReports();
                console.log("Reports:", reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;

        case "2":
            try {
                const sortBy = readLineSync.question("Enter the field to sort by (\x1b[32mcreated_at\x1b[0m, \x1b[32mtransaction_type\x1b[0m, \x1b[32mpayment_id\x1b[0m, \x1b[32mshipment_id\x1b[0m, \x1b[32mreconciliation_run_id\x1b[0m, \x1b[32mbatch_id\x1b[0m, \x1b[32mtitle\x1b[0m, \x1b[32mamount\x1b[0m, \x1b[32mbalance\x1b[0m):");
                const order = readLineSync.question("Enter the sort order (asc or desc): ");
                const reports = await psReports.getReportsSorted(sortBy, order);
                console.log(`Sorted reports by ${sortBy} (${order}):`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "3":
            try {
                const transactionType = readLineSync.question("Enter the transaction type (All, Payment, Label, Refund, Carrier Adjustment): ");
                const reports = await psReports.searchByTransactionType(transactionType);
                console.log(`${transactionType} Reports:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "4":
            try {
                const paymentId = readLineSync.question("Enter the payment ID: ");
                const reports = await psReports.searchByPaymentId(paymentId);
                console.log(`Reports with payment ID ${paymentId}:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "5":
            try {
                const reportId = readLineSync.question("Enter the report ID: ");
                const reports = await psReports.searchById(reportId);
                console.log(`Reports with report ID ${reportId}:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "6":
            try {
                const shipmentId = readLineSync.question("Enter the shipment ID: ");
                const reports = await psReports.searchByShipmentId(shipmentId);
                console.log(`Reports with shipment ID ${shipmentId}:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "7":
            try {
                const reconciliationRunId = readLineSync.question("Enter the reconciliation run ID: ");
                const reports = await psReports.searchByReconciliationRunId(reconciliationRunId);
                console.log(`Reports with reconciliation run ID $ {reconciliationRunId}:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "8":
            try {
                const batchId = readLineSync.question("Enter the batch ID: ");
                const reports = await psReports.searchByBatchId(batchId);
                console.log(`Reports with batch ID $ {batchId}:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "9":
            try {
                const title = readLineSync.question("Enter the title: ");
                const reports = await psReports.searchByTitle(title);
                console.log(`Reports with title "${title}":`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "10":
            try {
                const amount = readLineSync.question("Enter the amount: ");
                const reports = await psReports.searchByAmount(amount);
                console.log(`Reports with amount "${amount}":`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "11":
            try {
                const balance = readLineSync.question("Enter the balance: ");
                const reports = await psReports.searchByBalance(balance);
                console.log(`Reports with balance "${balance}":`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "12":
            try {
                const days = readLineSync.question("Enter the number of days to go back in time: ");
                const reports = await psReports.getByTimePeriod(days);
                console.log(`Reports from the last ${days} days:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;

        case "13":
            try {
                const startDate = readLineSync.question("Enter the start date (YYYY-MM-DD): ");
                const endDate = readLineSync.question("Enter the end date (YYYY-MM-DD): ");
                const reports = await psReports.getByDateRange(startDate, endDate);
                console.log(`Reports between ${startDate} and ${endDate}:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;

        case "14":
            try {
                const date = readLineSync.question("Enter the date (YYYY-MM-DD): ");
                const reports = await psReports.getReportsOnDate(date);
                console.log(`Reports on ${date}:`, reports);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;

        case "15":
            try {
                const count = await psReports.getTotalCount();
                console.log(`Total count of reports:`, count);
            } catch (error) {
                console.error("Error:", error.message);
            }
            break;
        case "16":
            process.exit(0);
        default:
            console.error("Invalid choice!");
            break;
    }
    showMenu();
}
showMenu();