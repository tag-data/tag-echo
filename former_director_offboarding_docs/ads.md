Core Responsibilities: 
Landon handles most of this already, but there are a suite of Advertising reports that we use: 
Persuasion Ad Reports
FEC Tracker
LeadGen (Old)
LeadGen (New)
Big pieces to keep track of for Ads are the ETL processes:
Google -> Native to our stack 
TradeDesk -> Loaded from datareporting@tagstrategies.co email every morning
When we get new TRD clients you will need to update the report (currently the AdReport v4) -> and currently running
In platform, click the top report (“Locust Street Group, …” and edit it

Click the “+Advertiser” and add the new client

“SAVE AS” in bottom right as the next iteration “AdsR`eportv5”
Repeat processes ii and iii but instead of hitting SAVE AS, just hit RUN
Once the first report runs, go into the datareporting email and delete the file (we don’t want the process to scoop up duplicate files)
Confirm the following morning that the new report is running and the old process is turned off
Facebook/Meta -> Keith is the expert here, key items are ensuring he is able to log into Kelley’s FB (the account we use that’s connected to Meta API)
We have jobs that call the FB API for TAG clients and dump the data into tables
Twitter -> Twitter is terrible and has inconsistent data processing. We have struggled to keep up with their export process for public reporting. Currently, Landon reports the bare bone data given to him by Wes who places the ads in-platform. Hoping for an API solution in the future 
