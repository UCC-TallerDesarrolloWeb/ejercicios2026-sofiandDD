const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description: "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-manos.webp",
  },
];

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
 * Recorre el array de productos y arma una tarjeta <div> por cada uno dentro del main
 * @method mostrarCatalogo
 * @param {Array} lista - Array de productos a mostrar (por defecto, todos)
 * @return {void}
 */
let mostrarCatalogo = (lista = productos) => {
    let main = document.querySelector("main");
    let html = "";
    lista.forEach((producto) => {
        html += `
            <div>
                <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${formatearPrecio(producto.precio)}</p>
                <button type="button" onclick="mostrarModal('${producto.nombre}')">Ver detalle de Producto</button>
                <button type="button" onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
            </div>
        `;
    });
    main.innerHTML = html;
}

/**
 * Muestra el modal con el detalle del producto seleccionado
 * @method mostrarModal
 * @param {string} nombre - Nombre del producto a mostrar
 * @return {void}
 */
let mostrarModal = (nombre) => {
    let producto = productos.find((p) => p.nombre === nombre);
    document.getElementById("modalContenido").innerHTML = `
        <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.description}</p>
        <p><strong>Marca:</strong> ${producto.marca}</p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
        <p><strong>Precio:</strong> ${formatearPrecio(producto.precio)}</p>
    `;
    document.getElementById("modal").style.display = "block";
}

/**
 * Cierra el modal de detalle de producto
 * @method cerrarModal
 * @return {void}
 */
let cerrarModal = () => {
    document.getElementById("modal").style.display = "none";
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
        mostrarCarrito();
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
        mostrarCarrito();
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
 * Renderiza el listado completo del carrito y el total a pagar
 * @method mostrarCarrito
 * @return {void}
 */
let mostrarCarrito = () => {
    let carrito = obtenerCarrito();
    let lista = document.getElementById("listaCarrito");
    let html = "";
    let total = 0;

    carrito.forEach((item) => {
        let producto = productos.find((p) => p.nombre === item.nombre);
        let subtotal = producto.precio * item.cantidad;
        total += subtotal;
        html += `
            <div>
                <img src="https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${formatearPrecio(producto.precio)}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Subtotal: ${formatearPrecio(subtotal)}</p>
                <button type="button" onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar producto</button>
            </div>
        `;
    });

    lista.innerHTML = html;
    document.getElementById("totalCarrito").innerHTML = formatearPrecio(total);
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

    let orden = document.getElementById("orden").value;
    if (orden === "precio-asc") {
        resultado.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-desc") {
        resultado.sort((a, b) => b.precio - a.precio);
    } else if (orden === "nombre-az") {
        resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === "nombre-za") {
        resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    mostrarCatalogo(resultado);
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
 * Función que se ejecuta al cargar productos.html
 * @method iniciarCatalogo
 * @return {void}
 */
let iniciarCatalogo = () => {
    mostrarCatalogo();
    cargarMarcas();
    actualizarContadorCarrito();
}

/**
 * Función que se ejecuta al cargar carrito.html
 * @method iniciarCarrito
 * @return {void}
 */
let iniciarCarrito = () => {
    mostrarCarrito();
    actualizarContadorCarrito();
}