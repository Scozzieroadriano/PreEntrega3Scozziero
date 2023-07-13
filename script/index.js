console.log("ESTAMOS ON")

//Creo una clase para simular a los usuarios cargados en la bdd
class Usuarios {
  constructor(idUsuario, usuario, password, puntos) {
    this.id = idUsuario;
    this.usuario = usuario;
    this.password = password;
    this.puntos = puntos;
  }
}
const usuarios = [
  new Usuarios(1, 'Adriano', '1234', 0),
  new Usuarios(2, 'Stefano', '12345', 0),
  new Usuarios(3, 'Lucas', '123456', 0),
  new Usuarios(4, 'Cristian', '1234567', 0)
];

//Primero creo una clase y objeto para simular la base de datos del proyecto
class Partido {
  constructor(idPartido, idFecha, fechaPartido, equipoLocal, marcadorLocal, equipoVisitante, marcadorVisitante, pronosticoLocal, pronosticoVisitante) {
    this.id = idPartido;
    this.idFecha = idFecha;
    this.fechaPartido = fechaPartido;
    this.equipoLocal = equipoLocal;
    this.marcadorLocal = marcadorLocal;
    this.equipoVisitante = equipoVisitante;
    this.marcadorVisitante = marcadorVisitante;
    this.pronosticoLocal = pronosticoLocal;
    this.pronosticoVisitante = pronosticoVisitante;
  }
};
// Acá creo el array de todos los partidos de una de las fechas
const partidos = [
  new Partido(1, 1, '15-07-2023 16:00', 'Equipo 1', 0, 'Equipo 2', 0, '-', '-'),
  new Partido(2, 1, '15-07-2023 16:00', 'Equipo 3', 0, 'Equipo 4', 0, '-', '-'),
  new Partido(3, 1, '15-07-2023 16:00', 'Equipo 5', 0, 'Equipo 6', 0, '-', '-'),
  new Partido(4, 1, '15-07-2023 16:00', 'Equipo 7', 0, 'Equipo 8', 0, '-', '-')
];
console.log(partidos);
//declaro una variable para capturar el boton y despues una funcion para capturar los datos de los imputs
let usuarioLogeado = JSON.parse(sessionStorage.getItem('usuario')) || [];
//creo la variable para usar el id del usuario y darle el puntaje al usuario logeado
let usuarioEncontrado = null;
let btnInicioSesion = document.getElementById("btnInicioSesion");
console.log(usuarioLogeado);
if (usuarioLogeado.id){
  usuarioEncontrado = usuarioLogeado;
  agregarDiv();
}
function Login() {
  let usuario = document.getElementById("username").value;
  let contrasenia = document.getElementById("password").value;
  validarUsuario(usuario, contrasenia);
}
//con este evento inicio la funcion cada vez que apreto el boton que declare antes
btnInicioSesion.addEventListener("click", Login);

//aca valido el usuario 
function validarUsuario(usuario, contrasenia) {
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
    //Guardo el usuario en el sessionStorage
    sessionStorage.setItem('usuario',JSON.stringify(usuarioEncontrado));
    agregarDiv();
    // Agrega aquí la lógica adicional después de iniciar sesión correctamente
  } else {
    alert("Usuario o contraseña incorrectos");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}

