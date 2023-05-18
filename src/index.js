import express from 'express'
import {dirname,join} from 'path'
import {fileURLToPath} from 'url'
import indexRoutes from './routes/routes.js'
import bodyParser from "body-parser";
import mysql from 'mysql';
import crypto from 'crypto';
import sessions from 'express-session';
import cookieParser from 'cookie-parser';
import r6 from 'r6s-stats-api';
import jsdom from 'jsdom';
import jQuery from 'jquery';
const dom = new jsdom.JSDOM("");


const conexion = mysql.createConnection({
    host :      process.env.DB_HOST     || 'localhost',
    database :  process.env.DB_NAME     || 'teamfight',
    user :      process.env.DB_USER     || 'root',
    password :  process.env.DB_PASSWORD ||  ''
});

const oneDay = 1000 * 60 * 60 *24;



const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))
const API_KEY =  'RGAPI-1c8bc602-0f27-4f4b-88c1-06728b168e62';

console.log(join(__dirname,'/views'))
app.set('views',join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(indexRoutes)
app.use(express.static(join(__dirname,'public')))
app.use('/static',express.static('img'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}))
app.use(cookieParser());

var session;
app.get('/apps/league.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/league.js');
});

app.get('/apps/valorant.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/valorant.js');
});

app.get('/apps/jquery-3.6.4.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/jquery-3.6.4.js');
});

app.get('/apps/siege.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/siege.js');
});

app.get('/apps/main.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/main.js');
});

app.get('/apps/mainLogged.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/mainLogged.js');
});

app.get('/apps/leagueLogged.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/leagueLogged.js');
});


app.get('/apps/siegeLogged.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/siegeLogged.js');
});

app.get('/apps/leagueGame.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/leagueGame.js');
});

app.get('/apps/micuenta.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/apps/micuenta.js');
});
app.post('/buscar-invocador',function(req,res){
    console.log("ha llegado");
    const nombre = req.body.nombreInvocador;
    //recibo el valor del input, ahora hay que mandarlo por la api para recibir el json de vuelta
    res.send(`hola ${nombre}`);
});

app.post('/guardar', (req, res) => {
    // Obtener la contraseña sin encriptar desde el formulario
    // Conectar con la base de datos y guardar el hash de la contraseña
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'teamfight'
    });
    connection.connect(function (err) {
        if (err) {
            let data = {estado: "false"};
            res.send(data);
        }
        console.log("Connected!");
        const sql = req.body.cadena;
        connection.query(sql, function (err, result) {
            console.log(result)
            if (err) {
                let data = {estado: "No"};
                res.send(data);
                return console.error(err);
            } else {
                console.log("1 record updated");
                let data = {estado: "ok"}
                console.log(data.estado);
                res.send(data);
            }
        });
    });
});

app.post('/registro', (req, res) => {
    // Obtener la contraseña sin encriptar desde el formulario
    let password = req.body.password;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    // Conectar con la base de datos y guardar el hash de la contraseña
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'teamfight'
    });

    connection.connect(function(err) {
        if(err){
            let data = {estado : "false"};
            res.send(data);
        }
        console.log("Connected!");

        // Insertar el usuario en la base de datos con el hash de la contraseña


        const sql = "INSERT INTO usuarios (usuario,league,servidor, siege, plataforma, email, passw) VALUES ('" + req.body.usuario + "','" + req.body.lol + "', '" + req.body.server + "', '" + req.body.siege + "', '"+ req.body.plat + "', '" + req.body.email + "', '" + hashedPassword + "')";

        const select = "SELECT * FROM usuarios WHERE email = ?";
        connection.query(select, [req.body.email], function (err, result) {
            console.log(err);
            console.log("tamaño de result: " +result.length);
            if(result.length !== 0){
                let data = {estado: "duplicado"};
                res.send(data);
                return console.error(err);
            }
        })

        connection.query(sql, function(err, result) {
            console.log(result)
            if (err) {
                let data = {estado: "No"};
                res.send(data);
                return console.error(err);
            } else {
                console.log("1 record inserted");
                let data = {estado: "ok"}
                console.log(data.estado);
                res.send(data);
            }
        });

        // Cerrar la conexión
        connection.end();
    });
});

