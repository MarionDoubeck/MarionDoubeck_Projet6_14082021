class JsonData{
    constructor(allPhotographers, allMedia){
        this.allPhotographers=allPhotographers;
        this.allMedia=allMedia;
    }

    async loadJsonData(){
        const response= await fetch("FishEyeData.json");
        let myJsonData=response.json();
        return myJsonData
    }

    async buildDataArrays() {
        let myJsonData=await this.loadJsonData();
        let allPhotographersData=[];
        let allMediaData=[];
        let numberOfPhotographers=myJsonData.photographers.length;
        for (let k=0;k<numberOfPhotographers;k++){
            allPhotographersData[k]=new PhotographerData(
                myJsonData.photographers[k].name,
                myJsonData.photographers[k].id,
                myJsonData.photographers[k].city,
                myJsonData.photographers[k].country,
                myJsonData.photographers[k].tags,
                myJsonData.photographers[k].tagline,
                myJsonData.photographers[k].price,
                myJsonData.photographers[k].portrait);
            this.allPhotographers[k]=new Photographer(allPhotographersData[k]);
        }
        let numberOfMedia=myJsonData.media.length;
        for (let k=0;k<numberOfMedia;k++){
            allMediaData[k]=new MediaData(
                myJsonData.media[k].id,
                myJsonData.media[k].photographerId,
                myJsonData.media[k].title,
                myJsonData.media[k].mediaName,
                myJsonData.media[k].tags,
                myJsonData.media[k].likes,
                myJsonData.media[k].date,
                myJsonData.media[k].price,
                Object.keys(myJsonData.media[k])[3]
            )
            this.allMedia[k]=new FactoryMedia(allMediaData[k])
        }
    }

    
}

