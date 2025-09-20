Request Flowchat: 


In lieu of listing out every possible request, above is a framework that I hope will help guide how you fulfill all the varying ad-hoc requests that are sure to come your way. There are some overarching themes I hope you will consider. 

There is almost always a solution to a request, if not always a perfect one
80% of the way with the right data is a whole lot better than a perfect response with the wrong data
Do not let people rush you, our mistakes typically have large ramifications
Anything that goes external reflects on the company
People will ask for things they don’t really need, and forget about those requests - separating those out will save you a lot of time
Ask JA/Lenell (email especially) for help if you are unsure about who/what is allowed to do what with what data
More Specific Request Considerations 

Being asked for “All Numbers” somewhere - 
If political and for a TAG client (following the entity rules in the Voterfile/Audiences section), go ahead and use the voter file
If non-political:
Try our master P2P list (this will be all the lists currently in production for P2P that are not external vendor lists) 
Try Quorum (less helpful for anything that’s not Public Affairs/Influencers)
Flag for Paul to ask JA - “Data Partner” for non-political means L2/i360

Being asked for “All our donors”
Is this a client team? Use cloud (and maybe Anedot) Winred
Is this SIEGE? Use HDM Winred (excluding the clients that run through HDM WR accounts - IE Paxton etc.. - tag-stg-db.winred_hdm.data)
Is this JA? Use everything

Being asked to “Spin up a new report”
Flag for Woodham – 
Point folks to our existing reports
Ask folks for a list of specific analytics they’re trying to see
And then point them to the reports showing those analytics
Ask folks to sketch out exactly what they want to see (on paper, preferably)
And then point them to the reports already doing that
In the rare case that they want something novel/genuinely a good idea
Timeline, timeline, timeline - give yourself much more time than you need
Try to link the report to datasets unlikely to change this cycle (WR/Google Ads/etc..)
Determine if folks need a full dashboard, an email alert, a slack alert, a csv somewhere
People use “Report” as a shorthand to refer to a problem they’re having - fix the problem, no report needed

Very specific, contextually driven billing/client metrics “Subsequent recurring we charged so and so three months ago given our change in rates” - “Net new donors from LGN that converted 2 or more times on the HF & also total raised from those donors & how many have since unsubscribed”
These are tricky requests, key thing is to break them into component pieces, find the relevant data. Nothing we’ve been asked for at this point is new, and there is code for everything somewhere in slack
For the first billing request:
Subsequent -> “non-initial” donations
Recurring -> recurring
“We charged” -> some clients we might not charge recurring on so the whole request becomes moot
“Three months ago” -> timeframe of where to look
“Given our change in rates” -> maybe check out the rate ledger (tag-stg-db.logs.ledger_hdm_base_rates) -> confirm there was a change in rates
Things to consider/remember: Billing will use the billing table (tag-pro-db.billing.mv_wr_data_internal) - in plain english this request is probably just asking how a change in client rates impacted the amount we billed a client on recurring
Join the rates table to the billing table and filter to the desired date range, client, transaction type, and medium associated with the rate. The fun thing here is that the code to do this is in the P2P table (tag-pro-db.p2p.vwP2POverViewListByDate)

For the client-side request:
“net-New donors” -> done this a thousand times, determine first time email showed up as a donor
“From LGN” -> our comparison point is emails from a LGN campaign (tag-stg-db.winred_leads.data)
“Converted 2x + on HF” -> I would probably ask for clarification if the requestor wanted text/email or both, but otherwise fairly understandable
“Total raised from these donors” -> This usually means regardless of if the email was a net new addition, how much have these emails raised for the client
“How many have since unsubscribed” -> tag-stg-db.housefile.master tracks subscriptions from multiple channels and dates them (email/text/universal) - typically we’ll use whatever channel the signup medium was on (and always add the universal) to link unsubscribes
Putting it all together -> Answering question 1: 
CTE of email + first donation
CTE of emails from the LGN campaign + first signup
CTE of 2x+ HF conversions with earliest date attached to each email
CTE with HF (iterable master) of client
Join those three CTEs on email + date (first dono > LGN date & earliest of the two HF conversions > LGN date) and left join out folks that have a HF added date < signup date from the LGN CTE
Answering question 2 (total raised)
CTE of all LGN campaign emails + first signup
Join to WR on email + date and sum all non-refunded transactions on days after the earliest LGN signup
Answering question 3 (unsubscribes)
Take the list of emails from answering question #1 and join it to the list of unsubscribes from the HF CTE (max) coalesce all three modes on email + unsub date > LGN signup date


—- Checking on HD donations coming through HOMEPAGE to help determine ownership — 


select
a.FirstName
, a.lastName
, a.email
, a.page_name
, b.city
, a.state
, b.zip
, b.phoneNumber
, a.etl_amount
, date(a.datetime_est) DonationDate
, b.occupation
, b.employer
, a.Medium billingMedium
, b.Medium reportMedium
from `tag-pro-db.wr.cloud_data` b
join `tag-pro-db.billing.mv_wr_data_internal` a on a.revv_user_id = b.revv_user_id and a.etl_amount = b.etl_amount
where a.client = 'Hern for Congress (OK-01)'
and date(a.datetime_est) >= '2025-02-01'
and date(b.datetime_est) >= '2025-02-01'
and a.etl_amount >= 500
and b.event like ('%created%')
and (a.medium = 'HOMEPAGE' or b.medium = 'HOMEPAGE')

