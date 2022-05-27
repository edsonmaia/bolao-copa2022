//console.log(grupos)

//// funcionalidades auxiliares
const tirarAcentos = (texto) => {
    texto = texto.replace(" ", "_")
    texto = texto.replace(" ", "_")
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}
////
// selecionar cards
let cardGrupo = document.querySelector('.cardGrupo')
let cardGrupoClassificado = document.querySelector('.cardGrupoClassificado')
let oitavas = document.querySelectorAll('.oitavas .jogo')

let selecoes = document.querySelectorAll('.nomeSelecao')
let bandeiras = document.querySelectorAll('.bandeiraP')
let outrasSelecoes = ["EUR", "PL1", "PL2", "eur", "pl1", "pl2" ]

const preencherDados = (numeroDoGrupo) => {
   
    document.querySelector('.nomeGrupo').innerHTML = grupos[numeroDoGrupo].grupo

    for(let i = 0; i < selecoes.length; i++) {
        selecoes[i].innerHTML = grupos[numeroDoGrupo].selecoes[i]
    }

    for(let i = 0; i < bandeiras.length; i++) {
        let nome = tirarAcentos(grupos[numeroDoGrupo].selecoes[i].toLowerCase())
        outrasSelecoes.includes(nome) ? nome = 'bandeira_padrao' : ''
        bandeiras[i].src = `./images/bandeiras/${nome}.svg`
    }
}

//console.log(getBanco())
if(getBanco().length == 0) {
    preencherDados(0)
} else {
    ocultarCards()
}

// DRAG AND DROP

// Logica de controle para sabermos quais selecoes foram escolhidas
// as alteracoes sao feitas no drop, dentro do if
// a funcao deve ler o que esta na tela e preencher a situacao atual
let escolhas = {
    grupo: null,
    primeiro: null,
    segundo: null
}
let todasEscolhas = []

const lerEscolhas = () => {
    // selecionar todos itens da area dropavel
    let escolhidos = document.querySelectorAll('.selecaoClassificada')

    // selecionar as areas das posicoes primeiro e segundo
    let primeiro = escolhidos[0].querySelector('.selecoes .nomeSelecao')
    let segundo  = escolhidos[1].querySelector('.selecoes .nomeSelecao')

    // se primeiro nao esta nulo, pegue o que esta dentro e coloque na escolha.primeiro
    primeiro !== null ? escolhas.primeiro = primeiro.innerHTML : escolhas.primeiro = null
    // se segundo nao esta nulo, pegue o que esta dentro e coloque na escolha.segundo
    segundo !== null ? escolhas.segundo = segundo.innerHTML : escolhas.segundo = null
    //console.log(escolhas)

    // verificar se escolheu as duas selecoes classificadas
    verificarSelecoesEscolhidas(primeiro, segundo)

    return escolhas
}

function ocultarCardsJogo() {
    document.querySelector('.cardJogo').classList.toggle('ocultar')
    document.querySelector('.cardVitorioso').classList.toggle('ocultar')
}

function exibirCardsJogo() {
    document.querySelector('.cardJogo').classList.remove('ocultar')
    document.querySelector('.cardVitorioso').classList.remove('ocultar')
}

let classificadosOitavas = []
// Verificar se as duas selecoes foram escolhidas
function verificarSelecoesEscolhidas(primeiro, segundo) {
    if(primeiro !== null && segundo !== null) {
        console.log("Você escolheu os dois classificados!")
        //console.log(escolhas.primeiro, escolhas.segundo)
        escolhas.grupo = document.querySelector('.nomeGrupo').innerHTML

        todasEscolhas.push({
            grupo    : escolhas.grupo,
            primeiro : escolhas.primeiro,
            segundo  : escolhas.segundo
        })
       
        reorganizarCard()
        if(grupoInicial < grupos.length-1) {
            preencherDados(proximoGrupo(grupoInicial))
        } else {
            ocultarCards()
            classificadosOitavas = preencherOitavas(todasEscolhas)
        } // if else
    }
}

// Passar para o proximo grupo
function proximoGrupo(grupoAtual) {
    grupoAtual < grupos.length ? grupoInicial += 1 : ''
    return grupoInicial
}

