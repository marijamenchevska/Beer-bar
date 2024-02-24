export class HomePage {
    static homePageCreation (element) {
        element.innerHTML = `<h1>Hello, this is beer world!</h1>
                             <br>
                             <h5>This is a simple beer page, you can get all the information for beers here.</h5>
                             <h5>Explore beers in the "Beers" section, or get a "Random beer" - it's on us! :)</h5>
                             <br>
                             <img src="https://th.bing.com/th/id/OIP.U0wQStKBpdL2c_lESF6O_QHaE8?rs=1&pid=ImgDetMain" alt="Beer image" id="home-page-image">`;
    }
}