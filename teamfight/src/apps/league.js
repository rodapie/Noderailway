
const queryString = window.location.search;

// Crear un objeto con los parámetros de la cadena de consulta
const params = new URLSearchParams(queryString);
console.log(params)// Obtener el valor del parámetro 'nombreInvocador'
const nombreInvocador = params.get('nombreInvocador');
let ids = [];
let imagen = [];
// Obtener el valor del parámetro 'region'
let regionURL = params.get('region');
let region;
switch(regionURL){
    case 1:
        region = "euw";
        break;
    case 2:
        region = "na";
        break;
    case 3:
        region = "kr";
        break;
    case 4:
        region = "lan";
        break;
    case 5:
        region = "las";
        break;
    case 6:
        region = "ch";
        break;
    default:
        region = "euw";
        break;
}

document.addEventListener("DOMContentLoaded", function() {
    //Aqui iria un forEach de cada partida que traiga la API y se cargan los valores como parametros de la funcion
    document.getElementById("tabla_partidas").innerHTML = '';
    document.getElementById("tabla_campeones").innerHTML = '';
    document.getElementById("perfilContainer").style.display="none";
    document.getElementById('caja-buscar').value = nombreInvocador;
    document.getElementById("error").innerHTML = "UPSS... No se ha buscado un perfil";
    document.getElementById("cargando").style.display="none";
    console.log(document.getElementById('caja-buscar').value);
     if(nombreInvocador){
         buscar();

     }



});


async function añadirRango(tier,rank,leaguePoints){
    let rango = "";
    switch(tier){
        case "IRON":
            rango = "Hierro";
            break;
        case "BRONZE":
            rango = "Bronce";
            break;
        case "SILVER":
            rango = "Plata";
            break;
        case "GOLD" :
            rango = "Oro";
            break;
        case "PLATINUM":
            rango = "Platino";
            break;
        case "DIAMOND":
            rango = "Diamante";
            break;
        case "MASTER":
            rango ="Maestro"
            break;
        case "GRANDMASTER":
            rango = "Gran Maestro";
            break;
        case "CHALLENGER":
            rango = "Aspirante";
            break;
        default:
            rango = "Sin Rango";
            break;
    }
    let imagen = tier.toLowerCase();
    console.log(imagen);

    if(tier !== "unranked"){
        document.getElementById("imgRango").src = `/static/ranked-emblems/ranked-emblem/emblem-${imagen}.png`;
        document.getElementById("rango").innerText += rango + " " + rank + " " + leaguePoints+ " LP";
    }else{
        document.getElementById("imgRango").style.display="none";
        document.getElementById("rango").innerText = rango;
        document.getElementById("rango").style.marginLeft = "25%";
    }

    document.getElementById("imgRango").style.maxWidth = "100px";
}


function cargarImegenes(lista,imagen){

    var item  =document.createElement("li");
    item.innerHTML = `<img class="item" src='${imagen}' height='auto' width='54px'>`
    lista.appendChild(item);
}

