const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");

   const linkData = () => {
    fetch("/db/db.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  links.forEach(function (link) {
    link.addEventListener("click", (event) => {
        event.preventDefault();
      linkData();
    });
  });

 localStorage.setItem('hello', JSON.stringify({'name': 'ivan'}));
 const result = JSON.parse(localStorage.getItem('hello'));
console.log(result);
console.log(localStorage);
localStorage.removeItem('hello');
console.log(localStorage);
};

getGoods();
