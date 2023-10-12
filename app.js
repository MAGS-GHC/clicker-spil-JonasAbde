const cookie = document.querySelector("#cookie");
const autoClick = document.querySelector("#auto-click");
const autoClickTextprice = document.querySelector("#auto-click .price");





/* opretter en cookie i ens pung */
const updateScore = cookies => {
  const title = document.querySelector("title");  
  const score = document.querySelector("#score span");

  score.innerHTML = cookies;
  title.innerHTML = cookies + " cookies - Cookie Clicker";  

  localStorage.setItem("cookies", cookies);
}


const updatePowerupsStorage = powerup => {
    let powerups = JSON.parse(localStorage.getItem("powerup")) || [];
    powerups.push(powerup);

    localStorage.setItem("powerup", JSON.stringify(powerups));
}


/* opretter en cookie i ens pung */
const getStorage = () => {
    const cookies = localStorage.getItem("cookies") || 0;
    const powerup =JSON.parse(localStorage.getItem("powerup")) || [];

    const storage = {
        "cookies": cookies,
        "powerup": powerup
    }
    
    return storage;

}
/* gemmer hver gang man klikker på en cookie i ens pung */
const cookieClicked = cookies => {
    const storage = getStorage();

    const score = document.querySelector("#score span");
    const scoreValue = cookies ? cookies : parseInt(score.innerHTML);

    let newScore;

    newScore = scoreValue + 1;

    updateScore(newScore);
}

/* opretter effekterne af powerups */
const createParticle = (x,y) =>  {
    const cookieClicks = document.querySelector(".cookie-clicks");

    const particle = document.createElement("img");
    particle.setAttribute("src", "img/cookie.png");
    particle.setAttribute("class", "cookie-particle"); 
    particle.style.top = x + "px";
    particle.style.left = y + "px";

    cookieClicks.appendChild(particle);

    setTimeout(() => {
        cookieClicks.removeChild(particle);
    }, 3000);
} 


/* opretter powerups */
cookie.addEventListener("click", (e) => {
    createParticle(e.clientX, e.clientY)
    cookieClicked()
});

const autoClickCookie = () => {
    setInterval(() => {
        const score = document.querySelector("#score span");    
        const scoreValue = parseInt(score.innerText);



        newScore = scoreValue + 1;

        updateScore(newScore);
    }, 1000)
}

autoClick.addEventListener("click", () => {
    const price = autoClick.getAttribute("data-price");
    const score = document.querySelector("#score span");    
    const scoreValue = parseInt(score.innerText);

    if (scoreValue >= price) {
       updatePowerupsStorage("auto-click");

       const storage = getStorage();
       const quantAutoClicks = storage.powerup.filter(powerup => powerup == "auto-click").length;
    
    
     const newScore = scoreValue - price;
    } else {
        autoClick.classList.add("invalid")
        setTimeout(() => {
            autoClick.classList.remove("invalid")
        }, 300);
    }
})



