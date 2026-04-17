import { Router } from "express";
import { prisma } from "../prisma/prisma";
import type { Usuario } from "../prisma/generated/prisma/client";
import { usuarioController } from "../controllers/usuarioController";

export const usuariosRouter = Router()

// Endpoints usuario
usuariosRouter.get('/usuarios', async (req, res) => {
  return usuarioController.buscarVarios(req, res)
})

usuariosRouter.get('/usuarios/:id', async (req, res) => {
  return usuarioController.buscarId(req, res)
})

usuariosRouter.put("/usuarios/:id", async (req, res) => {
  return usuarioController.atualizar(req, res)
})

usuariosRouter.delete('/usuarios/:id', async (req, res) => {
  return usuarioController.deletar(req,res)  
})
