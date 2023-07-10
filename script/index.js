console.log("TAMOS ON")

//Creo una clase para simular a los usuarios cargados en la bdd
class Usuarios{
  constructor(idUsuario, usuario, password,puntos){
        this.id = idUsuario;
        this.usuario = usuario;
        this.password = password;
        this.puntos = puntos;
  }
}
const usuarios = [
 new Usuarios(1, 'Adriano', '1234',0),
 new Usuarios(1, 'Stefano', '12345',0),
 new Usuarios(1, 'Lucas', '123456',0),
 new Usuarios(1, 'Cristian', '1234567',0)
];

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
//declaro una variable para capturar el boton y despues una funcion para capturar los datos de los imputs
let btnInicioSesion = document.getElementById("btnInicioSesion");
function Login() {
  let usuario = document.getElementById("username").value;
  let contrasenia = document.getElementById("password").value;
  validarUsuario(usuario, contrasenia);
}
//con este evento inicio la funcion cada vez que apreto el boton que declare antes
btnInicioSesion.addEventListener("click", Login);

//aca valido el usuario 
function validarUsuario(usuario, contrasenia) {
  let usuarioEncontrado = null;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].usuario === usuario && usuarios[i].password === contrasenia) {
      usuarioEncontrado = usuarios[i];
      break;
    }
  }

  if (usuarioEncontrado) {
    console.log("Inicio de sesión exitoso");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    alert("Ingreso Exitoso");
    agregarDiv();
    // Agrega aquí la lógica adicional después de iniciar sesión correctamente
  } else {
    alert("Usuario o contraseña incorrectos");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}

let div = null;
let pronosticoPartidos = [];

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
        if (valor >= 0) {
          valor--;
          if (valor === -1) {
            span.textContent = '-';
          } else {
            span.textContent = valor;
          }
        }
      });
    });

    container.appendChild(div);
  });
  const btnComparar = document.querySelector("#guardarPronostico");
  btnComparar.addEventListener('click', () => {   

    partidos.forEach((partido, index) => {
      const tarjeta = container.children[index];
      const pronostico = {
        equipoLocal: partido.equipoLocal,
        equipoVisitante: partido.equipoVisitante,
        marcadorLocal: parseInt(tarjeta.querySelector('.marcLocal').textContent),
        marcadorVisitante: parseInt(tarjeta.querySelector('.marcVisitante').textContent),
      };
      pronosticoPartidos.push(pronostico);      
    });
    console.log(pronosticoPartidos);
    localStorage.setItem('pronosticos', JSON.stringify(pronosticoPartidos));
    // Realizar la comparación con el resultado real del partido
    // Aquí puedes utilizar el arreglo pronosticoPartidos
    // y compararlo con el resultado real del partido
  });

  const btnGenerarAleatorios = document.getElementById('btnAleatorio');

btnGenerarAleatorios.addEventListener('click', () => {
  partidos.forEach(partido => {
    // Generar números aleatorios del 1 al 5 para los marcadores
    const marcadorLocalAleatorio = Math.floor(Math.random() * 5) + 1;
    const marcadorVisitanteAleatorio = Math.floor(Math.random() * 5) + 1;

    // Asignar los valores aleatorios a los marcadores de cada partido
    partido.marcadorLocal = marcadorLocalAleatorio;
    partido.marcadorVisitante = marcadorVisitanteAleatorio;
  });
  console.log(partidos);
  // Actualizar las tarjetas o realizar cualquier otra operación necesaria
  // ...
});

const btnComparo = document.getElementById('btnComparoResultados');

btnComparo.addEventListener('click', () => {
  let puntos = 0;

pronosticoPartidos.forEach((pronostico, index) => {
  const partido = partidos[index];

  if (pronostico.marcadorLocal === partido.marcadorLocal && pronostico.marcadorVisitante === partido.marcadorVisitante) {
    console.log(`El pronóstico del partido ${index + 1} es correcto.`);
    // Sumar 3 puntos si el pronóstico es exacto
    puntos += 3;
  } else if ((pronostico.marcadorLocal > pronostico.marcadorVisitante && partido.marcadorLocal > partido.marcadorVisitante) ||
             (pronostico.marcadorLocal < pronostico.marcadorVisitante && partido.marcadorLocal < partido.marcadorVisitante) ||
             (pronostico.marcadorLocal === pronostico.marcadorVisitante && partido.marcadorLocal === partido.marcadorVisitante)) {
    console.log(`El pronóstico del partido ${index + 1} es parcialmente correcto.`);
    // Sumar 1 punto si solo se acierta el equipo ganador
    puntos += 1;
  } else {
    puntos += 0;
    // No se suma ningún punto
  }
});

console.log(`Puntuación total: ${puntos}`);
});
}

