class PhotographerPage{
    constructor(photographer,photographerSMedia,totalLikes,sortedMedia){
        this.photographer=photographer;
        this.photographerSMedia=photographerSMedia;
        this.totalLikes=totalLikes;
        this.sortedMedia=sortedMedia;
    }

    getPhotographerId(){
        let adresse=window.location.href; //type=string
        let photographerId=adresse.split('=')[1]; //split la chaine au signe = et renvoie 
                                            //la seconde partie uniquement, cad l'id du photographe
        return photographerId;
    }

    async defineSelf(){
        let photographerId=this.getPhotographerId();
        let myJsonData=new JsonData([],[],[]);
        await myJsonData.buildDataArrays();
        for (let k=0;k<myJsonData.allPhotographers.length;k++){
            if(myJsonData.allPhotographers[k].id==photographerId){
                this.photographer=myJsonData.allPhotographers[k];
                break;
            }
        }
        for (let k=0;k<myJsonData.allMedia.length;k++){
            if(myJsonData.allMedia[k].photographerId==photographerId){
                this.photographerSMedia.push(myJsonData.allMedia[k]);
                this.totalLikes+=myJsonData.allMedia[k].likes;
            }
        }
    }

    async displayPhotographerDetailsAndMenu(){
        await this.defineSelf();
        let photographerDetails=document.getElementById("photographerDetails");
        let photographerInformations=document.createElement('div');
        photographerDetails.appendChild(photographerInformations);
        /////////////////////////////////
        let name=document.createElement('div');
        photographerInformations.appendChild(name);
        name.innerHTML=this.photographer.name;
        name.className="photographersNameONPP";
        /////////////////////////////////
        let place=document.createElement('div');
        photographerInformations.appendChild(place);
        place.innerHTML=this.photographer.city+", "+this.photographer.country;
        place.className="placeONPP";
        /////////////////////////////////
        let tagLine=document.createElement('div');
        photographerInformations.appendChild(tagLine);
        tagLine.innerHTML=this.photographer.tagline;
        tagLine.className="tagLineONPP";
        /////////////////////////////////
        let tags=document.createElement('ul');
        photographerInformations.appendChild(tags);
        tags.className="tagsONPP";
        for(let tag of this.photographer.tags){
            let aTag=document.createElement('li');
            tags.appendChild(aTag)
            let aTagButton=document.createElement('button');
            aTag.appendChild(aTagButton)
            aTagButton.setAttribute('style','button');
            aTagButton.innerHTML="#"+tag;
            aTagButton.className="aTagButton";  
        }  
        /////////////////////////////////
        let contactMe=document.createElement('button');
        photographerDetails.appendChild(contactMe);
        contactMe.innerHTML="Contactez-moi";
        contactMe.className="contactMeONPP";
        contactMe.addEventListener('click',this.openContactForm.bind(contactMe,this.photographer.name));
        /////////////////////////////////
        let portrait=document.createElement('div');
        photographerDetails.appendChild(portrait);
        portrait.innerHTML='<img class=portraitONPP src="Sample Photos/Photographers ID Photos/'+this.photographer.portrait+'"></img>';
        /////////////////////////////////
        this.sortedMedia=this.photographerSMedia;
        this.createSortingMenu();
        this.displayMedias();
        this.displayRectangle();
    }

    createSortingMenu(){
        let sortFrame=document.getElementById("sort");
        let instructions=document.createElement('span');
        instructions.innerHTML="Trier par ";
        sortFrame.appendChild(instructions);
        instructions.className="instructionsONPP";
        let sortingMenu=document.createElement('select');
        sortFrame.appendChild(sortingMenu);
        sortingMenu.id="sortingMenu";
        //option 1 :
        let popularity=document.createElement('option');
        popularity.value="likes";
        popularity.text="Popularité";
        sortingMenu.appendChild(popularity);
        //option 2:
        let date=document.createElement('option');
        date.value="date";
        date.text="Date";
        sortingMenu.appendChild(date);
        //option 3:
        let title=document.createElement('option');
        title.value="title";
        title.text="Titre";
        sortingMenu.appendChild(title);

        let selectedProperty="likes";
        this.sortMedia(sortingMenu,selectedProperty);
        sortingMenu.addEventListener('change',selectedProperty=>this.sortMedia(sortingMenu,selectedProperty));
    }

    sortMedia(sortingMenu,selectedProperty){
        selectedProperty=sortingMenu.value;
        let sortedProperty=[];
        for (let numberOfObject=0;numberOfObject<this.photographerSMedia.length;numberOfObject++){
            sortedProperty.push([this.photographerSMedia[numberOfObject][selectedProperty],numberOfObject]);
        }
        ///tri par ordre croissant des likes : ///
        if (selectedProperty=="likes"){
            for(let i=0;i<sortedProperty.length-1;i++){
                for (let j=i+1;j<sortedProperty.length;j++){
                    if ((sortedProperty[i])[0]<(sortedProperty[j])[0]){
                        let temp=sortedProperty[i];
                        sortedProperty[i]=sortedProperty[j];
                        sortedProperty[j]=temp;
                    }
                }
            }
        }else{
            sortedProperty.sort(); //tri par ordre alphabetique des titres ou dates//
        }
        this.sortedMedia=[];
        for (let order=0;order<this.photographerSMedia.length;order++){
            this.sortedMedia.push(this.photographerSMedia[sortedProperty[order][1]]);
        }
        this.displayMedias();
    }

