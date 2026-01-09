
// /**
//  * Ejercicio 1: Buscar y mostrar información del Pokemon con FETCH
//  */
// /**
//  * Función para buscar pokemon ejercicio 1 y 2.
//  * 
// */

// async function buscarPokemon(){
//     let pokemon = document.getElementById('pokemon-input').value.toLowerCase();
//     fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon)
//         .then(res => res.json())
//         .then(data => {
//             let id = data.id;
//             let name = data.species.name;
//             name = name.toUpperCase();
//             let sprite = data.sprites.front_default;

//             document.getElementById('pokemon-data').innerHTML = `
//                 <h4>${name}</h4>
//                 <p>#${id}</p>
//                 <img src="${sprite}"/>
//             `;
//         })
//         .catch(() =>{
//             document.getElementById('pokemon-data').innerHTML = `
//                 <h4>Error: Pokémon no encontrado</h4>
//             `;
//         })
// }

// /**
//  *  Descomentar para hacer uso de la función.
//  */
// document.getElementById('search-btn').addEventListener('click',buscarPokemon);


/**
 * Ejercicio 3: buscar pokemon con JQuery AJAX.
 */

const coleccion = new Map();

function buscarPokemonJQueryAJAX(){
        var pokemon = $("#pokemon-input").val().toLowerCase();

        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/"+pokemon,
            method: "GET",
            dataType: "json",
            success: function(data){
                $("#pokemon-data").empty();
                $("#pokemon-input").val("");
                $("#pokemon-data").append("<h4>"+data.species.name.toUpperCase()+"</h4>");
                $("#pokemon-data").append("<p>#"+data.id+"</p>");
                $("#pokemon-data").append("<img src='"+data.sprites.front_default+"'/>");
                if(coleccion.has(data.species.name)){
                    $("#pokemon-data").append("<p id='"+"yaesta"+"'>✅ En la colección</p>");
                }else{
                    $("#pokemon-data").append("<button id='"+"agregar-btn"+"'>Agregar a la colección</button>");
                }
                $("#agregar-btn").click(function(){
                    coleccion.set(data.species.name, data.sprites.front_default);
                    $("#pokemon-data").empty();
                    $("#pokemon-data").append("<h4>¡Agregado correctamente!</h4>");
                })
            },
            error: function(err){
                $("#pokemon-data").empty();
                $("#pokemon-input").val("");
                $("#pokemon-data").append("<h4>Error: Pokémon no encontrado</h4>");
            }

        });
}

/**
 * Haciendo uso de JQuery, descomentar para usar la función buscarPokemonJQueryAJAX
*/

$(document).ready(function(){
    $('#search-btn').on('click', buscarPokemonJQueryAJAX);
}); 

function mostrarColeccion(){
    document.getElementById('collection-list').innerHTML="";
    coleccion.forEach(function(sprite, nombre){
        document.getElementById('collection-list').innerHTML += `
            <div class="collection-item">
                <h5>${nombre.toUpperCase()}</h5>
                <img src="${sprite}"/>
            </div>
        `
    });
}

document.getElementById('view-collection-btn').addEventListener('click',mostrarColeccion);

/* OPCIONAL */

function buscarTipo() {
    var tipo = $("#type-input").val().toLowerCase();
    console.log(tipo);
    fetch('https://pokeapi.co/api/v2/type/' + tipo)
        .then(res => res.json())
        .then(data => {

            document.getElementById('type-list').innerHTML = "";

            let tipos = data.pokemon.slice(0, 5);

            let promesas = tipos.map(poke =>
                fetch(poke.pokemon.url).then(res => res.json())
            );

            Promise.all(promesas)
                .then(pokemons => {
                    pokemons.forEach(poke => {
                        let name = poke.species.name.toUpperCase();
                        let sprite = poke.sprites.front_default;

                        document.getElementById('type-list').innerHTML += `
                            <div class="type-item">
                                <h5>${name}</h5>
                                <img src="${sprite}">
                            </div>
                        `;
                    });
                });
        })
        .catch(err => console.error("¡D'oh! Error:", err));
}

document.getElementById('type-btn').addEventListener('click',buscarTipo);