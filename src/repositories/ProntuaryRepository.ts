import type { PrismaClient, Prontuario } from "../prisma/generated/prisma/client"
import { prisma } from "../prisma/prisma"

class ProntuaryRepository {
    constructor(private readonly prisma: PrismaClient){
        this.prisma = prisma
    }

    async listarProntuarios() {
        return await this.prisma.prontuario.findMany()
    }

    async listarPorId(id: number) {
        return await this.prisma.prontuario.findUnique({
            where: {id}
        })
    }

    async criarProntuario(dadosProntuario: Partial<Prontuario>) {
        return await this.prisma.prontuario.create({
            data: {
                medico_responsavel_id: dadosProntuario.medico_responsavel_id || 0,
                paciente_id: dadosProntuario.paciente_id || 0,
                descricao: dadosProntuario.descricao || "",
                data: dadosProntuario.data || ""
            }
        })
    }
}

export const prontuaryRepository = prisma