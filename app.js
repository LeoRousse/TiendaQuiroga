//main y variables globales:
const main = document.getElementById('main');

// Crear el contenedor de notificaciones
const notificacionesContenido = document.createElement('section');
notificacionesContenido.className = 'notificaciones';
notificacionesContenido.id = 'notificaciones';

// Botón de notificaciones
const notificacionesBtn = document.getElementById('notificacionesBtn');
notificacionesBtn.addEventListener('click', () => {
  // Limpiar el contenido previo de las notificaciones
  notificacionesBtn.innerText = 'Notificaciones';
  notificacionesContenido.innerHTML = `<h2>Notificaciones:</h2>`;

  // Recuperar las notificaciones del localStorage
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];

  // Agregar las notificaciones al contenedor
  notificaciones.forEach((notificacion, index) => {
    const div = document.createElement('div');
    div.className = 'notification';
    div.innerHTML = `
            <div class="icon">${notificacion.icon}</div>
            <div class="content">
                <h3>${notificacion.titulo}</h3>
                <p>${notificacion.mensaje}</p>
                ${notificacion.borrable ? `<button class="btn-cancelar" data-index="${index}">Cancelar Compra</button>` : ''}
            </div>`;
    notificacionesContenido.appendChild(div);
  });

  // Vaciar el contenido previo de `main` y agregar las notificaciones
  main.innerHTML= '';
  main.appendChild(notificacionesContenido);

  // Agregar evento a los botones de cancelar
  const botonesCancelar = document.querySelectorAll('.btn-cancelar');
  botonesCancelar.forEach(boton => {
    boton.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      cancelarNotificacion(index);
    });
  });
});

