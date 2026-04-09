import { Router } from "express"
import type { Usuario } from "../prisma/generated/prisma/client"
import { prisma } from "../prisma/prisma"
import { signTokenAcesso, signTokenRefresh } from "../utils/jwt"
import { createHash } from "../utils/createHash"
import bcrypt from "bcrypt"

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/cadastro", async (req, res) => {
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
