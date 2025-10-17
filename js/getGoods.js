//const { createElement } = require("react");

const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");
  const more = document.querySelector('.more');

  const renderGoods = (hello) => {
    const goodContaner = document.querySelector(".long-goods-list");

    goodContaner.innerHTML = '';
    hello.forEach((e) => {
      const newBlock = document.createElement("div");
      newBlock.classList.add("col-lg-3");
      newBlock.classList.add("col-sm-6");

      newBlock.innerHTML = `
    <div class="goods-card">
						<span class="label ${e.label ? null : 'd-none'}">${e.label}</span>
                        <img src="db/${e.img}" alt="${e.name}" class="goods-image">
						<h3 class="goods-title">${e.name}</h3>
						<p class="goods-description">${e.description}</p>
						<button class="button goods-card-btn add-to-cart" data-id="${e.id}">
					    <span class="button-price">$${e.price}</span>
						</button>
					</div>
    
    `;
    goodContaner.append(newBlock);
    
    });
    
  };

  const linkData = (text, value) => {
    fetch("/db/db.json")
      .then((response) => response.json())
      .then((data) => {
        const array = text ? data.filter((item) => item[text] === value) : data;

        localStorage.setItem("hello", JSON.stringify(array));
        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        } else {
          renderGoods(array);
        }
      });
  };

  links.forEach(function (link) {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const linkValue = link.textContent;
      const setItem = link.dataset.field;
      //console.log(setItem);
      linkData(setItem, linkValue);
    });
  });
  if (localStorage.getItem("hello")) {
    renderGoods(JSON.parse(localStorage.getItem("hello")));
  }
  //  localStorage.setItem('hello', JSON.stringify({'name': 'ivan'}));
  //  const result = JSON.parse(localStorage.getItem('hello'));
  // console.log(result);
  console.log(localStorage);
  // localStorage.removeItem('hello');
  // console.log(localStorage);
if(more){
    more.addEventListener('click', (event)=>{
      event.preventDefault();

     
      linkData();  
    })
}
  
};

getGoods();
