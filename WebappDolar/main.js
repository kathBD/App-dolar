let PriceBcv = 0;
let PriceDol = 0;
let DateBcv = "";
let DateDol = "";
let status = 1;
let Price = 0;

const divDate = document.getElementById("fecha");
const divPrice = document.getElementById("price");
const inputBs = document.getElementById("input-bs");
const inputDol = document.getElementById("input-dolar");
const buttonChange = document.getElementById("change");

// Deshabilitar el botón
buttonChange.disabled = true;

// URL de la API
const urlBcv = 'https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv';
const urlDol = 'https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/enparalelovzla';

// Realizar la petición fetch
// Función para obtener datos y actualizar la interfaz
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Propaga el error para manejarlo en otro lugar si es necesario
    }
}

// Obtener datos para el dólar
fetchData(urlDol)
    .then(data => {
        PriceDol = data.price;
        DateDol = data.last_update;
        divDate.innerHTML = DateDol;
        divPrice.innerHTML = PriceDol;
        inputBs.value = PriceDol;
        inputDol.value = "1.00"; // Asegurémonos de que sea una cadena
        Price = PriceDol;
    })
    .catch(error => {
        console.error("Error fetching dollar data:", error);
    });

// Obtener datos para el BCV
fetchData(urlBcv)
    .then(data => {
        PriceBcv = data.monitors.usd.price;
        DateBcv = `${data.datetime.date}<br>${data.datetime.time}`;
        buttonChange.disabled = false;
    })
    .catch(error => {
        console.error("Error fetching BCV data:", error);
    });



buttonChange.addEventListener("click", () => {
    if (status === 1) {
      buttonChange.textContent = "BCV";
      divDate.textContent = DateBcv;
      divPrice.textContent = PriceBcv;
      inputBs.value = PriceBcv;
      inputDol.value = "1.00"; // Asegurémonos de que sea una cadena
      status = 2;
      Price = PriceBcv;
    } else {
      buttonChange.textContent = "PARALELO";
      divDate.textContent = DateDol;
      divPrice.textContent = PriceDol;
      inputBs.value = PriceDol;
      inputDol.value = "1.00"; // También aquí
      status = 1;
      Price = PriceDol;
    }
  });
  

function calculadora(modo) {
  const dolares = inputDol.value;
  const bolivares = inputBs.value;
  if (modo == 1) {
    const resultado = Price * dolares;
    inputBs.value = resultado.toFixed(2);
  }else{
    const resultado = bolivares / Price;
    inputDol.value = resultado.toFixed(2);
  }
}

inputDol.addEventListener("input", () => {
  calculadora(1);
});

inputBs.addEventListener("input", () => {
  calculadora(0);
});


