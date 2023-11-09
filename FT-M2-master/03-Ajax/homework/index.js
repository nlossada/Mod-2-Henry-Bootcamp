var verAmigosBtn = document.querySelector("#boton"); // con jQuery se busca directamente con $("#boton")
var listaAmigos = document.querySelector("#lista");

function verAmigosFunc() {
    listaAmigos.innerHTML = ""   //al hacer nueva lista con click se borra lo anterior, si no se acumula todo
    // en jQuery, se usa método .empty para limpiar
    $.get("http://localhost:5000/amigos", (res) => {
        res.forEach(element => {
            let li = document.createElement("li")
            li.innerHTML = element.name  //jQuery agrega con .text
            listaAmigos.appendChild(li)
        });
    })
}

verAmigosBtn.addEventListener("click", verAmigosFunc)



var searchBtn = document.querySelector("#search");
var searchInput = document.querySelector("#input")
var searchSpan = document.querySelector("#amigo");

function searchAmigoFunc() {
    searchSpan.innerHTML = "";  //siempre al principio limpiar la lista
    $.get(`http://localhost:5000/amigos/${searchInput.value}`, (res) => {
        let divAmigo = document.createElement("div")
        divAmigo.innerHTML = res.name
        searchSpan.appendChild(divAmigo)
    });
}

searchBtn.addEventListener("click", searchAmigoFunc)




var deleteBtn = document.querySelector("#delete");
var deleteInput = document.querySelector("#inputDelete")
var deleteSpan = document.querySelector("#success")

function deleteAmigoFunc() {
    let id = deleteInput.value //los valores de input devuelven string
    if (id) {
        var searchDelete
        // el get es asincronico, debo trabajar TODO dentro porque se va a resolver fuera
        $.get("http://localhost:5000/amigos", (res) => {
            res.forEach(element => {
                if (element.id === Number(id)) {// los values de los INPUTS LLEGAN COMO STRING! O sacar un igual o pasar a numero
                    searchDelete = element
                }
            })
            if (searchDelete) {
                $.ajax({
                    url: `http://localhost:5000/amigos/${id}`,
                    method: "DELETE",
                    dataType: "json",
                    success: function (response) {
                        deleteSpan.innerHTML = `${searchDelete.name} ha sido eliminado `
                        verAmigosFunc() // que actualice directamente la lista
                    },
                    error: function (xhr, status, error) {
                        console.log(error);
                    },
                });
            } else {
                return "No hay id"
            }
        });
    }

    deleteInput.value = "" // limpiar id
}

deleteBtn.addEventListener("click", deleteAmigoFunc)





