const cookieValue = decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('cookie=')).split('=')[1]);
const cookieObject = JSON.parse(cookieValue);

// window.location.href = `/indexLogged?user=${cookieObject.name}`;
const queryString = window.location.search;
console.log(queryString);
// Crear un objeto con los parámetros de la cadena de consulta

const params = new URLSearchParams(queryString);
console.log(params)// Obtener el valor del parámetro 'nombreInvocador'
const user = params.get('user');
console.log(user);

document.addEventListener("DOMContentLoaded", function() {
    // document.getElementById("fotoUser").src = "";
    document.getElementById("user").innerText = cookieObject.name;


})

let usuarioConectado = false;
const name = document.cookie.split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('cookie='))
    .split('=')[1];
function conectado(){
    if(name){
        usuarioConectado = true;
        $("#user").text(cookieObject.name) ;
    }
    return usuarioConectado;
}

$(document).ready(function () {
    $('.radio-group .radio').click(function () {
        $('.selected .fa').removeClass('fa-check');
        $('.radio').removeClass('selected');
        $(this).addClass('selected');
        console.log($(this));
        console.log($(this).children(":first").text());
        if($(this > '.selected')){
            $('#lol').toggle();
            $('#siege').toggle();
        }
    });
    cargarFavoritos(cookieObject.name)
});

function inicios(){

    if(conectado()){
        window.location.href = `/indexLogged?user=${cookieObject.name}`;
    }else{
        window.location.href = `/`;
    }
}

function leagues(){
    if(name){
        window.location.href = `/leagueLogged`;
    }else{
        window.location.href = `/league`;
    }
}
function valorants(){
    if(conectado()){
        window.location.href = `/valorantLogged?user=${user}`;
    }else{
        window.location.href = `/valorant`;
    }
}
function sieges(){
    if(conectado()){
        let cuenta = cookieObject.siege;
        let plat = cookieObject.plataforma;
        window.location.href = `/siegeLogged?user=${cookieObject.name}&nombre=${encodeURIComponent(cuenta)}&plataforma=${encodeURIComponent(plat)}`;
    }else{
        window.location.href = `/siege`;
    }
}
function logout(){
    if(conectado()){
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    }
}
function redireccionar(nombreInvocador, region,nombreUbisoft,plataforma) {
    console.log("Dentro de redireccionar: id=" + $('.selected').attr("id") );
    if($('.selected').attr("id") === "radiolol") {
        window.location.href = "/leagueLogged?nombreInvocador=" + encodeURIComponent(nombreInvocador) + "&region=" + encodeURIComponent(region);
    }else{
        window.location.href = `/siegeLogged?user=${cookieObject.name}&nombre=${encodeURIComponent(nombreUbisoft)}&plataforma=${encodeURIComponent(plataforma)}&amigo=buscar`;
    }
}
function redireccionarPartida(nombreInvocador, region) {
    window.location.href = `/leagueLogged?user=${cookieObject.name}&nombreInvocador=` + encodeURIComponent(nombreInvocador) + "&gameId=" + encodeURIComponent(region);
}
async function buscarMain(){

    let nombreInvocador = document.getElementById('buscarMain').value;
    let region = document.getElementById("region").value;
    let nombreUbisoft = document.getElementById("buscarInput").value;
    let plataforma = document.getElementById("plataforma").value;

    redireccionar(nombreInvocador, region,nombreUbisoft,plataforma);
}

document.getElementById('buscarInput').addEventListener("keyup", function (e) {
    if (e.key === 'Enter') {
        buscarMain();
    }
});

async function cargarFavoritos(nombre){
    console.log("cargando tags");
    const response = await fetch("/cargarFavoritosMain",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    });

    const data = await response.json();
    let selector =document.getElementById("listaTags");
    console.log("LONGITUD DATA = " + data.tags.length);
    for(let i = 0; i < data.tags.length;i++){
        let newtag = document.createElement("li");
        newtag.id=i;
        let amigo = document.createElement("p");
        amigo.id = "amigo"+i;
        let juego = document.createElement("img");
        juego.id="juego"+i;
        let server = document.createElement("p");
        server.id="server"+i;
        newtag.classList.add("tags");
        amigo.innerText = `${data.tags[i].amigo}`;
        if(data.tags[i].juego === 0){
            juego.href = '../../static/leagueLogged.jpg';
        }else{
            juego.url = '../../static/fondor6.jpg';
        }
        server.innerText=`${data.tags[i].region}`;
        newtag.appendChild(amigo);
        newtag.appendChild(juego);
        newtag.appendChild(server);
        newtag.addEventListener("click",buscarAmigo);
        selector.appendChild(newtag);
    }




}

function buscarAmigo(){
    let id = $(this).attr("id");
    let nombre=$(`#amigo${id}`).text();
    let server=$(`#server${id}`).text();
     if(server !== "pc" || server !== "psx" || server !== "xbox"){
         window.location.href = `/leagueLogged?user=${cookieObject.name}&nombreInvocador=` + encodeURIComponent(nombre) + "&region=" + encodeURIComponent(server)+"&amigo="+id;
     }
     if(server === "pc" || server === "psn" || server === "xbox"){
         window.location.href = `/siegeLogged?user=${cookieObject.name}&nombre=` + encodeURIComponent(nombre) + "&plataforma=" + encodeURIComponent(server)+"&amigo=ok";
     }
    console.log(nombre,server);
}
