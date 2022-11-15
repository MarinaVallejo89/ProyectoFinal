window.addEventListener('load', loadPage);

function loadPage() {
    document.querySelector('#button').addEventListener('click', async (e) => {
        e.preventDefault();
        const brand = document.querySelector('#selectBrand').value;
        const color = document.querySelector('#selectColor').value;
        const price = document.querySelector('#price').value;
        if (brand || color || price) {
            await getData();
        } else {
            const response = await fetch('http://127.0.0.1:3000/products/');
            const data = await response.json();
            showData(data);
        }
    });
}

async function getData() {
    let request = '';
    const URL_PRODUCTS = 'http://127.0.0.1:3000/products/search?';
    const brand = document.querySelector('#selectBrand').value;
    const color = document.querySelector('#selectColor').value;
    const price = document.querySelector('#price').value;

    if (brand && color && price) {
        request = `${URL_PRODUCTS}brand=${brand.toLowerCase()}&color=${color.toLowerCase()}&price=${price}`;
    } else if (brand && color) {
        request = `${URL_PRODUCTS}brand=${brand.toLowerCase()}&color=${color.toLowerCase()}`;
    } else if (brand && price) {
        request = `${URL_PRODUCTS}brand=${brand.toLowerCase()}&price=${price}`;
    } else if (color && price) {
        request = `${URL_PRODUCTS}color=${color.toLowerCase()}&price=${price}`;
    } else if (brand) {
        request = `${URL_PRODUCTS}brand=${brand.toLowerCase()}`;
    } else if (color) {
        request = `${URL_PRODUCTS}color=${color.toLowerCase()}`;
    } else if (price) {
        request = `${URL_PRODUCTS}price=${price}`;
    } else {
        request = 'http://127.0.0.1:3000/products/';
    }
    const response = await fetch(request);
    const data = await response.json();
    showData(data);
}

function showData(data) {
    document.querySelector('.contTable').style.display = 'flex';
    const table = document.querySelector('.table');

    if (data != null) {
        document.querySelector('#noResults').style.display = 'none';
        document.querySelector('.table').style.display = 'flex';
        const tBody = document.querySelector('#tBody');
        refreshTable(tBody.childElementCount);

        for (let i = 0; i < data.length; i++) {
            const trResults = document.createElement('tr');
            trResults.id = 'resultRow';
            tBody.appendChild(trResults);

            const tBrand = document.createElement('td');
            tBrand.innerHTML = data[i].name;
            trResults.appendChild(tBrand);

            const tColor = document.createElement('td');
            tColor.innerHTML = data[i].color;
            trResults.appendChild(tColor);

            const tPrice = document.createElement('td');
            tPrice.innerHTML = data[i].price;
            trResults.appendChild(tPrice);
        }
    } else {
        table.style.display = 'none';
        document.querySelector('#noResults').innerHTML = 'No results found';
    }
}

function refreshTable(num) {
    const tBody = document.querySelector('#tBody');
    if (num > 0) {
        for (let i = 0; i < num; i++) {
            const row = document.querySelector('#resultRow');
            tBody.removeChild(row);
        }
    }
}
