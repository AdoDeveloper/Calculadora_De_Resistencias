// Función para abrir la pestaña correspondiente y activar el botón seleccionado
function abrirTab(event, tabName) {
  // Ocultar todas las pestañas
  const tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active-tab");
  }

  // Mostrar la pestaña seleccionada
  const selectedTab = document.getElementById(tabName);
  selectedTab.classList.add("active-tab");

  // Obtenemos todos los botones de selección de bandas
  const bandaButtons = document.querySelectorAll(".banda-btn");

  // Desactivamos la clase 'active-btn' en todos los botones
  bandaButtons.forEach((button) => button.classList.remove("active-btn"));

  // Activamos la clase 'active-btn' solo en el botón seleccionado
  event.currentTarget.classList.add("active-btn");
}

// Función que calcula el valor de resistencia total del dispositivo según su configuración
function calcularResistencia(numBandas) {
  // Obtener los valores seleccionados para cada banda
  let banda1, banda2, banda3, multiplicador, tolerancia, ppm;

  if(numBandas === 3){
    banda1 = document.getElementById("banda1_3").value;
    banda2 = document.getElementById("banda2_3").value;
    multiplicador = document.getElementById("multiplicador_3").value;
  }
  else if (numBandas === 4) {
    banda1 = document.getElementById("banda1_4").value;
    banda2 = document.getElementById("banda2_4").value;
    multiplicador = document.getElementById("multiplicador_4").value;
    tolerancia = document.getElementById("tolerancia_4").value;
  } else if (numBandas === 5) {
    banda1 = document.getElementById("banda1_5").value;
    banda2 = document.getElementById("banda2_5").value;
    banda3 = document.getElementById("banda3_5").value;
    multiplicador = document.getElementById("multiplicador_5").value;
    tolerancia = document.getElementById("tolerancia_5").value;
  } else if (numBandas === 6) {
    banda1 = document.getElementById("banda1_6").value;
    banda2 = document.getElementById("banda2_6").value;
    banda3 = document.getElementById("banda3_6").value;
    multiplicador = document.getElementById("multiplicador_6").value;
    tolerancia = document.getElementById("tolerancia_6").value;
    ppm = document.getElementById("ppm_6").value;
  } 

  // Valores correspondientes a cada color para multiplicadores y tolerancia
  const multiplicadoresValores = {
    negro: 1,
    marron: 10,
    rojo: 100,
    naranja: 1000,
    amarillo: 10000,
    verde: 100000,
    azul: 1000000,
    violeta: 10000000,
    gris: 100000000,
    blanco: 1000000000,
    oro: 0.1,
    plata: 0.01,
  };

  const toleranciaValores = {
    marron: 1,
    rojo: 2,
    verde: 0.5,
    azul: 0.25,
    violeta: 0.1,
    gris: 0.05,
    oro: 5,
    plata: 10,
  };

  // Valores de ppm para cada color
  const ppmValores = {
    marron: 100,
    rojo: 50,
    naranja: 15,
    amarillo: 25,
    azul: 10,
    violeta: 5,
  };

  // Valores correspondientes a cada color
  const colores = {
    negro: 0,
    marron: 1,
    rojo: 2,
    naranja: 3,
    amarillo: 4,
    verde: 5,
    azul: 6,
    violeta: 7,
    gris: 8,
    blanco: 9,
  };

  // Calcular el valor de la resistencia
  let valorResistencia;
  if (numBandas === 3) {
    valorResistencia =
      (colores[banda1] * 10 + colores[banda2]) *
      multiplicadoresValores[multiplicador];
  } else if (numBandas === 4) {
    if (banda1 === "negro" && banda2 === "negro") {
      valorResistencia = 0; // Caso especial cuando las bandas 1 y 2 son negras (resultado 0 ohmios)
    } else {
      valorResistencia =
        (colores[banda1] * 10 + colores[banda2]) *
        multiplicadoresValores[multiplicador];
    }
  } else if (numBandas === 5) {
    if (banda1 === "negro" && banda2 === "negro" && banda3 === "negro") {
      valorResistencia = 0; // Caso especial cuando las bandas 1, 2 y 3 son negras (resultado 0 ohmios)
    } else {
      valorResistencia =
        (colores[banda1] * 100 + colores[banda2] * 10 + colores[banda3]) *
        multiplicadoresValores[multiplicador];
    }
  } else if (numBandas === 6) {
    if (banda1 === "negro" && banda2 === "negro" && banda3 === "negro") {
      valorResistencia = 0; // Caso especial cuando las bandas 1, 2 y 3 son negras (resultado 0 ohmios)
    } else {
      valorResistencia =
        (colores[banda1] * 100 + colores[banda2] * 10 + colores[banda3]) *
        multiplicadoresValores[multiplicador];
    }
  }

  // Redondear el resultado a 1 decimal si el multiplicador es 0.1
  if (multiplicadoresValores[multiplicador] === 0.1 && valorResistencia !== 0) {
    valorResistencia = Math.round(valorResistencia * 10) / 10;
  } else if (
    multiplicadoresValores[multiplicador] >= 0.01 &&
    valorResistencia < 1
  ) {
    valorResistencia = parseFloat(valorResistencia.toFixed(2));
  } else if (multiplicadoresValores[multiplicador] >= 0.01) {
    valorResistencia = Math.max(valorResistencia, 0.01); // Establecer valor mínimo de 0.01 ohmios
    valorResistencia = parseFloat(valorResistencia.toFixed(2)); // Redondear a 2 decimal
  } else if (multiplicadoresValores[multiplicador] >= 1) {
    valorResistencia = parseInt(valorResistencia.toFixed(2));
  } else {
    valorResistencia = parseFloat(valorResistencia);
  }

  // Calcular la tolerancia de la resistencia
  let valorTolerancia;
  if (numBandas === 4 || numBandas === 5) {
    valorTolerancia = toleranciaValores[tolerancia];
  } else if (numBandas === 6) {
    valorTolerancia = toleranciaValores[tolerancia];
  }

  // Calcular el valor de ppm
  let valorPpm;
  if (numBandas === 6) {
    valorPpm = ppmValores[ppm];
  }

  // Mostrar los resultados en el div correspondiente
  let resultadoDiv;
  if (numBandas === 3) {
    resultadoDiv = document.getElementById("resultado1");
  } else if (numBandas === 4) {
    resultadoDiv = document.getElementById("resultado2");
  } else if (numBandas === 5) {
    resultadoDiv = document.getElementById("resultado3");
  } else if(numBandas === 6){
    resultadoDiv = document.getElementById('resultado4');
  }

// Agregar el código HTML con los resultados
if(numBandas === 3){
  resultadoDiv.innerHTML = `
  <p>Valor de la resistencia: <span id="valor_resistencia_result_${numBandas}">${valorResistencia} Ohms</span></p>
  <p>Tolerancia: <span id="valor_tolerancia_result">20%</span></p>
`;
}else{
  resultadoDiv.innerHTML = `
  <p>Valor de la resistencia: <span id="valor_resistencia_result_${numBandas}">${valorResistencia} Ohms</span></p>
  <p>Tolerancia: <span id="valor_tolerancia_result">${valorTolerancia}%</span></p>
`;
}


if (valorPpm) {
  resultadoDiv.innerHTML += `<p>Coeficiente de temperatura (PPM): <span id="valor_ppm_result">${valorPpm}</span></p>`;
}

// Agregar el select y el botón de cambiar unidad utilizando flexbox
resultadoDiv.innerHTML += `
  <div style="display: flex; align-items: center;">
    <span style="margin-right: 10px;">Unidad:</span>
    <select id="unidad_select_${numBandas}" onchange="actualizarUnidad(${valorResistencia}, ${numBandas})">
      <option value="Ohms">Ω</option>
      <option value="kiloOhms">kΩ</option>
      <option value="MegaOhms">MΩ</option>
      <option value="GigaOhms">GΩ</option>
    </select>
  </div>
`;

}

