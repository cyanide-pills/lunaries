
let selectedProductIndex = null;
let cartItem =[];
let allUser = [];

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
    title: "Jacob wrestling with the angel",
    image: "images/paintings/dore2.jpg",
    price: 20000,
    artist: "Gustave Doré",
    dimensiones: "20x24",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
    title: "Jacob wrestling with the angel",
    image: "images/paintings/dore2.jpg",
    price: 20000,
    artist: "Gustave Doré",
    dimensiones: "20x24",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
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
  "product": showProductPage,
  "all_products": showPrints,
  "cart": displayCart,
  "log_in": showLogIn
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


  form.addEventListener("submit", function (e) {
    let valid = true; 

    if (!nameInput.value.trim()) valid = false;
    if (!addressInput.value.trim()) valid = false;
    if (!emailInput.value.trim()) valid = false;
    if (!passwdInput.value.trim()) valid = false;
    if (!numberInput.value.trim()) valid = false;

    if (nameInput && !validateLength(nameInput, 5, 100)) valid = false;
    if (addressInput && !validateLength(addressInput, 10, 100)) valid = false;
    if (emailInput && !validateEmail(emailInput)) valid = false;
    if (passwdInput && !validateLength(passwdInput, 4, 10)) valid = false;
    if (numberInput && !validateLength(numberInput, 4, 10)) valid = false;

    if (!valid) {
      e.preventDefault(); 
    } else {
      e.preventDefault(); 
      saveSignInINFO();  
    }
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
  cartItem.push({'product-title':printName, 'product-price':addPrice})
  console.log(cartItem)
}

function displayCart() {
  let cartHTML = '';
  let cartAmount= 0;
  for (const item of cartItem) {
    cartHTML += `<article class="cart-item"> <p>${item['product-title']} - ${item['product-price']} CLP</p></article>`;
    cartAmount += parseInt(item['product-price']);
  }

  document.getElementById('cart-display').innerHTML = cartHTML;
  document.getElementById('cart-total').innerText = `Total: ${cartAmount} CLP`;
  console.log(cartAmount)


}


function saveSignInINFO() {
  let userEmail = document.getElementById("email").value || "" ;
  let userPasswd = document.getElementById("passwd").value|| "";
  let userName = document.getElementById("name").value|| "";
  let userNumber = document.getElementById("number").value|| "";
  let userAddress = document.getElementById("address").value|| "";

  allUser.push({'email': userEmail, 'passwd': userPasswd, 'name': userName, 'number': userNumber, 'address': userAddress});
  console.log(allUser);

}





function showLogIn() {
  const form = document.getElementById("form"); 
  const emailInput = document.getElementById("email");
  const passwdInput = document.getElementById("passwd");

  if (emailInput) emailInput.addEventListener("input", () => validateEmail(emailInput));
  if (passwdInput) passwdInput.addEventListener("input", () => validateLength(passwdInput, 4, 10));

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true; 

    if (!emailInput.value.trim()) valid = false;
    if (!passwdInput.value.trim()) valid = false;

    if (emailInput && !validateEmail(emailInput)) valid = false;
    if (passwdInput && !validateLength(passwdInput, 4, 10)) valid = false;


    const email = emailInput.value.trim();
    const passwd = passwdInput.value.trim();

    const user = allUser.find(u => u.email === email && u.passwd === passwd);

    if (!user) {
      alert("Datos ingresados son incorrectos o la cuenta no existe.");
      return;
    }

    alert("Ha iniciado sesión!");
  });
}





window.onload = () => {
  loadPage('home'); 
};
