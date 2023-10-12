const cookie = document.querySelector("#cookie"); /* henter cookie */
const autoClick = document.querySelector("#auto-click"); /* henter auto-click */
const autoClickTextprice = document.querySelector("#auto-click .price"); /* henter auto-click prisen */

/* opretter en cookie i ens pung */
const updateScore = cookies => { /* cookies er antallet af cookies */
  const title = document.querySelector("title"); /* navn på siden */
  const score = document.querySelector("#score span"); /* henter scoren */

  score.innerHTML = cookies; /* opdaterer scoren */
  title.innerHTML = cookies + " cookies - Cookie Clicker";  /* opdaterer navnet på siden */

  localStorage.setItem("cookies", cookies); /* gemmer cookies i localstorage */
}


const updatePowerupsStorage = powerup => { /* powerup er navnet på poweruppen */
    let powerups = JSON.parse(localStorage.getItem("powerup")) || []; /* hvis der ikke er nogen powerups, så er det et tomt array */
    powerups.push(powerup); /* tilføjer poweruppen til arrayet */

    localStorage.setItem("powerup", JSON.stringify(powerups)); /* gemmer poweruppen i localstorage */
}

/* opretter en cookie i ens pung */
const getStorage = () => {
    const cookies = localStorage.getItem("cookies") || 0; /* hvis der ikke er nogen cookies, så er det 0 */
    const powerup =JSON.parse(localStorage.getItem("powerup")) || []; /* hvis der ikke er nogen powerups, så er det et tomt array */

    const storage = { /* opretter et objekt */
        "cookies": cookies, /* cookies er antallet af cookies */
        "powerup": powerup /* powerup er navnet på poweruppen */
    }
    
    return storage; /* returnerer storage */

}
/* gemmer hver gang man klikker på en cookie i ens pung */
const cookieClicked = cookies => { /* cookies er antallet af cookies */
    const storage = getStorage(); /* henter cookie storage */

    const score = document.querySelector("#score span"); /* henter scoren */
    const scoreValue = cookies ? cookies : parseInt(score.innerHTML); /* hvis der er cookies, så er det cookies, ellers er det scoren */

    let newScore; /* opretter en ny score */

    newScore = scoreValue + 1; /* ligger 1 til scoren */

    updateScore(newScore); /* opdaterer scoren */
}

/* opretter effekterne af powerups */
const createParticle = (x,y) =>  { /* x og y er koordinaterne på musen */
    const cookieClicks = document.querySelector(".cookie-clicks"); /* henter cookie-clicks */

    const particle = document.createElement("img"); /* opretter et billede */
    particle.setAttribute("src", "img/cookie.png"); /* sætter src på billedet */
    particle.setAttribute("class", "cookie-particle");  /* sætter class på billedet */
    particle.style.top = x + "px"; /* sætter top på billedet */
    particle.style.left = y + "px"; /* sætter left på billedet */

    cookieClicks.appendChild(particle); /* tilføjer billedet til cookie-clicks */

    setTimeout(() => { /* fjerner billedet efter 3 sekunder */
        cookieClicks.removeChild(particle); /* fjerner billedet fra cookie-clicks */
    }, 3000); /* 3000 er 3 sekunder */
} 

/* opretter powerups */
cookie.addEventListener("click", (e) => { /* e er eventet */
    createParticle(e.clientX, e.clientY) /* sender musens x og y koordinater med til createParticle */
    cookieClicked() /* sender scoren med til cookieClicked */
});


const autoClickCookie = () => { /* opretter en cookie hvert sekund */
    setInterval(() => { /* kører hvert sekund */
        const score = document.querySelector("#score span");  /* henter scoren */
        const scoreValue = parseInt(score.innerText); /* laver scoren om til et tal */
        newScore = scoreValue + 1; /* ligger 1 til scoren */

        updateScore(newScore); /* opdaterer scoren hver 1 sekund */
    }, 1000) /* 1000 er 1 sekund */
}

autoClick.addEventListener("click", () => { /* opretter en cookie hvert sekund */
    const price = autoClick.getAttribute("data-price"); /* henter prisen på poweruppen */
    const score = document.querySelector("#score span");  /* henter scoren */
    const scoreValue = parseInt(score.innerText); /* laver scoren om til et tal */

    if (scoreValue >= price) { /* prisen på poweruppen skal være mindre end eller lig med scoren */
       updatePowerupsStorage("auto-click"); /* opdaterer powerups i localstorage */

       const storage = getStorage(); /* henter cookie storage */
       const quantAutoClicks = storage.powerup.filter(powerup => powerup == "auto-click").length; /* tæller antallet af auto-clicks */
    
    
       /* opdaterer prisen på powerups, fortæller hvis man ikke har nok cookies til en opdraring */
     const newScore = scoreValue - price; /* ligger prisen til scoren */
    } else { /* ellers */
        autoClick.classList.add("fejl") /* tilføjer fejl classen */
        setTimeout(() => { /* fjerner fejl classen efter 3 sekunder */
            autoClick.classList.remove("fejl") /* fjerner fejl classen */
        }, 300); /* 300 er 0,3 sekunder */
    }
})