// Función para actualizar la unidad del valor de resistencia
function actualizarUnidad(valor, numBandas) {
  // Usando concatenación
  const unidadSelect = document.getElementById("unidad_select_" + numBandas);

  const valorResistencia = valor;

  if (!isNaN(valorResistencia)) {
    const unidadSeleccionada = unidadSelect.value;
    let valorResistenciaConUnidad = valorResistencia;
    let valorResistenciaOriginal = valorResistencia; // Almacenar el valor original antes de aplicar la conversión

    switch (unidadSeleccionada) {
      case "kiloOhms":
        valorResistenciaConUnidad = valorResistencia / 1000;
        break;
      case "MegaOhms":
        valorResistenciaConUnidad = valorResistencia / 1000000;
        break;
      case "GigaOhms":
        valorResistenciaConUnidad = valorResistencia / 1000000000;
        break;
      default:
        break;
    }

    // Redondear el valor a 1 decimal, excepto si la unidad es "Ohms" o es "kiloOhms" y el valor es mayor a 10000
    if (unidadSeleccionada !== "Ohms" && !(unidadSeleccionada === "kiloOhms" && valorResistencia >= 10000) && 
    !(unidadSeleccionada === "MegaOhms" && valorResistencia >= 10000000) &&
    !(unidadSeleccionada === "GigaOhms" && valorResistencia >= 10000000000)) {
      valorResistenciaConUnidad = valorResistenciaConUnidad.toFixed(1);
    }

    const valorResistenciaResult = document.getElementById("valor_resistencia_result_" + numBandas);
    valorResistenciaResult.textContent = `${valorResistenciaConUnidad} ${unidadSeleccionada}`;

    // Actualizar el valor original de la resistencia solo si la unidad seleccionada no es "Ohm"
    if (unidadSeleccionada === "Ohms") {
      valorResistenciaResult.textContent = `${valorResistenciaConUnidad} ${unidadSeleccionada}`;
    } else {
      valorResistenciaResult.dataset.originalValue = ""; // Si es "Ohm", eliminamos el atributo data-original-value
    }
  }
}





