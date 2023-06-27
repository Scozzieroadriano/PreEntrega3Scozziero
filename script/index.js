console.log("TAMOS ON")

let btnInicioSesion = document.getElementById("btnInicioSesion");

function Login(){
    debugger
    let usuario = document.getElementById("username").value;
    let contrasenia = document.getElementById("password").value;

    console.log("usuario: " + usuario);
    console.log("contrasenia: " + contrasenia);
    alert("hola");
}

btnInicioSesion.addEventListener("click", Login);