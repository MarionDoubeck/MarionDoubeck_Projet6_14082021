
class PhotographerData{
    constructor(name, id, city, country, tags, tagline, price, portrait) {  
        this.name = name;
        this.id = id;
        this.city=city;
        this.country=country;
        this.tags=tags;
        this.tagline=tagline;
        this.price=price;
        this.portrait=portrait;
    }
}

class Photographer {
    constructor(PhotographerData) {  
    this.name = PhotographerData.name;
    this.id = PhotographerData.id;
    this.city=PhotographerData.city;
    this.country=PhotographerData.country;
    this.tags=PhotographerData.tags;
    this.tagline=PhotographerData.tagline;
    this.price=PhotographerData.price;
    this.portrait=PhotographerData.portrait;
    }
}
