var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  let primerNivelArr = document.body.children
  for (let i = 0; i < primerNivelArr; i++)

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


//DE ESTA FUNCIÓN NO TOCO NADA????
// var matchFunctionMaker = function (selector) {
//   var selectorType = selectorTypeMatcher(selector);
//   var matchFunction;
//   if (selectorType === "id") {
//     matchFunction = function (element) {
//       return element.id === selector.slice(1)
//     }
//     // element.getAttribute("id") === selector.slice(1)
//   } else if (selectorType === "class") {
//     matchFunction = function (element) {
//       return element.className === selector.slice(1)
//     }
//   } else if (selectorType === "tag.class") {
//     matchFunction = function (element) {
//       var [tag, classOfTag] = selector.split('.');
//       return element.tagName === tag && element.className === classOfTag
//     }
//   } else if (selectorType === "tag") {
//     matchFunction = function (element) {
//       element === selector
//     }
//   }

//   return matchFunction;
// };

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (element) {
      return element.id === selector.slice(1);
    }
  } else if (selectorType === "class") {
    matchFunction = function (element) {
      return element.classList.contains(selector.slice(1));
    }

  } else if (selectorType === "tag.class") {
    var [tag, className] = selector.split('.');
    matchFunction = function (element) {
      return element.tagName.toLowerCase() === tag && element.classList.contains(className);
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
