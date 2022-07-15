const root = document.querySelector('.root');
let deck = ['A','A',2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,'J','J','Q','Q','K','K'];
let shuffledDeck = [];

// shuffling deck
do {
    let index = Math.floor(Math.random() * (deck.length-1));
    shuffledDeck.push(deck[index]);
    deck.splice(index,1);
} while (deck.length > 0)

// painting shuffled deck
for ( let i=0; i<shuffledDeck.length ; i++ ) {
    root.innerHTML += `<div class='card'>${shuffledDeck[i]}</div>`;
}