const socket = io();

const productsContainer = document.getElementById('products');
const form = document.getElementById('form')
const inputTitle = document.getElementById('title')
const inputDescription = document.getElementById('description')
const inputPrice = document.getElementById('price')
const inputStock = document.getElementById('stock')
const inputCategory = document.getElementById('category')
const inputThumbnails = document.getElementById('thumbnails')
const inputCode = document.getElementById('code')

socket.on('newConnection', (products)=>{
    console.log("Nuevo cliente conectado");
    productsContainer.innerHTML = '';
    productsContainer.innerHTML = products.map(product => {
        return `<p>Id: ${product.id}</p>
        <p>Título: ${product.title}</p>
        <p>Descripción: ${product.description}</p>
        <p>Código: ${product.code}</p>
        <p>Precio: ${product.price}</p>
        <p>Estado: ${product.status}</p>
        <p>Stock: ${product.stock}</p>
        <p>Categoría: ${product.category}</p>
        <p>Thumbnails: ${product.thumbnails}</p>
        <br>`
    }).join('  ');
});

socket.on('newProduct', (product)=>{
  productsContainer.innerHTML += 
       `<p>Id: ${product.id}</p>
      <p>Título: ${product.title}</p>
      <p>Descripción: ${product.description}</p>
      <p>Código: ${product.code}</p>
      <p>Precio: ${product.price}</p>
      <p>Estado: ${product.status}</p>
      <p>Stock: ${product.stock}</p>
      <p>Categoría: ${product.category}</p>
      <p>Thumbnails: ${product.thumbnails}</p>
      <br>`
});

socket.on('updProductList', (products) => {
    productsContainer.innerHTML = '';
    productsContainer.innerHTML = products.map(product => {
        return `<p>Id: ${product.id}</p>
        <p>Título: ${product.title}</p>
        <p>Descripción: ${product.description}</p>
        <p>Código: ${product.code}</p>
        <p>Precio: ${product.price}</p>
        <p>Estado: ${product.status}</p>
        <p>Stock: ${product.stock}</p>
        <p>Categoría: ${product.category}</p>
        <p>Thumbnails: ${product.thumbnails}</p>
        <br>`
    }).join('  ');
})

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const code = inputCode.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const category = inputCategory.value;
    const thumbnails = inputThumbnails.value;
    const product = {
        "title": title,
        "price": price,
        "description": description,
        "stock": stock,
        "category": category,
        "thumbnails": thumbnails,
        "code": code
    };
    console.log('newProductFront');
    socket.emit('newProductFront', product);

}