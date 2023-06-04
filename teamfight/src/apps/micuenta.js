const cookieValue = decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('cookie=')).split('=')[1]);
const cookieObject = JSON.parse(cookieValue);
console.log(cookieObject);
let nombreUsuario = cookieObject.name;
console.log("nombreUsuario = " + nombreUsuario);
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
    let cadena = "";
    let usuarioAntiguo = cookieObject.name;
    console.log(cadena);
    document.cookie = "cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const response = await fetch("/guardar",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({usuario,invocador,servidor,ubisoft,plataforma,contraseña,email,usuarioAntiguo})
    })

    const data = await response.json();
    if (data.estado === "ok"){
        Swal.fire({
            icon: 'success',
            title: 'Registro completado',
            text: 'Todo ha ido correctamente',
            showConfirmButton: false,
            timer: 1500
        })

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar los cambios',
            timer: 1500
        })
    }

}

function volver(){
    window.location.href=`/indexLogged?user=${cookieObject.name}`;
}