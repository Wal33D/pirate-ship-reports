
# PirateShip Reports API 
		A JavaScript class that provides an interface for retrieving and searching a list of reports from the Pirate Ship API.
		To use this class, create an instance and pass in the necessary cookies for making API requests. The class has several methods for searching the reports and retrieving information about them.

## Available Public Functions
		getAllReports: returns all the reports.
		searchByTransactionType: returns the reports that match the specified transaction type.
		searchByPaymentId: returns the reports that match the specified payment ID.
		searchByReportId: returns the reports that match the specified report ID.
		searchByShipmentId: returns the reports that match the specified shipment ID.
		searchByReconciliationRunId: returns the reports that match the specified reconciliation run ID.
		searchByBatchId: returns the reports that match the specified batch ID.
		searchByTitle: returns the reports that match the specified title.
		searchByAmount: returns the reports that match the specified amount.
		searchByBalance: returns the reports that match the specified balance.
		getReportsOnDate: returns the reports that were created on the specified date.
		getByTimePeriod: returns the reports that were created within the specified time period (in days).
		getByDateRange: returns the reports that were created within the specified date range.
		getReportsSorted: returns the reports sorted by the specified field and in the specified order.
		getTotalCount: returns the total number of reports.

## Installation 

Copy code 

```npm install pirateship-reports```

## Usage 

```javascript 
// For now you can copy your cookies after login from the pirate ship website using chrome dev tools, Seems just 1 cookie in the header for auth. 

const PirateShipReports = require('pirateship-reports'); 
const psReports = new PirateShipReports(cookies, false); 

	cookies variable = JSON.parse([{ 
			"domain": "ship.pirateship.com", 
			"expirationDate": 1676695947.306691, 
			"hostOnly": true, 
			"httpOnly": true, 
			"name": "pirate_id_f#######", 
			"path": "/", 
			"sameSite": "lax", 
			"secure": true, 
			"session": false, 
			"storeId": "0", 
			"value": "d17c8b78e2f2a3b1c8dc7123d5e8c5f9af31abe217d1f8b16085a7a1517a7c25a8d0ddedc5f8ddeab737257874d2123dae8f11dc81c9dfb31e6b676a85b78116" 
}]) 

```

### Get All Reports 

```javascript 
  const reports = await psReports.getAllReports(); 
  console.log("Reports:", reports); 

Output:
 Reports: [ { 
  		id: '605648772', 
  		payment_id: '0', 
  		shipment_id: '322252063', 
  		reconciliation_run_id: '0', 
 		batch_id: '246471883', 
  		created_at: '2023-02-13 15:58:07', 
 		transaction_type: 'Label', 
 		title: 'Jason S: 1 Label Batch', 
  		amount: '-8.08', 
  		balance: '0.00', 
 		href: 'https://ship.pirateship.com/ship/batch?id=246471883' 
}, ... ] 
```

### Get Reports Sorted by Field 

```javascript 
  const sortBy = "created_at"; //can be any field of the reports json element
  const order = "asc"; //default if left blank

  const reports = await psReports.getReportsSorted(sortBy, order); 
  console.log(`Sorted reports by ${sortBy} (${order}):`, reports); 


Output: Sorted reports by created_at (asc): [ { 
  		id: '605647327', 
  		payment_id: '169723812', 
  		shipment_id: '0', 
  		reconciliation_run_id: '0', 
 		batch_id: '246471367', 
        created_at: '2023-02-13 15:56:52', 
        transaction_type: 'Payment', 
  		title: 'Credit Card Payment: American Express ending in XXXX', 
  		amount: '8.08', 
  		balance: '0.00', 
  		href: 'https://ship.pirateship.com/reports/receipt?id=169723812' 
}, { 
 		id: '605647610', 
 		payment_id: '0', 
  		shipment_id: '322251484', 
  		reconciliation_run_id: '0', 
 		batch_id: '246471367', 
 		created_at: '2023-02-13 15:57:09', 
  		transaction_type: 'Refund', 
  		title: 'Jason S: Refund for 1Z2E4A110311087033 to Jason S', 
 		amount: '8.08', 
  		balance: '8.08', 
 		href: 'https://ship.pirateship.com/ship/shipment?id=322251484' 
}, ... ] 
```