// Sætter konstanter til gameboard, scoreboard, 
const btn = document.getElementById('rolldiceBtn');
const gameboard = document.getElementById('gameboard');
const scoreboard = document.getElementById('scoreboard');
const num_dices = 5;
const arr_dices = [];
let total = 0;

btn.onclick = function() {
    reset();
    for(let i = 1; i <= num_dices; i++) {
        let dice = document.createElement('div');
        let number = getRandomNumber();
        total += number;
        dice.setAttribute('id', 'dice' + i);
        dice.innerText = number;
        arr_dices.push(number);
        gameboard.appendChild(dice);
    }    
    let score = setScore(arr_dices)    
    scoreboard.innerHTML = score;    
}

function getRandomNumber(num_eyes = 6) {
    return Math.ceil(Math.random() * num_eyes)
}

function setScore(array) {
    let score = '';
    const dices_reduced = arr_dices.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    let arrMap = Array.from(dices_reduced.values());

    switch(arrMap.length) {
        case 1:
            score = 'Balut';
            break;
        case 2:
            // Ternary operator
            score = (arrMap.some(x => x === 3)) ? "Fuld hus" : "4 ens";
            break;
        case 3:
            if(arrMap.some(x => x === 3)) {
                score = '3 ens';
            } else {
                score = '2 par';
            }
            break;
        case 4:
            score = '1 par';
            break;
        case 5:
            array.sort();
            let arr_joined = array.join('');            
            if(arr_joined === '12345') {
                score = 'Lille straight';
            } else if(arr_joined === '23456') {
                score = 'Stor straight';
                console.log(score);
            } else {
                score = 'Nitte';
            }

            break;
    }
    return score;
}

function reset() {
    gameboard.innerText = '';
    scoreboard.innerText = 0;
    arr_dices.length = 0;
    total = 0;
}
