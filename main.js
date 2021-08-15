async function buildHomePage(){
    let myJsonData=new JsonData([],[],[]);
    await myJsonData.buildDataArrays();
    homePageLoad=new homePage(myJsonData,[],[]);
    homePageLoad.displayAllPhotographers(); 
    homePageLoad.displayTagsButtons(); 
}

buildHomePage();
