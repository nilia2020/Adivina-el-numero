//Declaración e inicialización de variables

// Se asigna el número al azar entre 1 y 100 a la variable randomNumber
let randomNumber = Math.floor(Math.random() * 100) + 1;
// párrafos de resultado en el HTML. Por eso uso constantes.
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
//Referencias a las entradas de texto y el botón de enviar del formulario
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
// Contador de intentos
let guessCount = 1;
//Botón de reinicio
let resetButton;

//Comprobar la respuesta del usuario

function checkGuess() {
  //almacena el número introducido. La función number asegura que sea un número
  let userGuess = Number(guessField.value);
  // Este condiconal evalua si es el primer intento y agrega un mensaje
  if (guessCount === 1) {
    guesses.textContent = "Intentos anteriores: ";
  }
  //Agrega el númnero introducido al final del párrafo que muestra los números introducidos
  guesses.textContent += userGuess + " ";
  //Si el usuario adivina, se envía un mensaje de felicitaciones, se cambia el color del fondo a verde, se deja vacio el párrafo que informa si el número es alto o bajo y se llama a la función que finaliza el juego.
  if (userGuess === randomNumber) {
    lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
    //Si el contador llega a 10 quiere decir que termino el juego. Se informa el fin del juego y se llama a la función que termina el juego.
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!Fin del juego!!!";
    setGameOver();
    //Si el número introducido no es correcto el color de fondo es rojo y se informa que es incorrecto.
  } else {
    lastResult.textContent = "¡Incorrecto!";
    lastResult.style.backgroundColor = "red";
    //Si el número es bajo se o alto se informa en el párrafo lowOrHi
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "¡El número es muy bajo!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "¡El número es muy grande!";
    }
  }
  //Se incrementa el contador de intentos
  guessCount++;
  //Se limpia el input para ingresar otro número
  guessField.value = "";
  //Se coloca el cursor en el input
  guessField.focus();
}
//Llama a la función que evalúa el número introducido cuando se hace click en el botón de enviar resultado.
guessSubmit.addEventListener("click", checkGuess);
//Esta función, termina el juego, inhabilita el input y el boton, crea un nuevo botón para iniciar un nuevo juego y lo agrega al body. Luego si se hace click en el botón llama a la función resetGame
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Iniciar nuevo juego";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
}
//La función reetable el contador a 1
function resetGame() {
  guessCount = 1;
  //Selecciona todos los párrafos en el div y los recorre para vaciarlos
  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
  //Elimina el boton de iniciar nuevo juego
  resetButton.parentNode.removeChild(resetButton);
  // reestable el input y el botón de enviar resultados
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  //El color de fondo del pàrrafo de resultados se reinicia la blanco
  lastResult.style.backgroundColor = "white";
  //Se generá otro número al azar
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