let numeroPartida = 0;
async function añadirPartida(campeon,resultado,rol,modo,duracion,kd,kda,kp,items, cs, totalDamageDealtToChampions, matchId,nivel){
    document.getElementById("perfilContainer").style.display="";

    var plantilla = document.querySelector("#plantillaPartida")

    var partida = plantilla.content.cloneNode(true);
    if(resultado === "Victoria" && duracion > 3) {
        partida.querySelector(".info-partida p:first-child").classList.add("victoria");
        partida.getElementById("info-partida").classList.add("victoria");
        // partida.getElementById("stats").classList.add("textoVictoria");
    }else if((resultado === "Victoria" || resultado ==="Derrota") && (duracion < 3.00)){
        resultado = "Remake";
        partida.querySelector(".info-partida p:first-child").classList.add("remake");
        partida.getElementById("info-partida").classList.add("remake");
    }else{
        partida.querySelector(".info-partida p:first-child").classList.add("derrota");
        partida.getElementById("info-partida").classList.add("derrota");
        // partida.getElementById("stats").classList.add("textoDerrota");
    }

    var parrafos = partida.querySelectorAll("p");
    parrafos[0].innerText = resultado;
    parrafos[1].innerText = "KD "+kd ;
    parrafos[2].innerText = kda ;
    switch (rol){
        case "TOP":
            parrafos[3].innerText = rol;
            break;
        case "MIDDLE":
            parrafos[3].innerText = "MID";
            break;
        case "JUNGLE":
            parrafos[3].innerText = "JUNGLA";
            break;
        case "BOTTOM":
            parrafos[3].innerText = "ADC";
            break;
        case "UTILITY":
            parrafos[3].innerText = "SUPPORT";
            break;
        default:
            parrafos[3].innerText = "LIBRE";
            break;
    }
    parrafos[4].innerText = "KP: "+kp + "%";


    parrafos[5].innerText = modo;
    parrafos[6].innerText ="DURACION: " +duracion;
    parrafos[7].innerHTML = "CS: " + cs;
    parrafos[8].innerHTML = "DAÑO: " + totalDamageDealtToChampions;
    parrafos[9].innerHTML = "matchId: " + matchId;
    // parrafos[9].setAttribute("display","none")
    // parrafos[9].innertext.setAttribute("display", "none");


    console.log("estos son los parrafos: "+parrafos[0])
    console.log(document.querySelectorAll('.matchId'))

    partida.getElementById("imagenCampeonPartida").src =`/static/${campeon}.png`;
    console.log("nivel del campeon" +nivel);
    partida.getElementById("championLevel").innerHTML = nivel;
    let lista = partida.getElementById("listaItems");
    for( i = 0; i < items.length; i++){
        if(items[i] !== 'http://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/0.png'){
            cargarImegenes(lista,items[i]);
        }

    }
    ids.push(matchId);
    let button = partida.getElementById("botonBuscar");
    button.setAttribute("class","boton"+numeroPartida);
    var tabla = document.querySelector("#tabla_partidas");
    tabla.appendChild(partida);
    numeroPartida++;
}

function borrar(){
    console.log("borrar");
    document.getElementById("tabla_partidas").innerHTML = '';
    document.getElementById("tabla_campeones").innerHTML = '';
}

