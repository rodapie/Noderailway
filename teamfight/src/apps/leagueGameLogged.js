const queryString = window.location.search;

// Crear un objeto con los parámetros de la cadena de consulta
const params = new URLSearchParams(queryString);
console.log(params)// Obtener el valor del parámetro 'nombreInvocador'
const nombreInvocador = params.get('nombreInvocador');
let gameId = params.get('gameId');
let perfil = params.get('perfil');
console.log("Id =" +gameId);
console.log("nombre de invocador: "+nombreInvocador)
const cookieValue = decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('cookie=')).split('=')[1]);
const cookieObject = JSON.parse(cookieValue);

document.addEventListener("DOMContentLoaded", function() {
    //Aqui iria un forEach de cada partida que traiga la API y se cargan los valores como parametros de la funcion
    // document.getElementById("tabla_partidas").innerHTML = '';
    // document.getElementById("tabla_campeones").innerHTML = '';
    // document.getElementById('caja-buscar').value = nombreInvocador;
    // console.log(document.getElementById('caja-buscar').value);
    // if(nombreInvocador){
    //     buscar();
    //
    // }

    document.getElementById('img-rango').src = "http://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/"+perfil+ ".png";
    document.getElementById("NombreCuenta").innerHTML=nombreInvocador;

    if (nombreInvocador){
        data()
    }

});

function conectado(){

    if (cookieObject) {
        usuarioConectado = true;
    }
    return usuarioConectado;
}

function inicios(){
    if(conectado()){
        window.location.href = `/indexLogged?user=${cookieObject.name}`;
    }else{
        window.location.href = `/`;
    }
}

const BASE_ITEM_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/';
    function getItemImageURL(itemId) {
        if(itemId === 0){
            return '/static/placeholder.jpg';
        }else{
            return `${BASE_ITEM_IMAGE_URL}${itemId}.png`;
        }
        
    }
function calculardaño(dañofisico,dañomagico,dañoverdadero,total) {
    let fisico = (dañofisico / total) * 100;
    console.log("fisico =" + fisico);
    let magico = (dañomagico / total) * 100;
    console.log("magico =" + magico + "y dano magico: " + dañomagico);
    let verdadero = (dañoverdadero / total) * 100;
    console.log("verdadero =" + verdadero);
    // $(".chart").css('backgroundImage',`conic-gradient(red ${fisico.toFixed(0)}%, blue ${magico.toFixed(0)}%, white ${verdadero.toFixed(0)} %);`);
    $(".chart").css('background-image', 'conic-gradient(red '+fisico.toFixed(0)+'%, blue 0 '+magico.toFixed(0)+'%, white 0 '+verdadero.toFixed(0)+'%)');
    document.querySelector('#danoFisico').innerHTML = "Daño Fisico "+dañofisico;
    document.querySelector('#danoMagico').innerHTML = "Daño Magico "+dañomagico;
    document.querySelector('#danoVerdadero').innerHTML = "Daño Verdadero "+dañoverdadero;
    document.querySelector('#danoTotal').innerHTML = "Daño Total "+total;
}

