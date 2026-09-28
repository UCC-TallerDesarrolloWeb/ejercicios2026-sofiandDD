/**
 * Formatea un número como precio en formato moneda argentina ($3.123,45)
 * @method formatearPrecio
 * @param {number} precio - Valor numérico a formatear
 * @return {string} Precio formateado como cadena de texto
 */
let formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(precio);
}

/**
 * Obtiene el carrito guardado en localStorage
 * @method obtenerCarrito
 * @return {Array} Array de objetos {nombre, cantidad}
 */
let obtenerCarrito = () => {
    let carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}

/**
 * Guarda el carrito en localStorage
 * @method guardarCarrito
 * @param {Array} carrito - Array de objetos {nombre, cantidad}
 * @return {void}
 */
let guardarCarrito = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/**
 * Agrega un producto al carrito. Si ya existe, incrementa su cantidad.
 * @method agregarAlCarrito
 * @param {string} nombre - Nombre del producto a agregar
 * @return {void}
 */
let agregarAlCarrito = (nombre) => {
    let carrito = obtenerCarrito();
    let item = carrito.find((p) => p.nombre === nombre);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ nombre: nombre, cantidad: 1 });
    }
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

/**
 * Elimina un producto del carrito por completo
 * @method eliminarDelCarrito
 * @param {string} nombre - Nombre del producto a eliminar
 * @return {void}
 */
let eliminarDelCarrito = (nombre) => {
    let carrito = obtenerCarrito();
    let index = carrito.findIndex((p) => p.nombre === nombre);
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    if (document.getElementById("listaCarrito")) {
        renderizarCarrito();
    }
}

/**
 * Vacía completamente el carrito
 * @method vaciarCarrito
 * @return {void}
 */
let vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
    if (document.getElementById("listaCarrito")) {
        renderizarCarrito();
    }
}

/**
 * Actualiza el contador de productos que se muestra junto al link del carrito
 * @method actualizarContadorCarrito
 * @return {void}
 */
let actualizarContadorCarrito = () => {
    let carrito = obtenerCarrito();
    let total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    let contador = document.getElementById("contadorCarrito");
    if (contador) {
        contador.innerHTML = total;
    }
}

/**
 * Muestra el detalle de un producto dentro del dialog
 * @method verDetalle
 * @param {string} nombre - Nombre del producto a mostrar
 * @return {void}
 */
let verDetalle = (nombre) => {
    let producto = productos.find((p) => p.nombre === nombre);
    document.getElementById("dialogContenido").innerHTML = `
        <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.description}</p>
        <p><strong>Marca:</strong> ${producto.marca}</p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
        <p><strong>Precio:</strong> ${formatearPrecio(producto.precio)}</p>
    `;
    document.getElementById("dialogDetalle").showModal();
}

/**
 * Cierra el dialog de detalle de producto
 * @method cerrarDialog
 * @return {void}
 */
let cerrarDialog = () => {
    document.getElementById("dialogDetalle").close();
}

/**
 * Genera el HTML de una tarjeta de producto
 * @method crearTarjeta
 * @param {Object} producto - Objeto del producto
 * @return {string} HTML de la tarjeta
 */
let crearTarjeta = (producto) => {
    return `
        <div>
            <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${formatearPrecio(producto.precio)}</p>
            <button type="button" onclick="verDetalle('${producto.nombre}')">Ver detalle de Producto</button>
            <button type="button" onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
        </div>
    `;
}

/**
 * Renderiza la lista de productos recibida dentro del main
 * @method renderizarProductos
 * @param {Array} lista - Array de productos a renderizar
 * @return {void}
 */
let renderizarProductos = (lista) => {
    let main = document.querySelector("main");
    main.innerHTML = lista.map((producto) => crearTarjeta(producto)).join("");
}

/**
 * Aplica los filtros de búsqueda, precio, marca y categoría sobre el catálogo,
 * y ordena el resultado según lo elegido por el usuario
 * @method aplicarFiltros
 * @return {void}
 */
let aplicarFiltros = () => {
    let texto = document.getElementById("search").value.toLowerCase();
    let precioMin = document.getElementById("price-min").value;
    let precioMax = document.getElementById("price-max").value;
    let marcaSeleccionada = document.getElementById("marca").value;
    let categoriasSeleccionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map((c) => c.value);

    let resultado = productos.filter((producto) => {
        let coincideTexto = producto.nombre.toLowerCase().includes(texto);
        let coincideMin = precioMin === "" || producto.precio >= Number(precioMin);
        let coincideMax = precioMax === "" || producto.precio <= Number(precioMax);
        let coincideMarca = marcaSeleccionada === "" || producto.marca === marcaSeleccionada;
        let coincideCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(producto.categoria);
        return coincideTexto && coincideMin && coincideMax && coincideMarca && coincideCategoria;
    });

    resultado = ordenarLista(resultado);
    renderizarProductos(resultado);
}

/**
 * Ordena un array de productos según la opción elegida en el select de orden
 * @method ordenarLista
 * @param {Array} lista - Array de productos a ordenar
 * @return {Array} Array ordenado
 */
let ordenarLista = (lista) => {
    let orden = document.getElementById("orden").value;
    let copia = [...lista];
    if (orden === "precio-asc") {
        copia.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-desc") {
        copia.sort((a, b) => b.precio - a.precio);
    } else if (orden === "nombre-az") {
        copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === "nombre-za") {
        copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
    return copia;
}

/**
 * Llena el select de marcas con las marcas únicas de los productos
 * @method cargarMarcas
 * @return {void}
 */
let cargarMarcas = () => {
    let select = document.getElementById("marca");
    if (!select) return;
    let marcas = [...new Set(productos.map((p) => p.marca))];
    marcas.forEach((marca) => {
        let option = document.createElement("option");
        option.value = marca;
        option.innerHTML = marca;
        select.appendChild(option);
    });
}

/**
 * Función que se ejecuta al cargar productos.html: renderiza el catálogo completo,
 * carga las marcas disponibles y actualiza el contador del carrito
 * @method iniciarCatalogo
 * @return {void}
 */
let iniciarCatalogo = () => {
    renderizarProductos(productos);
    cargarMarcas();
    actualizarContadorCarrito();
}

/**
 * Genera el HTML de una fila del carrito
 * @method crearFilaCarrito
 * @param {Object} item - Objeto {nombre, cantidad} del carrito
 * @return {string} HTML de la fila
 */
let crearFilaCarrito = (item) => {
    let producto = productos.find((p) => p.nombre === item.nombre);
    let subtotal = producto.precio * item.cantidad;
    return `
        <div>
            <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: ${formatearPrecio(producto.precio)}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: ${formatearPrecio(subtotal)}</p>
            <button type="button" onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar producto</button>
        </div>
    `;
}

/**
 * Renderiza el listado completo del carrito y el total a pagar
 * @method renderizarCarrito
 * @return {void}
 */
let renderizarCarrito = () => {
    let carrito = obtenerCarrito();
    let lista = document.getElementById("listaCarrito");
    lista.innerHTML = carrito.map((item) => crearFilaCarrito(item)).join("");

    let total = carrito.reduce((acc, item) => {
        let producto = productos.find((p) => p.nombre === item.nombre);
        return acc + producto.precio * item.cantidad;
    }, 0);
    document.getElementById("totalCarrito").innerHTML = formatearPrecio(total);
}

/**
 * Función que se ejecuta al cargar carrito.html: renderiza el carrito y el contador
 * @method iniciarCarrito
 * @return {void}
 */
let iniciarCarrito = () => {
    renderizarCarrito();
    actualizarContadorCarrito();
}