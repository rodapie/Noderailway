document.getElementById('buscartext').addEventListener("keyup", function (e) {
    if (e.key === 'Enter') {
        buscarMain();
    }
});

$(document).ready(function() {
    $('input[type="radio"]').click(function() {
      if ($(this).is(':checked')) {
        $(this).prop('disabled', true);
      }
    });
  });
$(document).ready(function () {
    $('.radio-group .radio').click(function () {
        $('.selected .fa').removeClass('fa-check');
        $('.radio').removeClass('selected');
        $(this).addClass('selected');
        let selectlol = document.createElement("option");
        selectlol.innerHTML ="<option value='euw'> EUW</option>" +
            "<option value='na'> NA</option>" +
            "<option value='kr'> KR</option>"+
            "<option value='lan'> LAN</option>"+
            "<option value='las'> LAS</option>"+
            "<option value='ch'> CH</option>"

         let selectsiege = document.createElement("option");
        selectsiege.innerHTML="<option value='pc'> PC</option>" +
            "<option value='spn'> PSN</option>" +
            "<option value='xbox'> XBOX</option>"


        console.log($('.selected').attr("id"));
        if($('.selected').attr("id") === "lolradio"){
            while (document.getElementById("region").options.length > 0) {
                document.getElementById("region").remove(0);
            }

            document.getElementById("region").innerHTML = "<option value='euw'>EUW</option>" +
                "<option value='na'>NA</option>" +
                "<option value='kr'>KR</option>" +
                "<option value='lan'>LAN</option>" +
                "<option value='las'>LAS</option>" +
                "<option value='ch'>CH</option>";

        }else{
            while (document.getElementById("region").options.length > 0) {
                document.getElementById("region").remove(0);
            }
            document.getElementById("region").innerHTML="<option value='pc'> PC</option>" +
                "<option value='spn'> PSN</option>" +
                "<option value='xbox'> XBOX</option>";
        }
    });
});

function redireccionar(nombreInvocador, region,nombreUbisoft,plataforma) {
    console.log("Dentro de redireccionar: id=" + $('.selected').attr("id") );
    if($('.selected').attr("id") === "lolradio") {
        window.location.href = "/league?nombreInvocador=" + encodeURIComponent(nombreInvocador) + "&region=" + encodeURIComponent(region);
    }else{
        window.location.href = "/siege?nombre=" + encodeURIComponent(nombreUbisoft) + "&plataforma=" + encodeURIComponent(plataforma);
    }
}

async function buscarMain(){

    const nombreInvocador = document.getElementById('buscarInput').value;
    let region = document.getElementById("region").value;
    let nombreUbisoft = nombreInvocador;
    let plataforma = $("#plataforma").val();
    redireccionar(nombreInvocador,region,nombreUbisoft,plataforma);
}


async function registrar(){
    let usuario =   document.getElementById("form3Example1u").value;
    let lol =       document.getElementById("form3Example1l").value;
    let server =    document.getElementById("form3Example1lr").value;
    let siege =     document.getElementById("form3Example1s").value;
    let plat =      document.getElementById("form3Example1sp").value;
    let email =     document.getElementById("form3Example3c").value;
    let password =  document.getElementById("form3Example4c").value;
    let repetir =   document.getElementById("form3Example4cd").value;


    if(usuario === ""){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario no puede estar vacio',
            timer: 1500
        })
    }
    if(email === ""){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El correo no puede estar vacio',
            timer: 1500
        })
    }
    if( password === ""){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La contraseña no puede estar vacia',
            timer: 1500
        })
    }

    if(password.localeCompare(repetir) === 0) {

        const response = await fetch("/registro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({usuario, lol,server, siege,plat, email, password})

        })
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            if (data.estado === 'ok') {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro completado',
                    text: 'Todo ha ido correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                if (document.getElementById("form3Example1u")) {
                    document.getElementById("form3Example1u").value = "";
                }
                if (document.getElementById("form3Example1l")) {
                    document.getElementById("form3Example1l").value = "";
                }
                if (document.getElementById("form3Example1lr")) {
                    document.getElementById("form3Example1lr").value = "";
                }
                if (document.getElementById("form3Example1s")) {
                    document.getElementById("form3Example1s").value = "";
                }
                if (document.getElementById("form3Example3c")) {
                    document.getElementById("form3Example3c").value = "";
                }
                if (document.getElementById("form3Example4c")) {
                    document.getElementById("form3Example4c").value = "";
                }
                if (document.getElementById("form3Example4cd")) {
                    document.getElementById("form3Example4cd").value = "";
                }


            } else if (data.estado === 'duplicado') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ya existe una cuenta con ese correo',
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al registrate',
                    timer: 1500
                })
            }


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden'
            })
        }
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
            if(data.usuario.usuario !== undefined){
                console.log("Ha encontrado el usuario: " + data.usuario.usuario);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sesion iniciada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() =>{
                    console.log("deberia de cambiar");
                    window.location.href=`/indexLogged?user=${data.usuario.usuario}`;
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




// Agrega un evento click a cada radio
var lolRadio = document.getElementById("lolradio");
var siegeRadio = document.getElementById("radiosiege");

var radioSeleccionado = null;

lolRadio.addEventListener("click", function() {
  if (radioSeleccionado !== lolRadio) {
    document.body.style.backgroundImage = "url('../../static/fondogrieta.png')";
    document.body.classList.remove("fondos");
    document.body.classList.add("fondoSolo");
    document.querySelector('#buscarInput').classList.remove("inputNegro");
    document.querySelector('#region').classList.remove("bordeNegro");
    document.querySelector('#buscarMain').classList.remove("bordeNegro");
    document.querySelector('#plataforma').classList.remove("bordeNegro");
    document.querySelector('.indexGames').classList.remove("fondolinealSiege");
    document.querySelector('.indexGames').classList.add("fondolinealLol");
    radioSeleccionado = lolRadio;

  }
});

siegeRadio.addEventListener("click", function() {
  if (radioSeleccionado !== siegeRadio) {
    document.body.style.backgroundImage = "url('../../static/r6fondo2.jpg')";
    document.body.classList.remove("fondos");
    document.body.classList.add("fondoSolo");
    document.querySelector('#buscarInput').classList.add("inputNegro");
    document.querySelector('#region').classList.add("bordeNegro");
    document.querySelector('#buscarMain').classList.add("bordeNegro");
    document.querySelector('#plataforma').classList.add("bordeNegro");
    document.querySelector('.indexGames').classList.remove("fondolinealLol");
    document.querySelector('.indexGames').classList.add("fondolinealSiege");
    radioSeleccionado = siegeRadio;
    // 
  }
});

document.getElementById("typePasswordX").addEventListener('keyup',function (e){
    if(e.key === 'Enter'){
        loguear();
    }
})

