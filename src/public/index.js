const socket = io();

const productsContainer = document.getElementById('products');

socket.on('newConnection', (products)=>{
    console.log("Nuevo cliente conectado");
    productsContainer.innerHTML = '';
    productsContainer.innerHTML = products.map(product => {
        return `<p>Id: ${product.id}</p>
        <p>Título": ${product.title}</p>
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
      <p>Título": ${product.title}</p>
      <p>Descripción: ${product.description}</p>
      <p>Código: ${product.code}</p>
      <p>Precio: ${product.price}</p>
      <p>Estado: ${product.status}</p>
      <p>Stock: ${product.stock}</p>
      <p>Categoría: ${product.category}</p>
      <p>Thumbnails: ${product.thumbnails}</p>
      <br>`
});