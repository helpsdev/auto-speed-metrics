Useful links
https://developer.chrome.com/docs/lighthouse/overview/#devtools

https://googlechrome.github.io/lighthouse/viewer/

https://www.npmjs.com/package/lighthouse-viewer


###TODO ITEMS
- [ ] Refactor and move getURL function to myUtil.js file
- [x] Add tests
- [ ] Workflow for when a run in a page/strategy failed?
  Should we retry at least once more? where to store that a run failed to re-run? 
  Easiest would be use a for loop instead of forEach function for the strategies
  Since we know something failed at the moment we can try again and after a determined number of retries just log that the scan failed for that specific page
  Another way to do this is to first create an array of URLs to try and if one fails just adding it to the queue again. How to prevent running it forever.
- [x] Do we need to create a folder per page in case of multiple runs to avoid generating a lot of files in the month folder?
- [x] Add a MOBLIE and DESKTOP strategy by each URL provided
- [ ] Add a list of URLs and save them in a JSON file (JSON is best for now?)
- [x] Add the strategy to the name of the file
- [ ] Add config.json (JSON?) file to store API KEY
- [ ] Document what the name convention is e.g right now is YYYY/M/DD_HHMM_PAGE.json
- [ ] Double check if timeout of 1 second is enough
- [ ] Define the cadence for this tool to run, manually? auto? if auto when? how? task scheduler?
- [ ] Add range values for all the CRuX metrics () in a settings file?
- [ ] Improve console log messages as it seems they are not informative enough
- [ ] Add link to the lighthouse viewer at the end for user's awareness

e.g CUMULATIVE_LAYOUT_SHIFT_SCORE => unitless 
```json
"CUMULATIVE_LAYOUT_SHIFT_SCORE": {
  "percentile": 13,
  "distributions": [
    {
      "min": 0,
      "max": 10,
      "proportion": 0.7146304292608584
    },
    {
      "min": 10,
      "max": 25,
      "proportion": 0.1253492506985014
    },
    {
      "min": 25,
      "proportion": 0.16002032004064015
    }
  ],
  "category": "AVERAGE"
}
```
The percentile property value is the current value for the metric and needs to be divided by 100 due to it's representation