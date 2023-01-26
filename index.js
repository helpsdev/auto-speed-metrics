const fs = require('fs/promises');
const pages = require('./pages.json').pages;
const { wait } = require('./myUtil');
//Async wrapper
(async (pages) => {
  pages.forEach(page => saveData(page));

  async function saveData(page){
    try {
      page.strategies.forEach(async strategy => {
        const MILISECONDS = 1000;
        const URL = getURL({pageURL: page.URL, strategy})
        
        console.log(`waiting ${MILISECONDS} ms between each request`);
        await wait(MILISECONDS);
        console.log(`Request made using the URL: ${URL}`);
        
        const response = await fetch(URL);
        const json = await response.json();
        
        if (json.error){
          console.log(`It has been an error with the scanned page :${page.name}, please see the json file for more details`);
        }

        const now = new Date();
        const folderName = getFolderName({now, pageName: page.name});
        const fileName = getFileName({pageName: page.name, pageStrategy: strategy, now});

        await fs.mkdir(folderName, { recursive: true });
        await fs.writeFile(`${folderName}/${fileName}.json`, JSON.stringify(json));
        console.log("Data stored successfully");
      });
  
    } catch (error) {
      console.log(error);
    }
  }

  function getURL(params) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const {pageURL, strategy} = params;

    const parameters = {
      url: encodeURIComponent(pageURL),
      strategy: strategy,
    };
    let query = `${api}?`;
    for (key in parameters) {
      //Should remove & when it's the last parameter
      query += `${key}=${parameters[key]}&`;
    }
    return query;
  }

  function isDoubleDigit(number){
    return number.toString().length > 1;
  }

  function getFolderName(params){
    const { now, pageName } = params;
    const oneBasedMonth = now.getMonth() + 1;
    const monthNumber = isDoubleDigit(oneBasedMonth) ? oneBasedMonth.toString() : `0${oneBasedMonth}`; 

    return `${now.getFullYear()}/${monthNumber}/${pageName}`;
  }
  function getFileName(details){
    const {now, pageName, pageStrategy} = details;

    return `${now.getDate()}_${now.getHours()}${now.getMinutes()}_${pageName}_${pageStrategy}`;
  }
})(pages);

