import bcrypt from "bcrypt"
import { hash } from "node:crypto"

const senha = '123456'
const saltRounds = 10

const hash1 = await bcrypt.hash(senha,saltRounds)
console.log(hash1)