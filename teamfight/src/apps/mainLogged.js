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
        let selectlol = document.createElement("option");
        selectlol.innerHTML ="<option value='euw'> EUW</option>" +
            "<option value='na'> NA</option>" +
            "<option value='kr'> KR</option>"+
            "<option value='lan'> LAN</option>"+
            "<option value='las'> LAS</option>"+
            "<option value='ch'> CH</option>"

        let selectsiege = document.createElement("option");
        selectsiege.innerHTML="<option value='pc'> PC</option>" +
            "<option value='spn'> PSN</option>" +
            "<option value='xbox'> XBOX</option>"


        console.log($('.selected').attr("id"));
        if($('.selected').attr("id") === "lolradio"){
            while (document.getElementById("region").options.length > 0) {
                document.getElementById("region").remove(0);
            }

            document.getElementById("region").innerHTML = "<option value='euw'>EUW</option>" +
                "<option value='na'>NA</option>" +
                "<option value='kr'>KR</option>" +
                "<option value='lan'>LAN</option>" +
                "<option value='las'>LAS</option>" +
                "<option value='ch'>CH</option>";

        }else{
            while (document.getElementById("region").options.length > 0) {
                document.getElementById("region").remove(0);
            }
            document.getElementById("region").innerHTML="<option value='pc'> PC</option>" +
                "<option value='spn'> PSN</option>" +
                "<option value='xbox'> XBOX</option>";
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
        window.location.href = `/leagueLogged?user=${cookieObject.name}&nombreInvocador=${cookieObject.lol}&region=${cookieObject.servidor}`;
    }else{
        window.location.href = `/league`;
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
        document.cookie = "cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    }
}
function redireccionar(nombreInvocador, region,nombreUbisoft,plataforma) {
    console.log("Dentro de redireccionar: id=" + $('.selected').attr("id") );
    if($('.selected').attr("id") === "lolradio") {
        console.log("buscadndo: "+nombreInvocador);
        window.location.href = "/leagueLogged?nombreInvocador=" + encodeURIComponent(nombreInvocador) + "&region=" + encodeURIComponent(region);
    }else{
        window.location.href = `/siegeLogged?user=${cookieObject.name}&nombre=${encodeURIComponent(nombreUbisoft)}&plataforma=${encodeURIComponent(plataforma)}&amigo=buscar`;
    }
}
function redireccionarPartida(nombreInvocador, region) {
    window.location.href = `/leagueLogged?user=${cookieObject.name}&nombreInvocador=` + encodeURIComponent(nombreInvocador) + "&gameId=" + encodeURIComponent(region);
}
async function buscarMain(){

    let nombreInvocador = document.getElementById('buscarInput').value;
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

    document.getElementsByClassName("contenedorGrupos")[0].style.display="none";

    //console.log(data.tags);
    //console.log("LONGITUD DATA = " + data.tags.length);

    for(let i = 0; i < data.tags.length;i++){
        document.getElementsByClassName("contenedorGrupos")[0].style.display="";
        let newtag = document.createElement("th");
        newtag.id=i;
        newtag.classList.add("list-inline-item");
        newtag.classList.add("list-inline-item-dark");
        newtag.classList.add("elemento");
        let newtdnombre = document.createElement("td");
        let amigo = document.createElement("p");
        amigo.id = "amigo"+i;
        let newtdtag = document.createElement("td");
        let tag = document.createElement("p");
        tag.id = "tag"+i;
        tag.classList.add("nombretag");
        let newtdserver = document.createElement("td");
        let server = document.createElement("p");
        server.id = "server"+i;
        let newtdbotones = document.createElement("td");
        newtdbotones.classList.add("botones");
        let iconover = document.createElement("i");
        iconover.id="iconoVer"+i;
        let botonVer = document.createElement("button");
        botonVer.id=i;
        let iconoborrar = document.createElement("i");
        iconoborrar.id ="borrar"+i;
        let boton = document.createElement("button");
        boton.id="botonQuitar"+i;

    console.log(data.tags[i]);
        newtag.classList.add("tags");
        amigo.innerText = `${data.tags[i].amigo}`;
        tag.innerText = `${data.tags[i].tag}`;
        server.innerText = `${data.tags[i].region}`;
        iconover.classList.add("fa-solid");
        iconover.classList.add("fa-eye");
        iconover.classList.add("fa-xs");
        iconoborrar.classList.add("fa-solid");
        iconoborrar.classList.add("fa-trash");
        newtdserver.style.display="none";
        boton.addEventListener("click",quitarFavorito);
        boton.appendChild(iconoborrar);
        botonVer.appendChild(iconover);
        if(data.tags[i].juego === 0){
            botonVer.addEventListener("click",buscarAmigoLol);
            let selector =document.getElementById("listaTagsLol");
            newtdnombre.appendChild(amigo);
            newtdtag.appendChild(tag);
            newtdserver.appendChild(server);
            newtdbotones.appendChild(botonVer);
            newtdbotones.appendChild(boton);
            newtag.appendChild(newtdnombre);
            newtag.appendChild(newtdtag);
            newtag.appendChild(newtdserver);
            newtag.appendChild(newtdbotones);
            selector.appendChild(newtag);
        }else{
            botonVer.addEventListener("click",buscarAmigoSiege);
            let selector =document.getElementById("listaTagsSiege");
            newtdnombre.appendChild(amigo);
            newtdtag.appendChild(tag);
            newtdserver.appendChild(server);
            newtdbotones.appendChild(botonVer);
            newtdbotones.appendChild(boton);
            newtag.appendChild(newtdnombre);
            newtag.appendChild(newtdtag);
            newtag.appendChild(newtdserver);
            newtag.appendChild(newtdbotones);
            selector.appendChild(newtag);
        }

    }




}

