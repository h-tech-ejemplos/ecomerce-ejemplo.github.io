const productos = [
    {
        id: "camisa-01",
        titulo: "Camisa 01",
        imagen: 'camisa-01.jpg',
        categoria: {
            nombre: 'Camisas', 
            id: 'camisas'
        },
        precio: 10
    },
    {
        id: "camisa-02",
        titulo: "Camisa 02",
        imagen: 'camisa-02.jpg',
        categoria: {
            nombre: 'Camisas', 
            id: 'camisas'
        },
        precio: 10
    },
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: 'abrigo-01.jpeg',
        categoria: {
            nombre: 'Abrigos', 
            id: 'abrigos'
        },
        precio: 10
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: 'abrigo-02.png',
        categoria: {
            nombre: 'Abrigos', 
            id: 'abrigos'
        },
        precio: 10
    },
    {
        id: "pantalon-01",
        titulo: "Pantalon 01",
        imagen: 'pantalon-01.jpg',
        categoria: {
            nombre: 'Pantalones', 
            id: 'pantalones'
        },
        precio: 10
    },
    {
        id: "pantalon-01",
        titulo: "Pantalon 02",
        imagen: 'pantalon-02.jpg',
        categoria: {
            nombre: 'Pantalones', 
            id: 'pantalones'
        },
        precio: 10
    }

];

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategoria = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
tituloPrincipal.textContent = "Todos los productos";
let botonesAgregar =  document.querySelectorAll('.producto-agregar');
const numerito =   document.querySelector('#numerito');
function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
const div = document.createElement('div');
div.classList.add('producto');
div.innerHTML = `

<img src="${producto.imagen}"  aria-selected="false"   alt="" class="producto-imagen">
<div class='producto-detalles'>
    <h3 class="producto-titulo">${producto.titulo}</h3>

    <p class="producto-precio">Precio: $${producto.precio}</p>
    <button  class="producto-agregar" id="${producto.id}">agregar</button>

</div>



`;
contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
};
cargarProductos(productos);
botonesCategoria.forEach(boton => {
boton.addEventListener("click", (e) => {

botonesCategoria.forEach(boton => boton.classList.remove('active'));
e.currentTarget.classList.add('active');

if(e.currentTarget.id != "todos"){
    const productoCategoria = find(producto => producto.categoria.id === e.currentTarget.id);

const productosBoton = productos.filter(producto => producto.categoria.id  ===  e.currentTarget.id);
let productosTitulo = productos.filter(producto => {
   if( producto.categoria.id === e.currentTarget.id){
    tituloPrincipal.textContent = producto.categoria.nombre;
   } 
} );


cargarProductos(productosBoton);
} else {
 
    cargarProductos(productos);

}

})

});
function actualizarBotonesAgregar(){
    botonesAgregar =  document.querySelectorAll('.producto-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
}
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
let productosEnCarrito;

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){

const idBoton = e.currentTarget.id;
const productoAgregado = productos.find(producto => producto.id === idBoton);




if(productosEnCarrito.some(producto => producto.id === idBoton)){
const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
productosEnCarrito[index].cantidad++;
} else {
    productoAgregado.cantidad = 1;
productosEnCarrito.push(productoAgregado);

}
actualizarNumerito();
localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));


}
function actualizarNumerito(){

    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.textContent = nuevoNumerito;
 
}