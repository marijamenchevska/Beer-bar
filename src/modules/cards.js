// The class "detailsBtns" is used for identifying that a "More details" button has been clicked, while id is used for identifying which of those buttons is clicked to render the "More details" page of the adequate beer object

export class Cards {
    static cardCreation (beerObjectArray, element) {
        let btnId = 0;

        element.innerHTML = `<div class="container text-center">
                                <div class="row row-cols-2 grid gap-0 row-gap-4 py-4" id="row-container"></div>
                            </div>`;

        beerObjectArray.forEach(object => {
            document.getElementById("row-container").innerHTML += `<div class="col">
                                                                       <div class="card w-auto p-4 cards">
                                                                           <img src=${object.image} class="card-img-top img-height object-fit-scale" alt="Beer image">
                                                                           <div class="card-body">
                                                                               <h5 class="card-title">${object.name}</h5>
                                                                               <p class="card-text">${object.description}</p>
                                                                               <a class="btn btn-primary detailsBtns" id=${btnId}>More details</a> 
                                                                           </div>
                                                                       </div>
                                                                   </div>`;

            btnId++;
        });
    }
};