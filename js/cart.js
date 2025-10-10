function cart(){
    const cardBtn = document.querySelector('.button-cart');
console.dir(cardBtn);



const modalCard = document.querySelector('#modal-cart');
const modalClose = modalCard.querySelector('.modal-close');

cardBtn.addEventListener('click', function(){
    modalCard.style.display = 'flex';
    
});

modalClose.addEventListener('click', function(){
   
    modalCard.style.display = '';
});
}

cart();



