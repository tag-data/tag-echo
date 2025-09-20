Core Responsibilities: 
Sync with Kelley at start of month - we are responsible for (in order):
Checking that all external Revs/P2Ps have a governing rate associated with them
This query will let you do that, just change the dates in the WHERE clause. Basically you’re just checking that every external agency that raised us money for the month has a rate applied to it. If they don’t or the 
rate is wrong, update the rate either in the rate ledger or use the tool to add a new rate. 
Once you run this query, confirm with Austin/Paul the rates and pay special attention to any NULLs (potentially missing rates)
For clients that are not on a P2P billpay model, this is not an issue and you can ignore a missing rate. There are a few clients that have transitioned between models during the month, and so might look on their face like they’re missing rates but simply have transactions not covered by a bill-pay (what we care about)
Checking and adding/removing TAG Conduit entities - this is to ensure TAG CONDUIT dollars are correctly categorized when pulled through for billing
In master client billing, go to the “TagConduit” tab
In column J there is a query pasted that checks for any new conduit sources (while removing sources that have already been labeled as TAG Conduit or Not)
First, update the query to: 
Include the intended date range
Fully includes the entire list of sources from column F
Running that query should produce a very small list of entities that have conduited money and are not classified 
For TAG clients that we should be taking credit for, such as “Florida Firebrand PAC”, we just need to do two things:
Add the Source Name, and a “1” to columns A/B
Add the Source Name, and a “1” to columns F/G
Drag the string building formula in column H (This is what you will use in future runs to continue to scrub out accounted for entities
For sources that are NOT TAG clients:
Add the Source Name, and a “0” to columns F/G
Drag the string building formula in column H (This is what you will use in future runs to continue to scrub out accounted for entities
We are also responsible for pulling WinRed vendor earned amounts for all WR entities with bill pay (HDM1, HDM2, ATeam1, ATeam2, TAG, CMG). I download CSVs from each vendor account for the 1st through the 1st, combine the data manually, and give kelley/amanda a pivot table of the combined table for the clients they care about. The pivot table looks like this: 
Starting next month, 4/26 (unless you want to do a backfill for the rest of march, the data only goes back to 3/5/25) you’ll be able to use the view Keith has built (tag-stg-db.winred_hickory_s3.unified_billing). The query you can use is here. The uncommented code will pull aggregates while the commented code checks at the page level with more in-depth client logic. The commented code runs daily in th #billingflags channel (n8n process here) to try and catch if client teams forget to add bill-pay to a page. 
Once you’ve done steps (a) and (b), you can run this query -> change the dates at the top. This will pull the aggregate commission, revshare, conduit totals for all clients in Master Client billing between the specified date range.
Some clients will ask for itemized donor records - LINK to have we have done it for older clients

Once all this data has been pulled - time to make sure everything has flowed to some of the reporting sheets we care about. Almost everything is currently set up to run automatically, however there will likely be some mid-term/long-term improvements expected so good to know the pieces and how they all connect. 
Master Client Billing remains our core sheet - many billing issues come from Client names not aligning/rates being wrong/etc… Easy to fix
TAG_Billing_2025 is Amanda/Kelley primary workbook. Our responsibility here is to make sure they name subsequent monthly billing tabs in the format (YYYY-MM). Additionally, Banks_Raised/Banks_Sens/Banks_>500 are set to automatically populate for the weekly Banks net calculations. A few flags here: 
Banks_Sends is tied to Snowflake data, so when/if that pipeline closes, that query will need to be updated to reflect the new data source
The itemized cost data in the YYYY-MM tabs is used to power a number of things, and will likely be part of a long term cost solution, so good to keep eyes on how it’s laid out.
TAG | MasterCostRaised tracks Billable Raised vs. costs - which is used to generate the ROI #’s Woodham drops into each client channel.
DimBillingRange -> This dynamically pulls the list of tabs from TAG_Billing_2025 to generate month/month costs
CleanMasterCopy -> unformatted Master
BillableRaiseImport -> automated pull for TAG raise #’s. 
BillingImport -> This pulls in the itemized cost data from TAG_Billing
BillableExport -> Creates the readable version of BillableRaiseImport for use in Master
Master -> where everything comes together
Billing Tab dropdown changes the list of clients, raised, cost values imported by the other tabs
Net/ROI are calculated from there
The blank cells should populate as new data is added/removed
Trended -> this is a tab that Kelley/Amanda use to track numbers over time

Notes: CSA and Kennedy costs are not added to the itemized tracker, and as a result are not pulled through on the variety of different processes that utilize cost data. These clients are calculated independently by Hylton so don’t worry if cost data is missing. 

Other billing items that might come up are: 
Getting counts + client of Briteverify cleaning (Keith/Lenell know how to do this)
Pulling domain hosting costs from GoDaddy (Lenell is doing)
Might be asked to confirm P2P sends - you can pull aggregates from `tag-pro-db.p2p.vwstatistics_report`
