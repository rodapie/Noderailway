const queryString = window.location.search;
console.log(queryString);
// Crear un objeto con los parámetros de la cadena de consulta
const params = new URLSearchParams(queryString);
console.log(params)// Obtener el valor del parámetro 'nombreInvocador'
const user = params.get('user');
const nombre = params.get('nombre');
const plat = params.get('plataforma');
const amigo=params.get('amigo');
const cookieValue = decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('cookie=')).split('=')[1]);
const cookieObject = JSON.parse(cookieValue);
console.log(user);

document.addEventListener("DOMContentLoaded", function() {
    console.log("amigo "+amigo);
    // document.getElementById("fotoUser").src = "";
    if(amigo){
        switch(amigo){
            case "ok":
            case "buscar":
                let plata = params.get('plataforma');
                let nombre1 = params.get('nombre');
                buscar(plata,nombre1);
                break;
            default:
                let plat   = document.getElementById("plataforma").value;
                let nombre = document.getElementById("nombre").value;
                buscar(plat,nombre);
                break;
        }
    }else{
        buscarInicial();
    }




})

async function buscarInicial() {
    document.getElementById("cargando").classList.remove('hidden');
    document.getElementById("allStats").style.display="none";
    document.getElementById("inicio").style.display="none";
    document.getElementsByClassName("contenedorr6")[0].style.display="none";
    document.getElementById("statsTotalTable").innerHTML = '';
    document.getElementById("statsCasual").innerHTML = '';
    document.getElementById("stats").innerHTML = '';
    document.getElementsByClassName("tags")[0].style.display = 'none';
    let platform =cookieObject.plataforma;
    let name = cookieObject.siege;
    document.getElementById("user").innerText =cookieObject.name;
    console.log("nombre =" + name);
    let url = "http://localhost:3000/siege?nombre=" + name + "&plataforma=" + platform;
    console.log(url);
    if (window.location.href !== url) {
        let url = "http://localhost:3000/siege?nombre=" + name + "&plataforma=" + platform;
    }
    // let platform = document.getElementById("plataforma").value;
    // let name = document.getElementById("nombre").value;

    console.log("buscando: " + name + "en la plataforma " + platform)
    try {
        const response = await fetch("/r6stats", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({platform, name})
        })
        document.getElementById("cargando").classList.add('hidden');
        const data = await response.json();
        console.log(data);
        if(data.general==="TIME_OUT") {
            document.getElementById("error").innerHTML = "No se ha encontrado el perfil";
        }else{
            document.getElementsByClassName("contenedorr6")[0].style.display="";
            document.getElementById("nombreUbisoft").innerText = data.ranked.name;
            document.getElementById("imgUbi").src = data.ranked.header;
            document.getElementById("imgRangoR6").src = data.ranked.rank_img;
            document.getElementById("allStats").style.display="";
            document.getElementsByClassName("tags")[0].style.display = '';
            limpiarfavoritos();
            cargarFavoritos(cookieObject.name);
            añadirStats(data.general.headshot_, data.general.kd, data.general.kills, data.general.deaths, data.general.wins, data.general.losses, data.general.matches_played, data.general.time_played);
            añadirStatsRanked(data.ranked.kd, data.ranked.kills, data.ranked.deaths, data.ranked.win_, data.ranked.wins, data.ranked.losses, data.ranked.time_played, data.ranked.matches,
                data.ranked.kills_match, data.ranked.kills_min, data.ranked.mmr, data.ranked.rank, data.ranked.rank_img);
            añadirStatsCasual(data.casual.kd, data.casual.kills, data.casual.deaths, data.casual.win_, data.casual.wins, data.casual.losses, data.casual.time_played, data.casual.matches,
                data.casual.kills_match, data.casual.kills_min, data.casual.mmr, data.casual.rank, data.casual.rank_img);
        }

    } catch (error) {
        console.log(error);
    }
}
function conectado(){
    let usuarioConectado=false;
    if (cookieObject.name !== "") {
        usuarioConectado = true;
        console.log("conectado");
    }else{
        console.log("no conectado");
    }
    console.log("hola?");
    return usuarioConectado;
}

function inicios(){
    if(conectado()){
        window.location.href = `/indexLogged?user=${cookieObject.name}`;
    }else{
        window.location.href = `/`;
    }
}
function leagues(){
    if(conectado()){
        window.location.href = `/leagueLogged?user=${cookieObject.name}&nombreInvocador=${cookieObject.lol}&region=${cookieObject.servidor}`;
    }else{
        window.location.href = `/league`;
    }
}

