import type { Paciente } from "../prisma/generated/prisma/client";
import { patientRepository, PatientRepository } from "../repositories/PatientRepository";

class PatientService{
    constructor(private readonly repository: PatientRepository){}

    async listarPacientes(pagina?: number, limite?: number){
        return await this.repository.listarPacientes(pagina, limite)
    }

    async buscarPorId(id: number){
        const pacienteExiste = await this.repository.buscarPorId(id)
        if(!pacienteExiste) throw new Error(`Nenhum paciente encontrado com o id: ${id}`) 
        return pacienteExiste
    }

    async editarPaciente(dadosPaciente: Paciente){
        const pacienteExiste = this.repository.buscarPorId(Number(dadosPaciente.id))

        if(!pacienteExiste) throw new Error(`Nenhum paciente encontrado com o id: ${dadosPaciente.id}`) 
        return await this.repository.editarPaciente(dadosPaciente)
    }
}

const patientService = new PatientService(patientRepository)