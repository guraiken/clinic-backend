import { Router } from "express"
import { consultController } from "../controllers/ConsultController"

export const consultRoute = Router()

// Endpoints consultas
consultRoute.get('/consultas', async (req, res) => {
  return consultController.listarConsultas(req, res)
})

consultRoute.get('/consultas/:id', async (req, res) => {
  return consultController.listarPorId(req, res)
})

consultRoute.put("/consultas/:id", async (req, res) => {
  return consultController.editarConsulta(req, res)
})

consultRoute.delete('/consultas/:id', async (req, res) => {
  return consultController.deletarConsulta(req,res)  
})