function sieges(){
    if(conectado()){
        window.location.href = `/siegeLogged?user=${cookieObject.name}&nombre=${cookieObject.siege}&plataforma=${cookieObject.plataforma}`;
    }else{
        window.location.href = `/siege`;
    }
}


let platform = cookieObject.plataforma;
console.log(platform);
let name = cookieObject.siege;
console.log(name);

function añadirStatsRanked(kd,kills,deaths,wr,wins,losses,time,matches,killmatch,killmin) {
    var plantilla = document.querySelector("#statsModo")
    var modo = plantilla.content.cloneNode(true);

    modo.getElementById("kdR6").innerHTML = kd;
    modo.getElementById("kills").innerHTML = kills;
    modo.getElementById("deaths").innerHTML = deaths;
    modo.getElementById("wr").innerHTML = wr;
    modo.getElementById("wins").innerHTML = wins;
    modo.getElementById("losses").innerHTML = losses;
    modo.getElementById("time").innerHTML = time;
    modo.getElementById("matches").innerHTML = matches;
    modo.getElementById("km").innerHTML = killmatch;
    modo.getElementById("kpm").innerHTML = killmin;


    let tabla = document.getElementById("stats");
    tabla.appendChild(modo);
}
function añadirStatsCasual(kd,kills,deaths,wr,wins,losses,time,matches,killmatch,killmin){
    let plantilla = document.querySelector("#statsModoCasual")
    var modoCasual = plantilla.content.cloneNode(true);

    modoCasual.getElementById("kdR6").innerHTML = kd;
    modoCasual.getElementById("kills").innerHTML = kills;
    modoCasual.getElementById("deaths").innerHTML = deaths;
    modoCasual.getElementById("wr").innerHTML = wr;
    modoCasual.getElementById("wins").innerHTML = wins;
    modoCasual.getElementById("losses").innerHTML = losses;
    modoCasual.getElementById("time").innerHTML = time;
    modoCasual.getElementById("matches").innerHTML = matches;
    modoCasual.getElementById("km").innerHTML = killmatch;
    modoCasual.getElementById("kpm").innerHTML = killmin;


    let tablaCasual =document.getElementById("statsCasual");
    tablaCasual.appendChild(modoCasual);

}

function añadirStats(headshots,kd,kills,deaths,wins,losses,matches,time){
    let plantilla = document.querySelector("#statsTotal")
    var total = plantilla.content.cloneNode(true);
    total.getElementById("hs").innerHTML = headshots;
    total.getElementById("kdR6").innerHTML = kd;
    total.getElementById("kills").innerHTML = kills;
    total.getElementById("deaths").innerHTML = deaths;
    total.getElementById("wins").innerHTML = wins;
    total.getElementById("losses").innerHTML = losses;
    total.getElementById("time").innerHTML = time;
    total.getElementById("matches").innerHTML = matches;


    let tabla =document.getElementById("statsTotalTable");
    tabla.appendChild(total);
}



