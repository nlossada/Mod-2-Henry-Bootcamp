var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {  // la primera vez toma valor de body, luego en recursión no entra acá ya tiene valor
    startEl = document.body;              // en recursión pasa CADA ELEMENTO HIJO
  }
  if (matchFunc(startEl)) resultSet.push(startEl)  //si no encuentra idoclass no pushea nada
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  for (const child of startEl.children) { //recorrer array de hijos body
    resultSet.push(...traverseDomAndCollectElements(matchFunc, child))
    //con ... da cada hijos del child y lo pushea al array y aplico recursión con funcion match y CADA ELEMENTO HIJO(por loop del array)
  }
  return resultSet;
  /*
  Pseudo cód:
  document.body.id ?? if si tiene id pero con qué comparo
  si no --> bajar y buscar en los hijos y hacer un for o un map viendo si tiene el id cada elemento
  y en cada elemento aplicar recursividad
      let primerNivelArr = document.body.children
      for (let i = 0; i < primerNivelArr.length; i++) {
        if verificar aca en cada elemento si coincide, no se como
      }
      if (primerNivelArr.length>0)
  
      */
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  if (selector.includes(".")) return "tag.class"
  else return "tag"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (element) => {
      return element.id === selector.slice(1);
      // `#${element.id}` === selector - otra opcion que agrega el hashtag al elemento para comparar
    }
  } else if (selectorType === "class") {
    matchFunction = function (element) {
      return element.classList.contains(selector.slice(1));
      /*
      for (let i=0; i< element.classList.length;i++) {
          if(`.${element.classList[i]} === selector`) return true
      }
      return false
      */
    }

  } else if (selectorType === "tag.class") {

    matchFunction = function (element) {
      // return element.tagName.toLowerCase() === tag && element.classList.contains(className);
      // }
      var [tag, className] = selector.split('.'); //destructuring del array
      let tagFunc = matchFunctionMaker(tag); // le paso la misma función con tag como selector
      let ClassFunc = matchFunctionMaker(`.${className}`); // le paso misma función con selector clase con el punto
      return tagFunc(element) && ClassFunc(element) // paso la var de la funcion con argumento devuelve true si ambos son true
    }
  } else if (selectorType === "tag") {
    matchFunction = function (element) {
      return element.tagName.toLowerCase() === selector;
    }
  }
  return matchFunction;

};











var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
