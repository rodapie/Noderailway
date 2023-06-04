


let notes =[
{
    "id":1,
    "content": "Hola soy content",
    "important":true,
}, 
{
    "id":2,
    "content": "Hola soy content",
    "important":true,
}, 
{
    "id":3,
    "content": "Hola soy content",
    "important":true,
}

]




// const http = require('http')


// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json'})
//     // response.end(JSON.stringify(notes))
//     // response.end('ola')
//     // const fetch = require('node-fetch');

// const API_KEY = 'RGAPI-3e226243-5a0b-481a-9515-e5613808a02c';
// const SUMMONER_NAME = 'milk n cookies';

// fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_6350073439?api_key=${API_KEY}`)
//   .then(res => res.json())
//   .then(data => {
//     console.log('Datos recibidos:', data);
//     data.info.participants.forEach(participant => {
//       response.write(participant.summonerName + "\n");
//     });
//     response.end();
//   })
//   .catch(err => {
//     console.error('Error en la solicitud:', err);
//   });
// })
// Esto es sin expressAutomatos
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
// var webpack = require('webpack');
// var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackConfig = require('webpack.config');
import('node-fetch')
const { Buffer } = require('buffer');


const express = require('express')
const app = express();

const ejs = require('ejs');
app.set('view engine', 'ejs');

// app.set('port', (process.env.PORT || 3000));
// app.use('/static', express.static('dist'));
// app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.get('/ola/', function(req,res,next){
res.send('coño e la madre')
})
const API_KEY = 'RGAPI-b72d6c77-67aa-4144-a3b1-40b75f2598ae';

app.get('/historial', (request, response)=>{
  
  const SUMMONER_NAME = 'milk n cookies';

  fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_6353615095?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const summonerList = data.info.participants.map(participant => participant.summonerName);
      const summonerListHTML = summonerList.map(name => `<li>${name}</li>`).join('');
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Summoner Names</title>
        </head>
        <body>
          <h1>Summoner Names:</h1>
          <ul id="summoner-list">
            ${summonerListHTML}
          </ul>
        </body>
        </html>
      `;
      response.send(html);
    })
    .catch(err => {
      console.error('Error en la solicitud:', err);
    });
})


app.get('/invocador', (req,res)=>{
fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/milk%20n%20cookies?api_key=${API_KEY}`)
.then(res => res.json())
.then(data => {
  const id = data.id;
  const accountId = data.accountId;
  const puuid = data.puuid;
  const name = data.name;
  const profileIconId = data.profileIconId;
  const revisionDate = data.revisionDate;
  const summonerLevel = data.summonerLevel;
  console.log(summonerLevel)
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>DataInvocador</title>
    </head>
    <body>
      <h1>Data del invocador:</h1>
      <ul id="summoner-list">
        <li> TU id ${id}</li>
        <li> Tu accountId ${accountId}</li>
        <li> Tu puuid ${puuid}</li>
        <li>Tu nombre de invocador${name}</li>
        <li> tu profileIconId ${profileIconId}</li>
        <li>Tu revisionDate ${revisionDate}</li>
        <li>Tu lvl de invocador ${summonerLevel}</li>
      </ul>
    </body>
    </html>
  `;
  res.send(html);
})
})

app.get('/partidas', (req,res)=>{
  fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/f2j_EqnV2N0CbxidaNFv4btGnlf7BiSS4jDNj7mdJVlDj0aTaMNHaZtpxNrNfsJopP3_RMusSVlTaQ/ids?start=0&count=20&api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
   const partidas = {}; // Declara un objeto vacío para almacenar los valores de i
   for (let i=0; i<data.length; i++){
      partidas[`partida${i+1}`] = data[i]; // Asigna el valor de i al objeto, utilizando el índice como clave
   }
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DataInvocador</title>
      </head>
      <body>
        <h1>Data del invocador:</h1>
        <ul id="summoner-list">
          <li>Partida 1: ${partidas.partida1}</li>
          <li>Partida 2: ${partidas.partida2} </li>
          <li>Partida 3: ${partidas.partida3} </li>
          <li>Partida 4: ${partidas.partida4} </li>
          <li>Partida 5: ${partidas.partida5} </li>
          <li>Partida 6: ${partidas.partida6} </li>
          <li>Partida 7: ${partidas.partida7} </li>
          <li>Partida 8: ${partidas.partida8} </li>
          <li>Partida 9: ${partidas.partida9} </li>
          <li>Partida 10: ${partidas.partida10} </li>
          <li>Partida 11: ${partidas.partida11} </li>
          <li>Partida 12: ${partidas.partida12} </li>
          <li>Partida 13: ${partidas.partida13} </li>
          <li>Partida 14: ${partidas.partida14} </li>
          <li>Partida 15: ${partidas.partida15} </li>
          <li>Partida 16: ${partidas.partida16} </li>
          <li>Partida 17: ${partidas.partida17} </li>
          <li>Partida 18: ${partidas.partida18} </li>
          <li>Partida 19: ${partidas.partida19} </li>
          <li>Partida 20: ${partidas.partida20} </li>
        </ul>
      </body>
      </html>
    `;
    res.send(html);
  })
})




