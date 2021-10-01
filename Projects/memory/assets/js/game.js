// importerer funktion fra model
import { GoalModel } from './model.js';
let arrGoalArray = GoalModel();
//console.log(arrGoalArray);

// Gameboard
const gameboard = document.getElementById('game');
// Antal kort
const num_cards = 10;
// Array til active cards
const arr_flipped = [];
// Tæller par
let pairs = 0;
// Initialiserer spillet
initGame(num_cards);

/**
 * Initialiser spil
 */
function initGame(num_cards) {
    // Sorter array tilfældigt
    arrGoalArray.sort(() => Math.random() - 0.5);
    // Slicer array til num_cards
    arrGoalArray = arrGoalArray.slice(0, num_cards);
    // Sammenkæder array med sig selv
    arrGoalArray = arrGoalArray.concat(arrGoalArray);
    // Sorter array tilfældigt
    arrGoalArray.sort(() => Math.random() - 0.5);

    // Looper goal array
    for(let card of arrGoalArray) {

        // Opretter div element med class
        let div = document.createElement('div');
        div.classList.add('flip-card-inner');

        // Opretter img med src og class og tilføjer til div 
        let img = document.createElement('img');
        img.setAttribute('src', `/assets/images/17goals/${card.image}`);
        img.classList.add('flip-card-front');
        div.appendChild(img);

        // Opretter div back element med class og tilføjer til div
        let back = document.createElement('div');
        back.classList.add('flip-card-back');
        div.appendChild(back);

        // Tilføjer click event til div
        back.addEventListener('click', function() {
            flipCard(this.parentNode);
        })

        // Appender div til gameboard
        gameboard.appendChild(div);
    }

    //console.log(arrGoalArray);
}

function flipCard(divElm) {
    divElm.classList.add('active');
    // Tilføjer element til array flipped
    arr_flipped.push(divElm);

    if(arr_flipped.length === 2) {
        console.log(arr_flipped);
        if(arr_flipped[0].innerHTML === arr_flipped[1].innerHTML) {
            pairs++;
            arr_flipped.length = 0;
            if(pairs === num_cards) {
                console.log('Done!!!');
            }
        } else {
            setTimeout(() => {
                for(let item of arr_flipped) {
                    item.classList.remove('active');
                }
            }, 1400)
        }
    }

    console.log(arr_flipped[0]);

}
