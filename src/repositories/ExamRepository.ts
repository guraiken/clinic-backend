import type { Exame, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ExamRepository{
    constructor(private readonly prisma: PrismaClient) {
        prisma = this.prisma
    }      

    async buscarVarios(){
        return await this.prisma.exame.findMany()
    }

    async buscarPorId(id: number){
        return await this.prisma.exame.findUnique({
            where: {id}
        })
    }

    async criar(dadosExame: Exame){
        return await this.prisma.exame.create({
            data: {
                data_exame: new Date(dadosExame.data_exame) || "",
                descricao: dadosExame.descricao || "",
                tipo_exame: dadosExame.tipo_exame || "",
                valor: dadosExame.valor || 0,
                resultado: dadosExame.resultado || ""
            }
        })
    }

    async atualizar(dadosExame: Exame){
        return await this.prisma.exame.update({
            data : {
                ...dadosExame
            },
            where: {id: dadosExame.id}
        })
    }

    async deletar(id: number){
        return await this.prisma.exame.delete({
            where: {id}
        })
    }
}

export const examRepository = new ExamRepository(prisma)