async function añadirPartida(partida){
    document.querySelector('#gameMode').innerHTML = partida.tipoPartida;
    calculardaño(partida.fisico,partida.magico,partida.verdadero,partida.total);

    document.querySelector('#imgCampeon1').src = `/static/${partida.campeon1}.png`;

    document.querySelector('#invocador1').innerHTML = partida.invocador1;
    if (partida.win1 === true){
        document.querySelector('#invocador1').classList.add('verde');
    }else{
        document.querySelector('#invocador1').classList.add('rojo');
    }
    document.querySelector("#ImagenItem10").src = getItemImageURL(partida.items1[0]);
    document.querySelector("#ImagenItem11").src = getItemImageURL(partida.items1[1]);
    document.querySelector("#ImagenItem12").src = getItemImageURL(partida.items1[2]);
    document.querySelector("#ImagenItem13").src = getItemImageURL(partida.items1[3]);
    document.querySelector("#ImagenItem14").src = getItemImageURL(partida.items1[4]);
    document.querySelector("#ImagenItem15").src = getItemImageURL(partida.items1[5]);
    document.querySelector("#ImagenItem16").src = getItemImageURL(partida.items1[6]);
    
    document.querySelector('#kills1').innerHTML = partida.kills1;
    document.querySelector('#deaths1').innerHTML = partida.deaths1;
    document.querySelector('#assists1').innerHTML = partida.assists1;
    document.querySelector('#kda1').innerHTML = "KDA " +partida.kda1;
    document.querySelector('#cs1').innerHTML = "CS " +partida.cs1;

    var rachaMasAlta1;
    if(partida.pentaKills1 > 0){
        rachaMasAlta1 = "Pentakill";
        
    }else if (partida.cuadrakills1 > 0){
        rachaMasAlta1 = "Cuadrakill";
    }else if (partida.triplekills1 > 0){
        rachaMasAlta1 = "Triple Kill";
    }else if (partida.doublekills1 > 0){
        rachaMasAlta1 = "Doble kill";
    }else{
        document.querySelector('#racha1').classList.add("oculto");
    }
    document.querySelector('#racha1').innerHTML = rachaMasAlta1;

    document.querySelector('#imgCampeon2').src = `/static/${partida.campeon2}.png`;
    document.querySelector('#invocador2').innerHTML = partida.invocador2;
    if (partida.win2 === true){
        document.querySelector('#invocador2').classList.add('verde');
    }else{
        document.querySelector('#invocador2').classList.add('rojo');
    }
    document.querySelector("#ImagenItem20").src = getItemImageURL(partida.items2[0]);
    document.querySelector("#ImagenItem21").src = getItemImageURL(partida.items2[1]);
    document.querySelector("#ImagenItem22").src = getItemImageURL(partida.items2[2]);
    document.querySelector("#ImagenItem23").src = getItemImageURL(partida.items2[3]);
    document.querySelector("#ImagenItem24").src = getItemImageURL(partida.items2[4]);
    document.querySelector("#ImagenItem25").src = getItemImageURL(partida.items2[5]);
    document.querySelector("#ImagenItem26").src = getItemImageURL(partida.items2[6]);
    document.querySelector('#kills2').innerHTML = partida.kills2;
    document.querySelector('#deaths2').innerHTML = partida.deaths2;
    document.querySelector('#assists2').innerHTML = partida.assists2;
    document.querySelector('#kda2').innerHTML = "KDA " +partida.kda2;
    document.querySelector('#cs2').innerHTML = "CS " +partida.cs2;

    var rachaMasAlta2;
    if(partida.pentaKills2 > 0){
        rachaMasAlta2 = "Pentakill";
    }else if (partida.cuadrakills2 > 0){
        rachaMasAlta2 = "Cuadrakill";
    }else if (partida.triplekills2 > 0){
        rachaMasAlta2 = "Triple Kill";
    }else if (partida.doublekills2 > 0){
        rachaMasAlta2 = "Doble kill";
    }else{
        document.querySelector('#racha2').classList.add("oculto");
    }
    document.querySelector('#racha2').innerHTML = rachaMasAlta2;


    document.querySelector('#imgCampeon3').src = `/static/${partida.campeon3}.png`;
    document.querySelector('#invocador3').innerHTML = partida.invocador3;
    if (partida.win3 === true){
        document.querySelector('#invocador3').classList.add('verde');
    }else{
        document.querySelector('#invocador3').classList.add('rojo');
    }
    document.querySelector("#ImagenItem30").src = getItemImageURL(partida.items3[0]);
    document.querySelector("#ImagenItem31").src = getItemImageURL(partida.items3[1]);
    document.querySelector("#ImagenItem32").src = getItemImageURL(partida.items3[2]);
    document.querySelector("#ImagenItem33").src = getItemImageURL(partida.items3[3]);
    document.querySelector("#ImagenItem34").src = getItemImageURL(partida.items3[4]);
    document.querySelector("#ImagenItem35").src = getItemImageURL(partida.items3[5]);
    document.querySelector("#ImagenItem36").src = getItemImageURL(partida.items3[6]);
    document.querySelector('#kills3').innerHTML = partida.kills3;
    document.querySelector('#deaths3').innerHTML = partida.deaths3;
    document.querySelector('#assists3').innerHTML = partida.assists3;
    document.querySelector('#kda3').innerHTML = "KDA " +partida.kda3;
    document.querySelector('#cs3').innerHTML = "CS " +partida.cs3;

    var rachaMasAlta3;
    if(partida.pentaKills3 > 0){
        rachaMasAlta3 = "Pentakill";
    }else if (partida.cuadrakills3 > 0){
        rachaMasAlta3 = "Cuadrakill";
    }else if (partida.triplekills3 > 0){
        rachaMasAlta3= "Triple Kill";
    }else if (partida.doublekills3 > 0){
        rachaMasAlta3 = "Doble kill";
    }else{
        document.querySelector('#racha3').classList.add("oculto");
    }
    document.querySelector('#racha3').innerHTML = rachaMasAlta3;

    document.querySelector('#imgCampeon4').src = `/static/${partida.campeon4}.png`;
    document.querySelector('#invocador4').innerHTML = partida.invocador4;
    if (partida.win4 === true){
        document.querySelector('#invocador4').classList.add('verde');
    }else{
        document.querySelector('#invocador4').classList.add('rojo');
    }
    document.querySelector("#ImagenItem40").src = getItemImageURL(partida.items4[0]);
    document.querySelector("#ImagenItem41").src = getItemImageURL(partida.items4[1]);
    document.querySelector("#ImagenItem42").src = getItemImageURL(partida.items4[2]);
    document.querySelector("#ImagenItem43").src = getItemImageURL(partida.items4[3]);
    document.querySelector("#ImagenItem44").src = getItemImageURL(partida.items4[4]);
    document.querySelector("#ImagenItem45").src = getItemImageURL(partida.items4[5]);
    document.querySelector("#ImagenItem46").src = getItemImageURL(partida.items5[6]);
    document.querySelector('#kills4').innerHTML = partida.kills4;
    document.querySelector('#deaths4').innerHTML = partida.deaths4;
    document.querySelector('#assists4').innerHTML = partida.assists4;
    document.querySelector('#kda4').innerHTML = "KDA " +partida.kda4;
    document.querySelector('#cs4').innerHTML = "CS " +partida.cs4;

    var rachaMasAlta4;
    if(partida.pentaKills4 > 0){
        rachaMasAlta4 = "Pentakill";
    }else if (partida.cuadrakills4 > 0){
        rachaMasAlta4 = "Cuadrakill";
    }else if (partida.triplekills4 > 0){
        rachaMasAlta4 = "Triple Kill";
    }else if (partida.doublekills4 > 0){
        rachaMasAlta4 = "Doble kill";
    }else{
        document.querySelector('#racha4').classList.add("oculto");
    }
    document.querySelector('#racha4').innerHTML = rachaMasAlta4;

    document.querySelector('#imgCampeon5').src = `/static/${partida.campeon5}.png`;
    document.querySelector('#invocador5').innerHTML = partida.invocador5;
    if (partida.win5 === true){
        document.querySelector('#invocador5').classList.add('verde');
    }else{
        document.querySelector('#invocador5').classList.add('rojo');
    }
    document.querySelector("#ImagenItem50").src = getItemImageURL(partida.items5[0]);
    document.querySelector("#ImagenItem51").src = getItemImageURL(partida.items5[1]);
    document.querySelector("#ImagenItem52").src = getItemImageURL(partida.items5[2]);
    document.querySelector("#ImagenItem53").src = getItemImageURL(partida.items5[3]);
    document.querySelector("#ImagenItem54").src = getItemImageURL(partida.items5[4]);
    document.querySelector("#ImagenItem55").src = getItemImageURL(partida.items5[5]);
    document.querySelector("#ImagenItem56").src = getItemImageURL(partida.items5[6]);
    document.querySelector('#kills5').innerHTML = partida.kills5;
    document.querySelector('#deaths5').innerHTML = partida.deaths5;
    document.querySelector('#assists5').innerHTML = partida.assists5;
    document.querySelector('#kda5').innerHTML = "KDA " +partida.kda5;
    document.querySelector('#cs5').innerHTML = "CS " +partida.cs5;

    var rachaMasAlta5;
    if(partida.pentaKills5 > 0){
        rachaMasAlta5 = "Pentakill";
    }else if (partida.cuadrakills5 > 0){
        rachaMasAlta5 = "Cuadrakill";
    }else if (partida.triplekills5 > 0){
        rachaMasAlta5 = "Triple Kill";
    }else if (partida.doublekills5 > 0){
        rachaMasAlta5 = "Doble kill";
    }else{
        document.querySelector('#racha5').classList.add("oculto");
    }
    document.querySelector('#racha5').innerHTML = rachaMasAlta5;

    document.querySelector('#imgCampeon6').src = `/static/${partida.campeon6}.png`;
    document.querySelector('#invocador6').innerHTML = partida.invocador6;
    if (partida.win6 === true){
        document.querySelector('#invocador6').classList.add('verde');
    }else{
        document.querySelector('#invocador6').classList.add('rojo');
    }
    document.querySelector("#ImagenItem60").src = getItemImageURL(partida.items6[0]);
    document.querySelector("#ImagenItem61").src = getItemImageURL(partida.items6[1]);
    document.querySelector("#ImagenItem62").src = getItemImageURL(partida.items6[2]);
    document.querySelector("#ImagenItem63").src = getItemImageURL(partida.items6[3]);
    document.querySelector("#ImagenItem64").src = getItemImageURL(partida.items6[4]);
    document.querySelector("#ImagenItem65").src = getItemImageURL(partida.items6[5]);
    document.querySelector("#ImagenItem66").src = getItemImageURL(partida.items6[6]);
    document.querySelector('#kills6').innerHTML = partida.kills6;
    document.querySelector('#deaths6').innerHTML = partida.deaths6;
    document.querySelector('#assists6').innerHTML = partida.assists6;
    document.querySelector('#kda6').innerHTML = "KDA " +partida.kda6;
    document.querySelector('#cs6').innerHTML = "CS " +partida.cs6;

    var rachaMasAlta6;
    if(partida.pentaKills6 > 0){
        rachaMasAlta6 = "Pentakill";
    }else if (partida.cuadrakills6 > 0){
        rachaMasAlta6 = "Cuadrakill";
    }else if (partida.triplekills6 > 0){
        rachaMasAlta6 = "Triple Kill";
    }else if (partida.doublekills6 > 0){
        rachaMasAlta6 = "Doble kill";
    }else{
        document.querySelector('#racha6').classList.add("oculto");
    }
    document.querySelector('#racha6').innerHTML = rachaMasAlta6;

    document.querySelector('#imgCampeon7').src = `/static/${partida.campeon7}.png`;
    document.querySelector('#invocador7').innerHTML = partida.invocador7;
    if (partida.win7 === true){
        document.querySelector('#invocador7').classList.add('verde');
    }else{
        document.querySelector('#invocador7').classList.add('rojo');
    }
    document.querySelector("#ImagenItem70").src = getItemImageURL(partida.items7[0]);
    document.querySelector("#ImagenItem71").src = getItemImageURL(partida.items7[1]);
    document.querySelector("#ImagenItem72").src = getItemImageURL(partida.items7[2]);
    document.querySelector("#ImagenItem73").src = getItemImageURL(partida.items7[3]);
    document.querySelector("#ImagenItem74").src = getItemImageURL(partida.items7[4]);
    document.querySelector("#ImagenItem75").src = getItemImageURL(partida.items7[5]);
    document.querySelector("#ImagenItem76").src = getItemImageURL(partida.items7[6]);
    document.querySelector('#kills7').innerHTML = partida.kills7;
    document.querySelector('#deaths7').innerHTML = partida.deaths7;
    document.querySelector('#assists7').innerHTML = partida.assists7;
    document.querySelector('#kda7').innerHTML = "KDA " +partida.kda7;
    document.querySelector('#cs7').innerHTML = "CS " +partida.cs7;

    var rachaMasAlta7;
    if(partida.pentaKills7 > 0){
        rachaMasAlta7 = "Pentakill";
    }else if (partida.cuadrakills7 > 0){
        rachaMasAlta7 = "Cuadrakill";
    }else if (partida.triplekills7 > 0){
        rachaMasAlta7 = "Triple Kill";
    }else if (partida.doublekills7 > 0){
        rachaMasAlta7 = "Doble kill";
    }else{
        document.querySelector('#racha7').classList.add("oculto");
    }
    document.querySelector('#racha7').innerHTML = rachaMasAlta7;

    document.querySelector('#imgCampeon8').src = `/static/${partida.campeon8}.png`;
    document.querySelector('#invocador8').innerHTML = partida.invocador8;
    if (partida.win8 === true){
        document.querySelector('#invocador8').classList.add('verde');
    }else{
        document.querySelector('#invocador8').classList.add('rojo');
    }
    document.querySelector("#ImagenItem80").src = getItemImageURL(partida.items8[0]);
    document.querySelector("#ImagenItem81").src = getItemImageURL(partida.items8[1]);
    document.querySelector("#ImagenItem82").src = getItemImageURL(partida.items8[2]);
    document.querySelector("#ImagenItem83").src = getItemImageURL(partida.items8[3]);
    document.querySelector("#ImagenItem84").src = getItemImageURL(partida.items8[4]);
    document.querySelector("#ImagenItem85").src = getItemImageURL(partida.items8[5]);
    document.querySelector("#ImagenItem86").src = getItemImageURL(partida.items8[6]);
    document.querySelector('#kills8').innerHTML = partida.kills8;
    document.querySelector('#deaths8').innerHTML = partida.deaths8;
    document.querySelector('#assists8').innerHTML = partida.assists8;
    document.querySelector('#kda8').innerHTML = "KDA " +partida.kda8;
    document.querySelector('#cs8').innerHTML = "CS " +partida.cs8;

    var rachaMasAlta8;
    if(partida.pentaKills8 > 0){
        rachaMasAlta8 = "Pentakill";
    }else if (partida.cuadrakills8 > 0){
        rachaMasAlta8 = "Cuadrakill";
    }else if (partida.triplekills8 > 0){
        rachaMasAlta8 = "Triple Kill";
    }else if (partida.doublekills8 > 0){
        rachaMasAlta8 = "Doble kill";
    }else{
        document.querySelector('#racha8').classList.add("oculto");
    }
    document.querySelector('#racha8').innerHTML = rachaMasAlta8;

    document.querySelector('#imgCampeon9').src = `/static/${partida.campeon9}.png`;
    document.querySelector('#invocador9').innerHTML = partida.invocador9;
    if (partida.win9 === true){
        document.querySelector('#invocador9').classList.add('verde');
    }else{
        document.querySelector('#invocador9').classList.add('rojo');
    }
    document.querySelector("#ImagenItem90").src = getItemImageURL(partida.items9[0]);
    document.querySelector("#ImagenItem91").src = getItemImageURL(partida.items9[1]);
    document.querySelector("#ImagenItem92").src = getItemImageURL(partida.items9[2]);
    document.querySelector("#ImagenItem93").src = getItemImageURL(partida.items9[3]);
    document.querySelector("#ImagenItem94").src = getItemImageURL(partida.items9[4]);
    document.querySelector("#ImagenItem95").src = getItemImageURL(partida.items9[5]);
    document.querySelector("#ImagenItem96").src = getItemImageURL(partida.items9[6]);
    document.querySelector('#kills9').innerHTML = partida.kills9;
    document.querySelector('#deaths9').innerHTML = partida.deaths9;
    document.querySelector('#assists9').innerHTML = partida.assists9;
    document.querySelector('#kda9').innerHTML = "KDA " +partida.kda9;
    document.querySelector('#cs9').innerHTML = "CS " +partida.cs9;

    var rachaMasAlta9;
    if(partida.pentaKills9 > 0){
        rachaMasAlta9 = "Pentakill";
    }else if (partida.cuadrakills9 > 0){
        rachaMasAlta9 = "Cuadrakill";
    }else if (partida.triplekills9 > 0){
        rachaMasAlta9 = "Triple Kill";
    }else if (partida.doublekills9 > 0){
        rachaMasAlta9 = "Doble kill";
    }else{
        document.querySelector('#racha9').classList.add("oculto");
    }
    document.querySelector('#racha9').innerHTML = rachaMasAlta9;
    
    document.querySelector('#imgCampeon10').src = `/static/${partida.campeon10}.png`;
    document.querySelector('#invocador10').innerHTML = partida.invocador10;
    if (partida.win10 === true){
        document.querySelector('#invocador10').classList.add('verde');
    }else{
        document.querySelector('#invocador10').classList.add('rojo');
    }
    document.querySelector("#ImagenItem100").src = getItemImageURL(partida.items10[0]);
    document.querySelector("#ImagenItem101").src = getItemImageURL(partida.items10[1]);
    document.querySelector("#ImagenItem102").src = getItemImageURL(partida.items10[2]);
    document.querySelector("#ImagenItem103").src = getItemImageURL(partida.items10[3]);
    document.querySelector("#ImagenItem104").src = getItemImageURL(partida.items10[4]);
    document.querySelector("#ImagenItem105").src = getItemImageURL(partida.items10[5]);
    document.querySelector("#ImagenItem106").src = getItemImageURL(partida.items10[6]);
    document.querySelector('#kills10').innerHTML = partida.kills10;
    document.querySelector('#deaths10').innerHTML = partida.deaths10;
    document.querySelector('#assists10').innerHTML = partida.assists10;
    document.querySelector('#kda10').innerHTML = "KDA " +partida.kda10;
    document.querySelector('#cs10').innerHTML = "CS " +partida.cs10;
    console.log(partida.cs10)

    var rachaMasAlta10;
    if(partida.pentaKills10 > 0){
        rachaMasAlta10 = "Pentakill";
    }else if (partida.cuadrakills10 > 0){
        rachaMasAlta10 = "Cuadrakill";
    }else if (partida.triplekills10 > 0){
        rachaMasAlta10 = "Triple Kill";
    }else if (partida.doublekills10 > 0){
        rachaMasAlta10 = "Doble kill";
    }else{
        document.querySelector('#racha10').classList.add("oculto");
    }
    document.querySelector('#racha10').innerHTML = rachaMasAlta10;
    
    // daño del invocador visitado
    document.querySelector('#danoFisico').innerHTML = "Daño físico "+partida.fisico
            document.querySelector('#danoMagico').innerHTML = "Daño mágico "+partida.magico
            document.querySelector('#danoVerdadero').innerHTML = "Daño verdadero "+partida.verdadero
            document.querySelector('#danoTotal').innerHTML = "Daño total "+partida.total

            
}

