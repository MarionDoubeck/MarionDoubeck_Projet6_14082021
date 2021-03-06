class homePage {
    constructor(myJsonData,chosenPhotographers,chosenTags){
        this.allPhotographers=myJsonData.allPhotographers;
        this.allTags=myJsonData.allTags;
        this.chosenTags=chosenTags;
        this.chosenPhotographers=chosenPhotographers;
    }

    displayTagsButtons(){
        for(let tag of this.allTags){
            let aTag=document.createElement('li');
            document.getElementById("tagsList").appendChild(aTag);
            let aTagButton=document.createElement('button');
            aTag.appendChild(aTagButton)
            aTagButton.setAttribute('style','button');
            aTagButton.innerHTML="#"+tag;
            aTagButton.className="aTagButton";  
            aTagButton.addEventListener('click', this.filterChosenTags.bind(aTagButton,tag,this));    
        }  
    }

    filterChosenTags(tag,homePage){
        let chosenTags=homePage.chosenTags;
        //if the tag is in the chosenTags list : remove it
        if (chosenTags.includes(tag)){ 
            chosenTags = chosenTags.filter(chosenTags => chosenTags !== tag);
        }else{ //else add it
            chosenTags.push(tag);
        }
        homePage.chosenTags=chosenTags;
        homePage.filterChosenPhotographers();
    }

    filterChosenPhotographers(){
        let chosenPhotographers=[];
        for (const photographer of this.allPhotographers){
            if(this.chosenTags.some(item => photographer.tags.includes(item))){
                chosenPhotographers.push(photographer);
            }
        }
        this.chosenPhotographers=chosenPhotographers;
        this.displayChosenPhotographers();
    }  

    displayChosenPhotographers(){
        //erases pictures of the previous filtering:
        while(document.getElementById("userChoiceOfPhotographers").firstChild) {
            document.getElementById("userChoiceOfPhotographers").removeChild(document.getElementById("userChoiceOfPhotographers").firstChild);
        }
        let numberOfChosenPhotographers=this.chosenPhotographers.length;
        if(numberOfChosenPhotographers==0){
            this.displayAllPhotographers();
        }else{
            for (let k=0;k<numberOfChosenPhotographers;k++){
                let photographerFrame = this.createDiv(this.chosenPhotographers[k]);
                document.getElementById("userChoiceOfPhotographers").appendChild(photographerFrame);
            }
        }
    }

    displayAllPhotographers(){
        //erases pictures of the previous filtering:
        while(document.getElementById("userChoiceOfPhotographers").firstChild) {
            document.getElementById("userChoiceOfPhotographers").removeChild(document.getElementById("userChoiceOfPhotographers").firstChild);
        }
        for (let k=0;k<this.allPhotographers.length;k++){
            let photographerFrame = this.createDiv(this.allPhotographers[k]);
            photographerFrame.className="homePagePhotographerFrame";
            document.getElementById("userChoiceOfPhotographers").appendChild(photographerFrame);
        }
    }

    createDiv(photographer){
        let photographerFrame=document.createElement('div');
        photographerFrame.className="homePagePhotographerFrame";
        //cr??er le lien vers la page du photographe :
        let linkToPhotographerPage=document.createElement('a');
        photographerFrame.appendChild(linkToPhotographerPage);
        linkToPhotographerPage.className="linkToPhotographerPage";
        linkToPhotographerPage.setAttribute('href',"photographerPage.html?idphotographer="+photographer.id);
        
        //dans le lien, cr??er une div pour le portrait :
        let portrait=document.createElement('div');
        linkToPhotographerPage.appendChild(portrait);
        portrait.className="portraitDiv";
        let linkToPhotographerPagePhoto='<img class=homePagePortrait src="Sample Photos/Photographers ID Photos/'+photographer.portrait+'"></img>';
        portrait.innerHTML=linkToPhotographerPagePhoto;   
        //dans le lien, cr??er une div pour le nom du photographe :
        let name=document.createElement('div');
        linkToPhotographerPage.appendChild(name);
        name.innerHTML=photographer.name;
        name.className="homePageName";
        //cr??ation d'une div pour le lieu :
        let place=document.createElement('div');
        photographerFrame.appendChild(place);
        place.innerHTML=photographer.city+", "+photographer.country;
        place.className="homePagePlace"
        //cr??ation d'une div pour la description :
        let tagline=document.createElement('div');
        photographerFrame.appendChild(tagline);
        tagline.innerHTML=photographer.tagline;
        tagline.className="homePageTagline"
        //cr??ation d'une div pour le tarif :
        let price=document.createElement('div');
        photographerFrame.appendChild(price);
        price.innerHTML=photographer.price+"???/jour";
        price.className="homePagePrice";
        //cr??ation d'une div pour les filtres:
        let tags=document.createElement('div');
        photographerFrame.appendChild(tags);
        tags.className="tags";
        for(let tag of photographer.tags){
            let aTag=document.createElement('li');
            tags.appendChild(aTag)
            let aTagButton=document.createElement('button');
            aTag.appendChild(aTagButton)
            aTagButton.setAttribute('style','button');
            aTagButton.innerHTML="#"+tag;
            aTagButton.className="aTagButton";
            aTagButton.addEventListener('click', this.filterChosenTags.bind(aTagButton,tag,this));
        }
        return photographerFrame;
    }
}