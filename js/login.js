'use strict';

/* https://www.w3schools.com/jquery/jquery_events.asp */

let usuarios = [];

/* Cuando carge la pagina se obtienen los usuarios del fichero json y se asocia
el evento submit a la funcion validarLogin. En caso de error se muestra por
consola. */
$(document).ready(function () {
    obtenerUsuarios()
        .then(() => {
            $('#login-form').on('submit', validarLogin);
        })
        .catch(error => {
            console.error('Error: ', error);
        });
});


function obtenerUsuarios() {
    /* Si la lista de usuarios ya se ha cargado se resuelve la promesa. */
    if (localStorage.getItem('usuarios')) {
        return Promise.resolve();
    }

    /* Si el fichero JSON con los datos de los usuarios de la aplicacion se 
    carga correctamente, se almacena el array con los datos en 'usuarios', se
    guarda en el localStorage y se resuelve la promesa. En caso de error de 
    formato o al cargar el fichero, se rechaza la promesa y se lanza un error */
    return $.getJSON('data/usuarios.json')
        .then(response => {
            if (!response || !Array.isArray(response)) {
                throw new Error('Formato de datos inválido');
            }
            usuarios = response;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        })
        .catch(error => {
            throw new Error(`Error al cargar los usuarios`);
        })
}

function validarLogin(event) {
    /* Se previene el comportamiento por defecto del evento submit que se pasa
    como parámetro. */
    event.preventDefault();

    /* Se obtiene el usuario y la contraseña enviados en el formulario */
    const username = $('#name').val();
    const password = $('#current-password').val();

    /* Se comprueba que la contraseña tiene el formato adecuado, sino se muestra
    el error y se reseta el formulario. */
    if (!validarFormatoContraseña(password)) {
        mostrarError('La contraseña no puede contener símbolos especiales.');
        $('#login-form')[0].reset();
        return;
    }

    /* Se obtiene un objeto JS con los datos JSON de los usuarios y buscamos una
    coincidencia. */
    const usersData = JSON.parse(localStorage.getItem('usuarios')) || [];
    const validUser = usersData.find(
        user => user.usuario === username && user.contraseña === password
    );

    /* Si no se ha encontrado un usuario con esas credenciales se muestra el 
    error y se resetea el formulario. */
    if (!validUser) {
        mostrarError('Usuario o contraseña incorrectos');
        $('#login-form')[0].reset();
        return;
    }

    /* Se almacena en el local storage los datos del usuario */
    localStorage.setItem('usuario', JSON.stringify(validUser));

    /* Se redirigue a la pagina principal de la aplicación */
    window.location.href = 'menu.html';
}

/* Funcion que muestra momentaneamente el mensaje de error pasado como
parametro, en el elemento del DOM con id error-message*/
function mostrarError(msg) {
    const $error = $('#error-message');
    $error.text(msg).fadeIn();
    setTimeout(() => $error.fadeOut(), 4000);
}

/* Funcion que utiliza una expresion regular para comprobar el formato de la 
contraseña */
function validarFormatoContraseña(password) {
    const regex = /^[a-zA-Z0-9]+$/;

    return regex.test(password);
}