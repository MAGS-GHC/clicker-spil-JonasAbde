const cookie = document.querySelector('#cookie');

const updateScore = cookies => {
  const title = document.querySelector('title');  
  const score = document.querySelector('#score span');

  score.innerHTML = cookies;
  title.innerHTML = cookies + ' cookies - Cookie Clicker';  

  localStorage.setItem('cookies', cookies);
}

const getStorage = () => {
    const cookies = localStorage.getItem("cookies") || 0;
    const powerup =JSON.parse(localStorage.getItem("powerup")) || [];

    const storage = {
        "cookies": cookies,
        "powerup": powerup
    }
    
    return storage;

}

const cookieClicked = cookies => {
    const storage = getStorage();

    const score = document.querySelector('#score span');
    const scoreValue = cookies ? cookies : parseInt(score.innerHTML);

    let newScore;

    new Score = scoreValue + 1;

    updateScore(newScore);
}


