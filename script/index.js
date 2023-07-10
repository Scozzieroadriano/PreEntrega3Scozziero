console.log("TAMOS ON")

//Primero creo una clase para simular la base de datos del proyecto
class Partido{
  constructor(idPartido, idFecha, fechaPartido, equipoLocal, marcadorLocal, equipoVisitante, marcadorVisitante){
    this.id = idPartido;
    this.idFecha = idFecha;
    this.fechaPartido = fechaPartido;
    this.equipoLocal = equipoLocal;
    this.marcadorLocal = marcadorLocal;
    this.equipoVisitante = equipoVisitante;
    this.marcadorVisitante = marcadorVisitante;
  }
};
// Acá creo el array de todos los partidos de una de las fechas
const partidos = [
  new Partido(1, 1, '15-07-2023 16:00', 'Equipo 1', 0, 'Equipo 2', 0), 
  new Partido(2, 1, '15-07-2023 16:00', 'Equipo 3', 0, 'Equipo 4', 0), 
  new Partido(3, 1, '15-07-2023 16:00', 'Equipo 5', 0, 'Equipo 6', 0), 
  new Partido(4, 1, '15-07-2023 16:00', 'Equipo 7', 0, 'Equipo 8', 0) 
];
console.log(partidos);
let btnInicioSesion = document.getElementById("btnInicioSesion");
function Login() {
  let usuario = document.getElementById("username").value;
  let contrasenia = document.getElementById("password").value;
  validarUsuario(usuario, contrasenia);
}

//btnInicioSesion.addEventListener("click", Login);

function validarUsuario(usuario, contrasenia) {
  let user = "Administrador";
  let pass = "123456";

  if (usuario === user && contrasenia === pass) {
    // Usuario y contraseña válidos
    // Llamar a otra función o realizar acciones adicionales
    console.log("Inicio de sesión exitoso");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    alert("Ingreso Exitoso");
    //agregarDiv(usuario)
  } else {
    // Usuario o contraseña incorrectos
    alert("Usuario o contraseña incorrectos");
    // Restablecer campos de usuario y contraseña
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}

let div = null;
agregarDiv();
function agregarDiv() {
  console.log("seguimos on");
  const container = document.querySelector("#container");

  partidos.forEach(partido => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class='tarjeta'>
        <span class='fechaPartido'> ${partido.fechaPartido}</span>
        <div class='equipo Local'>
          <figure class='datosEquipo'>
            <img class='imgEquipo' alt="">
            <figcaption>${partido.equipoLocal}</figcaption>
          </figure>
        </div>
        <div class='pronostico'>
          <div class='marcador Local'>
            <button class='button'>+</button>
            <span class='marcLocal'>-</span>
            <button class='button'>-</button>
          </div>
          <div class='marcador Visitante'>
            <button class='button'>+</button>
            <span class='marcVisitante'>-</span>
            <button class='button'>-</button>
          </div>
        </div>
        <div class='equipo Visitante'>
          <figure class='datosEquipo'>
            <img class='imgEquipo' alt="">
            <figcaption>${partido.equipoVisitante}</figcaption>
          </figure>
        </div>
        <span class='description'>Fecha ${partido.idFecha}</span>
      </div>
    `;

    const incrementarMarcador = div.querySelectorAll('.marcador .button:first-child');
    const disminuirMarcador = div.querySelectorAll('.marcador .button:last-child');

    incrementarMarcador.forEach(button => {
      button.addEventListener('click', () => {
        const span = button.nextElementSibling;
        let valor = parseInt(span.textContent);
        if (span.textContent === '-') {
          valor = 0;
        } else{
          valor++;
        }        
        span.textContent = valor;
      });
    });

    disminuirMarcador.forEach(button => {
      button.addEventListener('click', () => {
        const span = button.previousElementSibling;
        let valor = parseInt(span.textContent);
        if (span.textContent >= 0 || span.textContent === '-') {
          valor--;
        }else{
          toString(valor) === '-'
        }        
        span.textContent = valor;
      });
    });

    container.appendChild(div);
  });
}