let div = null;
function agregarDiv() {
  console.log("seguimos on");
  const container = document.querySelector("#container");

  partidos.forEach(partido => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class='tarjeta'>
        <span class='fechaPartido'> ${partido.fechaPartido}</span>
        <span class='pts'></span>
        <div class='equipo Local'>
          <figure class='datosEquipo'>
            <img class='imgEquipo' alt="">
            <figcaption>${partido.equipoLocal}</figcaption>
          </figure>
        </div>
        <div class='pronostico'>
          <div class='marcador Local'>
            <button class='button'>+</button>
            <span class='marcLocal'>${partido.pronosticoLocal}</span>
            <button class='button'>-</button>
          </div>
          <div class='marcador Visitante'>
            <button class='button'>+</button>
            <span class='marcVisitante'>${partido.pronosticoVisitante}</span>
            <button class='button'>-</button>
          </div>
        </div>
        <div class='resultado'> 
          <div>
            <div>Resultado:</div>
            <span class='resLocal'>${partido.marcadorLocal}</span>
            <span>-</span>
            <span class='resVisit'>${partido.marcadorVisitante}</span>
          </div>          
          <div>
            <div>Tu Pronostico:</div>
            <span class='pronosticoLocal'></span>
            <span>-</span>
            <span class='pronosticoVisitante'></span>
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
    container.appendChild(div);
    const incrementarMarcador = div.querySelectorAll('.marcador .button:first-child');
    const disminuirMarcador = div.querySelectorAll('.marcador .button:last-child');

    incrementarMarcador.forEach(button => {
      button.addEventListener('click', () => {
        const span = button.nextElementSibling;
        let valor = parseInt(span.textContent);
        if (span.textContent === '-') {
          valor = 0;
        } else {
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
  });
  const btnGuardar = document.querySelector("#guardarPronostico");

  btnGuardar.addEventListener('click', () => {
    partidos.forEach((partido, index) => {
      const tarjeta = container.children[index];
      const marcadorLocal = parseInt(tarjeta.querySelector('.marcLocal').textContent);
      const marcadorVisitante = parseInt(tarjeta.querySelector('.marcVisitante').textContent);
      const pronosticoLocalSpan = tarjeta.querySelector('.pronosticoLocal');
      const pronosticoVisitanteSpan = tarjeta.querySelector('.pronosticoVisitante');

      //Modifico la propiedad de cada objeto del array
      partido.pronosticoLocal = marcadorLocal;
      partido.pronosticoVisitante = marcadorVisitante;
      //Modifico la etiqueta html utilizando operador ternario
      pronosticoLocalSpan.textContent = isNaN(marcadorLocal) ? '' : marcadorLocal;
      pronosticoVisitanteSpan.textContent = isNaN(marcadorVisitante) ? '' : marcadorVisitante;
    });
    console.log(partidos)
  });


  const btnGenerarAleatorios = document.getElementById('btnAleatorio');

  btnGenerarAleatorios.addEventListener('click', () => {
    partidos.forEach((partido, index) => {
      // Generar números aleatorios del 1 al 5 para los marcadores
      const tarjeta = container.children[index];
      const marcadorLocalAleatorio = Math.floor(Math.random() * 5) + 1;
      const marcadorVisitanteAleatorio = Math.floor(Math.random() * 5) + 1;
      const marcadorLocal = tarjeta.querySelector('.resLocal');
      const marcadorVisitante = tarjeta.querySelector('.resVisit');
      const resultado = tarjeta.querySelector('.resultado');
      const pronostico = tarjeta.querySelector('.pronostico');
      // Asignar los valores aleatorios a los marcadores de cada partido
      partido.marcadorLocal = marcadorLocalAleatorio;
      partido.marcadorVisitante = marcadorVisitanteAleatorio;
      //Asigno resultado a la etiqueta html
      
      marcadorLocal.textContent = marcadorLocalAleatorio;
      marcadorVisitante.textContent = marcadorVisitanteAleatorio;

      resultado.style.visibility = 'visible';
      pronostico.style.visibility = 'hidden'

    });
    console.log(partidos);
    // Actualizar las tarjetas o realizar cualquier otra operación necesaria
    // ...
  });

  const btnComparo = document.getElementById('btnComparoResultados');

  btnComparo.addEventListener('click', () => {
    usuarioLogeado.puntos = 0 //TEMPORAL PARA QUE NO ACUMULE AL MOMENTO DE PROBAR, DESPUES IRA SUMANDO HASTA EL FINAL DEL TORNEO
    let puntos = 0;

    partidos.forEach((partido, index) => {
      const tarjeta = container.children[index];
      const spanPts = tarjeta.querySelector('.pts');
      const pronosticoLocal = partido.pronosticoLocal;
      const pronosticoVisitante = partido.pronosticoVisitante;
      const resultado = tarjeta.querySelector('.resultado');
      const pronostico = tarjeta.querySelector('.pronostico');
      resultado.style.visibility = 'visible';
      pronostico.style.visibility = 'hidden'

      // Verificar si los pronósticos son numéricos
      if (!isNaN(pronosticoLocal) && !isNaN(pronosticoVisitante)) {
        // Convierto los pronósticos a números
        const pronosticoLocalNum = parseInt(pronosticoLocal);
        const pronosticoVisitanteNum = parseInt(pronosticoVisitante);

        if (
          pronosticoLocalNum === partido.marcadorLocal &&
          pronosticoVisitanteNum === partido.marcadorVisitante
        ) {
          console.log(`Sumo 3 Pts`);
          spanPts.textContent = '3Pts';
          puntos += 3;
        } else if (
          (pronosticoLocalNum > pronosticoVisitanteNum &&
            partido.marcadorLocal > partido.marcadorVisitante) ||
          (pronosticoLocalNum < pronosticoVisitanteNum &&
            partido.marcadorLocal < partido.marcadorVisitante) ||
          (pronosticoLocalNum === pronosticoVisitanteNum &&
            partido.marcadorLocal === partido.marcadorVisitante)
        ) {
          console.log(`Sumo 1 Pt`);
          spanPts.textContent = '1Pt';
          puntos += 1;
        } else {
          spanPts.textContent = '0Pts';
          puntos += 0;
        }
      } else {
        // Pronóstico no numérico
        spanPts.textContent = '0Pts';
        puntos += 0;
      }
    });
    console.log(`Puntuación total: ${puntos}`);    
    usuarioEncontrado.puntos += puntos;

    usuarios.forEach((usuario, index) => {
      if (usuario.id === usuarioEncontrado.id) {
        usuarios[index] = usuarioEncontrado;
        return;
      }
    });    
    //actualizo los puntos en el sesion storage
    sessionStorage.setItem('usuario', JSON.stringify(usuarioLogeado));
    console.log(usuarioLogeado);
  });

  const btnHabilitarPronostico = document.getElementById('btnHabilitarPronostico');
  btnHabilitarPronostico.addEventListener('click',() =>{
     partidos.forEach((partido,index) =>{   
      const tarjeta = container.children[index];
      const resultado = tarjeta.querySelector('.resultado');
      const pronostico = tarjeta.querySelector('.pronostico');     
        resultado.style.visibility = 'hidden';
        pronostico.style.visibility = 'visible';
    });
  });

  const btnSalir = document.getElementById('btnCerrarSesion');
  //elimino los datos del session storage y actualizo la pagina
  btnSalir.addEventListener('click', ()=>{
    sessionStorage.removeItem('usuario');
    location.reload();
  });

  const btnTabla = document.getElementById('btnTablaPosiciones');
  btnTabla.addEventListener('click', ()=>{

    
    usuarios.forEach((usuario, index) => {
      //Asigno valores aleatorios al puntaje de otros competidores y armo una tabla de posiciones en html  
      let puntajeAleatorio = Math.floor(Math.random() * 12) + 1;
      if (usuario.id != usuarioEncontrado.id) {
        usuarios[index].puntos = puntajeAleatorio;
        return;
      }
    });
    //aca guardo en localstorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log(usuarios);

    //obtengo  los datos del localstorage
    let usuariosPuntaje = JSON.parse(localStorage.getItem('usuarios'));
    //ordeno los datos por mayor puntaje a menor puntaje
    let usuariosOrdenados = usuariosPuntaje.sort((a, b) => b.puntos - a.puntos);
    const container = document.querySelector("#tabla");

    container.innerHTML = "";
    usuariosOrdenados.forEach((usuario,index) => {
      const div = document.createElement('div');
      
      div.innerHTML = `
        <div class="tarjeta puntaje">
        <span>${index+1}</span>
        <span>${usuario.usuario}</span>
        <span>${usuario.puntos} Pts.</span>        
        </div>     
        `;
        container.appendChild(div);
        const primerPuesto = div.querySelector('.tarjeta.puntaje');
        if (index === 0) {          
          primerPuesto.style.backgroundColor = "gold";
        } else if (index === 1) {
          primerPuesto.style.backgroundColor = "greenyellow";
        } else if (index === 2) {
          primerPuesto.style.backgroundColor = "green";
        }
    });
  }); 
}

