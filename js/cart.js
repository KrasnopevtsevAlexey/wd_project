function cart(){
    const cardBtn = document.querySelector('.button-cart');
console.dir(cardBtn);



const modalCard = document.querySelector('#modal-cart');
const modalClose = modalCard.querySelector('.modal-close');
const goodContaner = document.querySelector(".long-goods-list");
const cardTable = document.querySelector('.cart-table__goods');
const modalForm = document.querySelector('.modal-form');


const deleteItem = (id)=> {
 const card = JSON.parse(localStorage.getItem('card'));

const newCard = card.filter(item => {
    return item.id !== id;
})
 localStorage.setItem('card', JSON.stringify(newCard));

 renderCardGoods(JSON.parse(localStorage.getItem('card')))
}



const plusItem = (id)=> {
 const card = JSON.parse(localStorage.getItem('card'));
const newCard = card.map(item => {
    
    if(item.id === id){
    item.count++
    }
    return item;
    })

 localStorage.setItem('card', JSON.stringify(newCard));
 renderCardGoods(JSON.parse(localStorage.getItem('card')))
}


const minusItem = (id)=> {
 const card = JSON.parse(localStorage.getItem('card'));
const newCard = card.map(item => {
    
    if(item.id === id){
        if(item.count > 0){
            item.count--
        }
    
    }
    return item;
    })

 localStorage.setItem('card', JSON.stringify(newCard));
 renderCardGoods(JSON.parse(localStorage.getItem('card')))
}

const addToCard = (id) =>{
const result = JSON.parse(localStorage.getItem('hello'))
const clickedButton = result.find(item => item.id === id);
 const card = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card')) : []; 


if(card.some(item => item.id === clickedButton.id)){


card.map(item => {
    
    if(item.id === clickedButton.id){
    item.count++
    }
    return item;
    })
}else{
//console.log(`добавить товаров ${clickedButton}`);
clickedButton.count = 1;
card.push(clickedButton);
}
localStorage.setItem('card',JSON.stringify(card));

};
const renderCardGoods = (good)=>{
    cardTable.innerHTML = '';
good.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
                        <td>${item.name}</td>
						<td>$${item.price}</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${item.count}</td>
						<td><button class="cart-btn-plus"">+</button></td>
						<td>${+item.price * +item.count}</td>
                        <td><button class="cart-btn-delete"">x</button></td>
    
    `
cardTable.append(tr);

tr.addEventListener('click', (e)=>{
    //console.log(e.target);
    if(e.target.classList.contains('cart-btn-minus')){
minusItem(item.id);
    }else if(e.target.classList.contains('cart-btn-plus')){
plusItem(item.id);
    }else if(e.target.classList.contains('cart-btn-delete')){
        deleteItem(item.id);

    }
})

});
}


const sendForm = () =>{

   const cardarray = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card')) : [];
   
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        
        card: cardarray,
        name: '',
        phone: ''
    
    })
}).then(() => {
 modalCard.style.display = '';
})
}

modalForm.addEventListener('submit', (e) =>{
    e.preventDefault()
sendForm()
})

cardBtn.addEventListener('click', function(){
const cardArray = localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card')) : []; 

    renderCardGoods(cardArray);
    modalCard.style.display = 'flex';
    
});

modalClose.addEventListener('click', function(){
   
    modalCard.style.display = '';
});

modalCard.addEventListener('click', (e)=>{

    if(!e.target.closest('.modal') && e.target.classList.contains('overlay')){
        modalCard.style.display = ''
    }
})
//----------------------------
window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
        modalCard.style.display = ''
    }
})
//-----------------------------
if(goodContaner){
    goodContaner.addEventListener('click', (event)=>{

       if(event.target.closest('.add-to-cart')){
const button = event.target.closest('.add-to-cart');
const buttonSet = button.dataset.id;

addToCard(buttonSet);



         
       } 
       
    })
}
}

cart();



