export class Beers {
    constructor({name, tagline, first_brewed, description, image_url, abv, ibu, food_pairing}) {
        this.name = name;
        this.tagline = tagline;
        this.firstBrewed = first_brewed;
        this.description = description;
        this.image = image_url;
        this.abv = abv;
        this.ibu = ibu;
        this.foodPairing = food_pairing;
        this.productionDate = this.productionDateCreation(this.firstBrewed);
    }

    productionDateCreation (stringDate) {
        let splitDate = stringDate.split("/");
        if (splitDate.length === 1) return new Date(stringDate, 0);
        else {
            const [month, year] = splitDate;
            return new Date(year, month - 1);
        }
    }
}