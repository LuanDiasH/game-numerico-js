let intervalo = setInterval(temporizador, 1000);
let contador = 60;

function temporizador() {
    if (contador > 0) {
        contador--;
        document.getElementById('text-time').textContent = contador;
    } else {
        window.location.href = 'fim.html';
    }
}
