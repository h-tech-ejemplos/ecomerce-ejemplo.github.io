let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones  = document.querySelector('#carrito-acciones');
const contenedorTotal = document.querySelector('#total');
let botonesEliminar;
const botonVaciar = document.querySelector('.carrito-acciones-vaciar');
const botonComprar = document.querySelector('.carrito-acciones-comprar');
function cargarProductosCarrito(){
if(productosEnCarrito && productosEnCarrito.length > 0){

contenedorCarritoVacio.classList.add('disabled');
contenedorProductos.classList.remove('disabled');
contenedorCarritoAcciones.classList.remove('disabled');
contenedorProductos.innerHTML = "";
productosEnCarrito.forEach(producto => {
  const div = document.createElement('div');
div.classList.add('carrito-producto');
div.innerHTML = `<img src="${producto.imagen}" alt=""  aria-selected="false"    class="carrito-producto-imagen">
<div class="carrito-nombre">
    <small>Titulo</small>
    <h3>${producto.titulo}</h3>
</div>
<div class="carrito-producto-cantidad">
    <small>Cantidad</small>
    <h3>${producto.cantidad}</h3>
</div>
<div class="carrito-producto-precio">
    <small>Precio</small>
    <p>$${producto.precio}</p>
    <small>SubTotal</small>
<p>$${producto.precio * producto.cantidad}</p>
</div>


<button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button>
`;
contenedorProductos.append(div);
});


} else {
    contenedorCarritoVacio.classList.remove('disabled');
    contenedorProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
}
actualizarBotonesEliminar();
actualizarTotal();
}
cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;

    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
productosEnCarrito.length = 0;
localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
cargarProductosCarrito();
}
function actualizarTotal(){
   let montoCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
total.textContent = `$${montoCalculado}`;
}
botonComprar.addEventListener("click", hacerCompra);
function hacerCompra(){
    let vendedor = "jheralf09@gmail.com";
    const divFormulario = document.createElement('form');
    divFormulario.action = "https://formspree.io/f/moqzpryy";
    divFormulario.method = "POST";
    divFormulario.classList.add("formulario")
    divFormulario.innerHTML = `
 <h1>Check-In</h1>  
 <p>NOTA: COLOQUE UN EMAIL VALIDO, NOS COMUNICAREMOS CON USTED A PARTIR DEL MISMO. AL HACER EL PAGO CORRESPONDIENTE, NOS COMUNICAREMOS CON USTED PARA CONCORDAR ENVIO Y VALIDACION</p>
 <h3>Nombre:</h3>
    <input type="text"   class="input"   value="" name="nombre"  placeholder="Nombre">
    <h3>Email:</h3>
    <input type="email"  class="input" value="" name="email"  placeholder="Email">
    <h3>Productos Ordenados:</h3>

  

    `;
   // <input type="text" value="${producto.titulo}(${producto.precio * producto.cantidad})" id="productosComprados" readonly placeholder="Productos Ordenados" readonly>
  //  <input type="text" value="" id="totalComprado" readonly placeholder="Total Comprado">
productosEnCarrito.reduce((acc, producto) => {
let input = document.createElement('input');
input.type = "text";
input.name = producto.id;
input.readOnly = true;
input.value = producto.titulo + "(x" + producto.cantidad + ")" + "=" + ' ' + "$" + producto.cantidad * producto.precio;
input.classList.add('input');

    

  
divFormulario.append(input);


}, 0);  
let subTotal = document.createElement('input');
subTotal.type = "number";
subTotal.id = "Pago-total"
subTotal.readOnly = true;
subTotal.value = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
subTotal.classList.add('input');
let h3 = document.createElement('h3');
h3.textContent = "Total a pagar:";
divFormulario.append(h3);
divFormulario.append(subTotal);
let botonCheck = document.createElement('input');
botonCheck.type = "submit";
botonCheck.id = "enviar";
botonCheck.value = "Concluir compra";
botonCheck.classList.add('input');
divFormulario.append(botonCheck);
contenedorProductos.append(divFormulario);
contenedorCarritoAcciones.classList.add('disabled');

botonCheck.addEventListener("click", () => {
contenedorProductos.classList.add('disabled');
contenedorCarritoVacio.classList.remove('disabled');
contenedorCarritoVacio.textContent = "Su orden acaba de ser enviada a nosotros, al verificar el pago nos comunicaremos con usted via email, Gracias por su Compra!";
vaciarCarrito();
let urlCompra =   window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=" + vendedor + "&currency_code=USD&amount=" + subTotal.value + "&item_name=compra en Linea");

});
}