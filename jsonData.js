class JsonData{
    constructor(allPhotographers, allMedia, allTags){
        this.allPhotographers=allPhotographers;
        this.allMedia=allMedia;
        this.allTags=allTags;
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
            this.allTags=this.allTags.concat(myJsonData.photographers[k].tags);
        }
        this.allTags = [...new Set(this.allTags)];

        let numberOfMedia=myJsonData.media.length;
        for (let k=0;k<numberOfMedia;k++){
            let typeOfMedium=Object.keys(myJsonData.media[k])[3];
            allMediaData[k]=new MediaData(
                myJsonData.media[k].id,
                myJsonData.media[k].photographerId,
                myJsonData.media[k].title,
                myJsonData.media[k][typeOfMedium],
                myJsonData.media[k].tags,
                myJsonData.media[k].likes,
                myJsonData.media[k].date,
                myJsonData.media[k].price,
                typeOfMedium
            )
            this.allMedia[k]=new FactoryMedia(allMediaData[k])
        }
    }

    
}

