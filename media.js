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
    constructor(data){
        this.id=data.id;
        this.photographerId=data.photographerId;
        this.title=data.title;
        this.image=data.image;
        this.tags=data.tags;
        this.likes=data.likes;
        this.date=data.date;
        this.price=data.price;
        this.type=data.type;
    }
}

class Video{
    constructor(data){
        this.id=data.id;
        this.photographerId=data.photographerId;
        this.title=data.title;
        this.video=data.video;
        this.tags=data.tags;
        this.likes=data.likes;
        this.date=data.date;
        this.price=data.price;
        this.type=data.type;
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



