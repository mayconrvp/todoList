export class Lista{
    #lista = this.baixarLista()

    addAtividade(atividade){
        this.#lista.push(atividade);
        localStorage.setItem("atividades", JSON.stringify(this.getListaDeAtividades()));
        
    }

    getAtividade(id){
        return this.#lista.find(el => el.id == id);
    }

    getListaDeAtividades(){
        return this.#lista;
    }

    setListaDeAtividades(lista){
        this.#lista = lista;
    }

    getDataFormatada(data){
        return data.split("-").reverse().join("/");;
    }

    baixarLista(){
        let listaString = localStorage.getItem('atividades');
        return JSON.parse(listaString) || [];
    }

    salvarLista() {
        let listaString = JSON.stringify(this.getListaDeAtividades());
        localStorage.setItem('atividades', listaString);
    }

}