// reorganizar o cardGrupo
function reorganizarCard() {
    let foramEscolhidos = document.querySelectorAll('.selecaoClassificada .selecoes')
    foramEscolhidos.forEach(selecao => {
        let cardOriginal = document.querySelector('.cardGrupo')
        cardOriginal.appendChild(selecao)
    })
}

function ocultarCards() {
    cardGrupo.classList.toggle('ocultar')
    cardGrupoClassificado.classList.toggle('ocultar')
    document.querySelector('.alert-info').classList.toggle('ocultar')
}

// dados para sabermos quem se classificou para as oitavas de final
let jogosOitavas = []
let grupoInicial = 0

function preencherOitavas(todasEscolhas) {
    console.log(todasEscolhas)
    let [ a, b, c, d, e, f, g, h ] = todasEscolhas
    let { primeiro:a1, segundo:a2 } = a
    let { primeiro:b1, segundo:b2 } = b
    let { primeiro:c1, segundo:c2 } = c
    let { primeiro:d1, segundo:d2 } = d
    let { primeiro:e1, segundo:e2 } = e
    let { primeiro:f1, segundo:f2 } = f
    let { primeiro:g1, segundo:g2 } = g
    let { primeiro:h1, segundo:h2 } = h

    jogosOitavas = [
        {
            rodada: 'oitavas 1',
            mandante: a1,
            visitante: b2
        },
        {
            rodada: 'oitavas 2',
            mandante: c1,
            visitante: d2
        },
        {
            rodada: 'oitavas 3',
            mandante: e1,
            visitante: f2
        },
        {
            rodada: 'oitavas 4',
            mandante: g1,
            visitante: h2
        },
        {
            rodada: 'oitavas 5',
            mandante: b1,
            visitante: a2
        },
        {
            rodada: 'oitavas 6',
            mandante: d1,
            visitante: c2
        },
        {
            rodada: 'oitavas 7',
            mandante: f1,
            visitante: e2
        },
        {
            rodada: 'oitavas 8',
            mandante: h1,
            visitante: g2
        }
    ]

    inserirNoBanco(jogosOitavas)
    // exibir cards finais e preencher os cards
    if(lerBanco().length == 8) {
        console.log('Pode exibir os cards finais')
        exibirCardsJogo()
        preencherCardOitava(0)
    }
    return jogosOitavas

}

function ocultarFaseFinal() {
    if(lerBanco().length == 0) {
        document.querySelector('.cardJogo').classList.add('ocultar')
        document.querySelector('.cardVitorioso').classList.add('ocultar')
    }
}

ocultarFaseFinal()

////////////////////////////////////////////////////////
// O QUE FAZER APOS OS CLASSIFICADOS PARA AS OITAVAS //
////////////////////////////////////////////////////////

let numeroDoGrupo = 0

function preencherCardOitava(numeroDoJogo) {
    console.log('Preencher card das Oitavas')
    let mandante  = document.querySelector('#mandante')
    let visitante = document.querySelector('#visitante')
    //console.log(lerBanco())
    if(lerBanco().length > 0) {
        let numeroJogo = document.querySelector('.numero')
        numeroJogo.innerHTML = numeroDoGrupo+1
    
        mandante.innerHTML  = lerBanco()[numeroDoJogo].mandante
        visitante.innerHTML = lerBanco()[numeroDoJogo].visitante
    }
}

// preencherCardOitava(numeroDoGrupo) // REVISAR AQUI

let vitoriososOitavas = []

let escolhasOitavas = {
    jogo: null,
    vitorioso: null
}

const lerEscolhasOitavas = () => {
    let escolhido = document.querySelector('.cardVitorioso .selecaoClassificada')
    //console.log(escolhido)
    let vitorioso = escolhido.querySelector('.selecoes')
    //console.log(vitorioso.innerHTML)

    let numeroDoJogo = document.querySelector('.numero')
    //console.log(numeroDoJogo.innerHTML)

    if(vitorioso !== null) {
        // se primeiro nao esta nulo, pegue o que esta dentro e coloque na escolha.primeiro
        escolhido !== null ? escolhasOitavas.jogo = numeroDoJogo.innerHTML : escolhasOitavas.jogo = null
        escolhido !== null ? escolhasOitavas.vitorioso = vitorioso.innerHTML : escolhasOitavas.vitorioso = null
        //console.log(escolhasOitavas)
        // verificar se escolheu
        verificarEscolhasOitavas(escolhido)
    }

    return escolhasOitavas
}

