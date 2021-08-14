class MediaData{
    constructor(id,photographerId,title,mediaName,tags,likes,date,price,type){
        this.id=id;
        this.photographerId=photographerId;
        this.title=title;
        this.mediaName=mediaName;
        this.tags=tags;
        this.likes=likes;
        this.date=date;
        this.price=price;
        this.type=type;
    }
}

class Image{
    constructor(mediaData){
        this.id=mediaData.id;
        this.photographerId=mediaData.photographerId;
        this.title=mediaData.title;
        this.image=mediaData.mediaName;
        this.tags=mediaData.tags;
        this.likes=mediaData.likes;
        this.date=mediaData.date;
        this.price=mediaData.price;
        this.type=mediaData.type;
    }
}

class Video{
    constructor(mediaData){
        this.id=mediaData.id;
        this.photographerId=mediaData.photographerId;
        this.title=mediaData.title;
        this.video=mediaData.mediaName;
        this.tags=mediaData.tags;
        this.likes=mediaData.likes;
        this.date=mediaData.date;
        this.price=mediaData.price;
        this.type=mediaData.type;
    }
}

class FactoryMedia{
    constructor(data){
        if (data.type==="image"){
            return new Image(data);
        }else if (data.type==="video"){
            return new Video(data);
        }
    }
}



