window.onload = () => {
  loadPage('sign_in');
};

const items = [
  { title: "Gustave Doré", image: "images/paintings/dore2.jpg", precio: 20000 },
  { title: "Maxfield Parrish", image: "images/paintings/maxfieldparrish1.jpg", precio: 20000 },
  { title: "William Merrit Chase", image: "images/paintings/williammerrit1.jpg", precio: 20000 }
];

const pageInits = {
  "sign_in": initSignInPage,
  "home": showPrints
};

function validateLength(input, minLength, maxLength) {
  const length = input.value.trim().length;

  if (length >= minLength && length <= maxLength) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

function validateEmail(input, minLength = 1, maxLength = 100) {
  const value = input.value.trim();
  const length = value.length;
  const emailAdresses = [
    "@duoc.cl", "@profesor.duoc.cl", "@gmail.com"
  ];

  const errorDiv = input.nextElementSibling; 
  if (length < minLength) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    if (errorDiv) errorDiv.textContent = 'Ingrese un correo electrónico.';
  } else if (length > maxLength) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    if (errorDiv) errorDiv.textContent = 'El correo no debe superar los 100 caracteres.';
  } else if (!emailAdresses.some(word => value.includes(word))) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    if (errorDiv) errorDiv.textContent = 'Debe incluir: @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}



function initSignInPage() {

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



  if (!form) return; // exit early if no form

  form.addEventListener("submit", function (e) {
    let valid = true;

    if (nameInput && !validateLength(nameInput, 5, 100)) valid = false;
    if (addressInput && !validateLength(addressInput, 10, 100)) valid = false;
    if (emailInput && !validateEmail(emailInput)) valid = false;
    if (passwdInput && !validateLength(passwdInput, 4, 10)) valid = false;
    if (numberInput && !validateLength(numberInput, 4, 10)) valid = false;


    if (!valid) {
      e.preventDefault(); 
    }
  });

}


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

      // Call page-specific init if exists
      if (pageInits[pageName]) pageInits[pageName]();
    })
    .catch(error => {
      document.getElementById('content').innerHTML = '<p>Error.</p>';
      console.error(error);
    });
}

function showPrints() {
  let itemsHTML = '';
  items.forEach(item => {
    itemsHTML += 
      `<article id="print-card">
        <div class="print-mockup-1">
          <img src="${item.image}" id="print-image">
        </div>
        <p>${item.title}</p>
      </article>`;
  });
  document.getElementById('item-list').innerHTML = itemsHTML;
}