app.post("/anadirFavorito",(req,res) => {
    console.log(req.body);

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'teamfight'
    });

    connection.connect(function (err) {
        if (err) throw err;
        const comprobar = "select * from tags where usuario = ? and tag = ? and amigo= ?;";
        connection.query(comprobar, [req.body.nombre, req.body.tag,req.body.amigo], function (err, result) {
            console.log(err);
            console.log("result de comprobar " + result.length);
            if (result.length === 0) {
                const favorito = "insert into tags(usuario,tag,amigo,juego,region)  values (?,?,?,?,?);";
                connection.query(favorito, [req.body.nombre, req.body.tag, req.body.amigo, req.body.juego,req.body.server], function (err, result) {
                    console.log(err);
                    console.log("se ha añadido correctamente");

                });
            } else {
                let data = {estado: -1};
                res.send(data);
            }
            //const favorito = "UPDATE usuarios SET favoritos = JSON_SET(favoritos, '$.favoritos', ?) where usuario = ?;";

        }); //Fin Comprobar
    });//Fin Connect
});//Fin añadirFavoritos

app.post("/cargarFavoritos",(req,res) =>{
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'teamfight'
    });

    connection.connect(function (err) {
        if (err) throw err;
        const comprobar = "select distinct tag from tags where usuario = ? and amigo = ?;";
        connection.query(comprobar, [req.body.nombre, req.body.amigo], function (err, result) {
            console.log(err);
            if(result.length===0){
                let data = {estado : -1}
                res.send(data);
            }else{
                console.log( result);
                let array = [];
                result.forEach(tag => array.push(tag));
                let data = {tags : array}
                res.send(data);
            }
        })
    })
});

app.post("/cargarFavoritosMain",(req,res) =>{
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'teamfight'
    });

    connection.connect(function (err) {
        if (err) throw err;
        const comprobar = "select  amigo,juego,region from tags where usuario = ? ;";
        connection.query(comprobar, [req.body.nombre], function (err, result) {
            console.log(err);
            if(result.length===0){
                let data = {estado : -1}
                res.send(data);
            }else{
                console.log( result);
                let array = [];
                result.forEach(tag => array.push(tag));
                let data = {tags : array}
                res.send(data);
            }
        })
    })
});

app.post("/recuperar",(req,res) =>{
    let usuario = req.body.nombreUsuario;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'teamfight'
    });
    const select = "SELECT * FROM usuarios WHERE usuario = ?";
    connection.query(select, usuario, function (err, result) {
       if (err) throw err;
        console.log(result);

        let data ={ usuario: result[0].usuario, invocador: result[0].league,
            servidor: result[0].servidor,siege:result[0].siege,plataforma:result[0].plataforma,email:result[0].email}
        res.send(data);
    });
});
app.post("/login",(req,res) => {
    let password = req.body.password;
    console.log("LOGIN");
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Conectar con la base de datos y guardar el hash de la contraseña
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'teamfight'
    });

    connection.connect(function (err) {
        if (err) throw err;
        // console.log("Connected!");
        // Insertar el usuario en la base de datos con el hash de la contraseña
        // console.log(hashedPassword);
        const select = "SELECT * FROM usuarios WHERE email = ? and passw = ?";
        connection.query(select, [req.body.email , hashedPassword], function (err, result) {
            // console.log(err);
            // console.log(result);

            if (result.length > 0) {
                let data = {estado: "ok", usuario: result}
                session = req.session;
                const valores = { name: result[0].usuario, lol: result[0].league ,servidor: result[0].servidor, valo: result[0].valorant, siege: result[0].siege ,plataforma: result[0].plataforma};
                 console.log("Valores de la cookie: " +valores);
                const cookieValue = JSON.stringify(valores);
                res.cookie("cookie", cookieValue);

                // console.log(session);
                res.send(data);

            } else {
                let data = {estado: "error", mensaje: "Usuario y/o contraseña incorrectos"};
                res.status(401).send(data);
            }
        })
    });



});

