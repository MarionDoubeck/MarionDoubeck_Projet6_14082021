async function buildPhotographerPage(){
    let myJsonData=new JsonData([],[],[]);
    await myJsonData.buildDataArrays();
    PhotographerPageLoad=new PhotographerPage(myJsonData,[],[]);
    PhotographerPageLoad.displayAllPhotographers(); 
    hPhotographerPageLoad.displayTagsButtons(); 
}

//buildPhotographerPage();
myPhotographerPage.consoleLog();