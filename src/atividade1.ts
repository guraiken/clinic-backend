import { log } from "node:console";

class Produto {
    nome: string;
    preco: number;

    constructor(nome: string, preco: number){
        this.nome = nome
        this.preco = preco
    }
}

class Categoria{
    nome: string;
    desconto: number;

    constructor(nome: string, desconto: number){
        this.nome = nome
        this.desconto = desconto
    }

    calcularDesconto(produto: Produto): number{
        const precoComDesconto = (produto.preco * this.desconto) / 100
        return precoComDesconto
    }
}

const camiseta = new Produto("Camiseta", 50)
const verao = new Categoria("Verão", 50)

log(verao.calcularDesconto(camiseta))

abstract class Funcionario {
    nome: string
    salario: number

    constructor(nome: string, salario: number){
        this.nome = nome
        this.salario = salario
    }
    calcularSalario(){
        return this.salario
    }
}

class Programador extends Funcionario {
    
    constructor(nome: string, salario: number){
        super(nome, salario)
    }
    calcularSalario() {
        return this.salario * 1.25
    }
}

class Designer extends Funcionario {
    
    constructor(nome: string, salario: number){
        super(nome, salario)
    }
    calcularSalario(){
        return this.salario * 1.30
    }
}

const programador = new Programador("Gustavo Programador", 900) 
const designer = new Designer("Gustavo Designer", 900) 

class Funcionarios {
    funcionarios: Funcionario[]
    constructor(){
        this.funcionarios = []

    }

    contratar(funcionario:Funcionario){
        this.funcionarios.push(funcionario)
    }
    visualizarFuncionarios(){
        this.funcionarios.map((funcionario)=> {
            console.log(`${funcionario.nome} e ganha R$${funcionario.calcularSalario()}`)
        })
    }
}

const funcionarios = new Funcionarios() 

funcionarios.contratar(programador)
funcionarios.contratar(designer)
funcionarios.visualizarFuncionarios()

