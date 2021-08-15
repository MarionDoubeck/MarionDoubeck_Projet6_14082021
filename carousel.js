class Carousel{
    constructor(index,media,allMedia,photographerName){
        this.index=index;
        this.media=media;
        this.allMedia=allMedia;
        this.photographerName=photographerName;
    }

    openCarousel(){
        let carouselDiv=document.createElement('div');
        carouselDiv.className="carousel";
        document.getElementById('photographerPageBody').appendChild(carouselDiv);
        this.displayMediaInCarousel(carouselDiv);
    }

    displayMediaInCarousel(carousel){
        let carouselMedia=document.createElement('div');
        carouselMedia.className="carouselMedia";
        carousel.appendChild(carouselMedia);
        let firstName=this.photographerName.split(" ")[0];
        if (this.media.type=="image"){
            let source='"Sample Photos/'+firstName+'/'+this.media.image+'"';
            carouselMedia.innerHTML='<img class=carouselImage src='+source+'></img>';
        }else if (this.media.type=="video"){
            let source='"Sample Photos/'+firstName+'/'+this.media.video+'"';
            carouselMedia.innerHTML='<video controls class=carouselVideo src='+source+' type="video/mp4"></video>';
        }
        let prevButton=document.createElement('button');
        let nextButton=document.createElement('button');
        let closeButton=document.createElement('button');
        carousel.appendChild(prevButton);
        carousel.appendChild(nextButton);
        carousel.appendChild(closeButton);
        prevButton.className="fas fa-chevron-left";
        nextButton.className="fas fa-chevron-right";
        closeButton.className="fas fa-times"; 
        prevButton.classList.add("prevButton");
        nextButton.classList.add("nextButton");
        closeButton.classList.add("closeButton");
        prevButton.addEventListener('click',this.goToPrev.bind(prevButton,this,carousel));
        nextButton.addEventListener('click',this.goToNext.bind(nextButton,this,carousel));
        closeButton.addEventListener('click',this.closeCarousel.bind(closeButton,carousel));
    }  

    goToNext(Carousel,carousel){
        Carousel.index++;
        if(Carousel.index==Carousel.allMedia.length){
            Carousel.index=0;
        }
        Carousel.media=Carousel.allMedia[Carousel.index];
        carousel.innerHTML="";
        Carousel.displayMediaInCarousel(carousel);
    }

    goToPrev(Carousel,carousel){
        Carousel.index--;
        if(Carousel.index<0){
            Carousel.index=Carousel.allMedia.length-1;
        }
        Carousel.media=Carousel.allMedia[Carousel.index];
        carousel.innerHTML="";
        Carousel.displayMediaInCarousel(carousel);
    }

    closeCarousel(carousel){
        carousel.classList.add("closeDiv");
    }

    
}