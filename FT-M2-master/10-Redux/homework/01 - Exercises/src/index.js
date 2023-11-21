const redux = require("redux");
const contador = require("./reducer");
const { incremento, decremento } = require("./actions");
const reducer = require("./reducer/index");
const { DECREMENTO } = require("./action-types");

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

  const currentState = store.getState().contador
  const p = document.createElement("p")
  valor.innerHTML = currentState;

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

btnIncremento.addEventListener("click", () => {
  store.dispatch(incremento()) //tmb puedo enviar {type:"decremento"}
})
btnDecremento.addEventListener("click", () => {
  store.dispatch(decremento())  //ejecuto la función para enviar el objeto, ver func
})

//pasar funcion pura, a mismo input, mismo output, por eso tengo que hacer OTRA funcion nueva
btnIncreImpar.addEventListener("click", () => {
  const currentState = store.getState().contador
  // solo si es impar ejecutar
  if (currentState % 2 === 1) store.dispatch(incremento())
})

// que espere y luego sume... funcion PURA, definir nuevamente
const incrementoAsync = () => {
  setTimeout(() => {
    store.dispatch(incremento())
  }, 2000)
}
btnIncreAsync.addEventListener("click", () => {
  incrementoAsync() //tmb puedo enviar {type:"decremento"}
})

