'use strict'

let usuario = '';

$(document).ready(function () {
    const usersData = JSON.parse(localStorage.getItem('usuario')) || [];
    $('#username').text(usersData.usuario);

    const nombreCompleto = [usersData.nombre, usersData.apellido]
        .filter(Boolean)
        .join(' ');
        $('#user').text(nombreCompleto);

    $('#log-out').click(function() {
        localStorage.removeItem('usuario');
        window.location.href = "login.html";
    })

    $('.levels button').click(function() {
        $('.manual-container').css('display', 'flex');
        const difficulty = $(this).attr('nivel-dificultad');
        localStorage.setItem('Nivel Dificultad', difficulty);
    })

    $('#close-manual').click(function() {
        $('.manual-container').css('display', 'none');
    })

    $('#start').click(function() {
        window.location.href = "game.html";
    });

});
