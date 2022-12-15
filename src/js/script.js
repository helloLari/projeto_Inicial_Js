const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = []

form.addEventListener("submit", (evento) => {
  //O método preventDefault() cancela o evento se for cancelável, significando que a ação padrão que pertence ao evento não ocorrerá.
  evento.preventDefault();

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  //submit chama funcao cria elemento
  criaElemento(nome.value, quantidade.value);

  nome.value = "";
  quantidade.value = "";

});

//função com parametro para retornar dados
function criaElemento(nome, quantidade) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = quantidade;

  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += nome;

  lista.appendChild(novoItem);

  //
  const itemAtual = {
    "nome" : nome,
    "quantidade" : quantidade
  }

  //inserir um elemento no array
  itens.push(itemAtual)

  //localStorage = local para armazenamento de informações
  //json.stringify. stringify = Serve para transformar esse elemento em uma string
  localStorage.setItem("item", JSON.stringify(itens))
}

