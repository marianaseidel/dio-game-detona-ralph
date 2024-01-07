const state = {
    view: {
        //Elementos que vou querer capturar:
        //São variáveis que vão ter algum efeito visual na tela.
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 5,
        lives: 3,
        restartCount: 0,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDownLives() {
    state.values.lives--;
    state.view.lives.textContent = state.values.lives;

    if (state.values.lives === 0) {
        playSound("hit2.m4a");
        alert("Game Over!");
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.05;
    audio.play();
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        countDownLives();
        alert(`Ops, seu tempoa acabou! O seu resultado foi: ${state.values.result}`);

        restartGame();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        //na lista de classes, vai remover a classe 'enemy':
        square.classList.remove("enemy");
    });
    // sorteando um número aleatório de 1 a 9:
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    // adicionar a classe enemy na square sorteada:
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            }
        })
    })
}

function restartGame() {
    state.values.restartCount++;

    if (state.values.restartCount < 3) {
        state.values.curretTime = 5;
        state.values.result = 0;

        state.view.timeLeft.textContent = state.values.curretTime;
        state.view.score.textContent = state.values.result;

        state.actions.timerId = setInterval(randomSquare, 1000);
        state.actions.countDownTimerId = setInterval(countDown, 1000);
    }
}

function init() {
    addListenerHitBox();
};

init();


