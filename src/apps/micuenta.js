const cookieValue = decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('cookie=')).split('=')[1]);
const cookieObject = JSON.parse(cookieValue);
console.log(cookieObject);
let nombreUsuario = cookieObject.name;

$(document).ready(function () {
    recuperar(nombreUsuario)
});





async function recuperar(nombreUsuario){
    const response = await fetch("/recuperar",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombreUsuario})
    })
    const data = await response.json();
    console.log(data);
    $('#nombre').val(data.usuario);
    $('#email').val(data.email);
    $('#invocador').val(data.invocador);
    $("#servidor > option[value=" +data.servidor+"]").prop("selected",true);
    $('#ubisoft').val(data.siege);
    $("#plataforma > option[value=" +data.plataforma+"]").prop("selected",true);
}


async function guardar(){
    let usuario = $('#nombre').val();
    let email = $('#email').val();
    let invocador = $('#invocador').val();
    let servidor = $("#servidor").val();
    let ubisoft = $('#ubisoft').val();
    let plataforma = $("#plataforma").val();
    let contraseña = $("#contraseña").val();
    let repetida = $("#repetida").val();
    let cadena = ""
    if((contraseña !== "" || repetida !== "") && (contraseña === repetida)) {
        cadena = "update usuarios set usuario= '" +usuario+"', league='"+invocador+"', servidor='"+servidor+ "', siege='"+ubisoft+"', plataforma= '"+plataforma+"', email=`"+email+"', passw='"+contraseña+"'  where usuario='"+usuario+"';";
    }else{
        cadena = "update usuarios set usuario= '" +usuario+"', league='"+invocador+"', servidor='"+servidor+ "', siege='"+ubisoft+"', plataforma= '"+plataforma+"', email='"+email+"'  where usuario='"+usuario+"';";
    }
    console.log(cadena);

    const response = await fetch("/guardar",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({cadena})
    })

    const data = await response.json();

}