function mostrarColor(selectId) {
  var select = document.getElementById(selectId);
  var color = window.getComputedStyle(
    select.options[select.selectedIndex]
  ).backgroundColor;
  var textColor = getTextColorBasedOnBackground(color);

  select.style.backgroundColor = color;
  select.style.color = textColor;
}

function getTextColorBasedOnBackground(bgColor) {
  // Función para obtener el color de texto en base al color de fondo
  var hexColor = rgbToHex(bgColor);
  var r = parseInt(hexColor.substring(1, 3), 16);
  var g = parseInt(hexColor.substring(3, 5), 16);
  var b = parseInt(hexColor.substring(5, 7), 16);
  var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000" : "#FFF"; // Letras negras para colores claros y letras blancas para colores oscuros
}

function rgbToHex(rgb) {
  // Función para convertir color rgb(r, g, b) en #RRGGBB
  var values = rgb.match(/\d+/g);
  var hexValues = values.map(function (value) {
    var hex = parseInt(value).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  });
  return "#" + hexValues.join("");
}

// Colores para 4 bandas

function obtenerColorPorValor3(valor) {
  var valorNumerico = parseFloat(valor);
  var coloresBanda1 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresBanda2 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresMultiplicador = {
    1: "negro",
    10: "marron",
    100: "rojo",
    1000: "naranja",
    10000: "amarillo",
    100000: "verde",
    1000000: "azul",
    10000000: "violeta",
    100000000: "gris",
    1000000000: "blanco",
    0.1: "oro",
    0.01: "plata",
  };

  // Convertimos el valor de resistencia en un array de dígitos
  var valorCadena = valorNumerico.toString();
  let digitos;
  var puntoDecimal = valorCadena.indexOf(".");

  // Si el valor tiene un punto decimal, separar los dígitos antes y después del punto
  if (puntoDecimal !== -1) {
    var parteEntera = valorCadena.substring(0, puntoDecimal);
    var parteDecimal = valorCadena.substring(puntoDecimal + 1);
    digitos = parteEntera.split("").concat(parteDecimal.split("")).map(Number);
  } else {
    digitos = valorCadena.split("").map(Number);
  }

  // Verificar si el valor es un número entero seguido de ".0"
  var valorEntero = parseFloat(parteEntera);
  var esEnteroPuntoCero = !isNaN(valorEntero) && parteDecimal === "0";
  var numEntero = parseInt(valorNumerico);

  // Obtenemos el color para cada banda/multiplicador usando el dígito correspondiente
  var colorBanda1;
  var colorBanda2;
  var multiplicador;

  if (valorNumerico >= 1.1 && puntoDecimal === 1) {
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el primer digito
    colorBanda2 = coloresBanda2[digitos[puntoDecimal]]; // Banda 2 es el primer dígito después del punto
    multiplicador = 0.1; // Multiplicador es x0.1
  } else if (
    valorNumerico >= 0.01 &&
    valorNumerico <= 0.09 &&
    puntoDecimal !== -1
  ) {
    // Caso especial para valores entre 0.01 y 0.09 con punto decimal
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.01 y 0.09
  } else if (
    valorNumerico >= 0.1 &&
    puntoDecimal === 1 &&
    parteDecimal.length === 2
  ) {
    // Caso especial para valores entre 0.10 y 0.99 con punto decimal y dos dígitos después del punto
    colorBanda1 = coloresBanda1[digitos[puntoDecimal]]; // Banda 1 es el primer digito despues del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.10 y 0.99
  } else if (
    valorNumerico >= 0.1 &&
    valorNumerico <= 0.9 &&
    puntoDecimal === 1
  ) {
    // Caso especial para valores entre 0.01 y 0.09 con punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el primer digito antes del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal]]; // Banda 2 es el primer dígito después del punto
    multiplicador = 0.1; // Multiplicador es x0.01 para valores entre 0.01 y 0.09
  } else if (valorNumerico >= 0.1 && puntoDecimal !== -1) {
    // Caso especial para valores entre 0.10 y 0.99 con punto decimal y dos dígitos después del punto
    colorBanda1 = coloresBanda1[digitos[puntoDecimal]]; // Banda 1 es el primer digito despues del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.10 y 0.99
  } else if (
    valorNumerico >= 1.0 &&
    valorNumerico <= 9.0 &&
    puntoDecimal === 1
  ) {
    // Casos especiales para valores como 1.0, 2.0, ..., 9.0
    colorBanda2 = coloresBanda2[digitos[0]]; // Banda 1 es negro (representando el 0)
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 2 es el color del dígito ingresado
    multiplicador = 0.1; // Multiplicador es x1 para valores enteros de un dígito
  } else if (valorNumerico >= 1.0 && valorNumerico <= 9.0) {
    // Casos especiales para valores entre 1.0 y 9.0 (inclusive)
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el color del primer dígito antes del punto
    colorBanda2 = coloresBanda2[0]; // Banda 2 es negro (representando el 0)
    multiplicador = 0.1; // Multiplicador es x0.1
  } else if (puntoDecimal !== -1) {
    // Si el valor tiene punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el primer dígito antes del punto
    colorBanda2 = coloresBanda2[digitos[1]]; // Banda 2 es el color del dígito después del punto
    multiplicador = 0.1; // Multiplicador es x0.1 para valores con punto decimal
  } else if (digitos.length === 1) {
    // Si el valor tiene un solo dígito y no tiene punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el color del primer dígito ingresado
    colorBanda2 = coloresBanda2[0]; // Banda 2 es negro (representando el 0)
    multiplicador = 1; // Multiplicador es x1 para valores enteros de un dígito
  } else {
    // Si el valor tiene más de un dígito y no tiene punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el color del primer dígito
    colorBanda2 = coloresBanda2[digitos[1]]; // Banda 2 es el color del segundo dígito
    multiplicador = Math.pow(10, digitos.length - 2); // Cálculo del multiplicador
  }

  var colorMultiplicador = coloresMultiplicador[multiplicador];

  return {
    banda1: colorBanda1,
    banda2: colorBanda2,
    multiplicador: colorMultiplicador,
  };
}

