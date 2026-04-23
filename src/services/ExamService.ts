import type { Exame } from "../prisma/generated/prisma/client";
import { examRepository, type ExamRepository } from "../repositories/ExamRepository";

export class ExamService{
    constructor(private readonly repository: ExamRepository){}

    async buscarVarios(){
        return await this.repository.buscarVarios()
    }

    async buscarPorId(id: number){
        const existeExame = await this.repository.buscarPorId(id)
        if(existeExame){
            return existeExame
        } else {
            throw new Error("Não foi achado um exame")
        }
    }

    async criar(exame: Exame){
        const dadosExame: Exame = await this.repository.criar({
            data_exame: exame.data_exame,
            descricao: exame.descricao,
            resultado: exame.resultado,
            tipo_exame: exame.tipo_exame,
            valor: exame.valor,
            id: exame.id
        })
        return dadosExame
    }

    async atualizar(dadosExame: Exame){
        const existeExame = await this.repository.buscarPorId(dadosExame.id)

        if(existeExame){
            return this.repository.atualizar(dadosExame)
        } else {
            throw new Error("Não foi possível encontrar o id do exame")
        }
    }

    async deletar(id: number){
        const existeExame = await this.repository.buscarPorId(id)

        if(existeExame){
            return this.repository.deletar(id)
        } else {
            throw new Error("Não foi possível achar o exame para atualizar")
        }
    }
}

export const examService = new ExamService(examRepository)