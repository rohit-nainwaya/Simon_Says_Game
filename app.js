let gameSeq = [];
let userSeq = [];
let maxScore = 0;

let started = false;
let level = 0;
let newEl = document.createElement("h2");

let body = document.querySelector("body");

let h2 = document.querySelector("h2");

let btns = ["yellow", "green", "red", "blue", "purple", "orange"];

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started!");
        started = true;
        levelUp();
    }


})

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash")
    }, 300);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash")
    }, 300);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*6);
    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    // console.log("current level: "+level);
    if(userSeq[idx] === gameSeq[idx]){
        // console.log("same value!")
        if(userSeq.length == gameSeq.length){
            // levelUp();
            setTimeout(levelUp, 1000);
        }
    }else{
        if(level == 0){
            h2.innerHTML = `Game Over!, Your Score Was <b>${level}</b>, <br> Press any key to start again.`
        }else{
            h2.innerHTML = `Game Over!, Your Score Was <b>${level-1}</b>, <br> Press any key to start again.`
        }
        if(maxScore<=level){
            if(level==0){
                maxScore = level;
            }else{
                maxScore = level-1;
            }
            newEl.innerText = `Heighest Score: ${maxScore}`;
            document.body.appendChild(newEl);
            newEl.classList.add("position");
        }
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "gray";
        }, 1000)
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    let idx = userSeq.length-1;
    checkAns(idx);
}

let allBtn = document.querySelectorAll(".box");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}