async function quitarFavorito(){
    let id = $(this).attr("id");
    id= id.split("r");
    let nombre = cookieObject.name;
    console.log("Quitando favorito");
    console.log(id[1]);
    let amigo=$(`#amigo${id[1]}`).text();
    console.log(amigo);
    let tag=$(`#tag${id[1]}`).text();
    console.log(tag);
    console.log("cargando tags");
    const response = await fetch("/quitarFavoritos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre,amigo,tag })
    });

    const data = await response.json();
    if(data.estado === 1){
        Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'El usuario se ha eliminado de favoritos',
            timer: 1500
        })
        document.getElementById("listaTagsLol").innerHTML="";
        document.getElementById("listaTagsSiege").innerHTML="";
        cargarFavoritos(nombre);
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario no se ha podido eliminar de favoritos',
            timer: 1500
        })
    }
}

function buscarAmigoSiege(){
    let id = $(this).attr("id");
    let nombre=$(`#amigo${id}`).text();
    let server=$(`#server${id}`).text();
    window.location.href = `/siegeLogged?user=${cookieObject.name}&nombre=` + encodeURIComponent(nombre) + "&plataforma=" + encodeURIComponent(server)+"&amigo=ok";
    console.log(nombre,server);
}
function buscarAmigoLol(){
    let id = $(this).attr("id");
    console.log("id del boton: " +id)
    let nombre=$(`#amigo${id}`).text();
    let server=$(`#server${id}`).text();
    window.location.href = `/leagueLogged?user=${cookieObject.name}&nombreInvocador=` + encodeURIComponent(nombre) + "&region=" + encodeURIComponent(server)+"&amigo=ok";
    console.log(nombre,server);
}

var lolRadio = document.getElementById("lolradio");
var siegeRadio = document.getElementById("radiosiege");
var radioSeleccionado = null;

lolRadio.addEventListener("click", function() {
    if (radioSeleccionado !== lolRadio) {
        document.body.style.backgroundImage = "url('../../static/fondogrieta.png')";
        document.body.classList.remove("fondos");
        document.body.classList.add("fondoSolo");
        document.querySelector('#buscarInput').classList.remove("inputNegro");
        document.querySelector('#region').classList.remove("bordeNegro");
        document.querySelector('#buscarMain').classList.remove("bordeNegro");
        document.querySelector('#plataforma').classList.remove("bordeNegro");
        document.querySelector('.indexGames').classList.remove("fondolinealSiege");
        document.querySelector('.indexGames').classList.add("fondolinealLol");
        radioSeleccionado = lolRadio;

    }
});

siegeRadio.addEventListener("click", function() {
    if (radioSeleccionado !== siegeRadio) {
        document.body.style.backgroundImage = "url('../../static/r6fondo2.jpg')";
        document.body.classList.remove("fondos");
        document.body.classList.add("fondoSolo");
        document.querySelector('#buscarInput').classList.add("inputNegro");
        document.querySelector('#region').classList.add("bordeNegro");
        document.querySelector('#buscarMain').classList.add("bordeNegro");
        document.querySelector('#plataforma').classList.add("bordeNegro");
        document.querySelector('.indexGames').classList.remove("fondolinealLol");
        document.querySelector('.indexGames').classList.add("fondolinealSiege");
        radioSeleccionado = siegeRadio;
        //
    }
});

function changeTab(event, tabId) {
    // Ocultar todos los contenidos de pestañas
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Eliminar la clase 'active' de todos los enlaces de pestañas
    var tabLinks = document.getElementsByClassName("tab-link");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Mostrar el contenido de la pestaña seleccionada
    document.getElementById(tabId).style.display = "block";

    // Agregar la clase 'active' al enlace de la pestaña seleccionada
    event.currentTarget.classList.add("active");
}