document.addEventListener("DOMContentLoaded", function () {
    var levelElement = document.getElementById("level");
    var timerElement = document.getElementById("time");
    var numeroElement = document.getElementById("numero");
    var iniciarButton = document.getElementById("iniciar");
    var pausarButton = document.getElementById("pausar");
    var pararButton = document.getElementById("parar");
    var numAcertosElement = document.getElementById("numAcertos");
    var numErrosElement = document.getElementById("numErros");
    var gameOverElement = document.getElementById("game-over");

    var intervalId;
    var tempoAtual = 0;
    var tempoRestante = 0;
    var jogoIniciado = false;
    var numAcertos = 0;
    var numErros = 0;
    var numerosParesSorteados = 0;

    levelElement.addEventListener("change", function () {
        reiniciarPontuacao();
        atualizarTempo(this.value);
    });
    
    iniciarButton.addEventListener("click", function() {
        if (levelElement.value === "") {
            alert("Por favor, selecione um nível antes de iniciar o jogo.");
        } else {
            iniciarJogo();
            return;
        }
    });
    

    pausarButton.addEventListener("click", pausarJogo);
    pararButton.addEventListener("click", pararJogo);
    numeroElement.addEventListener("click", clicarNumero);

    function atualizarTempo(nivel) {
        var minutos = 0;
        var segundos = 0;
        var intervaloExibicao = 1000;

        if (nivel === "facil") {
            minutos = 1;
            segundos = 30;
        } else if (nivel === "medio") {
            minutos = 1;
            segundos = 15;
            intervaloExibicao = 350;
        } else if (nivel === "dificil") {
            segundos = 30;
            intervaloExibicao = 150;
        }

        tempoRestante = minutos * 60 + segundos;
        tempoAtual = tempoRestante;

        var tempoFormatado = minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
        timerElement.textContent = tempoFormatado;
        jogoIniciado = false;

        clearInterval(intervalId);
    }
    function iniciarJogo() {
        if (levelElement.value === "") {
            alert("Por favor, selecione um nível antes de iniciar o jogo.");
            return;
        }
    
        clearInterval(intervalId);
    
        var intervalo = 1000; // Intervalo padrão para o nível fácil
    
        if (levelElement.value === "medio") {
            intervalo = 700; // Intervalo mais rápido para o nível médio
        } else if (levelElement.value === "dificil") {
            intervalo = 500; // Intervalo ainda mais rápido para o nível difícil
        }
    
        intervalId = setInterval(function () {
            if (tempoRestante <= 0) {
                clearInterval(intervalId);
                exibirFimDeJogo("Tempo esgotado!");
                return;
            }
    
            var minutos = Math.floor(tempoRestante / 60);
            var segundos = tempoRestante % 60;
    
            var tempoFormatado = minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
            timerElement.textContent = tempoFormatado;
            tempoRestante--;
    
            sortearNumero();
        }, intervalo);
    
        jogoIniciado = true;
    }
    
    
    
    iniciarButton.addEventListener("click", iniciarJogo);
    
    

    function pausarJogo() {
        clearInterval(intervalId);
    }

    function pararJogo() {
        clearInterval(intervalId);
        levelElement.value = "";
        atualizarTempo("");
        reiniciarPontuacao();
        jogoIniciado = false;
    }

    function sortearNumero() {
        var numeroSorteado = Math.floor(Math.random() * 100) + 1;
        numeroElement.textContent = numeroSorteado;
    
        if (numeroSorteado % 2 === 0) {
            numerosParesSorteados++; // Incrementar apenas se for número par
            document.getElementById("numParesSorteados").textContent = numerosParesSorteados;
        } else {
            document.getElementById("numParesSorteados").textContent = numerosParesSorteados;
        }
    }
    
    

    function exibirFimDeJogo(mensagem) {
        alert(mensagem);
        reiniciarPontuacao();
    }

    function clicarNumero() {
        var numeroAtual = parseInt(numeroElement.textContent);
        toggleColor(numeroElement, numeroAtual); // Passando o número atual para a função toggleColor
    
        if (numeroAtual % 2 === 0) {
            numAcertos++;
            numAcertosElement.textContent = numAcertos;
        } else {
            numErros++;
            numErrosElement.textContent = numErros;
        }
    
        calcularPorcentagemAcertos();
    }
    

    function toggleColor(element, numero) {
        element.classList.remove("green", "red"); // Remover as classes de cor específicas
        if (numero % 2 === 0) {
            element.classList.add("green"); // Adicionar classe "green" para números pares
        } else {
            element.classList.add("red"); // Adicionar classe "red" para números ímpares
        }

        setTimeout(function () {
            element.classList.remove("green", "red"); // Remover as classes de cor
            element.classList.add("black"); // Voltar para a cor preta
        }, 300);
    }

    function calcularPorcentagemAcertos() {
        var totalTentativas = numAcertos + numErros;
        var porcentagem = (numAcertos / totalTentativas) * 100 || 0;
        document.getElementById("porcentagemAcertos").textContent = porcentagem.toFixed(2) + "%";
    }

    function reiniciarPontuacao() {
        numAcertos = 0;
        numErros = 0;
        numerosParesSorteados = 0;

        numAcertosElement.textContent = numAcertos;
        numErrosElement.textContent = numErros;
        document.getElementById("numParesSorteados").textContent = numerosParesSorteados;

        var porcentagemAcertos = 0;
        document.getElementById("porcentagemAcertos").textContent = porcentagemAcertos + "%";
    }
});
