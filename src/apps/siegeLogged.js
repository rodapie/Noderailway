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
    // document.getElementById("fotoUser").src = "";
    document.getElementById("user").innerText = cookieObject.name;


})
let usuarioConectado = false;
function conectado(){

    if (cookieObject) {
        usuarioConectado = true;
    }
    return usuarioConectado;
}

function inicios(){
    if(conectado()){
        window.location.href = `/indexLogged?user=${user}`;
    }else{
        window.location.href = `/`;
    }
}
function leagues(){
    if(conectado()){
        window.location.href = `/leagueLogged?user=${user}`;
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
        window.location.href = `/siegeLogged?user=${user}`;
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
    total.getElementById("hs%").innerHTML = headshots;
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
        try {
            const response = await fetch("/r6stats", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({platform, name})
            })
            const data = await response.json();
            console.log(data);
            añadirStats(data.general.headshot_, data.general.kd, data.general.kills, data.general.deaths, data.general.wins, data.general.losses, data.general.matches_played, data.general.time_played);
            añadirStatsRanked(data.ranked.kd, data.ranked.kills, data.ranked.deaths, data.ranked.win_, data.ranked.wins, data.ranked.losses, data.ranked.time_played, data.ranked.matches,
                data.ranked.kills_match, data.ranked.kills_min, data.ranked.mmr, data.ranked.rank, data.ranked.rank_img);
            añadirStatsCasual(data.casual.kd, data.casual.kills, data.casual.deaths, data.casual.win_, data.casual.wins, data.casual.losses, data.casual.time_played, data.casual.matches,
                data.casual.kills_match, data.casual.kills_min, data.casual.mmr, data.casual.rank, data.casual.rank_img);
        } catch (error) {
            console.log(error);
        }

}

console.log(amigo);
if(amigo === "ok"){
    buscar(plat,nombre);
}else if(amigo==="buscar"){
    buscar(plat,nombre);
}else {
    buscar(platform,name);
}
