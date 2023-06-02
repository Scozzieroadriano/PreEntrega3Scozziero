console.log("TAMOS ON")

let btnInicioSesion = document.getElementById("btnInicioSesion");
function Login() {

    let usuario = document.getElementById("username").value;
    let contrasenia = document.getElementById("password").value;

    validarUsuario(usuario, contrasenia);
}

btnInicioSesion.addEventListener("click", Login);


function validarUsuario(usuario, contrasenia) {
    let user = "Administrador";
    let pass = "123456";

    if (usuario === user && contrasenia === pass) {
        // Usuario y contraseña válidos
        // Llamar a otra función o realizar acciones adicionales
        console.log("Inicio de sesión exitoso");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        agregarDiv(usuario)
    } else {
        // Usuario o contraseña incorrectos
        alert("Usuario o contraseña incorrectos");
        // Restablecer campos de usuario y contraseña
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
}
let div = null;

function agregarDiv(usuario) {
    if (!div) {
      const container = document.querySelector("#container");
      div = document.createElement('div');
      alert("Ingreso Exitoso");
      div.innerHTML = `
        <h2>Bienvenido Profesor: ${usuario}</h2>
        <p>¡Agregue los alumnos que desee evaluar!</p>
        <button id="btnAgregarAlumno" class="button">Agregar alumno</button>
        <button id="btnFiltrarAlumno" class="button">Filtrar alumno</button>
      `;
      div.classList.add("card");
      // Agregar el div al cuerpo del documento
      container.appendChild(div);
  
      // Obtener referencia al botón
      const btnAgregarAlumno = document.querySelector("#btnAgregarAlumno");
      const btnFiltrarAlumno = document.querySelector("#btnFiltrarAlumno");
  
      // Asignar el listener de evento click al botón
      btnAgregarAlumno.addEventListener("click", function() {
        crearListaAlumnos();
      });
      btnFiltrarAlumno.addEventListener("click", function() {
        filtrarListaAlumnos();
      });
    } else {
      alert("Usted ya se encuentra logeado");
    }
  }
  function crearListaAlumnos() {
    let cantidadAlumnos = parseInt(prompt("Ingrese la cantidad de alumnos a evaluar:"));

    let listaAlumnos = [];

    for (let i = 0; i < cantidadAlumnos; i++) {
        // Solicitar los datos del alumno
        let nombre = prompt("Ingrese el nombre del alumno " + (i + 1) + ":");
        let nota1 = parseFloat(prompt("Ingrese la nota 1 de " + (nombre) + ":"));
        let nota2 = parseFloat(prompt("Ingrese la nota 2 de " + (nombre) + ":"));
        let nota3 = parseFloat(prompt("Ingrese la nota 3 de " + (nombre) + ":"));
        let estado = null;
        let promedio = Math.ceil((nota1 + nota2 + nota3) / 3);

        if ((nota1+nota2+nota3)/3 >= 6){
            estado = "Aprobado"; 
        }else{
            estado = "No Aprobado"
            };

    let alumno = {
        nombre: nombre,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        situacion: estado,
        prom:promedio
    };

    listaAlumnos.push(alumno);
    }
    return listaAlumnos;
}


function mostrarAlumnos(listaAlumnos) {
    let cadena = "";
  
    listaAlumnos.forEach(function(alumno) {
      cadena += "Nombre: " + alumno.nombre + "\n"+ " Primer Parcial: " + alumno.nota1 + ", Segundo Parcial: " + alumno.nota2 + ", Tercer Parcial: " + alumno.nota3 + "\n" + " Nota Final: " + alumno.prom + ", Estado: " + alumno.situacion + "\n";
    });
  
    alert(cadena);
  }

function filtrarListaAlumnos(listaAlumnos){
    let cadena = "";
  
    listaAlumnos.forEach(function(alumno) {
      cadena += "Nombre: " + alumno.nombre + "\n"+ " Primer Parcial: " + alumno.nota1 + ", Segundo Parcial: " + alumno.nota2 + ", Tercer Parcial: " + alumno.nota3 + "\n" + " Nota Final: " + alumno.prom + ", Estado: " + alumno.situacion + "\n";
    });
  
    alert(cadena);
}