app.get('/buscarItem', (req, res) => {
  fetch('http://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/1001.png')
    .then(response => response.arrayBuffer())
    .then(buffer => {
      res.set('Content-Type', 'image/png');
      res.send(Buffer.from(buffer));
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al buscar el item');
    });
});

const BASE_ITEM_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/';

app.get('/buscarData', (req,res)=>{


  async function getSummonerByName(summonerName,region) {
      console.log(`Nombre en buscar puuid ${summonerName}`);
      console.log(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
      const response = await fetch(`https://${region}1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
      const data = await response.json();
      console.log("Datos de cuenta:"+ data);
      if(data.status === 404){
          data.puuid = -1;
      }
      return data.puuid;
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
      console.log(req);
      const nombre = await req.body.nombreInvocador;
      const region = await req.body.regionString;
      console.log(nombre);
      let summonerName = await quitarEspacios(nombre);
      if (summonerName === "") {
          console.log("Error")
      } else {
          const puuid = await getSummonerByName(summonerName, region);
          let envio = [];
          let valido = {};


              const matches = await getMatchesByPUUID(puuid);
              summonerName = summonerName.replace(/%20/g, ' ');
              envio.push(summonerName);
              for (let i = 0; i < 10; i++) {
                  const infoLastGame = await findLastMatch(matches[i]);
                  let inGameStats = {};
                  console.log('este es mi puuid:  ' + puuid);
                  console.log(infoLastGame);
                  if (infoLastGame && infoLastGame.info && infoLastGame.info.participants !== null) {
                      if(i === 0){
                          valido = {
                              status:"ok"
                          }
                      }

                      envio.push(valido);
                      infoLastGame.info.participants.forEach(summoner => {
                          if (puuid == summoner.puuid) {
                              console.log(summoner.puuid)
                              inGameStats = {
                                  championPlayed: summoner.championName,
                                  role: summoner.teamPosition,
                                  kda: summoner.challenges.kda,
                                  kp: summoner.challenges.killParticipation,
                                  kills: summoner.kills,
                                  deaths: summoner.deaths,
                                  assists: summoner.assists,
                                  cs: summoner.totalMinionsKilled,
                                  lane: summoner.lane,
                                  name: summoner.summonerName,
                                  win: summoner.win,
                                  timePlayed: summoner.timePlayed,
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
                                  gameMode: infoLastGame.info.gameMode,
                                  gameType: infoLastGame.info.gameType,
                                  status: "ok"
                              }
                              envio.push(inGameStats);
                              console.log(inGameStats);
                          }

                      })
                  }else{
                      valido = {
                          status : "false"
                      }
                      envio.push(valido);

                  }
              }
          res.send(envio);
      }
  }
  searchDataLastGame();


})

// app.get('/', (req, res) => {
//   const API_KEY = 'RGAPI-5dd43615-a814-41be-90d5-3f428a350488';
//   const SUMMONER_NAME = 'milk n cookies';
  
//   fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_6351937039?api_key=${API_KEY}`)
//     .then(res => res.json())
//     .then(data => {
//       const summonerNames = {};
//       data.info.participants.forEach((participant, index) => {
//         summonerNames[`summonerName${index + 1}`] = participant.summonerName;
//       });
//       res.render('index', summonerNames);
//     })
//     .catch(err => {
//       console.error('Error en la solicitud:', err);
//     });
// });

// esto es como yo lo tenia inicialmente 



// app.get('/', (request, response)=>{
//   const API_KEY = 'RGAPI-5dd43615-a814-41be-90d5-3f428a350488';
// const SUMMONER_NAME = 'milk n cookies';

//   fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_6351937039?api_key=${API_KEY}`)
//   .then(res => res.json())
//   .then(data => {
//     // console.log('Datos recibidos:', data);
//     data.info.participants.forEach(participant => {
//       response.write(participant.summonerName + "\n");
//       console.log(participant.summonerName)
//     });
//     response.end();
//   })
//   .catch(err => {
//     console.error('Error en la solicitud:', err);
//   });
// })


// app.get('/api/notes', (request, response)=>{
//   response.json(notes)
// })
// app.get('/api/notes/:id', (request, response)=>{
//   const id = Number(request.params.id)
//   const note = notes.find(note => note.id === id)
//   if (note){
//     response.json(note)
//   }else{
//     response.status(404).end();
//   }
// })


// Esto es asi con express
const PORT = 3001
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})




