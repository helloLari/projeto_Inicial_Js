
const form = document.getElementById("newItem")
const list = document.getElementById("list")
const registeRedname = JSON.parse(localStorage.getItem("registeRedname")) || []

//forEach() está percorrendo cada elemento do array itens e chamando a função criaElemento com cada elemento como argumento. 
registeRedname.forEach((elemento) => {
  createElement(elemento)
}) 

form.addEventListener("submit", (evento) => {
  //O método preventDefault() cancela o evento se for cancelável, significando que a ação padrão que pertence ao evento não ocorrerá.
  evento.preventDefault()

  const nome = evento.target.elements['nome']

  // Verifica se o campo de entrada está vazia. 
  //nome.value.trim() removerá qualquer espaço em branco inicial ou final da entrada do usuário e verificará se a string resultante está vazia.
  if (nome.value.trim() === "") {
    // Se o campo de entrada estiver em branco, exibe uma mensagem de erro
    alert("Por favor preencha o campo nome!");
    return;
  }

  //Com o método find(), ele procura um elemento e, com o operador de comparação ===, ele compara se o valor e tipo de dois elementos são idênticos.
  const nameAlreadyExists = registeRedname.find(elemento => elemento.nome === nome.value)

  const currentRegisteRedname = {
    "nome": nome.value,
  }

  if (nameAlreadyExists) {
    currentRegisteRedname.id = nameAlreadyExists.id

    atualizaElemento(currentRegisteRedname)

    registeRedname[registeRedname.findIndex(elemento => elemento.id === nameAlreadyExists.id)] = currentRegisteRedname
  } else {
    //se itens existir, pega ID e adiciona 1 para incrementar e atualizar o item do array
    currentRegisteRedname.id = registeRedname[registeRedname.length - 1] ? (registeRedname[registeRedname.length - 1]).id + 1 : 0;

    createElement(currentRegisteRedname)
    //inserir um elemento no array
    registeRedname.push(currentRegisteRedname)
  }

  localStorage.setItem("registeRedname", JSON.stringify(registeRedname))

  nome.value = ""
  
})


function enviarPessoa(){
  // inicializa as variáveis:  pessoa que recebe o obj do input
  //
  // nomes recebe o conteúdo do input
  pessoa = document.getElementById("pessoaCadastrada");
  nomes = pessoa.value;

  // se o input não estiver vazio
  if (nomes != ''){
      // inclui o item e exibe a lista
      insere_pessoa(nomes);

      console.log(listaCompleta);


      localStorage.setItem("pessoas", JSON.stringify(listaCompleta));
      pessoa.value = "";


  } else {
      alert("Digite pelo menos um participante...")

  }


}

//função com parametro para retornar dados, cria um novo elemento de item de lista e o anexa à lista.  Ele faz isso criando primeiro um novo lielemento e adicionando uma classe de "item" a ele. 
function createElement(item) {
  const newItem = document.createElement("li")
  newItem.classList.add("item")

  const numeroItem = document.createElement("strong")

  //adicionar um atributo personalizado a um elemento HTML. o atributo adicionado é id e o valor do atributo é o valor da propriedade id do objeto item.
  numeroItem.dataset.id = item.id

  //adiciona um elemento numeroItem ao final da lista de elementos filhos de novoItem.
  newItem.appendChild(numeroItem)

  //modifica o conteúdo HTML de novoItem acrescentando o nome do item.
  newItem.innerHTML += item.nome

  //diciona um botão de exclusão ao final da lista de elementos filhos de novoItem.
  newItem.appendChild(botaoDeleta(item.id))

  //adiciona novoItem ao final da lista lista.
  list.appendChild(newItem)
}


// atualiza um elemento de item de lista existente com novos dados.  
function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML 
}


function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")
  elementoBotao.innerText = "X"

  elementoBotao.addEventListener("click", function () {

    //O elemento pai do elemento que foi clicado é obtido usando o método parentNode,que retorna o elemento pai do elemento no qual o método é chamado. 
    //o elemento que foi clicado é o próprio botão de exclusão, então o elemento pai do botão é o elemento HTML que contém o botão.
    deletElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletElemento(tag, id) {
  tag.remove()

  registeRedname.splice(registeRedname.findIndex(elemento => elemento.id === id), 1)

  //json.stringify. stringify = Serve para transformar esse elemento em uma string
  localStorage.setItem("registeRedname", JSON.stringify(registeRedname))
}



// função para sortear um nome da array
function sortear(){

  let participantes = registeRedname.length;
  if (participantes != 0){

    //A expressão Math.random() gera um número aleatório entre 0 (inclusive) e 1 (exclusive). A expressão seguinte multiplica esse número aleatório pelo número de participantes e arredonda o resultado para cima, usando a função Math.ceil. O resultado final é um número inteiro aleatório entre 1 e o número de participantes (inclusive). Esse número pode ser usado como índice de um array de participantes para selecionar o nome sorteado.
  nome_sorteado = Math.ceil(Math.random() * participantes);

  // console.log(nome_sorteado);
  // console.log(registeRedname[nome_sorteado-1]);

  sorteado = document.getElementById("sorteado");
  sorteado.innerHTML = "O participante sorteado foi:   🎉    " + (registeRedname[nome_sorteado-1].nome);
  // console.log(registeRedname.toString());
  }
}
