# Slow Running Queries Script for MongoDB Atlas using Stitch
Runs slow queries for populating queries in the Profiler and the Performance Advisor in Atlas for demo purposes. Leverages Stitch and Atlas sample data.

## Instructions

1. Load Atlas sample data
  - You need to have loaded the Atlas sample data into your cluster. If your cluster doesn't have this data, follow the instructions in https://docs.atlas.mongodb.com/sample-data/load-sample-data/ 
2. Create Stitch app
  - Create a Stitch app and use the default settings. Do **NOT** change the Stitch Service Name. Otherwise you'll have to 
  change this later on in the *runSlowQueries* function. For more information on how to create a Stitch app, see: 
  https://docs.mongodb.com/stitch/procedures/create-stitch-app/
  - Open the Stitch app manually if you don't get redirected automatically after creation of the app
  - Turn on Anonymous authentication using the toggle on the *Getting Started* page
  - Go to *Functions*, and click *Create New Function*
    - As *Function Name* use: `runSlowQueries`
    - Turn on *Run As System* using the toggle
    - Open the *Function Editor* tab and copy & paste the code of `runSlowQueries.js` from the Github repo 
    - Hit *Save*
  - Click *Review & Deploy Changes* at the top, and hit *Deploy*
3. Run the script
  - Save `slow-queries.html` to disk and open it in a text editor
  - Replace the value of *STITCH_APP_ID* on line 14 with your Stitch App ID. You can find this on the top left of the screen 
  in Stitch
  - Open the `slow-queries.html` file in your browser. Make sure to run it about 10 minutes before doing your demo to give it 
  enough time to find the queries in the logs