// Función para cancelar la notificación
function cancelarNotificacion(index) {
  // Mostrar alerta de que se está cancelando la compra
  Swal.fire({
    title: 'Cancelando Compra',
    text: 'Por favor, espere...',
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false
  });

  // Simular un proceso de carga
  setTimeout(() => {
    // Recuperar las notificaciones del localStorage
    let notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];

    // Eliminar la notificación correspondiente
    if (index >= 0 && index < notificaciones.length) {
      notificaciones.splice(index, 1); // Eliminar la notificación
      localStorage.setItem('notificaciones', JSON.stringify(notificaciones)); // Actualizar el localStorage
    }

    // Mostrar alerta de que la compra ha sido eliminada correctamente
    Swal.fire({
      title: 'Compra Cancelada',
      text: 'La compra ha sido eliminada correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

    // Volver a cargar las notificaciones
    notificacionesBtn.click(); // Esto volverá a cargar las notificaciones en el DOM
  }, 3000); // Esperar 3 segundos
}


//seccion de inicio:
document.getElementById('inicioBtn').addEventListener('click', function(event) {
  event.preventDefault();
  main.innerHTML = `
  <section class="login-form">
  <h2>Iniciar Sesión</h2>
  <div>
    <form id="loginForm">
      <div class="form-group">
        <label for="loginEmail">Correo electrónico</label>
        <input type="email" id="loginEmail" name="loginEmail" required>
      </div>
      <div class="form-group">
        <label for="loginPassword">Contraseña</label>
        <input type="password" id="loginPassword" name="loginPassword" required>
      </div>
      <button type="submit" id="loginBtn">Iniciar Sesión</button>

    </form>
  </div>
  <br><br>
  <div id="comments-section">
    <h3>Comentarios de Usuarios</h3>
    <ul id="comments-list"></ul>
  </div>
  </section>`;
  loadComments();

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const loginEmail = document.getElementById('loginEmail').value;
      const loginPassword = document.getElementById('loginPassword').value;

      // Obtener el usuario del localStorage
      const usuario = JSON.parse(localStorage.getItem('usuario'));

      // Verificar si el usuario existe y si la contraseña es correcta
      if (usuario && usuario.email === loginEmail && usuario.contraseña === loginPassword) {
        Swal.fire({
            title: 'Éxito',
            text: `Bienvenido/a ${usuario.nombre} ${usuario.apellido}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Correo electrónico o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
  });
});

// Crear Usuario
const btnUsuario = document.getElementById('btnUsuario');

const handleRegister = (event) => {
  event.preventDefault();
  main.innerHTML = `
      <section class="register-form">
          <h2>Crear cuenta</h2>
          <form id="contactForm">
              <div class="form-group">
                  <label for="name">Nombre</label>
                  <input type="text" id="name" name="name" required>
              </div>
              <div class="form-group">
                  <label for="surname">Apellido</label>
                  <input type="text" id="surname" name="surname" required>
              </div>
              <div class="form-group">
                  <label for="city">Ciudad</label>
                  <input type="text" id="city" name="city" required>
              </div>
              <div class="form-group">
                  <label for="country">País</label>
                  <input type="text" id="country" name="country" required>
              </div>
              <div class="form-group">
                  <label for="birthdate">Fecha de nacimiento</label>
                  <input type="date" id="birthdate" name="birthdate" required>
              </div>
              <div class="form-group">
                  <label for="email">Correo electrónico</label>
                  <input type="email" id="email" name="email" required>
              </div>
              <div class="form-group">
                  <label for="profession">Profesión</label>
                  <input type="text" id="profession" name="profession" required>
              </div>
              <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input type="password" id="password" name="password" required>
              </div>
              <div class="form-group">
                  <label for="confirm-password">Confirmar contraseña</label>
                  <input type="password" id="confirm-password" name="confirm-password" required>
              </div>
              <div class="form-group">
                  <input type="checkbox" id=" terms" name="terms" required>
                  <label for="terms">He leído y estoy de acuerdo con los: <a href="assets/Terminos_y_Condiciones.pdf">términos y condiciones</a></label>
              </div>
              <button class="buttonC" type="submit" id="submit">Crear cuenta</button>
          </form>
      </section>`;

  const formulario = document.getElementById('contactForm');
  formulario.addEventListener('submit', function (event) {
      event.preventDefault();
      const nombre = document.getElementById('name').value;
      const apellido = document.getElementById('surname').value;
      const ciudad = document.getElementById('city').value;
      const pais = document.getElementById('country').value;
      const nacimiento = document.getElementById('birthdate').value;
      const email = document.getElementById('email').value;
      const profesion = document.getElementById('profession').value;
      const contraseña1 = document.getElementById('password').value;
      const contraseña2 = document.getElementById('confirm-password').value;

      // Verificar si las contraseñas coinciden
      if (contraseña1 !== contraseña2) {
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return; // Detiene el proceso si las contraseñas no coinciden
      } else {
        Swal.fire({
          title: 'Usuario registrado exitosamente',
          text: 'Revisa tu bandeja de notificaciones.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      };

      // Agregar notificaciones al localStorage
      const notificaciones =
          JSON.parse(localStorage.getItem('notificaciones')) || [];
          notificaciones.push({
          icon: 'ℹ️',
          titulo: 'Información:',
          mensaje: `Bienvenido/a a nuestra tienda, muchas gracias por elegirnos, al registrarte podrás estar al tanto de nuestros nuevos cursos y productos, así como eventos, ofertas y novedades de nuestra comunidad digital que constantemente está creciendo, ¡Bienvenido/a!`,
      });
      notificaciones.push({
          icon: '✔️',
          titulo: 'Usuario registrado exitosamente!',
          mensaje: `Los datos ingresados son: Sr/a ${nombre} ${apellido}, desde: ${ciudad} - ${pais}, fecha de nacimiento: ${nacimiento}, email: ${email}, profesión: ${profesion}, Usuario registrado correctamente!`,
      });
      localStorage.setItem('notificaciones', JSON.stringify(notificaciones));

      // Almacenar la información del usuario en el localStorage
      const usuario = {
          nombre,
          apellido,
          ciudad,
          pais,
          nacimiento,
          email,
          profesion,
          contraseña: contraseña1,
      };
      localStorage.setItem('usuario', JSON.stringify(usuario));
      notificacionesBtn.innerText = 'Notificaciones (+2)';

      // Cambiar el contenido del DOM para mostrar el mensaje de éxito
      main.innerHTML = `
          <section class="success-message">
              <h2>Usuario Registrado Exitosamente</h2>
              <p>Por favor revisa tu casillero de Notificaciones, ${nombre}!</p>
          </section>`;

      // Modificar el botón que despliega el formulario
      const contenedor = btnUsuario.parentNode;
      contenedor.removeChild(btnUsuario);

      // Crear un nuevo elemento de texto
      const textoBienvenida = document.createElement('p');
      textoBienvenida.textContent = `Hola ${nombre} ${apellido}`;

      // Agregar el nuevo elemento de texto al contenedor
      contenedor.appendChild(textoBienvenida);
  });
};

btnUsuario.addEventListener('click', handleRegister);

// Verificar si el usuario ya está registrado al cargar la página
const usuarioBienvenida = JSON.parse(localStorage.getItem('usuario')) || false;
if (usuarioBienvenida) {
  const contenedor = btnUsuario.parentNode;
  contenedor.removeChild(btnUsuario);

  const textoBienvenida = document.createElement('p');
  textoBienvenida.textContent = `Hola ${usuarioBienvenida.nombre} ${usuarioBienvenida.apellido}`;
  contenedor.appendChild(textoBienvenida);
}

// TIENDA

// Variables globales para productos.
class Producto {
  constructor(producto, precio, descripcion) {
    this.producto = producto;
    this.precio = precio;
    this.descripcion = descripcion;
  }
  mostrar() {
    console.log(
      `Producto: ${this.producto}, Precio: ${this.precio}$, ${this.descripcion}.`,
    );
  }
}

const p1 = new Producto(
  'Curso de Oratoria',
  80,
  'Transforma tu capacidad de comunicarte con seguridad y claridad. En nuestro curso intensivo de oratoria, aprenderás técnicas para hablar en público con confianza, manejar la expresión corporal y proyectar tu voz de manera persuasiva. Con una duración de 8 semanas y 2 clases semanales, podrás elegir entre horarios de mañana y tarde. Desde estructuración de discursos hasta herramientas para enfrentar el miedo escénico, este curso te brindará las habilidades necesarias para destacar en cualquier ámbito profesional. ¡Aprovecha esta oportunidad de diferenciarte en el mercado laboral y ser un comunicador líder!',
);
const p2 = new Producto(
  'Introducción al Frontend',
  190,
  'Ingresa al mundo del desarrollo web con este curso de introducción al frontend. Durante 10 semanas, con 3 clases semanales, explorarás los fundamentos de HTML, CSS y JavaScript, herramientas esenciales para crear interfaces modernas y funcionales. Con horarios disponibles en la mañana y en la tarde, este curso combina teoría y práctica para que desarrolles proyectos reales desde cero. Descubre cómo transformar tus ideas en sitios web y adquiere habilidades que son altamente demandadas en el mercado laboral digital. ¡Da el primer paso hacia una carrera en tecnología y empieza a construir tu portafolio profesional!',
);
const p3 = new Producto(
  'Curso de Python',
  120,
  'Domina Python, uno de los lenguajes de programación más versátiles y solicitados en la industria tecnológica. Este curso de 12 semanas, con 2 clases semanales, te ofrece horarios tanto en la mañana como en la tarde para ajustarse a tus necesidades. Desde los conceptos básicos hasta la manipulación de datos y el desarrollo de algoritmos, aprenderás de manera práctica con proyectos reales que consolidarán tus conocimientos. A lo largo del curso, adquirirás habilidades que te abrirán puertas en áreas como desarrollo web, análisis de datos e inteligencia artificial. ¡Prepárate para dar un salto en tu carrera y convertirte en un profesional de Python!',
);
const p4 = new Producto(
  'Marketing Digital',
  80,
  'Desarrolla campañas de marketing digital efectivas y potencia tu presencia online con este curso intensivo. En 8 semanas, con 2 clases semanales, aprenderás desde los fundamentos del marketing hasta herramientas avanzadas como SEO, redes sociales, Google Ads y análisis de métricas. Los horarios son flexibles, con opciones en la mañana y la tarde, para que puedas optimizar tu tiempo de aprendizaje. Te brindaremos las estrategias necesarias para planificar, ejecutar y medir campañas de alto impacto. ¡Conviértete en un profesional del marketing digital y abre las puertas a una carrera en constante crecimiento!',
);
const p5 = new Producto(
  'Curso de AutoCAD 2D',
  200,
  'Conviértete en un experto en diseño técnico con nuestro curso de AutoCAD en 2D. A lo largo de 10 semanas, con 2 clases semanales, aprenderás a crear dibujos y planos precisos para arquitectura, ingeniería y diseño. Este curso ofrece horarios flexibles en la mañana y la tarde, adaptados a tu disponibilidad. Desde los comandos básicos hasta técnicas avanzadas de dibujo, desarrollarás proyectos que te darán las herramientas necesarias para destacar en la industria. ¡Domina AutoCAD y prepárate para una carrera llena de oportunidades en el ámbito del diseño y la construcción!',
);
const p6 = new Producto(
  'Curso de AutoCAD 3D',
  200,
  'Explora el potencial del diseño tridimensional con nuestro curso de AutoCAD en 3D. En 12 semanas, con 3 clases semanales, aprenderás a crear modelos detallados y realistas que dan vida a tus proyectos de arquitectura, diseño industrial y más. Ofrecemos horarios tanto en la mañana como en la tarde para tu comodidad. Desde la creación de geometrías complejas hasta el manejo de texturas y renderizados, este curso te brindará las competencias necesarias para destacarte en un mercado laboral cada vez más visual. ¡Adquiere una habilidad altamente valorada y da un paso hacia el futuro del diseño!',
);
const p7 = new Producto(
  'SketchUp',
  250,
  'Domina SketchUp y aprende a diseñar y modelar en 3D con facilidad y precisión. En este curso de 8 semanas, con 2 clases semanales, descubrirás cómo crear modelos tridimensionales detallados para arquitectura, diseño de interiores, y proyectos creativos. Con horarios disponibles en la mañana y la tarde, tendrás la flexibilidad para adaptarte a tus necesidades. Desde el boceto inicial hasta el render final, desarrollarás un portafolio sólido que te abrirá puertas en el mundo profesional. ¡Dale vida a tus ideas con SketchUp y destaca en un mercado que valora la creatividad y el detalle!',
);
const p8 = new Producto(
  'JavaScript',
  100,
  'Lleva tus habilidades de programación al siguiente nivel con nuestro curso de JavaScript. Durante 10 semanas, con 3 clases semanales, aprenderás desde los fundamentos del lenguaje hasta la manipulación del DOM, creación de eventos y programación orientada a objetos. Con opciones de horarios en la mañana y la tarde, este curso práctico te permitirá desarrollar aplicaciones web dinámicas y funcionales. ¡Conviértete en un desarrollador web capaz de crear experiencias interactivas y aprovecha las múltiples oportunidades laborales que ofrece el conocimiento de JavaScript en el mundo digital!',
);
const p9 = new Producto(
  'Lógica de Programación (Prácticas)',
  60,
  'Mejora tu lógica de programación y prepárate para enfrentar desafíos técnicos con nuestras prácticas online. En un formato flexible, estas sesiones están diseñadas para adaptarse a tu ritmo y disponibilidad, con la opción de elegir horarios tanto en la mañana como en la tarde. A lo largo de 6 semanas, trabajarás en ejercicios que abarcan algoritmos, estructuras de datos y resolución de problemas. Esta formación te proporcionará las bases sólidas necesarias para abordar cualquier lenguaje de programación. ¡Aprovecha esta oportunidad para destacar en el mercado laboral y convertirte en un programador más eficiente y seguro!',
);

var productos = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

// Función para agregar el evento a los botones de compra
function agregarEventosComprar() {
  const botonesComprar = document.querySelectorAll('#btnComprar');

  botonesComprar.forEach((boton, index) => {
    // Usar un atributo para verificar si el evento ya ha sido agregado
    if (!boton.dataset.eventAdded) {
      boton.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace

        const usuario = localStorage.getItem('usuario');
        if (!usuario) {
          Swal.fire({
            title: 'Acceso Denegado',
            text: 'Debes crear un usuario primero, para poder acceder a nuestros cursos y productos.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        } else {
          // Obtener el producto correspondiente
          const productoSeleccionado = productos[index];
          agregarAlCarrito(productoSeleccionado);
        }
      });
      // Marcar que el evento ha sido agregado
      boton.dataset.eventAdded = true;
    }
  });
}

// Función para agregar el producto al carrito en localStorage
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(
    (item) => item.producto === producto.producto,
  );
  if (productoExistente) {
    Swal.fire({
      title: 'Producto Existente',
      text: `El producto ${producto.producto} ya está en el carrito.`,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
    return; // No agregar el producto si ya existe
  }

  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  Swal.fire({
    title: 'Producto Añadido',
    text: `${producto.producto} ha sido añadido al carrito.`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
  actualizarTextoCarrito(); // Actualizar el texto del botón después de agregar
}

// Llamar a la función para agregar eventos al cargar la página
document.addEventListener('DOMContentLoaded', agregarEventosComprar);

// Función para actualizar el texto del botón "Ver carrito"
function actualizarTextoCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoBtn = document.getElementById('carritoBtn');
  const cantidadProductos = carrito.length;

  if (cantidadProductos > 0) {
    carritoBtn.textContent = `Ver carrito (+${cantidadProductos})`;
  } else {
    carritoBtn.textContent = 'Ver carrito';
  }
}

// Función para mostrar los productos en el main
function mostrarProductosEnCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const main = document.getElementById('main');
  main.innerHTML = ''; // Limpiar el contenido actual

  if (carrito.length === 0) {
    main.innerHTML =
      '<main><section><h2>No hay productos en el carrito.</h2></section></main>';
    return;
  }

  // Mostrar productos en el carrito
  carrito.forEach((producto, index) => {
    const productoHTML = `
            <section class="productCarrito">
                <h2>${producto.producto}</h2>
                <p class="description">${producto.descripcion}</p>
                <p class="price">$${producto.precio}</p>
                <button class="btnEliminar" data-index="${index}">Eliminar del carrito</button>
            </section>
        `;
    main.innerHTML += productoHTML; // Agregar el producto al main
  });

  // Calcular y mostrar la información del carrito
  mostrarResumenCarrito(carrito);

  // Agregar eventos a los botones de eliminar
  agregarEventosEliminar();
}

// Función para mostrar el resumen del carrito
function mostrarResumenCarrito(carrito) {
  const totalProductos = carrito.length;
  const sumaPrecios = carrito
    .reduce((total, producto) => total + producto.precio, 0)
    .toFixed(2); // Sumar precios

  const resumenHTML = `
        <section class="resumen">
            <h3>Productos agregados al carrito: ${totalProductos}</h3>
            <h3>Total: ${sumaPrecios} U$D</h3>
            <button class="btnEliminar" id="btnFinalizarCompra">Finalizar Compra</button>
        </section>
    `;

  const main = document.getElementById('main');
  main.innerHTML += resumenHTML; // Agregar el resumen al main

  // Agregar evento al botón "Finalizar Compra"
  document
    .getElementById('btnFinalizarCompra')
    .addEventListener('click', finalizarCompra);
}

// Función para manejar la finalización de la compra
function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (carrito.length === 0 || !usuario) {
    Swal.fire({
      title: 'Error',
      text: 'No hay productos en el carrito o no hay usuario registrado.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Crear la notificación de compra
  const totalProductos = carrito.length;
  const sumaPrecios = carrito
    .reduce((total, producto) => total + producto.precio, 0)
    .toFixed(2);
  const productosComprados = carrito
    .map((producto) => producto.producto)
    .join(', ');
  const fechaCompra = new Date();
  const fechaFormateada = `${fechaCompra.getDate()}/${fechaCompra.getMonth() + 1}/${fechaCompra.getFullYear()} ${fechaCompra.getHours()}:${fechaCompra.getMinutes()}`;

  const notificacionCompra = {
    icon: '🛒',
    titulo: 'Compra Realizada',
    mensaje: `
      <strong>Compra realizada por:</strong> ${usuario.nombre} ${usuario.apellido}<br>
      <strong>Email:</strong> ${usuario.email}<br>
      <strong>Productos comprados:</strong> ${totalProductos} (${productosComprados})<br>
      <strong>Precio total:</strong> $${sumaPrecios}<br>
      <strong>Fecha de compra:</strong> ${fechaFormateada}<br>
      Nos comunicaremos contigo a través de tu correo electrónico para ajustar los horarios de cursado y monitorear el protocolo de la compra. ¡Bienvenido/a a la era Digital!
    `,
    borrable: true // Esta notificación es borrable
  };

  // Almacenar la notificación en el localStorage
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
  notificaciones.push(notificacionCompra);
  localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
  notificacionesBtn.innerText = 'Notificaciones (+1)';
  const carritoBtn = document.getElementById('carritoBtn');
  carritoBtn.textContent = 'Ver carrito';
  
  Swal.fire({
    title: 'Compra Exitosa',
    text: 'Gracias por tu compra. ¡Esperamos verte de nuevo!',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
  
  localStorage.removeItem('carrito'); // Limpiar el carrito
  mostrarProductosEnCarrito(); // Actualizar la vista del carrito
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar que el carrito no esté vacío
  if (carrito.length === 0) {
    return; // Simplemente retorna sin hacer nada si el carrito está vacío
  }

  // Verificar que el índice sea válido
  if (index < 0 || index >= carrito.length) {
    return; // Retorna sin hacer nada si el índice no es válido
  }

  const productoEliminado = carrito[index].producto; // Obtener el nombre del producto a eliminar
  carrito.splice(index, 1); // Eliminar el producto en el índice especificado
  localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el localStorage
  actualizarTextoCarrito(); // Actualizar el texto del botón
  mostrarProductosEnCarrito(); // Volver a mostrar los productos en el carrito

  // Notificación de eliminación
  Swal.fire({
    title: 'Producto Eliminado',
    text: `El producto ${productoEliminado} ha sido eliminado del carrito.`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}

// Función para agregar eventos a los botones de eliminar
function agregarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll('.btnEliminar');

  botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', (event) => {
      const index = event.target.dataset.index; // Obtener el índice del producto
      eliminarDelCarrito(index); // Llamar a la función para eliminar
    });
  });
}

// Evento para el botón "Ver carrito"
document.getElementById('carritoBtn').addEventListener('click', (event) => {
  event.preventDefault(); // Evitar el comportamiento por defecto del enlace
  mostrarProductosEnCarrito();
});

document.addEventListener('DOMContentLoaded', () => {
  agregarEventosComprar();
  actualizarTextoCarrito();
});

// Llamar a la función para agregar eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  agregarEventosComprar();
  actualizarTextoCarrito();
});

// Integracion de inicioBtn y SweetAlert
document.getElementById('inicioBtn').addEventListener('click', function(event) {
  event.preventDefault();
  loadComments();
});

// Función para cargar comentarios desde JSONPlaceholder
function loadComments() {
  fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => {
          const commentsList = document.getElementById('comments-list');
          commentsList.innerHTML = '';

          const fakeUsers = [
              { name: 'Juan Pérez', email: 'juan99perez@gmail.com' },
              { name: '⭐ María López', email: 'maria.lopkey@hotmail.com' },
              { name: 'Carlos Sánchez', email: 'carlos.sanchez@gmail.com' },
              { name: '😀 Ana García', email: 'ana.garcia@yahoo.com' },
              { name: '🏆 Luis Martínez', email: 'luis-martinez66@gmail.com' },
              { name: 'Laura Rodríguez', email: 'laura.rodriguez@hotmail.com' },
              { name: '😊 Pedro Fernández', email: 'pedrito_fernandez@gmail.com' },
          ];

          data.slice(0, 7).forEach((comment, index) => {
              const listItem = document.createElement('li');
              const user = fakeUsers[index % fakeUsers.length]; // Ciclo a través de los usuarios ficticios
              listItem.innerHTML = `
                  <strong>${user.name}</strong> (${user.email}): ${comment.body} 
                  <span role="img" aria-label="thumbs up">👍</span>
              `;
              
              commentsList.appendChild(listItem);
          });
      })
      .catch(error => {
          console.error('Error al cargar los comentarios:', error);
      });
}

