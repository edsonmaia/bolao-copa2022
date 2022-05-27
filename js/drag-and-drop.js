/////// DRAG AND DROP ///////

// selecionar os elementos que podem ser arrastados
document.querySelectorAll('.selecoes').forEach(selecao => {
    selecao.addEventListener('dragstart', dragStart)  // comecou a arrastar
    selecao.addEventListener('dragend', dragEnd)      // soltou o mouse
})

// selecionar todas as areas que vao receber as selecoes
document.querySelectorAll('.selecaoClassificada').forEach(area => {
    area.addEventListener('dragover', dragOver)   // item passar por cima da area
    area.addEventListener('dragleave', dragLeave) // item saindo de area de destino
    area.addEventListener('drop', drop)           // soltar
})

// chamar as funcoes correspondentes a cada metodo dragover, dragleave e drop
// a area inicial é do .cardGrupo, nele esta a lista de selecoes
document.querySelector('.cardGrupo').addEventListener('dragover', dragOverNeutral)
document.querySelector('.cardGrupo').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.cardGrupo').addEventListener('drop', dropNeutral)

// Funcoes para saber qual selecao esta sendo arrastada
// quando comecar a arrastar
function dragStart(e) {
    e.currentTarget.classList.add('dragging') // adicionar classe
}
// quando terminar de arrastar
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging') // remover classe
}

// Funcoes relativas a selecao que esta sendo arrastada e area de destino
// item passando por cima de area de destino (area dropavel)
// classe hover muda a cor de fundo
function dragOver(e) {
    // se a area de destino estiver vazia podemos soltar o item na area
    // so previnir e adicionar classe se a area estiver vazia
    if(e.currentTarget.querySelector('.selecoes') === null) {
        e.preventDefault()
        e.currentTarget.classList.add('hover') // adicionar classe
    }
}

// item saindo de area de destino (area dropavel)
// retirar a classe hover para tirar a marcacao do fundo
function dragLeave(e) {
    e.currentTarget.classList.remove('hover') // remover classe
}

// soltar o item na area de destino (area dropavel)
// so funciona se liberar "e.preventDefault()" na funcao over
// o comportamento padrao e negar, o preventDefault permite soltar
function drop(e) {
    e.currentTarget.classList.remove('hover')

    // se a area de destino estiver vazia podemos soltar o item na area
    if(e.currentTarget.querySelector('.selecoes') === null) {
        // selecionar item que estamos arrastando
        let dragItem = document.querySelector('.selecoes.dragging')
        // colocar o item dentro do destino
        // como foi selecionado ele move do lugar que esta para o destino
        // nao é o mesmo que clonar, ele esta colocando o elemento no final
        // ele arrasta o item com todos os eventos
        e.currentTarget.appendChild(dragItem)
        lerEscolhas()
        lerEscolhasOitavas()
        // fazer leituras de quartas, semi finais, terceiro e final
    }
}

// Funcoes relativas a area neutra, ou seja, area original onde estao as selecoes
// controlar a area inicial, onde estavam as selecoes no inicio
// precisamos transforma-la em uma zona de drop
function dragOverNeutral(e) {
    e.preventDefault()
    e.currentTarget.classList.add('hover')
}
function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover')
}
function dropNeutral(e) {
    // nao precisamos fazer a verificacao com o if pq podemos receber
    // itens na area mesmo que ja tenha
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.selecoes.dragging')
    e.currentTarget.appendChild(dragItem)
    //lerEscolhas()
}

// /DRAG AND DROP