    displayMedias(){
        let mediaDiv=document.getElementById('media');
        mediaDiv.innerHTML="";
        for (let i=0;i<this.sortedMedia.length;i++){
            let mediaBlock=document.createElement('div');
            mediaBlock.className="mediaBlock";
            mediaDiv.appendChild(mediaBlock);
            this.displayMedia(mediaBlock,this.photographer.name,this.sortedMedia[i],i);
        } 
    }

    displayMedia(mediaBlock,photographerName,media,i){
        let artWork=document.createElement('div');
        mediaBlock.appendChild(artWork);
        let firstName=photographerName.split(" ")[0];
        if(media.type=="image"){
            let source='"Sample Photos/'+firstName+'/'+media.image+'"';
            artWork.innerHTML='<img class=image src='+source+'></img>';
        }else if(media.type=="video"){
            let source='"Sample Photos/'+firstName+'/'+media.video+'"';
            artWork.innerHTML='<video controls class=video><source src='+source+' type="video/mp4"></video>';
        }
        artWork.addEventListener("click",myPhotographerPage.openCarousel.bind(artWork,i,media,this));
        let titleAndLikes=document.createElement('div');
        titleAndLikes.className="titleAndLikes";
        mediaBlock.appendChild(titleAndLikes);
        let title=document.createElement('div');
        titleAndLikes.appendChild(title);
        title.innerHTML=media.title;
        let likes=document.createElement('div');
        titleAndLikes.appendChild(likes);
        likes.className="likesDiv";
        let numberOfLikes=document.createElement('div');
        numberOfLikes.setAttribute("id",media.id)
        likes.appendChild(numberOfLikes);
        this.displayMediaLikes(numberOfLikes,media);
        let heartButton=document.createElement('button');
        likes.appendChild(heartButton);
        heartButton.className="fas fa-heart";
        heartButton.classList.add("heartButton");
        heartButton.addEventListener('click',this.addLike.bind(heartButton,this,media,numberOfLikes));
    }
    
    displayMediaLikes(numberOfLikes,media){
        numberOfLikes.innerHTML=media.likes; 
    }

    addLike(photographerPage,media,numberOfLikes){
        photographerPage.totalLikes++;
        media.likes++;
        photographerPage.displayMediaLikes(numberOfLikes,media);
        photographerPage.displayRectangle();
    }

    openCarousel(i,media,myphotographerPage){
        let carousel=new Carousel(i,media,myphotographerPage.sortedMedia,myphotographerPage.photographer.name);
        carousel.openCarousel();
    }

    openContactForm(photographerName){
        let contactForm=document.createElement('div');
        contactForm.className="contactForm";
        let photographerPageBody=document.getElementById('photographerPageBody');
        photographerPageBody.appendChild(contactForm);

        let contactFormTitle=document.createElement('div');
        contactForm.appendChild(contactFormTitle);
        let contactFormName=document.createElement('div');
        contactFormTitle.appendChild(contactFormName);
        contactFormName.className="contactFormName";
        contactFormName.innerHTML="Contactez-moi"+'<br>'+photographerName;
        let closeFormButton=document.createElement('button');
        contactFormTitle.appendChild(closeFormButton);
        closeFormButton.className="fas fa-times"; 
        closeFormButton.id="closeFormButton";
        closeFormButton.addEventListener('click',()=>contactForm.className="closeDiv");

        let contactFormContent=document.createElement('form');
        contactForm.appendChild(contactFormContent);
        contactFormContent.className="contactFormContent";
        contactFormContent.innerHTML=
            '<input type="hidden" name="contact_number">'+'<br>'+
            '<label>Prénom</label>'+'<br>'+
            '<input type="text" name="user_firstname">'+'<br>'+
            '<label>Nom</label>'+'<br>'+
            '<input type="text" name="user_familyname">'+'<br>'+
            '<label>Email</label>'+'<br>'+
            '<input type="email" name="user_email">'+'<br>'+
            '<label>Votre message</label>'+'<br>'+
            '<textarea name="message" id="message"></textarea>'+'<br>'+
            '<input type="submit" value="Envoyez" "id=submitButton">';
    }

    displayRectangle(){
        let rectangle=document.getElementById('totalLikes');
        rectangle.innerHTML=this.totalLikes+"<span class='fas fa-heart' id=space></span>"+this.photographer.price+" € / jour ";
    }
}

//////////////////////////////////////////////
let myPhotographerPage=new PhotographerPage(undefined,[],0);
myPhotographerPage.displayPhotographerDetailsAndMenu()

