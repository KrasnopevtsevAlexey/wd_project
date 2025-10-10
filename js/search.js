const search = function(){
    const input = document.querySelector('.search-block > input');
    const inputBtn = document.querySelector('.search-block > button');
    console.log(input);
    console.log(inputBtn);

    inputBtn.addEventListener('click', () =>{
        console.log(input.value);
    })
}
search();