


// const - bruges til at erklære en variabel med en konstant værdi.
const cookie = document.querySelector("#cookie"); /* viser antal cookie */
const autoClick = document.querySelector("#auto-click"); /* viser antal auto-clicks */
const autoClickTextPrice = document.querySelector("#auto-click .price span"); /* viser prisen på auto-clicks */
const upgradeClick = document.querySelector("#upgrade-click"); /*  viser antal upgrade-clicks */
const upgradeClickTextPrice = document.querySelector("#upgrade-click .price span"); /* viser prisen på upgrade-clicks */


const updateScore = cookies => { /* opdaterer antal cookies */
    const title = document.querySelector("title"); /* opdaterer titlen på siden */
    const score = document.querySelector("#score span"); /* opdaterer antal cookies */

    score.innerText = cookies; // opdaterer antal cookies
    title.innerHTML = cookies + " cookies - Cookie Clicker" // opdaterer titlen på siden

    localStorage.setItem("cookies", cookies); // gemmer antal cookies i localstorage
}

// updateScore(0); // opdaterer antal cookies
const updatePowerupsStorage = powerup => { /* opdaterer antal powerups */
    let powerups = JSON.parse(localStorage.getItem("powerups")) || []; // henter powerups fra localstorage
    powerups.push(powerup);     // tilføjer powerup til array

    localStorage.setItem("powerups", JSON.stringify(powerups)); // gemmer powerups i localstorage
}

// updatePowerupsStorage("auto-click"); // opdaterer antal powerups
const getStorage = () => {  /* henter antal cookies og powerups fra localstorage */
    const cookies = localStorage.getItem("cookies") || 0; // henter antal cookies fra localstorage
    const powerups = JSON.parse(localStorage.getItem("powerups")) || [];    // henter powerups fra localstorage
 
    const storage = {  // opretter et objekt med antal cookies og powerups
        "cookies": cookies, // antal cookies
        "powerups": powerups // powerups
    }

    return storage; // returnerer objektet
}

// getStorage(); // henter antal cookies og powerups fra localstorage
const cookieClicked = cookies => { /* opdaterer antal cookies */
    const storage = getStorage(); // henter antal cookies og powerups fra localstorage

    const score = document.querySelector("#score span"); // henter antal cookies fra html
    const scoreValue = cookies ? cookies : parseInt(score.innerText); // hvis cookies er defineret, så brug den værdi, ellers hent antal cookies fra html

    let newScore; // opretter variabel til at gemme antal cookies

    if(storage.powerups.includes("upgrade-click")) { // hvis der er en upgrade-click powerup
        const multiplier = storage.powerups.filter(powerup => powerup == "upgrade-click").length; // henter antal upgrade-clicks
        if(multiplier == 1){    // hvis der er 1 upgrade-click
            newScore = scoreValue + 2; // tilføj 2 cookies
        } else {   // hvis der er flere upgrade-clicks
            newScore = scoreValue + (2 ** multiplier) // tilføj 2^multiplier cookies
        }
    } else {   // hvis der ikke er en upgrade-click powerup
        newScore = scoreValue + 1; // tilføj 1 cookie
    }

    updateScore(newScore); // opdaterer antal cookies
}


// cookie.addEventListener("click", cookieClicked); // tilføjer eventlistener til cookie
const createParticle = (x,y) => { /* opretter en cookie particle */
    const cookieClicks = document.querySelector(".cookie-clicks"); // henter cookie-clicks div

    const particle = document.createElement("img"); // opretter et img element
    particle.setAttribute("src", "img/cookie.png"); // sætter src på img elementet
    particle.setAttribute("class", "cookie-particle"); // sætter class på img elementet
    particle.style.left = x + "px"; // sætter x position på img elementet
    particle.style.top = y + "px"; // sætter y position på img elementet

    cookieClicks.appendChild(particle); // tilføjer img elementet til cookie-clicks div


    setTimeout(() => {  // fjerner img elementet efter 3 sekunder
        cookieClicks.removeChild(particle); // fjerner img elementet fra cookie-clicks div
    }, 3000);   // 3000ms = 3 sekunder
}

// createParticle(100, 100); // opretter en cookie particle
cookie.addEventListener("click", (e) => { // tilføjer eventlistener til cookie
    createParticle(e.clientX, e.clientY); // opretter en cookie particle
    cookieClicked() // opdaterer antal cookies
});


const autoClickCookie = () => { /* opretter en cookie particle */
    setInterval(() => { // opretter en cookie particle hvert sekund
        const score = document.querySelector("#score span");    // henter antal cookies fra html
        const scoreValue = parseInt(score.innerText);  // henter antal cookies fra html

        newScore = scoreValue + 1; // tilføj 1 cookie

        updateScore(newScore); // opdaterer antal cookies
    }, 1000) // 1000ms = 1 sekund
}

