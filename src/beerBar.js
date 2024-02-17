let barBtn = document.getElementById("barBtn");
let welcomeMessage = document.getElementById("writing-space");

barBtn.addEventListener("click", () => {
    welcomeMessage.innerHTML = `<h1>Hello, this is beer world!</h1>
                                <h5>This is a simple beer page, you can get all the information for beers here.</h5>
                                <img src="https://th.bing.com/th/id/OIP.U0wQStKBpdL2c_lESF6O_QHaE8?rs=1&pid=ImgDetMain" alt="Picture of beers" id="beers-picture">`;
})