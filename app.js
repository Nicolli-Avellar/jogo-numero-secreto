let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//função com parâmetro e sem retorno
function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTexto(`h1`, 'Jogo do número secreto');
    exibirTexto(`p`, 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

//função sem parâmetro e sem retorno
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTexto(`h1`, `Acertou!`);
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        document.getElementById('reiniciar').removeAttribute('disabled');


        exibirTexto(`p`, mensagemTentativas)
    } else {
        if (chute > numeroSecreto){
            exibirTexto(`p`, `O número é menor`);
        } else {
            exibirTexto(`p`, `O número é maior`);
        }
        tentativas++;
        limparCampo();
    }
}
//função com retorno e sem parâmetro
function gerarNumeroAleatorio (){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;

    if(quantidadeElementosLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio(); //recursão -> função chamando outra função
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

