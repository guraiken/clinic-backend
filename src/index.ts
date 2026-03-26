import express from 'express';
import { prisma } from './prisma/prisma';
import type { Exame, Usuario, TypeToken } from './prisma/generated/prisma/client';
import { createHash } from './utils/createHash';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "./env"
import { signTokenAcesso, signTokenRefresh } from './utils/jwt';
import { log } from 'console';
import { auth } from './middleware/auth';

const app = express();
app.use(express.json())
const port = 3000;

app.post("/login", async (req, res) => {
  const dadosUsuario = req.body as Partial<Usuario>
  const usuarioProcurado = await prisma.usuario.findUnique({
    where: {
      email: dadosUsuario.email || "" 
    }
  })

  if(usuarioProcurado){
    const validate = await bcrypt.compare(dadosUsuario.senha || "", usuarioProcurado?.senha || "")
    if(validate) {
      const tokenAcesso = signTokenAcesso({
        email: usuarioProcurado.email,
        nome: usuarioProcurado.nome
      })
      const tokenRefresh = signTokenRefresh({
        email: usuarioProcurado.email,
        nome: usuarioProcurado.nome
      })

      

      const accessExpires = new Date()
      const accessExpiresUpdate = accessExpires.setHours(accessExpires.getHours() + 1)

      //token acesso
      await prisma.token.create({
        data: {
          token: tokenAcesso,
          expiresAt: new Date(accessExpiresUpdate),
          type: "ACCESS",
          usuarioId: usuarioProcurado.id
        }
      })

      const refreshExpires = new Date()
      const refreshExpiresUpdate = refreshExpires.setMonth(accessExpires.getMonth() + 1)

      //token refresh
      await prisma.token.create({
        data: {
          token: tokenRefresh,
          expiresAt: new Date(refreshExpiresUpdate),
          type: "REFRESH",
          usuarioId: usuarioProcurado.id
        }
      })

      return res.status(200).json({
        message: "Usuário validado com sucesso",
        accessToken: tokenAcesso,
        refreshToken: tokenRefresh
      })

    } else {
      return res.status(422).json("Erro nas credenciais do JSON")
    }
  }
})

app.post("/cadastro", async (req, res) => {
  const dadosUsuario = req.body as Usuario
  const hash = await createHash(dadosUsuario.senha);
  const result = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome || null,
      senha: hash,
    }
  })
  return res.status(201).json({
    data: result,
    message: "Usuário cadastrado com sucesso"
  })
})

app.use(auth)

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

// Endpoints usuario
app.get('/usuarios', async (_, res) => {
  const usuarios = await prisma.usuario.findMany();
  return res.json(usuarios);
})

app.get('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuario);
})

app.put("/usuarios/:id", async (req, res) => {
  const idUsuario = Number(req.params.id)
  const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>

  const usuarioAtualizado = await prisma.usuario.update({
    data: {
      ...dadosParaAtualizar
    },
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuarioAtualizado);
})

app.delete('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuarioDeletado = await prisma.usuario.delete({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json({
    mensagem: "Usuário deletado com sucesso!",
    data: usuarioDeletado
  });
})

//Exames
app.get('/exames', async (_, res) => {
  const exames = await prisma.exame.findMany();
  return res.json(exames);
})

app.get('/exames/:id', async (req, res) => {
  const idExame = Number(req.params.id)
  const exame = await prisma.exame.findUnique({
    where: {
      id: idExame
    }
  })

  return res.status(200).json(exame);
})

app.post("/exames", async (req, res) => {
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

app.put("/exames/:id", async (req, res) => {
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

app.delete('/exames/:id', async (req, res) => {
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

app.listen(port, () => {
  console.log("Servidor ta de pé :p" + port)
})