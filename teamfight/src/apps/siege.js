const queryString = window.location.search;

// Crear un objeto con los parámetros de la cadena de consulta
const params = new URLSearchParams(queryString);
console.log(params)// Obtener el valor del parámetro 'nombreInvocador'
const nombre = params.get('nombre');
const platf = params.get('plataforma');


if(nombre && platf){
    buscarInicial();
}

document.addEventListener("DOMContentLoaded", function() {
    // document.getElementById("fotoUser").src = "";
    document.getElementById("allStats").style.display="none";


})


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

async function buscarInicial() {
    document.getElementById("cargando").classList.remove('hidden');
    document.getElementById("allStats").style.display="none";
    document.getElementById("inicio").style.display="none";
    document.getElementsByClassName("contenedorr6")[0].style.display="none";
    document.getElementById("statsTotalTable").innerHTML = '';
    document.getElementById("statsCasual").innerHTML = '';
    document.getElementById("stats").innerHTML = '';
    let platform = platf || cookieObject.plataforma;
    let name = nombre || cookieObject.siege;
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
            document.getElementById("nombreUbisoft").innerText = data.ranked.name;
            document.getElementById("imgUbi").src = data.ranked.header;
            document.getElementById("imgRangoR6").src = data.ranked.rank_img;
            document.getElementById("allStats").style.display="";
            document.getElementsByClassName("contenedorr6")[0].style.display="";
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


async function buscarCuenta(){
    document.getElementById("cargando").classList.remove('hidden');
    document.getElementById("allStats").style.display="none";
    document.getElementById("inicio").style.display="none";
    document.getElementById("statsTotalTable").innerHTML='';
    document.getElementById("statsCasual").innerHTML='';
    document.getElementById("stats").innerHTML='';
    let platform = document.getElementById("plataforma2").value;
    let name = document.getElementById('buscarInputr6').value;
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

        if(data.general==="TIME_OUT"){
            document.getElementById("error").innerHTML ="No se ha encontrado el perfil";
        }else{
            document.getElementById("allStats").style.display="";
            document.getElementById("nombreUbisoft").innerText = data.ranked.name;
            document.getElementById("imgUbi").src = data.ranked.header;
            document.getElementById("imgRangoR6").src = data.ranked.rank_img;
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

document.getElementById('buscarMainr6').addEventListener('click',buscarCuenta);
document.getElementById('buscarInputr6').addEventListener("keyup", function (e) {
    if (e.key === 'Enter') {
        buscarCuenta();
    }
});