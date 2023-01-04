
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []


itens.forEach((elemento) => {
  criaElemento(elemento)
}) 

form.addEventListener("submit", (evento) => {
  //O método preventDefault() cancela o evento se for cancelável, significando que a ação padrão que pertence ao evento não ocorrerá.
  evento.preventDefault()

  const nome = evento.target.elements['nome']
  // const quantidade = evento.target.elements['quantidade']

  //Com o método find(), ele procura um elemento e, com o operador de comparação ===, ele compara se o valor e tipo de dois elementos são idênticos.
  const existe = itens.find(elemento => elemento.nome === nome.value)

  const itemAtual = {
    "nome": nome.value,
  }

  if (existe) {
    itemAtual.id = existe.id

    atualizaElemento(itemAtual)

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
  } else {
    //se itens existir, pega ID e adiciona 1 para incrementar e atualizar o item do array
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

    criaElemento(itemAtual)
    //inserir um elemento no array
    itens.push(itemAtual)
  }

  localStorage.setItem("itens", JSON.stringify(itens))

  nome.value = ""
  
})

//função com parametro para retornar dados
function criaElemento(item) {
  const novoItem = document.createElement("li")
  novoItem.classList.add("item")

  const numeroItem = document.createElement("strong")
  numeroItem.dataset.id = item.id
  novoItem.appendChild(numeroItem)

  novoItem.innerHTML += item.nome

  novoItem.appendChild(botaoDeleta(item.id))

  lista.appendChild(novoItem)
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML 
}


function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")
  elementoBotao.innerText = "X"

  elementoBotao.addEventListener("click", function () {
    //o botão é filho do "li", então ele remove o elemento inteiro
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id) {
  tag.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
  //json.stringify. stringify = Serve para transformar esse elemento em uma string
  localStorage.setItem("itens", JSON.stringify(itens))
}



// função para sortear um nome da array

function sortear(){

  let participantes = itens.length;
  if (participantes != 0){

  numero_sorteado = Math.ceil(Math.random() * participantes);

  // console.log(numero_sorteado);
  // console.log(itens[numero_sorteado-1]);

  nomeSorteado = document.getElementById("sorteado");
  nomeSorteado.innerHTML = "O participante sorteado foi:   🎉    " + (itens[numero_sorteado-1].nome);
  // console.log(itens.toString());
  }
}
