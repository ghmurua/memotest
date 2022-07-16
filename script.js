const root = document.querySelector('.root');
let oldDeck = ['A','A',2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,'J','J','Q','Q','K','K'];
let deck = [];
let valueCard1 = '';
let valueCard2 = '';
let match = false;
let card1;
let card2;

const seeCard = (e) => {
    let id = e.target.id;
                               // clic on cards exposed do nothing
    if ((valueCard2 === '') && !(e.target.classList.contains('exposed'))) {
        if (valueCard1 === '') {
            valueCard1 = deck[id.slice(2)-1];
            card1 = document.getElementById(`${id}`);
            card1.classList.add('exposed');
            card1.innerText = valueCard1;
            return;
        }
    
        if (valueCard2 === '') {
            valueCard2 = deck[id.slice(2)-1];
            card2 = document.getElementById(`${id}`);
            card2.classList.add('exposed');
            card2.innerText = valueCard2;

            if (valueCard1 === valueCard2) match = true
        }
    
        if ((valueCard2 != '') && (match == false)) {
            setTimeout(()=>{
                valueCard1 = '';
                valueCard2 = '';
                card1.innerText = '';
                card1.classList.toggle('exposed');
                card2.innerText = '';
                card2.classList.toggle('exposed');
            },1000);
        }

        if (match) {
            console.log('found pair of',valueCard1);
            valueCard1 = '';
            valueCard2 = '';
            match = false;
        }
    }
}

// shuffling deck
do {
    let index = Math.floor(Math.random() * (oldDeck.length-1));
    deck.push(oldDeck[index]);
    oldDeck.splice(index,1);
} while (oldDeck.length > 0)

// painting shuffled deck
for ( let i=0; i<deck.length ; i++ ) {
    root.innerHTML += `<div id='id${(i+1)}' class='card'></div>`;
}

// adding listeners
for ( let j=0; j<deck.length ; j++ ) {
    document.querySelector(`#id${(j+1)}`).addEventListener('click', seeCard);
}