// Colores para 4 bandas

function obtenerColorPorValor4(valor) {
  var valorNumerico = parseFloat(valor);
  var coloresBanda1 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresBanda2 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresMultiplicador = {
    1: "negro",
    10: "marron",
    100: "rojo",
    1000: "naranja",
    10000: "amarillo",
    100000: "verde",
    1000000: "azul",
    10000000: "violeta",
    100000000: "gris",
    1000000000: "blanco",
    0.1: "oro",
    0.01: "plata",
  };

  // Convertimos el valor de resistencia en un array de dígitos
  var valorCadena = valorNumerico.toString();
  let digitos;
  var puntoDecimal = valorCadena.indexOf(".");

  // Si el valor tiene un punto decimal, separar los dígitos antes y después del punto
  if (puntoDecimal !== -1) {
    var parteEntera = valorCadena.substring(0, puntoDecimal);
    var parteDecimal = valorCadena.substring(puntoDecimal + 1);
    digitos = parteEntera.split("").concat(parteDecimal.split("")).map(Number);
  } else {
    digitos = valorCadena.split("").map(Number);
  }

  // Verificar si el valor es un número entero seguido de ".0"
  var valorEntero = parseFloat(parteEntera);
  var esEnteroPuntoCero = !isNaN(valorEntero) && parteDecimal === "0";
  var numEntero = parseInt(valorNumerico);

  // Obtenemos el color para cada banda/multiplicador usando el dígito correspondiente
  var colorBanda1;
  var colorBanda2;
  var multiplicador;

  if (valorNumerico >= 1.1 && puntoDecimal === 1) {
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el primer digito
    colorBanda2 = coloresBanda2[digitos[puntoDecimal]]; // Banda 2 es el primer dígito después del punto
    multiplicador = 0.1; // Multiplicador es x0.1
  } else if (
    valorNumerico >= 0.01 &&
    valorNumerico <= 0.09 &&
    puntoDecimal !== -1
  ) {
    // Caso especial para valores entre 0.01 y 0.09 con punto decimal
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.01 y 0.09
  } else if (
    valorNumerico >= 0.1 &&
    puntoDecimal === 1 &&
    parteDecimal.length === 2
  ) {
    // Caso especial para valores entre 0.10 y 0.99 con punto decimal y dos dígitos después del punto
    colorBanda1 = coloresBanda1[digitos[puntoDecimal]]; // Banda 1 es el primer digito despues del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.10 y 0.99
  } else if (
    valorNumerico >= 0.1 &&
    valorNumerico <= 0.9 &&
    puntoDecimal === 1
  ) {
    // Caso especial para valores entre 0.01 y 0.09 con punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el primer digito antes del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal]]; // Banda 2 es el primer dígito después del punto
    multiplicador = 0.1; // Multiplicador es x0.01 para valores entre 0.01 y 0.09
  } else if (valorNumerico >= 0.1 && puntoDecimal !== -1) {
    // Caso especial para valores entre 0.10 y 0.99 con punto decimal y dos dígitos después del punto
    colorBanda1 = coloresBanda1[digitos[puntoDecimal]]; // Banda 1 es el primer digito despues del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.10 y 0.99
  } else if (
    valorNumerico >= 1.0 &&
    valorNumerico <= 9.0 &&
    puntoDecimal === 1
  ) {
    // Casos especiales para valores como 1.0, 2.0, ..., 9.0
    colorBanda2 = coloresBanda2[digitos[0]]; // Banda 1 es negro (representando el 0)
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 2 es el color del dígito ingresado
    multiplicador = 0.1; // Multiplicador es x1 para valores enteros de un dígito
  } else if (valorNumerico >= 1.0 && valorNumerico <= 9.0) {
    // Casos especiales para valores entre 1.0 y 9.0 (inclusive)
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el color del primer dígito antes del punto
    colorBanda2 = coloresBanda2[0]; // Banda 2 es negro (representando el 0)
    multiplicador = 0.1; // Multiplicador es x0.1
  } else if (puntoDecimal !== -1) {
    // Si el valor tiene punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el primer dígito antes del punto
    colorBanda2 = coloresBanda2[digitos[1]]; // Banda 2 es el color del dígito después del punto
    multiplicador = 0.1; // Multiplicador es x0.1 para valores con punto decimal
  } else if (digitos.length === 1) {
    // Si el valor tiene un solo dígito y no tiene punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el color del primer dígito ingresado
    colorBanda2 = coloresBanda2[0]; // Banda 2 es negro (representando el 0)
    multiplicador = 1; // Multiplicador es x1 para valores enteros de un dígito
  } else {
    // Si el valor tiene más de un dígito y no tiene punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el color del primer dígito
    colorBanda2 = coloresBanda2[digitos[1]]; // Banda 2 es el color del segundo dígito
    multiplicador = Math.pow(10, digitos.length - 2); // Cálculo del multiplicador
  }

  var colorMultiplicador = coloresMultiplicador[multiplicador];

  return {
    banda1: colorBanda1,
    banda2: colorBanda2,
    multiplicador: colorMultiplicador,
  };
}

