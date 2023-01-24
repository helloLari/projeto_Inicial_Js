const form = document.getElementById("newItem")
const list = document.getElementById("list")
const registeRedname = JSON.parse(localStorage.getItem("registeRedname")) || []

//forEach() está percorrendo cada element do array itens e chamando a função criaElemento com cada elemento como argumento. 
registeRedname.forEach((element) => {
  createElement(element)
}) 

form.addEventListener("submit", (event) => {
  //O método preventDefault() cancela o event se for cancelável, significando que a ação padrão que pertence ao event não ocorrerá.
  event.preventDefault()

  const name = event.target.elements['name']

  // Verifica se o campo de entrada está vazia. 
  //name.value.trim() removerá qualquer espaço em branco inicial ou final da entrada do usuário e verificará se a string resultante está vazia.
  if (name.value.trim() === "") {
    // Se o campo de entrada estiver em branco, exibe uma mensagem de erro
    alert("Por favor preencha o campo nome!");
    return;
  }

  //Com o método find(), ele procura um element e, com o operador de comparação ===, ele compara se o valor e tipo de dois elements são idênticos.
  const nameAlreadyExists = registeRedname.find(element => element.name === name.value)

  const currentRegisteRedname = {
    "name": name.value,
  }

  if (nameAlreadyExists) {
    currentRegisteRedname.id = nameAlreadyExists.id

    updateElement(currentRegisteRedname)

    registeRedname[registeRedname.findIndex(element => element.id === nameAlreadyExists.id)] = currentRegisteRedname
  } else {
    //se itens existir, pega ID e adiciona 1 para incrementar e atualizar o item do array
    currentRegisteRedname.id = registeRedname[registeRedname.length - 1] ? (registeRedname[registeRedname.length - 1]).id + 1 : 0;

    createElement(currentRegisteRedname)
    //inserir um element no array
    registeRedname.push(currentRegisteRedname)
  }

  localStorage.setItem("registeRedname", JSON.stringify(registeRedname))

  name.value = ""
  
})


function sendRegisteredName(){
  // inicializa as variáveis:  pessoa que recebe o obj do input
  // nomes recebe o conteúdo do input
  namePerson = document.getElementById("registeredName");
  names = namePerson.value;

  // se o input não estiver vazio
  if (names != ''){
      // inclui o item e exibe a lista
      insert_person(names);

      // console.log(fullList);

      localStorage.setItem("namePerson", JSON.stringify(fullList));
      namePerson.value = "";


  } else {
      alert("Digite pelo menos um participante...")
  }


}

//função com parametro para retornar dados, cria um novo element de item de lista e o anexa à lista.  Ele faz isso criando primeiro um novo lielemento e adicionando uma classe de "item" a ele. 
function createElement(item) {
  const newItem = document.createElement("li")
  newItem.classList.add("item")

  const itemNumber = document.createElement("strong")

  //adicionar um atributo personalizado a um elemento HTML. o atributo adicionado é id e o valor do atributo é o valor da propriedade id do objeto item.
  itemNumber.dataset.id = item.id

  //adiciona um elemento itemNumber ao final da lista de elementos filhos de novoItem.
  newItem.appendChild(itemNumber)

  //modifica o conteúdo HTML de novoItem acrescentando o name do item.
  newItem.innerHTML += item.name

  //diciona um botão de exclusão ao final da lista de elementos filhos de novoItem.
  newItem.appendChild(deleteButton(item.id))

  //adiciona novoItem ao final da lista lista.
  list.appendChild(newItem)
}


// atualiza um elemento de item de lista existente com novos dados.  
function updateElement(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML 
}


function deleteButton(id) {
  const buttonElement = document.createElement("button")
  buttonElement.innerText = "X"

  buttonElement.addEventListener("click", function () {

    //O elemento pai do elemento que foi clicado é obtido usando o método parentNode,que retorna o elemento pai do elemento no qual o método é chamado. 
    //o elemento que foi clicado é o próprio botão de exclusão, então o elemento pai do botão é o elemento HTML que contém o botão.
    deletElemento(this.parentNode, id)
  })

  return buttonElement
}

function deletElemento(tag, id) {
  tag.remove()

  registeRedname.splice(registeRedname.findIndex(element => element.id === id), 1)

  //json.stringify. stringify = Serve para transformar esse element em uma string
  localStorage.setItem("registeRedname", JSON.stringify(registeRedname))
}



// função para sortear um nome da array
function raffle(){

  let participants = registeRedname.length;
  if (participants != 0){

    //A expressão Math.random() gera um número aleatório entre 0 (inclusive) e 1 (exclusive). A expressão seguinte multiplica esse número aleatório pelo número de participantes e arredonda o resultado para cima, usando a função Math.ceil. O resultado final é um número inteiro aleatório entre 1 e o número de participantes (inclusive). Esse número pode ser usado como índice de um array de participantes para selecionar o nome sorteado.
  name_drawn = Math.ceil(Math.random() * participants);

  // console.log(nome_drawn);
  // console.log(registeRedname[nome_drawn-1]);

  drawn = document.getElementById("drawn");
  drawn.innerHTML = "O participante sorteado foi:   🎉    " + (registeRedname[name_drawn-1].name);
  // console.log(registeRedname.toString());
  }
}
