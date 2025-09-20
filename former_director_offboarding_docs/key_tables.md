Database Tables 
Live/In-Production:
tag-pro-db.wr.cloud_data
Production WR view
tag-pro-db.wr.data_anedot
Production Anedot view
tag-stg-db.GoogleAds_NonDep.XXXX
These are the tables that hold all of our Google Ads data 
Tag-stg-db.anedot.data
Raw JSON from Anedot webhooks
Tag-stg-db.facebook_ads
Facebook data currently used for reporting - fed using FB API calls
Tag-stg-db.fec_api
Holds all of our FEC independent expenditure data
Tag-stg-db.grassroots_gcs
Holds grassroots data pulled from their s3
Tag-stg-db.housefile.master
Version of all TAG client email HF + unsubscribe dates/channel (this is updated in the morning with yesterday’s signups/unsub data
Tag-stg-db.housefile_size
Tracks the aggregate sizes of select lists in each client iterable (list is built from this sheet, and updated when client is onboarded)
Tag-stg-db.logs.p2p_audiences__by_sending_utc_ts
Tracks outbound p2p audiences loaded to grassroots from Retool
Tag-stg-db.logs.p2p_campaign_created_log_v3 / tag-stg-db.logs.view__p2p_campaign_created_log
Metadata on all outgoing p2p campaigns
Tag-stg-db.logs.p2p_campaign_expanded_log
Metadata on all outgoing p2p expansions
Tag-stg-db.logs.ledger_hdm_base_rates
Rate tracker for all prospecting
Tag-stg-db.logs.twilio_log_prod
Twillio outbound/inbound data (used in billing to track inbound sends)
Tag-stg-db.logs.view__iterable_finished_campaign_metadata_prod
Iterable campaign aggregate data that powers SIEGE/Client email performance tables
Tag-stg-db.logs.view__link_builder_4_get_rows
Linkbuilder records
Tag-stg-db.major_donor.pledged_paid_log
Initial major donor CRM tool table
tag-stg-db.n8n.iterableEmailSend_full
Aggregated snowflake data for every campaign/project 
tag-stg-db.n8n.iterableSMSSend
Aggregated snowflake data for every campaign/project
Tag-stg-db.p2p_external_lists
To track management of external partner p2p data - has everyone except Newsmax suppressions (which are in client_data)
Tag-stg-db.public_affairs
Database for public affairs data - primary tables are dim/fact audience
Tag-stg-db.retention_append.data
Email data from retention (TAG owns this but we do not include it on prospecting and just keep it internal)
Tag-stg-db.timetrack.master_v2
Time tracking data that feed billing google sheets / where Woodham/Messina pull 
Tag-stg-db.tradedesk.gmail_reports
Live tradedesk data that feeds reporting
Tag-stg-db.twilio.cloud_message
Live twillion data that feeds billing
Tag-stg-db.winred_cloud.donations / tag-stg-db.winred_cloud.vwDonations_Parsed
Production WR JSON data from webhook
Tag-stg-db.winred_cloud.leads
Production WR leads JSON data from webhook
Tag-stg-db.winred_cloud.winred_recat / tag-stg-db.winred_cloud.winred_recat_indv
All recategorizations from Retool app for WR
Tag-stg-db.winred_hdm.data
Combination of all external HDM data from A-team 1, A-team 2, HDM 1, HDM 2, Targeted Victory
tag-stg-db.winred_hickory_s3.unified_billing
Unified view of all billpay logs
Tag-stg-db.winred_scrapper.tbl_mastertable_20230324
Current historical WR FEC data
tag-stg-db.winred_scrapper.tbl_mastertable_ActBlue
Historical Act Blue FEC data (goes back to 2020 cycle)
Tag-dev-db.briteverify.master
Briteverify data - where new records are uploaded against the master
tag-dev-db.p2p_lists.AutomatedBuild_Suppression
Where P2P tables are written when built (this is an old habit and can probably be changed)
tag-dev-db.p2p_lists.StaticReenagement
The p2p “tax” table - where unknown quality data can be loaded to slowly be tested
tag-dev-db.p2p.tblMasterList_v2
TAG owned P2P usable data (upserted every morning) - includes JA external sourced data (with notation) - please update with caution and care
tag-pro-db.advertising.Quorum_2024_q4
Most recent iteration of Quorum data (updating to q1 2025 sometime in late march)
Tag-pro-db.advertising.dim_campaign
Dim table where Ads team submits campaign data
tag-pro-db.advertising.vwLeadGenOverview
Lead gen dash underlying view
tag-pro-db.billing.P2PRatesV4
P2P rates from master client billing (slowly being phased out in favor of rate ledger)
tag-pro-db.billing.tbl_P2PRates
Daily update P2P budgets (slowly being phased out as we migrate to rate ledger)
tag-pro-db.billing.P2P_SplitJob_Static
Where P2P split jobs are tracked
tag-pro-db.billing.Snowflake_ProjectEmailAggregates
Trimmed email aggregates for billing
tag-pro-db.billing.Snowflake_ProjectSMSAggregates
Trimmed sms aggregates for billing
Tag-pro-db.billing.client_list25_26
Client list from master client billing
Tag-pro-db.billing.mv_wr_data_internal
Core billing table
tag-pro-db.billing.tbl_TAG_Conduit_Dim_Static
TAG conduit viable WR sources (updated monthly as part of billing process)
tag-pro-db.client_reports.vwLeadGenRollup
LGN report view
tag-pro-db.client_reports.vwMaster
Internal dash report view
tag-pro-db.models.dim_model/fact_model
P2P models logged -> this directly feeds all P2P processes
tag-pro-db.models.externalVF_modeling
TAG purchased VF data (skinny versions for modeling)
Tag-pro-db.models.model_performance_v1
View that connects models to job performance
tag-pro-db.p2p.p2p_WR
Clean WR aggregates for P2P reporting
tag-pro-db.p2p.vwP2POverViewListByDate
P2P dashboard query - I apologize for the complexity
Tag-pro-db.p2p.vwstatistics_report
Partitioned grassroots aggregate statistics data
Tag-pro-db.p2p.master_suppression
P2P master suppression (not fully complete but contains bulk DJT requests)
tag-pro-db.p2p.dim_platform_rates/fact_platform_rates
New tables that track daily changes in sending rate, if Grassroots updates these rates/volume pairings you will need to add records to the dim
Tag-pro-db.projections
New tables that allow you to “roughly” automate projections, Keith/Kelley have been walked through how to add a new client 
Tag-pro-db.revs.mv_rev_share_reporting_table
External prospecting vendor billable total -> powers external lookr reports + billing
tag-pro-db.revs.vwSIEGEOverview
View underneath SIEGE reporting -> I gave it a touch up in January but will need adjustment if we get a client sending out of SIEGE to ensure raised data isn’t double-counted
tag-dev-db.kk_projects.ClientAPIKeys
API keys from master client billing
tag-dev-db.kk_projects.HDM_IterableAPIkeys
API keys for HDM

Legacy/Still-Useful
tag-stg-db.20240109_HDM_Data.20240319_HDM_RAW_to_reconcile_deduped
Most current version of HDM HF (as of 5/19/24)
tag-stg-db.20240109_HDM_Data.ja_external_XXXXX
These are all of the external JA files (while they have all been ingested into our master file, this is the record of the originals they came from)
Tag-stg-db.anedot_XXXX.data
Client specific anedot data before current universal webhook
Tag-stg-db.grassroots_sftp
Holds our legacy grassroots data
tag-stg-db.iterable_webhook.data_V2
TAG instance iterable event data
tag-stg-db.limesurvey.tbl_DimQuestions_v3/tag-stg-db.limesurvey.tbl_FactResponse_Complete_v4
Dim question & fact answer tables for all our survey data - it can be joined into coherent tables 
tag-stg-db.models.WPAi_Ntl_DonorModel_20230607
This is a national donor model made by WPAi for NBD
Tag-stg-db.peerly_clickers.data
Peerly click data
Tag-stg-db.postmaster.data
This data feeds into the SIEGE dashboard postmaster table (which I don’t believe anyone uses anymore)
tag-stg-db.pp_webhook.data_V2
Historical Virgil Iterable event data (Virgil was a “SIEGE” entity spun up in late 2022)
tag-stg-db.virgil_webhook.data_V2
More Virgil event level data
Tag-stg-db.retention_grow.data
Phone append data from retention (TAG owns this but we do not include it on prospecting and just keep it internal)
Tag-stg-db.tatango.data
Historical tatango data
tag-stg-db.twitter.competitiveAds_prod
Where production twitter data goes (when we get it), not a lot of folks use our Twitter reporting
tag-stg-db.unbounce_daily_wire.data/emails/legacy_leads
Internal dailyWire data (Not to be used externally)
Tag-stg-db.winred_leads.data
Legacy WR Leads data
Tag-stg-db.winred_s3.winred_s3_data
Legacy S3 WR data (this will be up-to-date for some clients because it’s never been turned off but should not be considered complete)
tag-stg-db.winred_sa.data_V2
Historical JFC/SaveAmerica webhook data
Tag-mod-db.tag_modeling_v1
P2P model feature tables
uplifted-shine-332914.iterable.data_V2
Legacy HDM instance email event data

