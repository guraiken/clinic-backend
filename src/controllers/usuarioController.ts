import type { Request, Response } from "express";
import { usuarioService, type UsuarioService } from "../services/UsuarioService";

class UsuarioController{
    constructor(private readonly service: UsuarioService){
    }

    async buscarVarios( req: Request, res: Response){
        try {
            const usuarios = await this.service.buscarVarios()
            return res.status(200).json({
                message: "Usuários encontrados com sucesso",
                data: usuarios
            })
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async buscarId(req: Request, res: Response){
        try {
            const idUsuario = Number(req.params.id)
            const usuario = await this.service.buscarPorId(idUsuario)
            res.status(200).json({
                message: "Usuário encontrado!",
                data: usuario
            })
        } catch (error) {
            console.log(error)
            res.status(404).json(error)
        }
    }

    async atualizar(req: Request, res: Response){
        try {
            const dadosNovos = req.body
            const atualizarDados = await this.service.atualizar(dadosNovos)
            res.status(200).json({
                message: "Usuário atualizado com sucesso!",
                data: {dadosEnviados: dadosNovos, atualizacao: atualizarDados}
            })
        } catch (error) {
            console.log(error)
            res.status(404).json(error)
        }
    }
    async deletar(req: Request, res:Response){
        try {
            const idUsuario = Number(req.params.id)
            const usuarioDeletado = await this.service.deletar(idUsuario)
            res.status(200).json({
                message: "Usuário foi deletado com sucesso",
                data: {idDeletado: idUsuario, usuarioDeletado: usuarioDeletado}
            })
        } catch (error) {
            console.log(error)
            res.status(404).json(error)
        }
    }
}

export const usuarioController = new UsuarioController(usuarioService)