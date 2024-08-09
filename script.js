const scoreElement = document.querySelector(".score span");
const highScoreElement = document.querySelector(".high-score span"); 
const holes = document.querySelectorAll(".hole");
const cursor = document.querySelector(".cursor img");

let gameInterval;
let points = 0;
let isGameOver = false;
let highScore = localStorage.getItem("highScore") || 0; 
highScoreElement.innerText = highScore;

window.addEventListener("mousemove", (e) => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
});

window.addEventListener("click", () => {
    cursor.style.animation = "hit 0.1s ease";
    setTimeout(() => {
        cursor.style.removeProperty("animation");
    }, 100);
});

function startGame() {
    isGameOver = false;
    points = 0;
    scoreElement.innerText = points;

    gameInterval = setInterval(() => {
        if (isGameOver) return;

        let arrayNo = Math.floor(Math.random() * 9);
        let hole = holes[arrayNo];

        let moleType = Math.floor(Math.random() * 3);
        let moleImage = moleType === 0 ? "./images/yunus.jpg" : moleType === 1 ? "./images/hasina.jpg" : "./images/palak.jpg";

        let image = document.createElement("img");
        image.setAttribute("src", moleImage);
        image.setAttribute("class", "mole");

        const moleTimeout = setTimeout(() => {
            if (hole.contains(image)) {
                hole.removeChild(image);
            }
        }, 800);

        image.addEventListener("click", () => {
            clearTimeout(moleTimeout);

            if (moleType === 0) {
                scoreElement.innerText = "GAME OVER: " + points;
                isGameOver = true;
                stopGame();
            } else {
                points++;
                scoreElement.innerText = points;
                hole.removeChild(image);
            }
        });

        hole.appendChild(image);

    }, 700);
}

function stopGame() {
    clearInterval(gameInterval);
    isGameOver = true;

    if (points > highScore) {
        highScore = points;
        localStorage.setItem("highScore", highScore);
        highScoreElement.innerText = highScore;
    }

    holes.forEach(hole => {
        if (hole.querySelector("img")) {
            hole.innerHTML = "";
        }
    });

    setTimeout(() => {
        location.reload(); // Refresh the page to restart the game
    }, 2000);
}

// Automatically start the game when the page loads
window.onload = startGame;