app.post('/buscarData', (req,res)=>{


    async function getSummonerByName(summonerName,region) {
        // console.log(`Nombre en buscar puuid ${summonerName}`);
        // console.log(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
        const response = await fetch(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
        const data = await response.json();
        // console.log("Datos de cuenta:"+ data);
        if(data.status === 404){
            data.puuid = -1;
        }
        return data.puuid;
    }

    async function getID(summonerName,region) {
        // console.log(`Nombre en buscar puuid ${summonerName}`);
        // console.log(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
        const response = await fetch(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
        const data = await response.json();
        // console.log("Datos de cuenta:"+ data);
        if(data.status === 404){
            data.id = -1;
        }
        return {id: data.id, icon: data.profileIconId};

    }

    async function getRank(ID,region) {
        // console.log(`Nombre en buscar puuid ${summonerName}`);
        // console.log(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
        let cadena = `https://${region}1.api.riotgames.com/lol/league/v4/entries/by-summoner/${ID}?api_key=${API_KEY}`;
        console.log("info = " + cadena);
        const response = await fetch(`https://${region}1.api.riotgames.com/lol/league/v4/entries/by-summoner/${ID}?api_key=${API_KEY}`);
        let data = await response.json();

        if(data[0] === undefined){
            console.log("Datos de cuenta: unranked");
            return { tier: "unranked",rank: 0, points:0}
        }else{
            if(data[1] !== undefined){
                console.log("Datos de cuenta:"+ data[0].tier + " " + data[0].rank + " " +data[0].leaguePoints + " " +data[1].tier + " " + data[1].rank + " " +data[1].leaguePoints);
                return { tier: data[0].tier, rank: data[0].rank , points: data[0].leaguePoints, tierFlex: data[1].tier, rankFlex: data[1].rank , pointFlex: data[1].leaguePoints};
            }else{
                console.log("Datos de cuenta:"+ data[0].tier);
                return { tier: data[0].tier, rank: data[0].rank , points: data[0].leaguePoints}
            }
        }




    }

    async function getMatchesByPUUID(puuid) {

        const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`);
        const data = await response.json();
        return data;
    }


    async function findLastMatch(matchId){
        const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`);
        const data = await response.json();
        return data;
    }

    async function quitarEspacios(cadena){
        if(cadena === "undefined"){
            console.log("no se ha recibido bien");
            cadena = "";
        }else{
            if(!cadena.includes("%20")){
                cadena = cadena.replace(/\s+/g, '%20');
                cadena = cadena.replace(/\n/g, "");
            }
        }
        return cadena;
    }


    //Crear url de items a dragon
    const BASE_ITEM_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/';
    function getItemImageURL(itemId) {
        return `${BASE_ITEM_IMAGE_URL}${itemId}.png`;
    }


    async function searchDataLastGame() {
        // console.log(req);
        const nombre = await req.body.nombreInvocador;
        const region = await req.body.region;
        // console.log(nombre);
        let summonerName = await quitarEspacios(nombre);
        if (summonerName === "") {
            // console.log("Error")
        } else {
            const puuid = await getSummonerByName(summonerName, region);
            let envio = [];
            let valido = {};
            let rank = {};
            const id = await getID(summonerName, region)
            // console.log(id)
            if (id !== undefined) {
                rank = await getRank(id.id, region);
                console.log("Rango: " + rank);
                let modo;
                const matches = await getMatchesByPUUID(puuid);
                summonerName = summonerName.replace(/%20/g, ' ');

                envio.push(summonerName);
                envio.push(rank);
                envio.push(id.icon);
                let campeonesJugados = [];

                for (let i = 0; i < 10; i++) {
                    const infoLastGame = await findLastMatch(matches[i]);

                    let inGameStats = {};
                    // console.log('este es mi puuid:  ' + puuid);
                    // console.log(infoLastGame);
                    if (rank && infoLastGame && infoLastGame.info && infoLastGame.info.participants !== null) {
                        if (i === 0) {
                            valido = {
                                status: "ok"
                            }
                        }

                        envio.push(valido);
                        infoLastGame.info.participants.forEach((summoner, index) => {

                            if (puuid === summoner.puuid) {

                                // console.log(summoner.puuid)
                                // console.log(summoner.championName)
                                campeonesJugados.push(summoner.championName);
                                console.log("Tipo de cola: " + infoLastGame.info.queueId);
                                switch (infoLastGame.info.queueId) {

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
                                        modo = "DRAFT PICK";
                                        break;
                                    case 430:
                                    case 431:
                                    case 432:
                                    case 433:
                                        modo = "BLIND PICK";
                                        break;
                                }
                                inGameStats = {
                                    championPlayed: summoner.championName,
                                    championLevel: summoner.champLevel,
                                    role: summoner.teamPosition,
                                    kda: summoner.challenges.kda,
                                    kp: summoner.challenges.killParticipation,
                                    kills: summoner.kills,
                                    deaths: summoner.deaths,
                                    assists: summoner.assists,
                                    cs: summoner.totalMinionsKilled + summoner.neutralMinionsKilled,
                                    lane: summoner.lane,
                                    name: summoner.summonerName,
                                    win: summoner.win,
                                    timePlayed: summoner.timePlayed,
                                    physicalDamageDealt: summoner.physicalDamageDealt,
                                    magicDamageDealt: summoner.magicDamageDealt,
                                    trueDamageDealt: summoner.trueDamageDealt,
                                    totalDamageDealtToChampions: summoner.totalDamageDealtToChampions,
                                    item0: summoner.item0,
                                    item1: summoner.item1,
                                    item2: summoner.item2,
                                    item3: summoner.item3,
                                    item4: summoner.item4,
                                    item5: summoner.item5,
                                    item6: summoner.item6,
                                    item0Image: getItemImageURL(summoner.item0),
                                    item1Image: getItemImageURL(summoner.item1),
                                    item2Image: getItemImageURL(summoner.item2),
                                    item3Image: getItemImageURL(summoner.item3),
                                    item4Image: getItemImageURL(summoner.item4),
                                    item5Image: getItemImageURL(summoner.item5),
                                    item6Image: getItemImageURL(summoner.item6),
                                    gameMode: modo,
                                    gameType: infoLastGame.info.gameType,
                                    matchId: infoLastGame.metadata.matchId,
                                    status: "ok",

                                }
                                // envio.push(inGameStats);
                            }

                        })
                        // console.log(inGameStats.matchId)
                        envio.push(inGameStats);

                        // console.log(envio);
                    } else {
                        valido = {
                            status: "false"
                        }
                        envio.push(valido);

                    }
                }
                let campeonesMedia = {}
                // console.log(campeonesJugados)
                const counts = {};
                for (let i = 0; i < campeonesJugados.length; i++) {
                    const campeon = campeonesJugados[i];
                    counts[campeon] = counts[campeon] ? counts[campeon] + 1 : 1;
                }

                const championStatsArray = [];
                for (const campeon in counts) {
                    const count = counts[campeon];
                    const percentage = count / campeonesJugados.length * 100;
                    const championStats = {
                        name: campeon,
                        percentage: percentage.toFixed(2) + '%',
                        totalGames: count
                    };
                    championStatsArray.push(championStats);
                }

                // Ordenar el array segun porcentaje de games jugados
                championStatsArray.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

                // Recorrer los primeros tres objetos del array ordenado y añadirlos a inGameStats

                if (championStatsArray.length >= 3) {
                    const numCampeones = Math.min(3, championStatsArray.length);
                    for (let i = 0; i < numCampeones; i++) {
                        campeonesMedia["campeon" + (i + 1)] =  championStatsArray[i];
                    }
                }else{
                    let i = 0;
                    while(i < championStatsArray.length){
                         campeonesMedia["campeon" + (i + 1)] =  championStatsArray[i];
                         i++;
                    }
                    while (i < 3){
                        const championStats = {
                            name: "",
                            percentage: "",
                            totalGames: ""
                        };
                        campeonesMedia["campeon" + (i + 1)] =  championStats;
                        i++;
                    }
                }
                envio.push(campeonesMedia)
                // envio.push(rank)
                console.log(envio)
             
            }else{
                envio.push({estado : "false"})
            }
            res.send(envio);


        }
    }
    searchDataLastGame();


})
app.post('/r6stats',(req,res) =>{
    // console.log("buscando stats de r6...");
    // console.log("Plataforma: " + req.body.platform);
    // console.log("Nombre: " + req.body.name);
    async function getStats() {
        let general = await r6.general(req.body.platform, req.body.name);
        let ranked = await r6.rank(req.body.platform, req.body.name);
        let casual = await r6.casual(req.body.platform, req.body.name);
        let deathmatch = await r6.deathmatch(req.body.platform, req.body.name);
        let operator = await r6.operator(req.body.platform, req.body.name,'ace');
        let data = {general,ranked,casual,deathmatch,operator};
        // console.log(data);
        res.send(data);
    }
    getStats();

})

app.post('/datosPartida',async (req, res) => {
    let id = req.body.gameId;
    // console.log(id);
    async function findMatch(matchId) {
        const response = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`);
        return response.json();
       
    }

    let data = await findMatch(id);
    res.send(data);
    // console.log(data);
})

app.listen(3000)
console.log('Escuchando en el puerto 3000');