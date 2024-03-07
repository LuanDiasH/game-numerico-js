var perguntaObj;
var legendaObj;
var erros = 0;
var pontos = 0;
var textPontos = 'Pontos: ';
var idPontos = ' ';


let users = [
    { nome: "Usuário1", pontuacao: 30, respostasCorretas: 3 },
    { nome: "Usuário2", pontuacao: 20, respostasCorretas: 2 },
    { nome: "Usuário3", pontuacao: 40, respostasCorretas: 4 }
  ];


function gerarPergunta() {
    var num1 = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) ;
    var num2 = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    var operadores = ['+', 'x', '-', '/'];
    var operador = operadores[Math.floor(Math.random() * operadores.length)];
    var result1 = num1 + num2;
    var result2 = num1 * num2;
    var result3 = num1 - num2;
    var result4 = num1 / num2;
    var pergunta = '';

    if (operador === '+') {
        pergunta = `${num1} ${operador} ? = ${result1}`;
    } else if (operador === '-') {
        pergunta = `${num1} ${operador} ? = ${result3}`;
    } else if (operador === 'x') {
        pergunta = `${num1} ${operador} ? = ${result2}`;
        // Verifica os requisitos e ajusta num2
        if (num1 === 0 && result3 === 0 && operador === 'x') {
            num2 = 0;
        }
    } else if (operador === '/' ) {
        if (Number.isInteger(result4) === true){
        pergunta = `${num1} ${operador} ? = ${result4}`;
        }
        pergunta = `${num1} x ?-=- = ${result2}`;
    } else {
        pergunta = 'Não foi possível gerar a pergunta.';
    }


    return {
        pergunta: pergunta,
        num2: num2,
        result1: result1,
        result2: result2,
        result3: result3
    };
}


function exibirPergunta() {
    perguntaObj = gerarPergunta();
    document.getElementById('pergunta').innerHTML = perguntaObj.pergunta;
}
    
function exibirLegenda() {
    document.getElementById('legenda').innerHTML = legendaObj;
}
    
function contarPontos() {
    pontos++;
    textPontos = `ACERTOS: ${pontos}`;
    idPontos = document.getElementById('text-pontos');
    idPontos.textContent = textPontos;
}

document.addEventListener('DOMContentLoaded', function() {
    function pontoFinal() {
        var mensagemFinal = `Pontuação final: ${pontos}`;
        var elementoFinalPontos = document.getElementById('final-pontos');
        
        if (elementoFinalPontos) {
            elementoFinalPontos.innerHTML = mensagemFinal;
        } else {
            console.error('Elemento final-pontos não encontrado no DOM.');
        }
    }
});



function verificarResposta() {
    var resposta = document.getElementById('resposta').value;
    if (resposta === String(perguntaObj.num2)) {
        legendaObj = '<div class="alert alert-success" role="alert">Resposta correta</div>';
        exibirLegenda();
        contarPontos();
        exibirPergunta();
        document.getElementById('resposta').value = ''; // Limpa o input
    } else {
        erros += 1;
        legendaObj = '<div class="alert alert-danger" role="alert">Resposta incorreta</div>';
        exibirLegenda();
        contarErro();

        if (erros >= 3) {
            console.log("Três erros alcançados. Redirecionando...");
            pontoFinal();
            contarErro();
            window.location.href = '';
        }

        document.getElementById('resposta').value = ''; // Limpa o input
    }
}

function contarErro() {
    if (erros === 1) {
        if (coracao3) {
            coracao3.style.backgroundImage = 'url("imagens/coracao-quebrado.png")';
        }
    } else if (erros === 2) {
        if (coracao2) {
            coracao2.style.backgroundImage = 'url("imagens/coracao-quebrado.png")';
        }
    } else if (erros === 3) {
        if (coracao1) {
            coracao1.style.backgroundImage = 'url("imagens/coracao-quebrado.png")';
        }
    }
}

function iniciarJogo() {
    var nomeJogador = document.getElementById('nomeJogador').value;
    const recusarJogador = '<input id="nomeJogador-recusado" class="form-control mb-3" style="background-color: #dc3545; color: #fff;" type="text" onfocus="pararAnimacao()" placeholder="Insira seu nome para iniciar o jogo" required>';
    if (nomeJogador.length === 0) { 
        document.getElementById('nomeJogador').outerHTML = recusarJogador;
    } else {
        window.location.href = 'jogo.html';
    }
}

function pararAnimacao(){
    var nomeJogador = '<input id="nomeJogador" class="form-control mb-3" type="text" placeholder="Insira seu nome:" required>';
    document.getElementById('nomeJogador-recusado').outerHTML = nomeJogador;
}

function voltar(){
    window.location.href='index.html'
}

exibirPergunta();