// autoClickCookie(); // opretter en cookie particle
autoClick.addEventListener("click", () => { // tilføjer eventlistener til auto-click
    const price = autoClick.getAttribute("data-price"); // henter prisen på auto-clicks
    const score = document.querySelector("#score span"); // henter antal cookies fra html
    const scoreValue = parseInt(score.innerText) // henter antal cookies fra html

    if (scoreValue >= price) { // hvis der er nok cookies
        updatePowerupsStorage("auto-click"); // opdaterer antal powerups

        const storage = getStorage(); // henter antal cookies og powerups fra localstorage
        const quantAutoClicks = storage.powerups.filter(powerup => powerup == "auto-click").length; // henter antal auto-clicks

        const newScore = scoreValue - price; // trækker prisen fra antal cookies

        updateScore(newScore) // opdaterer antal cookies

        if(quantAutoClicks == 1) { // hvis der er 1 auto-click
            autoClick.setAttribute("data-price", 100 * 2); // sætter prisen til 100 * 2
            autoClickTextPrice.innerHTML = 100 * 2; // opdaterer prisen på siden
        } else { // hvis der er flere auto-clicks
            autoClick.setAttribute("data-price", 100 * (quantAutoClicks + 1)); // sætter prisen til 100 * (quantAutoClicks + 1)
            autoClickTextPrice.innerHTML = 100 * (quantAutoClicks + 1); // opdaterer prisen på siden
        }

        document.querySelector(".auto-clicks").classList.remove("disable"); // fjerner disable class fra auto-clicks

        document.querySelector(".auto-clicks .cursors").innerHTML += '<img src="img/cursor.png" alt="cursor" id="cursor" class="cursor auto">' // tilføjer en cursor til auto-clicks

        autoClickCookie(); // opretter en cookie particle
    } else { // hvis der ikke er nok cookies
        autoClick.classList.add("fejl") // tilføjer fejl class til auto-click
        setTimeout(() => { // fjerner fejl class fra auto-click
            autoClick.classList.remove("fejl") // fjerner fejl class fra auto-click
        }, 300); // 300ms = 0.3 sekunder
    }
})

upgradeClick.addEventListener("click", () => { // tilføjer eventlistener til upgrade-click
    const price = upgradeClick.getAttribute("data-price"); // henter prisen på upgrade-clicks
    const score = document.querySelector("#score span"); // henter antal cookies fra html
    const scoreValue = parseInt(score.innerText) // henter antal cookies fra html

    if (scoreValue >= price) { // hvis der er nok cookies
        updatePowerupsStorage("upgrade-click"); // opdaterer antal powerups

        const storage = getStorage(); // henter antal cookies og powerups fra localstorage
        const multiplier = storage.powerups.filter(powerup => powerup == "upgrade-click").length; // henter antal upgrade-clicks

        const newScore = scoreValue - price;    // trækker prisen fra antal cookies

        updateScore(newScore)   // opdaterer antal cookies

        if(multiplier == 1) {  // hvis der er 1 upgrade-click
            upgradeClick.setAttribute("data-price", 100 * 2); // sætter prisen til 100 * 2
            upgradeClickTextPrice.innerHTML = 100 * 2; // opdaterer prisen på siden
        } else {
            upgradeClick.setAttribute("data-price", 100 * (2 ** multiplier)); // sætter prisen til 100 * (2 ^ multiplier)
            upgradeClickTextPrice.innerHTML = 100 * (2 ** multiplier);  // opdaterer prisen på siden
        }
    } else { // hvis der ikke er nok cookies
        upgradeClick.classList.add("fejl") // tilføjer fejl class til upgrade-click
        setTimeout(() => { // fjerner fejl class fra upgrade-click
            upgradeClick.classList.remove("fejl") // fjerner fejl class fra upgrade-click
        }, 300); // 300ms = 0.3 sekunder
    }
})

const getSavedData = () => { /* henter antal cookies og powerups fra localstorage */
    const storage = getStorage(); // henter antal cookies og powerups fra localstorage

    updateScore(storage.cookies); // opdaterer antal cookies

    if (storage.powerups.includes("upgrade-click")) { // hvis der er en upgrade-click powerup
        const multiplier = storage.powerups.filter(powerup => powerup == "upgrade-click").length; // henter antal upgrade-clicks

        if(multiplier == 1) {   // hvis der er 1 upgrade-click
            upgradeClick.setAttribute("data-price", 100 * 2); // sætter prisen til 100 * 2
            upgradeClickTextPrice.innerHTML = 100 * 2; // opdaterer prisen på siden
        } else {   // hvis der er flere upgrade-clicks
            upgradeClick.setAttribute("data-price", 100 * (2 ** multiplier)); // sætter prisen til 100 * (2 ^ multiplier)
            upgradeClickTextPrice.innerHTML = 100 * (2 ** multiplier); // opdaterer prisen på siden
        }
    }

    if(storage.powerups.includes("auto-click")) { // hvis der er en auto-click powerup
        const quantAutoClicks = storage.powerups.filter(powerup => powerup == "auto-click").length; // henter antal auto-clicks

        document.querySelector(".auto-clicks").classList.remove("disable") // fjerner disable class fra auto-clicks

        if(quantAutoClicks == 1) { // hvis der er 1 auto-click
            autoClick.setAttribute("data-price", 100 * 2); // sætter prisen til 100 * 2
            autoClickTextPrice.innerHTML = 100 * 2; // opdaterer prisen på siden
        } else {
            autoClick.setAttribute("data-price", 100 * (quantAutoClicks + 1)); // sætter prisen til 100 * (quantAutoClicks + 1)
            autoClickTextPrice.innerHTML = 100 * (quantAutoClicks + 1); // opdaterer prisen på siden
        }

        for (i=1;i <= quantAutoClicks; i++) { // opretter en cookie particle for hvert antal auto-clicks
            autoClickCookie(); // opretter en cookie particle

            document.querySelector(".auto-clicks").classList.remove("disable"); // fjerner disable class fra auto-clicks
            document.querySelector(".auto-clicks .cursors").innerHTML += '<img src="img/cursor.png" alt="cursor" id="cursor" class="cursor auto"> ' // tilføjer en cursor til auto-clicks

        }
    }
}

// Gemmer data når siden lukkes eller genindlæses (f5) 
document.addEventListener("load", getSavedData()); // henter antal cookies og powerups fra localstorage