// campeon1, porcentaje1, mediaCS1, jugados1, campeon2, porcentaje2, mediaCS2, jugados2, campeon3, porcentaje3, mediaCS3, jugados3
function añadirCampeon(campeonesMasJugados){
    var plantilla = document.querySelector("#plantillaLateral")

    var campeon = plantilla.content.cloneNode(true);
    
    // campeon.querySelector('.primerCampeon').classList.add("oculto")

    if (campeonesMasJugados.campeon2 === "" ) campeon.querySelector('.segundoCampeon').classList.add("oculto");
    if (campeonesMasJugados.campeon3 === "" ) campeon.querySelector('.tercerCampeon').classList.add("oculto");

    campeon.getElementById("imagenCampeonLateral1").src =`/static/${campeonesMasJugados.campeon1}.png`;
    campeon.getElementById("imagenCampeonLateral2").src =`/static/${campeonesMasJugados.campeon2}.png`;
    campeon.getElementById("imagenCampeonLateral3").src =`/static/${campeonesMasJugados.campeon3}.png`;

    var parrafos = campeon.querySelectorAll("p");
    parrafos[0].innerText = campeonesMasJugados.campeon1;
    parrafos[1].innerText = "KDA "+campeonesMasJugados.kda1;
    parrafos[2].innerText = "WR " + campeonesMasJugados.porcentaje1;
    parrafos[3].innerText = "CS "+campeonesMasJugados.mediaCS1;
    parrafos[4].innerText = "Partidas Recientes: " +campeonesMasJugados.jugados1;
    parrafos[5].innerText = campeonesMasJugados.campeon2;
    parrafos[6].innerText = "KDA "+campeonesMasJugados.kda2;
    parrafos[7].innerText = "WR "+campeonesMasJugados.porcentaje2;
    parrafos[8].innerText = "CS "+campeonesMasJugados.mediaCS2;
    parrafos[9].innerText = "Partidas Recientes: " +campeonesMasJugados.jugados2;
    parrafos[10].innerText = campeonesMasJugados.campeon3;
    parrafos[11].innerText = "KDA "+campeonesMasJugados.kda3;
    parrafos[12].innerText = "WR " + campeonesMasJugados.porcentaje3;
    parrafos[13].innerText = "CS "+campeonesMasJugados.mediaCS3;
    parrafos[14].innerText = "Partidas Recientes: " +campeonesMasJugados.jugados3;
    // parrafos[1].innerText = "CS:"+cs+" (" + cs/20+")";
    // parrafos[2].innerText = kd + "KDA";
    // parrafos[3].innerText = kda;
    // parrafos[4].innerText = wr+"%";
    // parrafos[5].innerText = partidas +" partidas";
    // parseFloat(porcentaje1) > 49 ? document.querySelector('#porcentajeCampeonLateral1').classList.add("victoria") : document.querySelector('#porcentajeCampeonLateral1').classList.add("derrota");
    // console.log("este es el parsefloat: "+parseFloat(porcentaje1))

    // // Añadimos clase victoria o derrota segun el winrate positivo o negativo.
    // parseFloat(campeonesMasJugados.porcentaje1) > 49 ? campeon.querySelector('#porcentajeCampeonLateral1').classList.add("victoria") : campeon.querySelector('#porcentajeCampeonLateral1').classList.add("derrota");
    // parseFloat(campeonesMasJugados.porcentaje2) > 49 ? campeon.querySelector('#porcentajeCampeonLateral2').classList.add("victoria") : campeon.querySelector('#porcentajeCampeonLateral2').classList.add("derrota");
    // parseFloat(campeonesMasJugados.porcentaje3) > 49 ? campeon.querySelector('#porcentajeCampeonLateral3').classList.add("victoria") : campeon.querySelector('#porcentajeCampeonLateral3').classList.add("derrota");
    // 
    var tabla = document.querySelector("#tabla_campeones");
    tabla.appendChild(campeon);
    console.log("Estos son los datos nuevois: "+ "\ncampeon1: "+campeonesMasJugados.campeon1, "\nporcentaje1: "+campeonesMasJugados.porcentaje1, "\nmediaCS1: "+campeonesMasJugados.mediaCS1, "\njugados1: "+campeonesMasJugados.jugados1, "\ncampeon2: "+campeonesMasJugados.campeon2, "\nporcentaje2: "+campeonesMasJugados.porcentaje2, "\nmediaCS2: "+campeonesMasJugados.mediaCS2, "\njugados2: "+campeonesMasJugados.jugados2, "\ncampeon3: "+campeonesMasJugados.campeon3, "\nporcentaje3: "+campeonesMasJugados.porcentaje3, "mediaCS3: "+campeonesMasJugados.mediaCS3, "jugados3: "+campeonesMasJugados.jugados3 + "\nkdas: "+campeonesMasJugados.kda1, campeonesMasJugados.kda2, campeonesMasJugados.kda3)

    if (campeonesMasJugados.campeon2 === ""){
        console.log("no hay campeon2");
        parrafos[4].innerText = "asdjkfbasdfasbdf";
    }
    
}


document.getElementById('buscar').addEventListener('click', buscar);
document.getElementById('caja-buscar').addEventListener("keyup", function (e){
    if (e.key === 'Enter') {
        buscar();
    }
});

function convertirRango(tier){
    let valor;
    switch (tier){
        case "IRON":
            valor = 0
            break;
        case "BRONZE":
            valor = 1;
            break;
        case "SILVER":
            valor = 2;
            break;
        case "GOLD":
            valor = 3;
            break;
        case "PLATINUM":
            valor = 4;
            break;
        case "DIAMOND":
            valor = 5;
            break;
        case "MASTER":
            valor = 6;
            break;
        case "GRANDMASTER":
            valor = 7;
            break;
        case "CHALLENGER":
            valor = 8;
            break;
        default:
            valor = -1;
            break;

    }
    return valor;
}

