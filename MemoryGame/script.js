const imgArray = ['images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img5.jpg', 'images/img6.jpg',
    'images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg',
    'images/img4.jpg', 'images/img5.jpg', 'images/img6.jpg'];
const shuffArr = shuffleImages(imgArray);
const cards = document.querySelectorAll(".back");
const newGameBtn = document.querySelector(".new-game");
const currentScore = document.querySelector("#current-score");
let bestScore = document.querySelector("#best-score");
const lowestScore = document.querySelector("#lowest-score");
const totalClicks = document.querySelector("#clicks");
const closeBtn = document.querySelector(".close");
let cardPlayedNum = 0;
let clicks = 0;
let cardFlippedNum = 0;
let currentCards = [];
let pointsWon = 0;
let lowestPoints = 0;
let highestPoints = 0;
let localB = "";
let localL = "";
let abt = document.querySelector(".about");
let play = document.querySelector(".play");
const abtInfo = document.querySelector(".about-info");
let gameboard = document.querySelector(".game-board");
let restartDiv = document.querySelector(".restart-div");


// assign new card randomly
document.addEventListener("DOMContentLoaded", function () {
    imgAssignment(shuffArr);
    localB = JSON.parse(localStorage.getItem("b"));
    localL = JSON.parse(localStorage.getItem("l"));
    if (localB !== null) {
        bestScore.innerHTML = localB;
    }
    if (localL !== null) {
        lowestScore.innerHTML = JSON.parse(localStorage.getItem("l"));
    }
    else {
        lowestScore.innerHTML = 0;
    }

});

//New game button listener
newGameBtn.addEventListener("click", function () {
    startNewGame();
});
// listener for the close button on the modal after at the end of a game 
closeBtn.addEventListener("click", function () {
    location.reload();
});


for (let c of cards) {
    c.addEventListener("click", function (e) {

        if (cardPlayedNum < 2) {
            flip(c);
            cardPlayedNum += 1;
            const divFlipped = e.target.parentElement.previousElementSibling;
            const currentImg = divFlipped.querySelector("img");
            currentCards.push(currentImg);
            clicks += 1;
            totalClicks.innerText = clicks;
        }
        if (cardPlayedNum == 2) {
            if (currentCards[0].src !== currentCards[1].src) {
                const timer = setTimeout(function () {
                    for (let i of currentCards) {
                        i.parentElement.nextElementSibling.classList.remove("flipped");
                        cardPlayedNum = 0;
                        currentCards = [];
                        currentScore.innerText = removePoints();
                    }
                }, 1000);
            }
            else {
                cardPlayedNum = 0;
                currentCards = [];
                currentScore.innerText = addPoints()
                cardFlippedNum += 2;
            } //end of else statement

        }// end of second if statement
        gameOver();
        lowestPoints = parseInt(lowestScore.innerHTML);
        highestPoints = parseInt(bestScore.innerHTML);
        localStorage.setItem('b', highestPoints);
        localStorage.setItem('l', lowestPoints);
    });


}



function flip(el) {
    el.classList.add("flipped");

}

function getBestScore(sc1, sc2) {
    if (sc1 > sc2) {
        sc2 = sc1;
    }
    return sc2;
}

function getLowScore(sc1, sc3) {
    if (sc1 < sc3) {
        sc3 = sc1;
    }
    else if (sc3 == 0) {
        sc3 = sc1;
    }
    return sc3;
}

function addPoints() {
    pointsWon += 100;
    return pointsWon;
}

// 
function removePoints() {
    if (pointsWon < 30) {
        pointsWon = 0;
    }
    else {
        pointsWon -= 30;
    }
    return pointsWon;

}


//This function reorder the strings in a given array
function shuffleImages(arr) {
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
        randomIndex = Math.floor(Math.random() * arr.length);
        temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}



function imgAssignment(arr) {
    const front = document.querySelectorAll('.frontImage');
    let index = 0;
    for (let i of front) {
        i.src = arr[index];
        index++;
    }

}

//This function is called when on load of the game page 
//or when the restart game nutton is clicked
function startNewGame() {
    clicks = 0;
    pointsWon = 0;
    totalClicks.innerHTML = clicks;
    currentScore.innerHTML = pointsWon;
    currentCards = [];
    imgAssignment(shuffleImages(imgArray));
    localB = JSON.parse(localStorage.getItem("b"));
    localL = JSON.parse(localStorage.getItem("l"));
    if (localB !== null) {
        bestScore.innerHTML = localB;
    }
    if (localL !== null) {
        lowestScore.innerHTML = JSON.parse(localStorage.getItem("l"));
    }
    const cards = document.querySelectorAll(".back");
    for (let c of cards) {
        flip(c);
    }
    const timer = setTimeout(function () {
        for (let c of cards) {
            c.classList.remove("flipped");

        }
        pointsWon = 0;
    }, 700);



}


function gameOver() {
    if (cardFlippedNum == 12) {
        bestScore.innerText = getBestScore(pointsWon, highestPoints);
        lowestScore.innerText = getLowScore(pointsWon, lowestPoints);
        const timer = setTimeout(function () {
            for (let c of cards) {
                c.classList.remove("flipped");
            }
        }, 1000);
        $('#final-clicks').text(clicks);
        $('#final-score').text(pointsWon);
        $('#gameover').modal('show');

    }
}



abt.addEventListener("click", function (e) {
    abtInfo.removeAttribute("hidden");
    gameboard.setAttribute("hidden", true);
    restartDiv.setAttribute("hidden", true);
});

play.addEventListener("click", function (e) {
    abtInfo.setAttribute("hidden", true);
    gameboard.removeAttribute("hidden");
    restartDiv.removeAttribute("hidden");


});



