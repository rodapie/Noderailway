const queryString = window.location.search;
console.log(queryString);
// Crear un objeto con los parámetros de la cadena de consulta
const params = new URLSearchParams(queryString);
console.log(params)// Obtener el valor del parámetro 'nombreInvocador'
const user = params.get('user');
console.log(user);

document.addEventListener("DOMContentLoaded", function() {
    // document.getElementById("fotoUser").src = "";
    document.getElementById("user").innerText = user;


})
let usuarioConectado = false;
const name = document.cookie.split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('name='))
    .split('=')[1];
function conectado(){
    if(name){
        usuarioConectado = true;
    }
    return usuarioConectado;
}

document.getElementById('buscartextLogged').addEventListener("keyup", function (e) {
    if (e.key === 'Enter') {
        buscarMain();
    }
});
function inicios(){

    if(conectado()){
        window.location.href = `/indexLogged?user=${name}`;
    }else{
        window.location.href = `/`;
    }
}
function inicios(){
    if(conectado()){
        window.location.href = `/indexLogged?user=${name}`;
    }else{
        window.location.href = `/`;
    }
}
function leagues(){
    if(name){
        window.location.href = `/leagueLogged?user=${name}`;
    }else{
        window.location.href = `/league`;
    }
}
function valorants(){
    if(conectado()){
        window.location.href = `/valorantLogged?user=${name}`;
    }else{
        window.location.href = `/valorant`;
    }
}
function sieges(){
    if(conectado()){
        window.location.href = `/siegeLogged?user=${name}`;
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