function mayorRango(tier, rank, points, tierFlex, rankFlex, pointFlex) {
    if(convertirRango(tier) < convertirRango(tierFlex)){

        console.log("Caso 1 " + tierFlex + convertirRango(tierFlex));
        return {rango: tierFlex,division: rankFlex,puntos: pointFlex};

    }else{

        console.log("Caso 2 " + tier + convertirRango(tier));
        return {rango: tier,division: rank,puntos: points};

    }
}
var campeonesMasJugados = {}

async function buscar() {
    document.getElementsByClassName("fondoLol")[0].style.backgroundImage = "url('../../static/fondoLogged.jpg')";
    document.getElementById("error").classList.add('hidden');
    document.getElementById("perfilContainer").classList.add('hidden');
    document.getElementById("cargando").style.display="";
    const nombreInvocador = document.getElementById('caja-buscar').value;
    console.log("Nombre: " + nombreInvocador);
    document.getElementById('caja-buscar').value = "";
    let region = document.getElementById("region").value;
    let url = "http://localhost:3000/league?nombreInvocador=" + encodeURIComponent(nombreInvocador) +"&region=" +region;
    if ( window.location.href !==  url){
        window.location.href = "http://localhost:3000/league?nombreInvocador=" + encodeURIComponent(nombreInvocador) +"&region=" +region;
    }

    borrar();
    try {
        const response = await fetch('/buscarData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreInvocador,region })

        });
        document.getElementById("cargando").style.display="none";
        document.getElementById("footer").classList.remove('hidden');
        var campeon1WinRate = 0;
        var campeon2WinRate = 0;
        var campeon3WinRate = 0;

        var mediaCS1 = 0;
        var mediaCS2 = 0;
        var mediaCS3 = 0;

        
        var totalkdaCampeon1 = 0;
        var totalkdaCampeon2 = 0;
        var totalkdaCampeon3 = 0;


        const data = await response.json();
        // console.log(data);
        campeonesMasJugados = {
            campeon1 : "no jugado",
        porcentaje1 : "no jugado",
        mediaCS1 : 0,
        jugados1 : 0,
        campeon2 : "no jugado",
        porcentaje2 : "no jugado",
        mediaCS2 : 0,
        jugados2 : 0,
        campeon3 : "no jugado",
        porcentaje3 : "no jugado",
        mediaCS3 : 0,
        jugados3 : 0,
        }
        console.log(campeonesMasJugados)

        campeon1 = "no jugado";
        porcentaje1 = "no jugado";
        mediaCS1 = 0;
        jugados1 = 0;
        campeon2 = "no jugado";
        porcentaje2 = "no jugado";
        mediaCS2 = 0;
        jugados2 = 0;
        campeon3 = "no jugado";
        porcentaje3 = "no jugado";
        mediaCS3 = 0;
        jugados3 = 0;

        
 
        if(data[0].estado !== 'false'){
            for(let i = 4; i < data.length-1; i += 2){

                let resultado;
                if(data[i].win === true){
                    resultado = "Victoria";
                }else{
                    resultado = "Derrota";
                }
                let campeon = data[i].championPlayed;
                let matchId = data[i].matchId;
                let duracion = data[i].timePlayed/60;
                let kda = 0;
                if(data[i].kda !== "NaN"){
                    kda = data[i].kda;
                }
                let kp = 0;
                if(data[i].kp > 0){
                    kp = data[i].kp * 100;
                }
                let items = [];
                let cs = data[i].cs;
                let physicalDamageDealt = data[i].physicalDamageDealt;
                let magicDamageDealt = data[i].magicDamageDealt;
                let trueDamageDealt = data[i].trueDamageDealt;
                let totalDamageDealtToChampions = data[i].totalDamageDealtToChampions;
                items.push(data[i].item0Image);
                items.push(data[i].item1Image);
                items.push(data[i].item2Image);
                items.push(data[i].item3Image);
                items.push(data[i].item4Image);
                items.push(data[i].item5Image);
                items.push(data[i].item6Image);
                var campeon1 = data[23].campeon1.name;
                var totalCampeon1 = data[23].campeon1.totalGames
                var campeon2 = data[23].campeon2.name;
                var totalCampeon2 = data[23].campeon2.totalGames; ;
                var campeon3 = data[23].campeon3.name
                var totalCampeon3 = data[23].campeon3.totalGames;;
                var nivel = data[i].championLevel;
                if (data[i].championPlayed === campeon1 && data[i].win === true){
                    campeon1WinRate +=1;;
                }else if (data[i].championPlayed === campeon2 && data[i].win === true){
                    campeon2WinRate +=1;;
                }else if (data[i].championPlayed === campeon3 && data[i].win === true){
                    campeon3WinRate +=1;;
                }

                if (data[i].championPlayed === campeon1){
                    mediaCS1 += cs;;
                }else if (data[i].championPlayed === campeon2){
                    mediaCS2 += cs;;
                }else if (data[i].championPlayed === campeon3){
                    mediaCS3 += cs;;
                }

               if (campeon===campeon1){
                totalkdaCampeon1 += kda;
               }else if (campeon===campeon2){
                totalkdaCampeon2 += kda;
               }else  if (campeon===campeon3){
                totalkdaCampeon3 += kda;
               }

                console.log("Añadiendo partida");
                document.getElementById('NombreCuenta').innerHTML = data[0];
                imagen.push(data[2]);
                document.getElementById('img-perfil').src = "http://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/"+data[2]+ ".png";
                añadirPartida(data[i].championPlayed,resultado,data[i].role,data[i].gameMode,duracion.toFixed(2),kda.toFixed(2),`${data[i].kills}/${data[i].deaths}/${data[i].assists}`,kp.toFixed(0),items, cs, totalDamageDealtToChampions, matchId,nivel);
                // console.log(i)               
            }
            var campeon1WR = campeon1WinRate / totalCampeon1 * 100;
            campeon1WR = campeon1WR.toFixed(0);
            var campeon1WRT = campeon1WR + "%";
            var campeon2WR = campeon2WinRate / totalCampeon2 * 100;
            campeon2WR = campeon2WR.toFixed(0);
            var campeon2WRT = campeon2WR + "%";
            var campeon3WR = campeon3WinRate / totalCampeon3 * 100;
            campeon3WR = campeon3WR.toFixed(0);
            var campeon3WRT = campeon3WR + "%";
         
            mediaCS1 = mediaCS1 / totalCampeon1;
            mediaCS2 = mediaCS2 / totalCampeon2;
            mediaCS3 = mediaCS3 / totalCampeon3;

            var kdaCampeon1 = totalkdaCampeon1 / totalCampeon1;
            var kdaCampeon2 = totalkdaCampeon2 / totalCampeon2;
            var kdaCampeon3 = totalkdaCampeon3 / totalCampeon3;
        
            var rango ={};
            rango = mayorRango(data[1].tier,data[1].rank,data[1].points,data[1].tierFlex,data[1].rankFlex,data[1].pointFlex);

            campeonesMasJugados.campeon1 = campeon1;
            campeonesMasJugados.porcentaje1 =  campeon1WRT;
            campeonesMasJugados.mediaCS1 =mediaCS1.toFixed(0);
            campeonesMasJugados.jugados1 =totalCampeon1;
            campeonesMasJugados.campeon2 = campeon2;
            campeonesMasJugados.porcentaje2 =campeon2WRT;
            campeonesMasJugados.mediaCS2 =mediaCS2;
            campeonesMasJugados.jugados2 =totalCampeon2;
            campeonesMasJugados.campeon3 = campeon3;
            campeonesMasJugados.porcentaje3 =campeon3WRT;
            campeonesMasJugados.mediaCS3 =mediaCS3;
            campeonesMasJugados.jugados3 =totalCampeon3;
            campeonesMasJugados.kda1 = kdaCampeon1.toFixed(2);
            campeonesMasJugados.kda2 = kdaCampeon2.toFixed(2);
            campeonesMasJugados.kda3 = kdaCampeon3.toFixed(2);

            // añadirCampeon(campeon1, campeon1WRT, mediaCS1.toFixed(2), totalCampeon1, campeon2, campeon2WRT, mediaCS2.toFixed(2), totalCampeon2, campeon3, campeon3WRT,   mediaCS3.toFixed(2), totalCampeon3) ;
            añadirCampeon(campeonesMasJugados) ;
            console.log(rango.rango+","+rango.division+";"+rango.puntos)
            añadirRango(rango.rango,rango.division,rango.puntos);
        }else{
            document.getElementById("error").innerText = "Perfil no encontrado";
            document.getElementById("error").classList.remove("hidden");
            document.getElementById("perfilContainer").style.display='none';
        }
       
        

        console.log(campeonesMasJugados)
    } catch (error) {
        console.log(error);
    }finally {
        document.getElementById("cargando").classList.add('hidden');
    }

}


