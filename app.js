//main y variables globales:
const main = document.getElementById("main");
let check1 = false;

// Variables globales para productos.
class producto {
    constructor(producto, precio, descripcion) {
        this.producto = producto;
        this.precio = precio;
        this.descripcion = descripcion;
    }
    mostrar() {
        console.log(`Producto: ${this.producto}, Precio: ${this.precio}$, ${this.descripcion}.`);
    }
}
const p1 = new producto("Curso de Oratoria", 80, "Aprende a comunicarte efectivamente con nuestro curso de oratoria.");
const p2 = new producto("Introduccion al Frontend", 190, "Aprende los conceptos básicos del desarrollo frontend con nuestro curso.");
const p3 = new producto("Curso de Python", 120, "Aprende a programar en Python con nuestro curso práctico.");
const p4 = new producto("Marketing Digital", 80, "Aprende a crear campañas efectivas de marketing digital con nuestro curso.");
const p5 = new producto("Curso de AutoCAD 2D", 200, "Aprende a dibujar y diseñar en 2D con nuestro curso de AutoCAD.");
const p6 = new producto("Curso de AutoCAD 3D", 200, "Aprende a dibujar y diseñar en 3D con nuestro curso de AutoCAD.");
const p7 = new producto("SketchUp", 250, "Aprende a diseñar y modelar en 3D con nuestro curso de SketchUp.");
const p8 = new producto("JavaScript", 100, "Aprende a programar en JavaScript con nuestro curso práctico.");
const p9 = new producto("Logica de Programacion (Practicas)", 60, "Mejora tu logica de programación con nuestras practicas OnLine.");
var productos = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

// Crear el contenedor de notificaciones
const notificacionesContenido = document.createElement("section");
notificacionesContenido.className = "notificaciones";
notificacionesContenido.id = "notificaciones";

// Botón de notificaciones
const notificacionesBtn = document.getElementById("notificacionesBtn");
notificacionesBtn.addEventListener("click", () => {
    // Limpiar el contenido previo de las notificaciones
    notificacionesBtn.innerText = "Notificaciones";
    notificacionesContenido.innerHTML = `<h2>Notificaciones:</h2>`;
    
    // Recuperar las notificaciones del localStorage
    const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    
    // Agregar las notificaciones al contenedor
    notificaciones.forEach(notificacion => {
        const div = document.createElement("div");
        div.className = "notification";
        div.innerHTML = `
            <div class="icon">${notificacion.icon}</div>
            <div class="content">
                <h3>${notificacion.titulo}</h3>
                <p>${notificacion.mensaje}</p>
            </div>`;
        notificacionesContenido.appendChild(div);
    });

    // Vaciar el contenido previo de `main` y agregar las notificaciones
    main.innerHTML = "";  // Limpia el contenido previo de `main`
    main.appendChild(notificacionesContenido);
});

// Crear Usuario.
const btnUsuario = document.getElementById("btnUsuario");

btnUsuario.addEventListener("click", (event) => {
    event.preventDefault();
    check1 = true;
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
                <label for="birthdate"> Fecha de nacimiento</label>
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
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms">He leído y estoy de acuerdo con los: <a href="assets/Terminos_y_Condiciones.pdf">términos y condiciones</a></label>
            </div>
            <button class="buttonC" type="submit" id="submit">Crear cuenta</button>
        </form>
    </section>`;

    // Añadir el evento submit después de que el formulario haya sido agregado al DOM
    const formulario = document.getElementById("contactForm");
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        const nombre = document.getElementById("name").value;
        const apellido = document.getElementById("surname").value;
        const ciudad = document.getElementById("city").value;
        const pais = document.getElementById("country").value;
        const nacimiento = document.getElementById("birthdate").value;
        const email = document.getElementById("email").value;
        const profesion = document.getElementById("profession").value;
        const contraseña1 = document.getElementById("password").value;
        const contraseña2 = document.getElementById("confirm-password").value;

        // Verificar si las contraseñas coinciden
        if (contraseña1 !== contraseña2) {
            alert("Las contraseñas no coinciden.");
            return; // Detiene el proceso si las contraseñas no coinciden
        }

        console.log(`Los datos ingresados son: Sr/a ${nombre} ${apellido}, desde: ${ciudad} - ${pais}, fecha de nacimiento: ${nacimiento}, email: ${email}, profesión: ${profesion}, Usuario registrado correctamente!`);

        // Agregar notificaciones al localStorage
        const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
        notificaciones.push({
            icon: 'ℹ️',
            titulo: 'Información:',
            mensaje: `Bienvenido/a a nuestra tienda, muchas gracias por elegirnos, al registrarte podrás estar al tanto de nuestros nuevos cursos y productos, así como eventos, ofertas y novedades de nuestra comunidad digital que constantemente está creciendo, ¡Bienvenido/a!`
        });
        notificaciones.push({
            icon: '✔️',
            titulo: 'Usuario registrado exitosamente!',
            mensaje: `Los datos ingresados son: Sr/a ${nombre} ${apellido}, desde: ${ciudad} - ${pais}, fecha de nacimiento: ${nacimiento}, email: ${email}, profesión: ${profesion}, Usuario registrado correctamente!`
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
            contraseña: contraseña1
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Almacenar una referencia al contenedor del botón
        const contenedor = btnUsuario.parentNode;

        // Eliminar el botón
        contenedor.removeChild(btnUsuario);

        // Crear un nuevo elemento de texto
        const textoBienvenida = document.createElement("p");
        textoBienvenida.textContent = `Hola ${nombre} ${apellido}`;

        // Agregar el nuevo elemento de texto al contenedor
        contenedor.appendChild(textoBienvenida);
        notificacionesBtn.innerText = "Notificaciones (+2)";
    });
});