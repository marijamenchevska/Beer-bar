import { HomePage } from "./homePage.js";
import { Beers } from "./beer.js"; 
import { Cards } from "./cards.js";
import { BeerDetails } from "./moreDetails.js";
import { ApiService } from "./apiService.js";

export class BeerService {
    constructor () {
        this.apiService = new ApiService(); // a new instance from classes must be created first separately; one can't create an instance and call a method at the same time
        this.barBtn = document.getElementById("barBtn");
        this.writingField = document.getElementById("writing-space");
        this.beersBtn = document.getElementById("beersBtn");
        this.itemsSelection = document.getElementById("items-num-selection");
        this.sortingSelection = document.getElementById("items-sort");
        this.previousBtn = document.getElementById("previous-button");
        this.nextBtn = document.getElementById("next-button");
        this.pageInfoField = document.getElementById("page-info");
        this.randomBeerBtn = document.getElementById("randomBtn");
        this.inputField = document.getElementById("userInput");
        this.searchBtn = document.getElementById("searchBtn");
        this.pageCounter = 1;
        this.totalPages = 14;
        this.itemsPerPage = 24;
        this.beerObjects = []; // The API objects are stored here to be used later for manipulation (sorting and creating a "More details" page)
        this.visibilityItems = [this.itemsSelection, this.sortingSelection, this.previousBtn, this.nextBtn, this.pageInfoField];
    }
    
    hideItems (itemsArray) {
        itemsArray.forEach(item => item.style.visibility = "hidden");
    }

    showItems (itemsArray) {
        itemsArray.forEach(item => item.style.visibility = "visible");
    }

    sortBeerObjects (criterion) {
        switch(criterion) {
            case "name-asc":
                this.beerObjects.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-de":
                this.beerObjects.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "alcohol-asc":
                this.beerObjects.sort((a, b) => a.abv - b.abv);
                break;
            case "alcohol-de":
                this.beerObjects.sort((a, b) => b.abv - a.abv);
                break;
            case "bitterness-asc":
                this.beerObjects.sort((a, b) => a.ibu - b.ibu);
                break;
            case "bitterness-de":
                this.beerObjects.sort((a, b) => b.ibu - a.ibu);
                break;
            case "production-date-asc":
                this.beerObjects.sort((a, b) => a.productionDate - b.productionDate);
                break;
            case "production-date-de":
                this.beerObjects.sort((a, b) => b.productionDate - a.productionDate);
                break;
            default:
                break;
        }
    }

    // The same page needs to be created for normal and search results, only the URL ending is different
    async pageCreation (pageNum, pageItemsNum, urlEnding) {
        // Try-catch is needed for the search action
        try {
            let apiData = await this.apiService.getBeers(pageNum, pageItemsNum, urlEnding);
            if (!apiData.length) throw new Error("No beers found!");

            this.beerObjects = await apiData.map(beer => new Beers(beer));
            Cards.cardCreation(this.beerObjects, this.writingField);

            this.pageInfoField.innerHTML = `&nbsp&nbspPage ${pageNum} of ${this.totalPages}&nbsp&nbsp`;
        }
        catch (error) {
            this.writingField.innerHTML = `<h4>${error}</h4>`;
        } 
    };

    async searchPageCreation (userInput) {
        this.hideItems(this.visibilityItems);
        userInput = userInput.trim();

        if (!userInput) {
            this.writingField.innerHTML = "<h4>You didn't enter anything.</h4>";
            return;
        }

        // It needs to be checked whether the search input is one or multiple words so that the URL ending is correctly completed 
        if (userInput.split(" ").length === 1) userInput = userInput;
        else userInput = userInput.split(" ").join("_"); // or replace(" ", "_")
                    
        await this.pageCreation(this.pageCounter, this.itemsPerPage, `?beer_name=${userInput}`);
    }

    async beerEvents () {
        this.barBtn.addEventListener("click", () => {
            this.hideItems(this.visibilityItems);
            HomePage.homePageCreation(this.writingField);                
        });

        this.beersBtn.addEventListener("click", async () => {
            this.itemsSelection.selectedIndex = 0;
            this.sortingSelection.selectedIndex = 0;
            this.pageCounter = 1;
            this.itemsPerPage = 24;
            this.totalPages = Math.ceil(325 / 24);
            this.showItems(this.visibilityItems);
            this.previousBtn.style.visibility = "hidden";
            await this.pageCreation(this.pageCounter, this.itemsPerPage);
        });

        this.nextBtn.addEventListener("click", async () => {
            this.sortingSelection.selectedIndex = 0;
            await this.pageCreation(++this.pageCounter, this.itemsPerPage);
            this.previousBtn.style.visibility = "visible";
            if(this.pageCounter === this.totalPages) this.nextBtn.style.visibility = "hidden";
        });

        this.previousBtn.addEventListener("click", async () => {
            this.sortingSelection.selectedIndex = 0;
            await this.pageCreation(--this.pageCounter, this.itemsPerPage);
            this.nextBtn.style.visibility = "visible";
            if(this.pageCounter === 1) this.previousBtn.style.visibility = "hidden";
        });

        this.itemsSelection.addEventListener("click", async () => {
            this.sortingSelection.selectedIndex = 0;
            if (this.itemsSelection.value === "Beers per page") return; // Do nothing on the first click on the select box
            else this.itemsPerPage = this.itemsSelection.value;
            this.totalPages = Math.ceil(325 / this.itemsPerPage);
            await this.pageCreation(this.pageCounter, this.itemsPerPage);
        });

        this.sortingSelection.addEventListener("click", () => {     
            this.writingField.innerHTML = "";
            this.sortBeerObjects(this.sortingSelection.value);
            Cards.cardCreation(this.beerObjects, this.writingField);        
        });

        this.randomBeerBtn.addEventListener("click", async () => {
            const randomBeer = await this.apiService.getRandomBeer();
            BeerDetails.beerDetailsCreation(new Beers(randomBeer), this.writingField);
            this.hideItems(this.visibilityItems);
            document.getElementById("go-back-button").style.visibility = "hidden";
        });

        document.addEventListener("click", async (e) => {
            // targeting dynamically created buttons ("Go back" and "More details")
            if(e.target.id === "go-back-button") {
                //handling going back from normally created cards vs search created cards
                if(!this.inputField.value) {
                    await this.pageCreation(this.pageCounter, this.itemsPerPage);
                    this.showItems(this.visibilityItems);
                    if(this.pageCounter === 1) this.previousBtn.style.visibility = "hidden"; // In case we were on the first page, the previous button needs to be hidden
                    if(this.pageCounter === this.totalPages) this.nextBtn.style.visibility = "hidden"; // In case we were on the last page, the next button needs to be hidden
                }
                else this.searchPageCreation(this.inputField.value);
            }
            else if(e.target.className.includes("detailsBtns")) {
                BeerDetails.beerDetailsCreation(this.beerObjects[e.target.id], this.writingField); // The id of the clicked button is equivalent to the index of the required beer object used for creating the "More details" page
                this.hideItems(this.visibilityItems);
            }
        });

        this.searchBtn.addEventListener("click", async () => this.searchPageCreation(this.inputField.value));
    }
}
