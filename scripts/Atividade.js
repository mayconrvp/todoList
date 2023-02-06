export class Atividade{
    nome;
    prioridade;
    data;
    id;
    concluida;
    static idControle = 0;

    constructor(nome, data, prioridade){
        if(this.validaDados()){
            this.concluida = false;
            this.nome = nome;
            this.data = data;
            this.prioridade = prioridade;
            this.id = this.criarId();
            Atividade.idControle++;
        }
    }

    get id(){
        return this.id();
    }
    get nome(){
        return this.nome();
    }
    get data(){
        return this.data();
    }
    get prioridade(){
        return this.prioridade();
    }
    get concluida(){
        return this.concluida();
    }

    set nome(novoNome){
        this.nome = novoNome;
    }
    set data(novaData){
        this.data = novaData;
    }
    set prioridade(novaPrioridade){
        this.prioridade = novaPrioridade;
    }
    set concluida(valorBooleano){
        this.concluida = valorBooleano;
    }


    editarAtividade(nome, data, prioridade){
        this.nome = nome;
        this.data = data;
        this.prioridade = prioridade;
    }

    validaDados(nome, data, prioridade){
        if(nome == '' || data == "" || prioridade == ""){
            return false;
        }
        return true;
    }

    criarId(){
        return Math.floor(Date.now() * Math.random()).toString(36);
    }
}

// module.exports = Atividade