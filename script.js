const items= [
    {
        title: "Gustave Doré",
        image: "images/dore2.jpg",
        precio: 20.000
    },

    {
        title: "Maxfield Parrish",
        image: "images/maxfieldparrish1.jpg",
        precio: 20.000
    },

    {
        title: "William Merrit Chase",
        image: "images/williammerrit1.jpg",
        precio: 20.000
    }
]

window.onload = () => {
  loadPage('home');
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

            if (pageName === 'home') {
                showPrints(); // now #item-list exists
            }
        })
        .catch(error => {
            document.getElementById('content').innerHTML = '<p>Error.</p>';
            console.error(error);
        });
}


function showPrints(){
    let itemsHTML = '';
    items.forEach(item => {
        itemsHTML += 
        `<article id= "print-card">
            <div class="print-mockup-1">
                <img src="${item.image}" id="print-image">
            </div>
            <p>${item.title}</p>
        </article>`;
    });
    document.getElementById('item-list').innerHTML = itemsHTML;
}