// Colores para 5 bandas

function obtenerColorPorValor5(valor) {
  var valorNumerico = parseFloat(valor);
  var coloresBanda1 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresBanda2 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresBanda3 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresMultiplicador = {
    1: "negro",
    10: "marron",
    100: "rojo",
    1000: "naranja",
    10000: "amarillo",
    100000: "verde",
    1000000: "azul",
    10000000: "violeta",
    100000000: "gris",
    1000000000: "blanco",
    0.1: "oro",
    0.01: "plata",
  };

  // Convertimos el valor de resistencia en un array de dígitos
  var valorCadena = valorNumerico.toString();
  var digitos;
  var puntoDecimal = valorCadena.indexOf(".");

  // Si el valor tiene un punto decimal, separar los dígitos antes y después del punto
  if (puntoDecimal !== -1) {
    var parteEntera = valorCadena.substring(0, puntoDecimal);
    var parteDecimal = valorCadena.substring(puntoDecimal + 1);
    digitos = parteEntera.split("").concat(parteDecimal.split("")).map(Number);
  } else {
    digitos = valorCadena.split("").map(Number);
  }

  // Verificar si el valor es un número entero seguido de ".0"
  let valorEntero = parseInt(valorNumerico);
  // Verificar si el valor lleva ".0"
  let esEnteroPuntoCero =
    Number.isInteger(valorNumerico) && valor.toString().endsWith(".0");

  // Obtenemos el color para cada banda/multiplicador usando el dígito correspondiente
  var colorBanda1;
  var colorBanda2;
  var colorBanda3;
  var multiplicador;

  if (valorNumerico >= 0.1 && puntoDecimal === 1 && parteDecimal.length === 2) {
    // Caso especial para valores entre 0.10 y 0.99 con punto decimal y dos dígitos después del punto
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[digitos[puntoDecimal]]; // Banda 1 es el primer digito despues del punto
    colorBanda3 = coloresBanda3[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.10 y 0.99
  } else if (
    valorNumerico >= 0.01 &&
    valorNumerico <= 0.09 &&
    puntoDecimal !== -1
  ) {
    // Caso especial para valores entre 0.01 y 0.09 con punto decimal
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[0]; // Banda 1 es negro (representando el 0)
    colorBanda3 = coloresBanda3[digitos[puntoDecimal + 1]]; // Banda 3 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.01 y 0.09
  } else if (esEnteroPuntoCero) {
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro
    colorBanda2 = coloresBanda2[digitos[0]]; // Banda 2 es el color del primer dígito antes del punto
    colorBanda3 = coloresBanda3[0]; // Banda 3 es negro
    multiplicador = 0.1; // Multiplicador es x0.1 para valores entre 1.0 y 9.0
  } else if (puntoDecimal !== -1 && parteDecimal !== "0") {
    // Caso para valores decimales como 2.3, 4.5, etc.
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro
    colorBanda2 = coloresBanda2[digitos[0]]; // Banda 2 es el primer dígito antes del cero
    colorBanda3 = coloresBanda3[digitos[1]]; // Banda 3 es el dígito después del punto
    multiplicador = 0.1; // Multiplicador es x0.1 para valores decimales
  } else if (
    valorNumerico >= 0.1 &&
    valorNumerico <= 0.9 &&
    puntoDecimal === 1
  ) {
    // Caso especial para valores entre 0.1 y 0.9 con punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el primer digito antes del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal]]; // Banda 2 es el primer dígito después del punto
    colorBanda3 = coloresBanda3[0]; // Banda 1 es negro (representando el 0)
    multiplicador = 0.1; // Multiplicador es x0.1
  } else if (valorNumerico >= 0.1 && puntoDecimal !== -1) {
    // Caso especial para valores con punto decimal
    colorBanda1 = coloresBanda1[digitos[puntoDecimal]]; // Banda 1 es el primer digito despues del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    colorBanda3 = coloresBanda3[0]; // Banda 3 es negro (representando el 0)
    multiplicador = 0.01; // Multiplicador es x0.01
  } else if (digitos.length === 1) {
    // Si el valor tiene un solo dígito y no tiene punto decimal
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[0]; // Banda 2 es negro (representando el 0)
    colorBanda3 = coloresBanda3[digitos[0]]; // Banda 3 es el color del primer dígito ingresado
    multiplicador = 1; // Multiplicador es x1 para valores enteros de un dígito
  } else if (digitos.length === 2) {
    // Si el valor tiene un solo dígito y no tiene punto decimal
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[digitos[0]]; // Banda 2 es el color del primer dígito ingresado
    colorBanda3 = coloresBanda3[digitos[1]]; // Banda 3 es el color del segundo dígito ingresado
    multiplicador = 1; // Multiplicador es x1 para valores enteros de un dígito
  } else {
    // Resto de casos
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el color del primer dígito
    colorBanda2 = coloresBanda2[digitos[1]]; // Banda 2 es el color del segundo dígito
    colorBanda3 = coloresBanda3[digitos[2]]; // Banda 3 es el color del tercer dígito
    multiplicador = Math.pow(10, digitos.length - 3); // Cálculo del multiplicador
  }

  var colorMultiplicador = coloresMultiplicador[multiplicador];

  return {
    banda1: colorBanda1,
    banda2: colorBanda2,
    banda3: colorBanda3,
    multiplicador: colorMultiplicador,
  };
}

// Colores para 6 bandas

function obtenerColorPorValor6(valor) {
  var valorNumerico = parseFloat(valor);
  var coloresBanda1 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresBanda2 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresBanda3 = [
    "negro",
    "marron",
    "rojo",
    "naranja",
    "amarillo",
    "verde",
    "azul",
    "violeta",
    "gris",
    "blanco",
  ];
  var coloresMultiplicador = {
    1: "negro",
    10: "marron",
    100: "rojo",
    1000: "naranja",
    10000: "amarillo",
    100000: "verde",
    1000000: "azul",
    10000000: "violeta",
    100000000: "gris",
    1000000000: "blanco",
    0.1: "oro",
    0.01: "plata",
  };

  // Convertimos el valor de resistencia en un array de dígitos
  var valorCadena = valorNumerico.toString();
  var digitos;
  var puntoDecimal = valorCadena.indexOf(".");

  // Si el valor tiene un punto decimal, separar los dígitos antes y después del punto
  if (puntoDecimal !== -1) {
    var parteEntera = valorCadena.substring(0, puntoDecimal);
    var parteDecimal = valorCadena.substring(puntoDecimal + 1);
    digitos = parteEntera.split("").concat(parteDecimal.split("")).map(Number);
  } else {
    digitos = valorCadena.split("").map(Number);
  }

  // Verificar si el valor es un número entero seguido de ".0"
  let valorEntero = parseInt(valorNumerico);
  // Verificar si el valor lleva ".0"
  let esEnteroPuntoCero =
    Number.isInteger(valorNumerico) && valor.toString().endsWith(".0");

  // Obtenemos el color para cada banda/multiplicador usando el dígito correspondiente
  var colorBanda1;
  var colorBanda2;
  var colorBanda3;
  var multiplicador;

  if (valorNumerico >= 0.1 && puntoDecimal === 1 && parteDecimal.length === 2) {
    // Caso especial para valores entre 0.10 y 0.99 con punto decimal y dos dígitos después del punto
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[digitos[puntoDecimal]]; // Banda 1 es el primer digito despues del punto
    colorBanda3 = coloresBanda3[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01
  } else if (
    valorNumerico >= 0.01 &&
    valorNumerico <= 0.09 &&
    puntoDecimal !== -1
  ) {
    // Caso especial para valores entre 0.01 y 0.09 con punto decimal
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[0]; // Banda 1 es negro (representando el 0)
    colorBanda3 = coloresBanda3[digitos[puntoDecimal + 1]]; // Banda 3 es el segundo dígito después del punto
    multiplicador = 0.01; // Multiplicador es x0.01 para valores entre 0.01 y 0.09
  } else if (esEnteroPuntoCero) {
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro
    colorBanda2 = coloresBanda2[digitos[0]]; // Banda 2 es el color del primer dígito antes del punto
    colorBanda3 = coloresBanda3[0]; // Banda 3 es negro
    multiplicador = 0.1; // Multiplicador es x0.1 para valores entre 1.0 y 9.0
  } else if (puntoDecimal !== -1 && parteDecimal !== "0") {
    // Caso para valores decimales como 2.3, 4.5, etc.
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro
    colorBanda2 = coloresBanda2[digitos[0]]; // Banda 2 es el primer dígito antes del cero
    colorBanda3 = coloresBanda3[digitos[1]]; // Banda 3 es el dígito después del punto
    multiplicador = 0.1; // Multiplicador es x0.1 para valores decimales
  } else if (
    valorNumerico >= 0.1 &&
    valorNumerico <= 0.9 &&
    puntoDecimal === 1
  ) {
    // Caso especial para valores entre 0.1 y 0.9 con punto decimal
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el primer digito antes del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal]]; // Banda 2 es el primer dígito después del punto
    colorBanda3 = coloresBanda3[0]; // Banda 3 es negro (representando el 0)
    multiplicador = 0.1; // Multiplicador es x0.1
  } else if (valorNumerico >= 0.1 && puntoDecimal !== -1) {
    // Caso especial para valores entre 0.01 y 0.09 con punto decimal
    colorBanda1 = coloresBanda1[digitos[puntoDecimal]]; // Banda 1 es el primer dígito después del punto
    colorBanda2 = coloresBanda2[digitos[puntoDecimal + 1]]; // Banda 2 es el segundo dígito después del punto
    colorBanda3 = coloresBanda3[0]; // Banda 3 es negro (representando el 0)
    multiplicador = 0.01; // Multiplicador es x0.01
  } else if (digitos.length === 1) {
    // Si el valor tiene un solo dígito y no tiene punto decimal
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[0]; // Banda 2 es negro (representando el 0)
    colorBanda3 = coloresBanda3[digitos[0]]; // Banda 3 es el color del primer dígito ingresado
    multiplicador = 1; // Multiplicador es x1 para valores enteros de un dígito
  } else if (digitos.length === 2) {
    // Si el valor tiene un solo dígito y no tiene punto decimal
    colorBanda1 = coloresBanda1[0]; // Banda 1 es negro (representando el 0)
    colorBanda2 = coloresBanda2[digitos[0]]; // Banda 2 es el color del primer dígito ingresado
    colorBanda3 = coloresBanda3[digitos[1]]; // Banda 3 es el color del segundo dígito ingresado
    multiplicador = 1; // Multiplicador es x1 para valores enteros de un dígito
  } else {
    // Resto de casos
    colorBanda1 = coloresBanda1[digitos[0]]; // Banda 1 es el color del primer dígito
    colorBanda2 = coloresBanda2[digitos[1]]; // Banda 2 es el color del segundo dígito
    colorBanda3 = coloresBanda3[digitos[2]]; // Banda 3 es el color del tercer dígito
    multiplicador = Math.pow(10, digitos.length - 3); // Cálculo del multiplicador
  }

  var colorMultiplicador = coloresMultiplicador[multiplicador];

  return {
    banda1: colorBanda1,
    banda2: colorBanda2,
    banda3: colorBanda3,
    multiplicador: colorMultiplicador,
  };
}

