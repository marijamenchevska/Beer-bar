// Creating the "More detais" page using a beer object created from the API

export class BeerDetails {
    static beerDetailsCreation (beer, element) {
        element.innerHTML = `<div class="card mb-3" id="detailsCard">
                                        <div class="row g-0">
                                            <div class="col-md-4" id="detailsImage">
                                                <img src=${beer.image} class="img-fluid rounded-start img-height object-fit-scale" alt="Beer image">
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-header bg-transparent border-success">
                                                    <span id="beer-name">${beer.name}</span> 
                                                    <br>
                                                    "${beer.tagline}"
                                                </div>

                                                <div class="card-body">
                                                    <p class="card-text">
                                                        ${beer.description}
                                                        <br><br>
                                                        Brewed: ${beer.firstBrewed}
                                                        <br>
                                                        Alcohol: ${beer.abv} %
                                                        <br>
                                                        Bitterness: ${beer.ibu}
                                                        <p><b>Food pairing:</b></p>
                                                    </p>
                                                    <div class="card border-success" style="width: 18rem;">
                                                        <ul class="list-group list-group-flush" id="list"></ul>
                                                    </div>
                                                    <br><br>
                                                    <button type="button" class="btn" id="go-back-button">Go back</button>
                                                </div>
                                            </div>
                                        </div>
                                   </div>`;

        beer.foodPairing.forEach(listItem => document.getElementById("list").innerHTML += `<li class="list-group-item border-success text-success">${listItem}</li>`);
    }
}

console.log("   Testing     empty    spaces");