let beersBtn = document.getElementById("beersBtn");
let itemsSelection = document.getElementById("items-num-selection");
let sortingSelection = document.getElementById("items-sort");
let writingField = document.getElementById("writing-space");
let previousBtn = document.getElementById("previous-button");
let nextBtn = document.getElementById("next-button");
let pageInfoField = document.getElementById("page-info");
let beerObjects;
let pageCounter;
let totalPages;
let itemsPerPage;

class Beers {
    constructor(name, tagline, firstBrewed, description, image, abv, ibu, foodPairing) {
        this.name = name;
        this.tagline = tagline;
        this.firstBrewed = firstBrewed;
        this.description = description;
        this.image = image;
        this.abv = abv;
        this.ibu = ibu;
        this.foodPairing = foodPairing;
    }

    cardCreation(element) {
    element.innerHTML += `<div class="col">
                            <div class="card w-auto p-4" style="width: 40rem; height: 50rem;">
                                <img src=${this.image} class="card-img-top img-height object-fit-scale" alt="Beer picture">
                                <div class="card-body">
                                <h5 class="card-title">${this.name}</h5>
                                <p class="card-text">${this.description}</p>
                                <a href="#" class="btn btn-primary btn-details">More details</a>
                                </div>
                            </div>
                        </div>`
    }

    // detailsPage(element) {
    
    // }
}

async function pageCreation (pageNum, pageItemsNum) {
    writingField.innerHTML = `<div class="container text-center">
                                <div class="row row-cols-2 grid gap-0 row-gap-4 px-3 py-4" id="row-container"></div>
                              </div>`;

    let response = await fetch(`https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=${pageItemsNum}`);
    let parsedResponse = await response.json();

    for (let i = 0; i < parsedResponse.length; i++) {
        let newBeer = new Beers(parsedResponse[i].name, parsedResponse[i].tagline, parsedResponse[i].first_brewed, parsedResponse[i].description, parsedResponse[i].image_url, parsedResponse[i].abv, parsedResponse[i].ibu, parsedResponse[i].food_pairing)
        beerObjects.push(newBeer);
        newBeer.cardCreation(document.getElementById("row-container"));
    }

    pageInfoField.innerHTML = `&nbsp&nbspPage ${pageNum} of ${totalPages}&nbsp&nbsp`;    
}

beersBtn.addEventListener("click", async () => {
    beerObjects = [];
    itemsSelection.selectedIndex = 0;
    sortingSelection.selectedIndex = 0;
    pageCounter = 1;
    itemsPerPage = 24;
    totalPages = Math.ceil(325/24);
    pageCreation(pageCounter, itemsPerPage);
    itemsSelection.style.visibility = "visible";
    sortingSelection.style.visibility = "visible";
    previousBtn.style.visibility = "hidden";
    pageInfoField.style.visibility = "visible";
    nextBtn.style.visibility = "visible";
});

nextBtn.addEventListener("click", async () => {
    beerObjects = [];
    sortingSelection.selectedIndex = 0;
    pageCreation(++pageCounter, itemsPerPage);
    previousBtn.style.visibility = "visible";
    if(pageCounter === totalPages) nextBtn.style.visibility = "hidden";
});

previousBtn.addEventListener("click", async () => {
    beerObjects = [];
    sortingSelection.selectedIndex = 0;
    pageCreation(--pageCounter, itemsPerPage);
    if(pageCounter === 1) previousBtn.style.visibility = "hidden";
});

itemsSelection.addEventListener("click", async () => {
    beerObjects = [];
    sortingSelection.selectedIndex = 0;
    itemsPerPage = itemsSelection.value;
    totalPages = Math.ceil(325/itemsPerPage);
    pageCreation(pageCounter, itemsPerPage);
});

sortingSelection.addEventListener("click", () => {
    document.getElementById("row-container").innerHTML = "";
    itemsSelection.selectedIndex = 0;

    switch(sortingSelection.value) {
        case "name-asc":
            beerObjects.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-de":
            beerObjects.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "alcohol-asc":
            beerObjects.sort((a, b) => a.abv - b.abv);
            break;
        case "alcohol-de":
            beerObjects.sort((a, b) => b.abv - a.abv);
            break;
        case "bitterness-asc":
            beerObjects.sort((a, b) => a.ibu - b.ibu);
            break;
        case "bitterness-de":
            beerObjects.sort((a, b) => b.ibu - a.ibu);
            break;
    }
    console.log(beerObjects);
    for (let i = 0; i < beerObjects.length; i++) {
        beerObjects[i].cardCreation(document.getElementById("row-container"));
    }

})

let detailsBtns = document.getElementsByClassName("btn-details");