function calcularColores(numBandas) {
  var valorResistencia;
  if(numBandas === 3){
    valorResistencia = document.getElementById("valor_resistencia_3").value;
    var colores3 = obtenerColorPorValor3(valorResistencia);

    document.getElementById("banda1_3").value = colores3.banda1;
    document.getElementById("banda2_3").value = colores3.banda2;
    document.getElementById("multiplicador_3").value = colores3.multiplicador;
    mostrarColor("banda1_3");
    mostrarColor("banda2_3");
    mostrarColor("multiplicador_3");
  }
  else if (numBandas === 4) {
    valorResistencia = document.getElementById("valor_resistencia_4").value;
    var colores4 = obtenerColorPorValor4(valorResistencia);

    document.getElementById("banda1_4").value = colores4.banda1;
    document.getElementById("banda2_4").value = colores4.banda2;
    document.getElementById("multiplicador_4").value = colores4.multiplicador;
    mostrarColor("banda1_4");
    mostrarColor("banda2_4");
    mostrarColor("multiplicador_4");
  } else if (numBandas === 5) {
    valorResistencia = document.getElementById("valor_resistencia_5").value;
    var colores5 = obtenerColorPorValor5(valorResistencia);

    document.getElementById("banda1_5").value = colores5.banda1;
    document.getElementById("banda2_5").value = colores5.banda2;
    document.getElementById("banda3_5").value = colores5.banda3;
    document.getElementById("multiplicador_5").value = colores5.multiplicador;
    mostrarColor("banda1_5");
    mostrarColor("banda2_5");
    mostrarColor("banda3_5");
    mostrarColor("multiplicador_5");
  } else if (numBandas === 6) {
    valorResistencia = document.getElementById("valor_resistencia_6").value;
    var colores5 = obtenerColorPorValor6(valorResistencia);

    document.getElementById("banda1_6").value = colores5.banda1;
    document.getElementById("banda2_6").value = colores5.banda2;
    document.getElementById("banda3_6").value = colores5.banda3;
    document.getElementById("multiplicador_6").value = colores5.multiplicador;
    mostrarColor("banda1_6");
    mostrarColor("banda2_6");
    mostrarColor("banda3_6");
    mostrarColor("multiplicador_6");
  }
}