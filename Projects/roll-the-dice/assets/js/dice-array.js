let array_dices = document.getElementsByClassName("dice");
let display_result = document.getElementById("display_result");

function getRandomNumber(num_eyes = 6) {
    return Math.ceil(Math.random() * num_eyes)
}

function rollTheDice() {
    for(let dice_elm of array_dices) {
        dice_elm.innerText = getRandomNumber();
    }
    getResult();
}

function getResult() {
    let result = 0;
    for(let dice_elm of array_dices) {
        result += parseInt(dice_elm.innerText);
    }
    display_result.innerText = result;
}

document.getElementById("rolethedice").addEventListener("click", rollTheDice);