/**
 * Convierte un valor entre metro, pulgada, pie y yarda, redondeando el resultado
 * a 2 decimales y reemplazando comas por puntos antes de operar.
 * @method convertirUnidades
 * @param {string} id - Id del campo que generó el cambio (metro, pulgada, pie o yarda)
 * @param {string} valor - Valor numérico ingresado por el usuario
 * @return {void} No retorna ningún valor, actualiza directamente los inputs del formulario lasUnidades
 */
convertirUnidades = (id, valor) => {
    let met, pul, pie, yar;

    if (valor.includes(",")) {
        valor = valor.replace(",", ".");
    }

    if (isNaN(valor)) {
        alert("El valor ingresado es incorrecto");
        met = "";
        pul = "";
        pie = "";
        yar = "";
    } else if (id === "metro") {
        met = valor;
        pul = valor * 39.3701;
        pie = valor * 3.28084;
        yar = valor * 1.09361;
    } else if (id === "pulgada") {
        met = valor * 0.0254;
        pul = valor;
        pie = valor * 0.08333;
        yar = valor * 0.027778;
    } else if (id === "pie") {
        met = valor * 0.3048;
        pul = valor * 12;
        pie = valor;
        yar = valor * 0.333333;
    } else if (id === "yarda") {
        met = valor * 0.9144;
        pul = valor * 36;
        pie = valor * 3;
        yar = valor;
    }

    document.lasUnidades.unid_metro.value = met === "" ? "" : Math.round(met * 100) / 100;
    document.lasUnidades.unid_pulgada.value = pul === "" ? "" : Math.round(pul * 100) / 100;
    document.lasUnidades.unid_pie.value = pie === "" ? "" : Math.round(pie * 100) / 100;
    document.lasUnidades.unid_yarda.value = yar === "" ? "" : Math.round(yar * 100) / 100;
}

/**
 * Convierte un valor entre grados y radianes utilizando Math.PI y actualiza
 * el campo correspondiente del formulario.
 * @method cambioGrados
 * @param {string} valor - Valor numérico ingresado por el usuario
 * @param {string} unidad - Id del campo que generó el cambio (grados o radianes)
 * @return {void} No retorna ningún valor, actualiza directamente el input del DOM
 */
function cambioGrados(valor, unidad) {
    if (isNaN(valor)) {
        alert("Se ingreso un valor invalido en " + unidad);
        document.getElementById("grados").value = "";
        document.getElementById("radianes").value = "";
    } else if (unidad == "grados") {
        document.getElementById("radianes").value = valor * (Math.PI / 180);
    } else if (unidad == "radianes") {
        document.getElementById("grados").value = valor * (180 / Math.PI);
    }
}

/**
 * Muestra u oculta el div celeste según el radio button seleccionado
 * @method mostrarOcultarDiv
 * @param {string} valor - Valor del radio button seleccionado (val_mostrar o val_ocultar)
 * @return {void} No retorna ningún valor, modifica el estilo display del div
 */
let mostrarOcultarDiv = (valor) => {
    if (valor === "val_mostrar") {
        document.getElementById("unDiv").style.display = "block";
    } else if (valor === "val_ocultar") {
        document.getElementById("unDiv").style.display = "none";
    }
}

/**
 * Suma los dos valores ingresados y muestra el resultado
 * @method sumar
 * @return {void} No retorna ningún valor, actualiza el span de resultado
 */
let sumar = () => {
    let num1 = Number(document.getElementById("nums1").value);
    let num2 = Number(document.getElementById("nums2").value);
    document.getElementById("totalS").innerHTML = num1 + num2;
}

/**
 * Resta los dos valores ingresados y muestra el resultado
 * @method restar
 * @return {void} No retorna ningún valor, actualiza el span de resultado
 */
let restar = () => {
    let num1 = Number(document.getElementById("numr1").value);
    let num2 = Number(document.getElementById("numr2").value);
    document.getElementById("totalR").innerHTML = num1 - num2;
}

/**
 * Multiplica los dos valores ingresados y muestra el resultado
 * @method multiplicar
 * @return {void} No retorna ningún valor, actualiza el span de resultado
 */
let multiplicar = () => {
    let num1 = Number(document.getElementById("numm1").value);
    let num2 = Number(document.getElementById("numm2").value);
    document.getElementById("totalM").innerHTML = num1 * num2;
}

/**
 * Divide los dos valores ingresados y muestra el resultado
 * @method dividir
 * @return {void} No retorna ningún valor, actualiza el span de resultado
 */
let dividir = () => {
    let num1 = Number(document.getElementById("numd1").value);
    let num2 = Number(document.getElementById("numd2").value);
    document.getElementById("totalD").innerHTML = num1 / num2;
}