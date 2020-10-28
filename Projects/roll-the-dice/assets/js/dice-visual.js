let num_dices = 2;
let array_dices = [];
let array_dice_names = ["","one", "two", "three", "four", "five", "six"];
let gameboard = document.getElementById("gameboard");
let display_result = document.getElementById("display_result");

roleTheDice();

function getRandomNumber(num_eyes = 6) {
    return Math.ceil(Math.random() * num_eyes)
}

function initGame() {
    array_dices = [];
    gameboard.innerHTML = "";
    for(let i = 1; i <= num_dices; i++) {
        array_dices.push(getRandomNumber());
    }
}

function roleTheDice() {
    initGame();
    for(let num of array_dices) {
        let elm = document.createElement("i");
        elm.setAttribute("class", "dice fas fa-dice-" + array_dice_names[num]);
        gameboard.appendChild(elm);
    }
    getResult();
}

function getResult() {
    let result = 0;
    for(let num of array_dices) {
        result += parseInt(num);
    }
    display_result.innerText = result;
}

document.getElementById("rolethedice").addEventListener("click", roleTheDice);