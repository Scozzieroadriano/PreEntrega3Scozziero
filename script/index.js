console.log("TAMOS ON")

let btnInicioSesion = document.getElementById("btnInicioSesion");

function Login(){
    
    let usuario = document.getElementById("username").value;
    let contrasenia = document.getElementById("password").value;
  
    validarUsuario(usuario, contrasenia);
}

btnInicioSesion.addEventListener("click", Login);


function validarUsuario(usuario, contrasenia){
    let user = "Administrador";
    let pass = "123456";
  
    if (usuario === user && contrasenia === pass){
        // Usuario y contraseña válidos
        // Llamar a otra función o realizar acciones adicionales
        console.log("Inicio de sesión exitoso");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        agregarDiv()
    } else {
        // Usuario o contraseña incorrectos
        alert("Usuario o contraseña incorrectos");
        // Restablecer campos de usuario y contraseña
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
}
let div = null;

function agregarDiv() {
    // Crear un elemento div
    debugger
       
if (!div){
    const container = document.querySelector("#container");
     div = document.createElement('div');

    div.innerHTML = `
    <h2>Soy un nuevo div</h2>
    <p>¡Hola desde el div creado dinámicamente!</p>
     `;

    // Agregar el div al cuerpo del documento
    container.appendChild(div);
} else{
    alert("Usted ya se encuentra logeado");
}
}

  


  