async function buscar(platform,name){
    document.getElementById("cargando").classList.remove('hidden');
    document.getElementById("allStats").style.display="none";
    document.getElementById("inicio").style.display="none";
    document.getElementById("statsTotalTable").innerHTML='';
    document.getElementsByClassName("contenedorr6")[0].style.display="none";
    document.getElementById("statsCasual").innerHTML='';
    document.getElementById("stats").innerHTML='';
    document.getElementById("nombreUbisoft").innerText = "";
    document.getElementById("imgUbi").src = "";
    document.getElementById("imgRangoR6").src = "";
    document.getElementsByClassName("tags")[0].style.display = 'none';

    console.log("nombre =" + name);
    let url = "http://localhost:3000/siege?nombre=" + name +"&plataforma=" +platform;
    console.log(url);
    if ( window.location.href !==  url){
        let url = "http://localhost:3000/siege?nombre=" + name +"&plataforma=" +platform;
    }
    // let platform = document.getElementById("plataforma").value;
    // let name = document.getElementById("nombre").value;

    console.log("buscando: " + name + " en la plataforma " + platform)
    try {
        const response = await fetch("/r6stats", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({platform, name})
        })
        document.getElementById("cargando").classList.add('hidden');
        const data = await response.json();
        console.log(data);
        document.getElementsByClassName("contenedorr6")[0].style.display="";
        document.getElementById("nombreUbisoft").innerText = data.ranked.name;
        document.getElementById("imgUbi").src = data.ranked.header;
        document.getElementById("imgRangoR6").src = data.ranked.rank_img;
        document.getElementById("allStats").style.display="";
        document.getElementsByClassName("tags")[0].style.display = '';
        limpiarfavoritos();
        cargarFavoritos(cookieObject.name);
        if(data.general==="TIME_OUT"){
            document.getElementById("error").innerHTML ="No se ha encontrado el perfil";
        }else{
            document.getElementById("allStats").style.display="";
            añadirStats(data.general.headshot_,data.general.kd,data.general.kills,data.general.deaths,data.general.wins,data.general.losses,data.general.matches_played,data.general.time_played);
            añadirStatsRanked(data.ranked.kd,data.ranked.kills,data.ranked.deaths,data.ranked.win_,data.ranked.wins,data.ranked.losses,data.ranked.time_played,data.ranked.matches,
                data.ranked.kills_match,data.ranked.kills_min,data.ranked.mmr,data.ranked.rank,data.ranked.rank_img);
            añadirStatsCasual(data.casual.kd,data.casual.kills,data.casual.deaths,data.casual.win_,data.casual.wins,data.casual.losses,data.casual.time_played,data.casual.matches,
                data.casual.kills_match,data.casual.kills_min,data.casual.mmr,data.casual.rank,data.casual.rank_img);
        }

    }catch (error){
        console.log(error);
    }

}

document.getElementById("buscarMainr6").addEventListener('click',function (){
    console.log(amigo);
    if(amigo === "ok"){
        buscar(plat,nombre);
    }else if(amigo==="buscar"){
        buscar(plat,nombre);
    }else{
        let plat = document.getElementById("plataforma2").value;
        let nombre = document.getElementById("buscarInputr6").value;
        buscar(plat,nombre);
    }
});


document.getElementById("buscarInputr6").addEventListener('keyup',function (e){
    if(e.key === "Enter"){
        console.log(amigo);
        if(amigo === "ok"){
            buscar(plat,nombre);
        }else if(amigo==="buscar"){
            buscar(plat,nombre);
        }else{
            let plat = document.getElementById("plataforma2").value;
            let nombre = document.getElementById("buscarInputr6").value;
            buscar(plat,nombre);
        }
    }

});

function logout(){
    if(conectado()){
        document.cookie = "cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    }
}

function limpiarfavoritos(){
    let tags = document.getElementById("tag-list").childNodes.length;
    for(let i = 0; i < tags; i++){
        $(`datalist > option`).detach();
    }
}

async function cargarFavoritos(nombre){
    console.log("cargando tags");
    const response = await fetch("/cargarFavoritos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    });

    const data = await response.json();
    console.log(data.tags);
    let selector =document.getElementById("tag-list");
    console.log("LONGITUD DATA = " + data.tags.length);
    for(let i = 0; i < data.tags.length;i++){
        let newtag = document.createElement("option");
        newtag.innerText = `${data.tags[i].tag}`;
        selector.appendChild(newtag);
    }




}
document.getElementById("TagSelector").addEventListener('keypress', function (e)  {
    if(e.key === 'Enter') {
        let amigo = document.getElementById("nombreUbisoft").innerHTML;
        let tag = document.getElementById("TagSelector").value;
        const region = document.getElementById("plataforma2").value;
        añadirFavorito(cookieObject.name, amigo, tag, 1,region);
        console.log("marcado");
    }
});
async function añadirFavorito(nombre,amigo,tag,juego,server){
    const response = await fetch("/anadirFavorito",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre,tag,amigo,juego,server })
    })//Fin fetch
    const data = await response.json();
    console.log("data favoritos "+ data.estado);
    if(data.estado === 1){
        Swal.fire({
            icon: 'success',
            title: 'Añadido al grupo',
            text: 'Todo ha ido correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        cargarFavoritos(nombre);
        document.getElementById("TagSelector").value="";

    }else{

        Swal.fire({
            icon: 'error',
            title: 'Error',
            showConfirmButton: false,
            text: 'El usuario ya pertenece a ese grupo'
        })
    }
}