async function data (){
    try{
        const response = await fetch("/datosPartida",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({gameId})
           
        })
        if (response.status === 200) {
            const data = await response.json();
            console.log("esta es la data: "+data);
            console.log("esta es la victoria: "+data.info.participants[0].win + data.info.participants[0].championName);
            const campeon1 = data.info.participants[0].championName;
            console.log(data)
            let participante ="";
            let fisico;
            let magico;
            let verdadero;
            let total;
            for(let i = 0; i < 10; i++){
                if(data.info.participants[i].summonerName === nombreInvocador){
                    participante = data.info.participants[i].summonerName;
                        fisico= data.info.participants[i].physicalDamageDealtToChampions;
                        magico = data.info.participants[i].magicDamageDealtToChampions;
                        verdadero = data.info.participants[i].trueDamageDealtToChampions;
                        total = data.info.participants[i].totalDamageDealtToChampions;
                }
            }
            console.log("Tipo de partida= "+data.info.queueId);
            let modo;
            switch (data.info.queueId) {

                case 4:
                case 6:
                    modo = "A CIEGAS";
                    break;
                case 400:
                    modo = "RECLUTAMIENTO";
                    break;
                case 420:
                case 421:
                case 422:
                    modo = "RANKED SOLO/DUO";
                    break;
                case 700:
                case 450:
                    modo = "ARAM";
                    break;
                case 440:
                case 441:
                case 442:
                    modo = "RANKED FLEX"
                    break;
                case 14:
                    modo = "RECLUTAMIENTO";
                    break;
                case 430:
                case 431:
                case 432:
                case 433:
                    modo = "A CIEGAS";
                    break;
            }
            const partida = {

                tipoPartida: modo,
                campeon1: data.info.participants[0].championName,
                invocador1: data.info.participants[0].summonerName,
                items1: [
                    data.info.participants[0].item0,
                    data.info.participants[0].item1,
                    data.info.participants[0].item2,
                    data.info.participants[0].item3,
                    data.info.participants[0].item4,
                    data.info.participants[0].item5,
                    data.info.participants[0].item6
                  ],
                  kills1: data.info.participants[0].kills,
                  deaths1: data.info.participants[0].deaths,
                  assists1: data.info.participants[0].assists,
                  kda1:((data.info.participants[0].kills + data.info.participants[0].assists) / data.info.participants[0].deaths).toFixed(2),
                  win1: data.info.participants[0].win,
                  cs1: data.info.participants[0].totalMinionsKilled  + data.info.participants[0].totalAllyJungleMinionsKilled + data.info.participants[0].totalEnemyJungleMinionsKilled,
                  doublekills1: data.info.participants[0].doubleKills,
                  triplekills1: data.info.participants[0].tripleKills,
                  cuadrakills1: data.info.participants[0].quadraKills,
                  pentakills1: data.info.participants[0].pentaKills,
                
                campeon2: data.info.participants[1].championName,
                invocador2: data.info.participants[1].summonerName,
                items2: [
                    data.info.participants[1].item0,
                    data.info.participants[1].item1,
                    data.info.participants[1].item2,
                    data.info.participants[1].item3,
                    data.info.participants[1].item4,
                    data.info.participants[1].item5,
                    data.info.participants[1].item6
                  ],
                   kills2: data.info.participants[1].kills,
                  deaths2: data.info.participants[1].deaths,
                  assists2: data.info.participants[1].assists,
                  kda2:((data.info.participants[1].kills + data.info.participants[1].assists) / data.info.participants[1].deaths).toFixed(2),
                  win2: data.info.participants[1].win,
                  cs2: data.info.participants[1].totalMinionsKilled  + data.info.participants[1].totalAllyJungleMinionsKilled + data.info.participants[1].totalEnemyJungleMinionsKilled,
                  doublekills2: data.info.participants[1].doubleKills,
                  triplekills2: data.info.participants[1].tripleKills,
                  cuadrakills2: data.info.participants[1].quadraKills,
                   pentakills2: data.info.participants[1].pentaKills,

                campeon3: data.info.participants[2].championName,
                invocador3: data.info.participants[2].summonerName,
                items3: [
                    data.info.participants[2].item0,
                    data.info.participants[2].item1,
                    data.info.participants[2].item2,
                    data.info.participants[2].item3,
                    data.info.participants[2].item4,
                    data.info.participants[2].item5,
                    data.info.participants[2].item6
                  ],
                   kills3: data.info.participants[2].kills,
                  deaths3: data.info.participants[2].deaths,
                  assists3: data.info.participants[2].assists,
                  kda3:((data.info.participants[2].kills + data.info.participants[2].assists) / data.info.participants[2].deaths).toFixed(2),
                  win3: data.info.participants[2].win,
                  cs3: data.info.participants[2].totalMinionsKilled  + data.info.participants[2].totalAllyJungleMinionsKilled + data.info.participants[2].totalEnemyJungleMinionsKilled,
                  doublekills3: data.info.participants[2].doubleKills,
                  triplekills3: data.info.participants[2].tripleKills,
                  cuadrakills3: data.info.participants[2].quadraKills,
                   pentakills3: data.info.participants[2].pentaKills,

                campeon4: data.info.participants[3].championName,
                invocador4: data.info.participants[3].summonerName,
                items4: [
                    data.info.participants[3].item0,
                    data.info.participants[3].item1,
                    data.info.participants[3].item2,
                    data.info.participants[3].item3,
                    data.info.participants[3].item4,
                    data.info.participants[3].item5,
                    data.info.participants[3].item6
                  ],
                   kills4: data.info.participants[3].kills,
                  deaths4: data.info.participants[3].deaths,
                  assists4: data.info.participants[3].assists,
                  kda4:((data.info.participants[3].kills + data.info.participants[3].assists) / data.info.participants[3].deaths).toFixed(2),
                  win4: data.info.participants[3].win,
                  cs4: data.info.participants[3].totalMinionsKilled  + data.info.participants[3].totalAllyJungleMinionsKilled + data.info.participants[3].totalEnemyJungleMinionsKilled,
                  doublekills4: data.info.participants[3].doubleKills,
                  triplekills4: data.info.participants[3].tripleKills,
                  cuadrakills4: data.info.participants[3].quadraKills,
                   pentakills4: data.info.participants[3].pentaKills,

                campeon5: data.info.participants[4].championName,
                invocador5: data.info.participants[4].summonerName,
                items5: [
                    data.info.participants[4].item0,
                    data.info.participants[4].item1,
                    data.info.participants[4].item2,
                    data.info.participants[4].item3,
                    data.info.participants[4].item4,
                    data.info.participants[4].item5,
                    data.info.participants[4].item6
                  ],
                   kills5: data.info.participants[4].kills,
                  deaths5: data.info.participants[4].deaths,
                  assists5: data.info.participants[4].assists,
                  kda5:((data.info.participants[4].kills + data.info.participants[4].assists) / data.info.participants[4].deaths).toFixed(2),
                  win5: data.info.participants[4].win,
                  cs5: data.info.participants[4].totalMinionsKilled  + data.info.participants[4].totalAllyJungleMinionsKilled + data.info.participants[4].totalEnemyJungleMinionsKilled,
                  doublekills5: data.info.participants[4].doubleKills,
                  triplekills5: data.info.participants[4].tripleKills,
                  cuadrakills5: data.info.participants[4].quadraKills,
                   pentakills5: data.info.participants[4].pentaKills,

                campeon6: data.info.participants[5].championName,
                invocador6: data.info.participants[5].summonerName,
                items6: [
                    data.info.participants[5].item0,
                    data.info.participants[5].item1,
                    data.info.participants[5].item2,
                    data.info.participants[5].item3,
                    data.info.participants[5].item4,
                    data.info.participants[5].item5,
                    data.info.participants[5].item6
                  ],
                   kills6: data.info.participants[5].kills,
                  deaths6: data.info.participants[5].deaths,
                  assists6: data.info.participants[5].assists,
                  kda6:((data.info.participants[5].kills + data.info.participants[5].assists) / data.info.participants[5].deaths).toFixed(2),
                  win6: data.info.participants[5].win,
                  cs6: data.info.participants[5].totalMinionsKilled  + data.info.participants[5].totalAllyJungleMinionsKilled + data.info.participants[5].totalEnemyJungleMinionsKilled,
                  doublekills6: data.info.participants[5].doubleKills,
                  triplekills6: data.info.participants[5].tripleKills,
                  cuadrakills6: data.info.participants[5].quadraKills,
                   pentakills6: data.info.participants[5].pentaKills,

                campeon7: data.info.participants[6].championName,
                invocador7: data.info.participants[6].summonerName,
                items7: [
                    data.info.participants[6].item0,
                    data.info.participants[6].item1,
                    data.info.participants[6].item2,
                    data.info.participants[6].item3,
                    data.info.participants[6].item4,
                    data.info.participants[6].item5,
                    data.info.participants[6].item6
                  ],
                   kills7: data.info.participants[6].kills,
                  deaths7: data.info.participants[6].deaths,
                  assists7: data.info.participants[6].assists,
                  kda7:((data.info.participants[6].kills + data.info.participants[6].assists) / data.info.participants[6].deaths).toFixed(2),
                  win7: data.info.participants[6].win,
                  cs7: data.info.participants[6].totalMinionsKilled  + data.info.participants[6].totalAllyJungleMinionsKilled + data.info.participants[6].totalEnemyJungleMinionsKilled,
                  doublekills7: data.info.participants[6].doubleKills,
                  triplekills7: data.info.participants[6].tripleKills,
                  cuadrakills7: data.info.participants[6].quadraKills,
                   pentakills7: data.info.participants[6].pentaKills,

                campeon8: data.info.participants[7].championName,
                invocador8: data.info.participants[7].summonerName,
                items8: [
                    data.info.participants[7].item0,
                    data.info.participants[7].item1,
                    data.info.participants[7].item2,
                    data.info.participants[7].item3,
                    data.info.participants[7].item4,
                    data.info.participants[7].item5,
                    data.info.participants[7].item6
                  ],
                   kills8: data.info.participants[7].kills,
                  deaths8: data.info.participants[7].deaths,
                  assists8: data.info.participants[7].assists,
                  kda8:((data.info.participants[7].kills + data.info.participants[7].assists) / data.info.participants[7].deaths).toFixed(2),
                  win8: data.info.participants[7].win,
                  cs8: data.info.participants[7].totalMinionsKilled  + data.info.participants[7].totalAllyJungleMinionsKilled + data.info.participants[7].totalEnemyJungleMinionsKilled,
                  doublekills8: data.info.participants[7].doubleKills,
                  triplekills8: data.info.participants[7].tripleKills,
                  cuadrakills8: data.info.participants[7].quadraKills,
                   pentakills8: data.info.participants[7].pentaKills,

                campeon9: data.info.participants[8].championName,
                invocador9: data.info.participants[8].summonerName,
                items9: [
                    data.info.participants[8].item0,
                    data.info.participants[8].item1,
                    data.info.participants[8].item2,
                    data.info.participants[8].item3,
                    data.info.participants[8].item4,
                    data.info.participants[8].item5,
                    data.info.participants[8].item6
                  ],
                   kills9: data.info.participants[8].kills,
                  deaths9: data.info.participants[8].deaths,
                  assists9: data.info.participants[8].assists,
                  kda9:((data.info.participants[8].kills + data.info.participants[8].assists) / data.info.participants[8].deaths).toFixed(2),
                  win9: data.info.participants[8].win,
                  cs9: data.info.participants[8].totalMinionsKilled  + data.info.participants[8].totalAllyJungleMinionsKilled + data.info.participants[8].totalEnemyJungleMinionsKilled,
                  doublekills9: data.info.participants[8].doubleKills,
                  triplekills9: data.info.participants[8].tripleKills,
                  cuadrakills9: data.info.participants[8].quadraKills,
                   pentakills9: data.info.participants[8].pentaKills,

                campeon10: data.info.participants[9].championName,
                invocador10: data.info.participants[9].summonerName,
                items10: [
                    data.info.participants[9].item0,
                    data.info.participants[9].item1,
                    data.info.participants[9].item2,
                    data.info.participants[9].item3,
                    data.info.participants[9].item4,
                    data.info.participants[9].item5,
                    data.info.participants[9].item6
                  ],
                   kills10: data.info.participants[9].kills,
                  deaths10: data.info.participants[9].deaths,
                  assists10: data.info.participants[9].assists,
                  kda10:((data.info.participants[9].kills + data.info.participants[9].assists) / data.info.participants[9].deaths).toFixed(2),
                  win10: data.info.participants[9].win,
                  cs10: data.info.participants[9].totalMinionsKilled  + data.info.participants[9].totalAllyJungleMinionsKilled + data.info.participants[9].totalEnemyJungleMinionsKilled,
                  doublekills10: data.info.participants[9].doubleKills,
                  triplekills10: data.info.participants[9].tripleKills,
                  cuadrakills10: data.info.participants[9].quadraKills,
                   pentakills10: data.info.participants[9].pentaKills,

                participante: participante,
                fisico:fisico,
                verdadero: verdadero,
                magico:magico,
                total:total,
                

            }
            for (i=0;i<=9;i++){
                console.log("doblekills"+ data.info.participants[i].doubleKills + data.info.participants[i].championName)
            }
            console.log(partida.cs10+"este es el cs10")
            
            añadirPartida(partida);

        }
    }catch (error){
        console.log(error);
    }
}

data();


    $('li').click(function (){
        let id = $(this).attr("id");
        console.log($('#invocador'+id).text());
        let nombre = $('#invocador'+id).text();
        window.location.href = "/league?nombreInvocador=" + encodeURIComponent(nombre) + "&region=" + encodeURIComponent("euw");
    });