async function loguear(){
    let email = document.getElementById("typeEmailX").value;
    let password = document.getElementById("typePasswordX").value;
    console.log("Valores: " +email);
    try {
        const response = await fetch("/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })
        const data = await response.json();
        console.log(data);
        if(data.estado === "ok"){
            if(data.usuario[0].usuario !== undefined){
                console.log("Ha encontrado el usuario: " + data.usuario[0].usuario);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sesion iniciada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() =>{
                        console.log("deberia de cambiar");
                        window.location.href=`/leagueLogged?user=${data.usuario[0].usuario}`;
                    }
                )

            }
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No hay cuenta refistrada con esas credenciales',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }catch (error){}


}

function redireccionarPartida(nombreInvocador, game,perfil) {
    window.location.href = "/leagueGame?nombreInvocador=" + encodeURIComponent(nombreInvocador) + "&gameId=" + encodeURIComponent(game)+"&perfil="+perfil;
}

function obtenerDatos(event){
    console.log("boton presionado");
    console.log(ids);
    console.log(event.target.classList.value);
    for(let i = 0; i < 10; i++) {
        if (event.target.classList.value.indexOf(i.toString()) !== -1) {
            console.log("encontrado en posicion: "+i);
            redireccionarPartida(nombreInvocador, ids[i],imagen[0]);
        }
    }
}

function redireccionar(nombreInvocador, region) {
    // window.location.href = "/league?nombreInvocador=" + encodeURIComponent(nombreInvocador) + "&region=" + encodeURIComponent(region);
    window.location.href = "/league?nombreInvocador=" + encodeURIComponent(nombreInvocador) + "&region=" + encodeURIComponent(region);
}
function hola(){
    let nombre = $("#favoritonombre").text();
    console.log("nombre " + nombre);
    let server = $("#favoritoserver").text();
    console.log("server " +server)
    redireccionar(nombre,server);
}

function cargarFavoritos(){

}

const input = document.getElementById("caja-buscar");
const placeholder = "Buscar Invocador";

input.addEventListener("mouseover", () => {
  input.classList.add("active");
  input.classList.remove("inactive");
});

input.addEventListener("mouseout", () => {
  if (input.value === "") {
    input.classList.remove("active");
    input.classList.add("inactive");
    input.placeholder = placeholder;
    input.blur();
  }
});

input.addEventListener("blur", () => {
  if (input.value === "") {
    input.classList.remove("active");
    input.classList.add("inactive");
    input.placeholder = placeholder;
  }
});

input.addEventListener("toggle",() =>{
    input.classList.add("active");
    input.classList.remove("inactive");
});

function buscando2() {
  console.log("Buscando...");
}
