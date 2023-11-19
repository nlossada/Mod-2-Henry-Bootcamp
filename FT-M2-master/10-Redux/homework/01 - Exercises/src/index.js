const redux = require("redux");
const contador = require("./reducer");
const { incremento, decremento } = require("./actions");
const reducer = require("./reducer/index")

// En esta línea creamos nuestro store. Pasándole como parámetro nuestro Reducer
var store = redux.createStore(contador);

// Obtenemos el elemento con el id `valor`.
const valor = document.querySelector("#valor");

// Esta función nos va a servir para actualizar nuestro DOM con el valor que tengamos en nuestro Store.
// En el primer render y cada vez que nos subscribamos al Store.
// Utilizamos el elemento obtenido arriba para mostrar el State.
function renderContador() {
  // Obtenemos la propiedad 'contador' de nuestro store:
  // Seteamos el número obtenido como texto dentro del elemento con id 'valor':

  const cont = store.getState().contador
  const p = document.createElement("p")
  p.innerHTML = cont;
  valor.appendChild(p)
}

// Ejecutamos la función 'renderContador':
renderContador()

// Nos subscribimos al store pasándole la misma función. Así cada vez que llegue una acción, ejecutamos la función:
store.subscribe(renderContador)


// Por último, utilizamos los botones de nuestro HTML para que cada vez que hagamos click,
// hagan un dispatch al store de la acción correspondiente:

const btnIncremento = document.querySelector("#incremento")
const btnDecremento = document.querySelector("#decremento")
const btnIncreImpar = document.querySelector("#incrementoImpar")
const btnIncreAsync = document.querySelector("#incrementoAsync")

btnIncremento("click", store.dispatch)
btnDecremento("click", store.dispatch)

