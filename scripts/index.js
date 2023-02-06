import { Atividade } from "./Atividade.js";
import { Lista } from "./Lista.js";

let lista = new Lista();
if (lista.baixarLista().length > 0) {
    renderizarItems();
}

let divForm = document.querySelector('.form');

let btn = document.getElementById('btnSubmit');
btn.addEventListener("click", function (event) {
    event.preventDefault()
    if (btn.id == "btnSubmit") {
        const nome = document.getElementById('nomeInput').value
        const data = document.getElementById('dataInput').value
        const categoria = document.getElementById('categoriaSelect').value
        if (validaDados(nome, data, categoria)) {
            const novaAtividade = new Atividade(nome, data, categoria);
            lista.addAtividade(novaAtividade)
            criarModal(novaAtividade)
            limparForm()
        } else {
            alert("Há dados que não foram informados. Por favor, preencha todos os campos")
        }
        console.log(lista)
    }
})


function validaDados(nome, data, prioridade) {
    if (nome == "" || data == "" || prioridade == "") {
        return false;
    }
    return true;
}

function criarModal(atividade) {
    console.log(atividade)
   
    let divIntern = document.createElement("div");
    divIntern.id = `item-${atividade.id}`
    divIntern.classList.add("p-3");
    divIntern.classList.add("mt-3");
    divIntern.classList.add("note");

    const inputCheckbox = document.createElement('input');
    inputCheckbox.id = `${atividade.id}`;
    inputCheckbox.type = 'checkbox';
    inputCheckbox.classList.add('checkbox');
    inputCheckbox.addEventListener('change', function (e) {
        let atividade = lista.getAtividade(this.id);
        if (e.currentTarget.checked && atividade) {
            atividade.concluida = true;
            lista.salvarLista();
            divIntern.classList.add('concluida');
            botaoEditar.setAttribute('disabled', true);
        } else {
            atividade.concluida = false;
            lista.salvarLista();
            botaoEditar.removeAttribute('disabled');
            divIntern.classList.remove('concluida');
        }
    });
    divIntern.appendChild(inputCheckbox)

    const paragTitulo = document.createElement('p');
    paragTitulo.innerText = `Atividade: ${atividade.nome}`;
    divIntern.appendChild(paragTitulo)

    const paragPrioridade = document.createElement('p');
    paragPrioridade.innerText = `Prioridade: ${atividade.prioridade}`;
    divIntern.appendChild(paragPrioridade)

    const paragData = document.createElement('p');
    paragData.innerText = `Data:  ${getDataFormatada(atividade.data)}`;
    divIntern.appendChild(paragData)

    const botaoEditar = document.createElement('button');
    botaoEditar.innerText = 'Editar';
    botaoEditar.classList.add("btn");
    botaoEditar.classList.add("btn-sm");
    botaoEditar.classList.add("btn-outline-dark");
    botaoEditar.addEventListener('click', function (e) {
        editarItemLista(atividade.id);
        divForm.classList.add("destak");
    });
    divIntern.appendChild(botaoEditar)

    const espaco = document.createElement('span');
    espaco.innerText = ` `;
    divIntern.appendChild(espaco)

    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.classList.add("btn");
    botaoExcluir.classList.add("btn-sm");
    botaoExcluir.classList.add("btn-outline-dark");
    botaoExcluir.addEventListener('click', function (e) {
        excluirItemLista(atividade.id);
    });

    divIntern.appendChild(botaoExcluir)
    if(atividade.concluida){
        divIntern.classList.add('concluida');
        inputCheckbox.checked = true
        botaoEditar.setAttribute('disabled', true);
    }
    document.getElementById("notes").appendChild(divIntern);
}

let cbx = document.querySelector('.checkbox')

function renderizarItems() {
    lista.getListaDeAtividades().map(atividade => criarModal(atividade));
}

function getDataFormatada(data) {
    return data.split("-").reverse().join("/");;

}

function excluirItemLista(id) {
    console.log("Excluindo")
    let arrAtividades = lista.getListaDeAtividades().filter(atividade => atividade.id == id)
    lista.setListaDeAtividades(arrAtividades)
    let listaString = JSON.stringify(lista.getListaDeAtividades());
    localStorage.setItem('atividades', listaString);
    const itemARemover = document.querySelector(`#item-${id}`);
    itemARemover.remove();
}

function editarItemLista(id) {
    console.log("Editando")
    let atividade = lista.getAtividade(id);
    document.getElementById('nomeInput').value = atividade.nome;
    document.getElementById('dataInput').value = atividade.data;
    document.getElementById('categoriaSelect').value = atividade.prioridade;
    btn.textContent = "Salvar";
    btn.id = "btnSalvar";
    btn.addEventListener('click', function () {
        let atividade = lista.getAtividade(id);
        if (atividade) {
            const nome = document.getElementById('nomeInput').value
            const data = document.getElementById('dataInput').value
            const categoria = document.getElementById('categoriaSelect').value
            if (validaDados(nome, data, categoria)) {
                atividade.nome = nome
                atividade.data = data;
                atividade.prioridade = categoria;
                let listaString = JSON.stringify(lista.getListaDeAtividades());
                localStorage.setItem('atividades', listaString);
                document.location.reload(true);
            }
        } else {
            alert("Falha ao salvar")
        }
    })
    // divForm.classList.remove("destak");
}

function limparForm(){
    document.getElementById('nomeInput').value = ''
    document.getElementById('dataInput').value = ''
    document.getElementById('categoriaSelect').value = ''
}
