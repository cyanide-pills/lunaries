
let selectedProductIndex = null;
let cartAmount = 0;
let cartItem =[];

const items = [
  {
    title: "Jacob wrestling with the angel",
    image: "images/paintings/dore2.jpg",
    price: 20000,
    artist: "Gustave Doré",
    dimensiones: "20x24",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
    title: "The lantern bearers",
    image: "images/paintings/maxfieldparrish1.jpg",
    price: 20000,
    artist: "Maxfield Parrish",
    dimensiones: "20x24",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
    title: "The cactus lover",
    image: "images/paintings/spitzweg1.jpg",
    price: 20000,
    artist: "Carl Spitzweg",
    dimensiones: "20x24",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  }
];


const pageInits = {
  "sign_in": showSignIn,
  "home": showPrints,
  "product": showProductPage
};

function loadPage(pageName) {
  fetch(pageName + '.html')
    .then(response => {
      if (!response.ok) throw new Error("Página no encontrada");
      return response.text();
    })
    .then(html => {
      const content = document.getElementById('content');
      content.className = 'content';
      content.classList.add('page-' + pageName);
      content.innerHTML = html;

      if (pageInits[pageName]) pageInits[pageName]();
    })
    .catch(error => {
      document.getElementById('content').innerHTML = '<p>Página no encontrada.</p>';
      console.error(error);
    });
}


function showPrints() {
  let itemsHTML = '';

  items.forEach((item, index) => {
    itemsHTML += `
      <button class="print-product" data-index="${index}">
        <article class="print-card">
          <div class="print-mockup-1">
            <img src="${item.image}" class="print-image">
          </div>
          <div class="print-info">
            <p class="print-name">${item.title}</p>
            <p>${item.price} CLP</p>
          </div>
        </article>
      </button>`;
  });

  document.getElementById('item-list').innerHTML = itemsHTML;


  document.querySelectorAll(".print-product").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedProductIndex = btn.getAttribute("data-index");
      loadPage("product");
    });
  });


  const buttonRight = document.getElementById('scroll-right');
  const buttonLeft = document.getElementById('scroll-left');

  if (buttonRight) {
    buttonRight.onclick = () => {
      document.getElementById('item-list').scrollLeft += 250;
    };
  }

  if (buttonLeft) {
    buttonLeft.onclick = () => {
      document.getElementById('item-list').scrollLeft -= 250;
    };
  }
}


function showProductPage() {
  if (selectedProductIndex === null) return;

  const item = items[selectedProductIndex];

  document.getElementById("product-painting").src = item.image;
  document.querySelector(".product-details h2").textContent = item.title;
  document.querySelector(".product-details .artist").textContent = item.artist;
  document.querySelector(".product-details .price").textContent = item.price;
  document.querySelector(".specifications-text").innerHTML = `
    <p>Dimensiones: ${item.dimensiones}</p>
    <p>Color de marco: Negro</p>
    <p>Stock: 10</p>
  `;
  document.querySelector(".description").textContent = item.descripcion;
}


function showSignIn() {
  const form = document.getElementById("form");
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const emailInput = document.getElementById("email");
  const passwdInput = document.getElementById("passwd");
  const numberInput = document.getElementById("number");

  if (nameInput) nameInput.addEventListener("input", () => validateLength(nameInput, 5, 100));
  if (addressInput) addressInput.addEventListener("input", () => validateLength(addressInput, 10, 100));
  if (emailInput) emailInput.addEventListener("input", () => validateEmail(emailInput));
  if (passwdInput) passwdInput.addEventListener("input", () => validateLength(passwdInput, 4, 10));
  if (numberInput) numberInput.addEventListener("input", () => validateLength(numberInput, 1, 20));

  if (!form) return;

  form.addEventListener("submit", function (e) {
    let valid = true;

    if (nameInput && !validateLength(nameInput, 5, 100)) valid = false;
    if (addressInput && !validateLength(addressInput, 10, 100)) valid = false;
    if (emailInput && !validateEmail(emailInput)) valid = false;
    if (passwdInput && !validateLength(passwdInput, 4, 10)) valid = false;
    if (numberInput && !validateLength(numberInput, 4, 10)) valid = false;

    if (!valid) e.preventDefault();
  });
}


function validateLength(input, minLength, maxLength) {
  const length = input.value.trim().length;
  const valid = length >= minLength && length <= maxLength;

  input.classList.toggle("is-valid", valid);
  input.classList.toggle("is-invalid", !valid);

  return valid;
}

function validateEmail(input, minLength = 1, maxLength = 100) {
  const value = input.value.trim();
  const length = value.length;
  const emailAdresses = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  const errorDiv = input.nextElementSibling;
  let valid = true;

  if (length < minLength) {
    valid = false;
    if (errorDiv) errorDiv.textContent = 'Ingrese un correo electrónico.';
  } else if (length > maxLength) {
    valid = false;
    if (errorDiv) errorDiv.textContent = 'El correo no debe superar los 100 caracteres.';
  } else if (!emailAdresses.some(word => value.includes(word))) {
    valid = false;
    if (errorDiv) errorDiv.textContent = 'Debe incluir: @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  }

  input.classList.toggle("is-valid", valid);
  input.classList.toggle("is-invalid", !valid);

  return valid;
}

function addToCart() {
  const addPrice= document.getElementById('price').textContent
  const printName = document.querySelector('.product-details h2').textContent
  cartAmount += parseInt(addPrice);
  cartItem.push(printName)
  console.log(cartAmount)
  console.log(cartItem)
}


window.onload = () => {
  loadPage('product'); 
};
