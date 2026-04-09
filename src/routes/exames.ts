import { Router } from "express";
import { prisma } from "../prisma/prisma";
import type { Exame } from "../prisma/generated/prisma/client";

export const examesRouter = Router()

//Exames
examesRouter.get('/exames', async (_, res) => {
  const exames = await prisma.exame.findMany();
  return res.json(exames);
})

examesRouter.get('/exames/:id', async (req, res) => {
  const idExame = Number(req.params.id)
  const exame = await prisma.exame.findUnique({
    where: {
      id: idExame
    }
  })

  return res.status(200).json(exame);
})

examesRouter.post("/exames", async (req, res) => {
  const dadosExame = req.body as Exame
  const exameCriado = await prisma.exame.create({
    data: {
      tipo_exame: dadosExame.tipo_exame,
      valor: dadosExame.valor,
      descricao: dadosExame.descricao,
      data_exame: new Date(dadosExame.data_exame),
      resultado: dadosExame.resultado
    }
  })
  return res.status(201).json(exameCriado)
})

examesRouter.put("/exames/:id", async (req, res) => {
  const idExame = Number(req.params.id)
  const dadosParaAtualizar = req.body as Omit<Exame, 'id'>

  const exameAtualizado = await prisma.exame.update({
    data: {
      ...dadosParaAtualizar,
      data_exame: new Date(dadosParaAtualizar.data_exame)
    },
    where: {
      id: idExame
    }
  })

  return res.status(200).json(exameAtualizado);
})

examesRouter.delete('/exames/:id', async (req, res) => {
  const idExame = Number(req.params.id)
  const exameDeletado = await prisma.exame.delete({
    where: {
      id: idExame
    }
  })

  return res.status(200).json({
    mensagem: "Exame deletado com sucesso!",
    data: exameDeletado
  });
})