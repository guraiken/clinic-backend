import express from 'express';
import { prisma } from './prisma/prisma';
import type { Exame, Usuario } from './prisma/generated/prisma/client';

const app = express();
app.use(express.json())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

// Endpoints usuario
app.get('/usuarios', async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
})

app.post("/usuarios", async (req, res) => {
  console.log(req.body)
  const dadosUsuario = req.body as Usuario
  const usuarioCriado = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome || null
    }
  })
  return res.status(201).json(usuarioCriado)
})

app.get("/exames", async (req, res) => {
    const exames = await prisma.exame.findMany()
    res.json(exames)
})

app.post('/exames', async (req, res) => {
        const data = req.body as Exame
        const exameCriado = await prisma.exame.create({
            data: {
                data_exame: new Date(data.data_exame),
                tipo_exame: data.tipo_exame,
                descricao: data.descricao,
                resultado: data.resultado,
                valor: data.valor
            }
        })
        return res.status(201).json(exameCriado)
})

app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})