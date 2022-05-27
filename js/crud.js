//// CRUD ////

// armazenar em constante array function que retorna os valores da chave 'bolao'
// ?? nullish coalescing operator
// retorna o operando da direita quando o operando da esquerda eh null ou undefined
// caso contrario ele retorna o valor da esquerda
const getBanco = () => JSON.parse(localStorage.getItem('bolao')) ?? []

// armazenar em constante array function que define um valor da chave 'jogos' do nosso 'bolao'
const setBanco = (banco) => localStorage.setItem('bolao', JSON.stringify(banco))

// CREATE
const inserirNoBanco = (jogos) => {
    // pegue o banco
    const banco = getBanco()
    jogos.forEach((jogo) => {
        banco.push(jogo) // faca um push (adicione) no banco
    })
    // coloque a chave/valor no banco
    setBanco(banco)
}

// READ
const lerBanco = () => {
    return getBanco()
}

const lerPorId = (indice) => {
    return getBanco()[indice]
}

// UPDATE
const atualizarNoBanco = (indice, jogo) => {
    const banco = getBanco()
    let { rodada, mandante, visitante } = jogo
    banco[indice] = {
        rodada,
        mandante,
        visitante
    }
    setBanco(banco)
    return banco[indice] // so para testar
}

// DELETE
const apagarDoBanco = (indice) => {
    const banco = getBanco()
    // faca um splice (corte) no seu (banco que eh um array) do indice, so uma posicao
    banco.splice (indice, 1)
    // set do splice no seu banco, permitir a persistencia dos dados
    setBanco(banco)
}
//// CRUD ////