// preencher dados das oitavas
const preencherDadosOitavas = (numeroDoJogo) => {
    if(numeroDoJogo <= 7) {
        let selecoes = document.querySelectorAll('.cardJogo .selecoes')

        let numero = (lerBanco()[numeroDoJogo].rodada).split(" ")
        //console.log(numero[1])
        document.querySelector('.numero').innerHTML = numero[1]

        selecoes[0].innerHTML = lerBanco()[numeroDoJogo].mandante
        selecoes[1].innerHTML = lerBanco()[numeroDoJogo].visitante
    } else {
        console.log('Impossível preencher dados das oitavas')
    }
}

// reorganizar o cardGrupo
function reorganizarCardsFinais() {
    let selecao = document.querySelector('.selecaoClassificada .selecoes')
    let cardOriginal = document.querySelector('.jogo')
    cardOriginal.appendChild(selecao)
    document.querySelector('.selecaoClassificada').innerHTML = ''
}

let classificadosQuartas = []
let numeroDoJogo = 0 // zerar o grupo
// // passar para proximo jogo das etapas finais
function verificarEscolhasOitavas(primeiro) {
    if(primeiro !== null) {
        console.log("Você escolheu o vitorioso!")
        console.log(escolhasOitavas.jogo, escolhasOitavas.vitorioso)
        escolhasOitavas.numeroDoJogo = document.querySelector('.nomeGrupo').innerHTML

        vitoriososOitavas.push({
            jogo      : escolhasOitavas.jogo,
            vitorioso : escolhasOitavas.vitorioso,
        })
       
        reorganizarCardsFinais()
        console.log(numeroDoJogo)
        if(numeroDoJogo < 7) {
            preencherDadosOitavas(numeroDoJogo = numeroDoJogo+1)
        } else {
            console.log('Chegou ao fim das oitavas')
            // limpar os dados existentes nos cards ou exibir os novos dados
            classificadosQuartas = preencherQuartas(vitoriososOitavas)
            document.querySelector('.fase').innerHTML = 'Quartas'
            let selecoes = document.querySelectorAll('.cardJogo .selecoes')
            selecoes[0].innerHTML = '?'
            selecoes[1].innerHTML = '?'
            //preencherDadosQuartas(8)
        } // if else
    }
}   

function preencherQuartas(vitoriososOitavas) {
    console.log(vitoriososOitavas)

    jogosQuartas = [
        {
            rodada: 'quartas 1',
            mandante: vitoriososOitavas[0].vitorioso,
            visitante: vitoriososOitavas[1].vitorioso
        },
        {
            rodada: 'quartas 2',
            mandante: vitoriososOitavas[2].vitorioso,
            visitante: vitoriososOitavas[3].vitorioso
        },
        {
            rodada: 'quartas 3',
            mandante: vitoriososOitavas[4].vitorioso,
            visitante: vitoriososOitavas[5].vitorioso
        },
        {
            rodada: 'quartas 4',
            mandante: vitoriososOitavas[6].vitorioso,
            visitante: vitoriososOitavas[7].vitorioso
        }
    ]

    inserirNoBanco(jogosQuartas)
    return jogosQuartas

}

const preencherDadosQuartas = (numeroDoJogo) => {
    console.log(numeroDoJogo)
    if(numeroDoJogo > 7) {
        let fase = document.querySelector('.fase')
        // let selecoes = document.querySelectorAll('.cardJogo .selecoes')
        // let numero = (lerBanco()[numeroDoJogo].rodada).split(" ")
        // //console.log(numero[1])
        // document.querySelector('.numero').innerHTML = numero[1]
        // fase.innerHTML = numero[0]

        // selecoes[0].innerHTML = lerBanco()[numeroDoJogo].mandante
        // selecoes[1].innerHTML = lerBanco()[numeroDoJogo].visitante
    } else {
        console.log('Impossível preencher dados das quartas')
    }
}
