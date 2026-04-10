import { auth } from './middleware/auth';
import express from 'express';
import cors from "cors"
import { authRouter } from './routes/auth';
import { usuariosRouter } from './routes/usuarios';
import { examesRouter } from './routes/exames';

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;


app.use(authRouter)
app.use(auth)

app.use(usuariosRouter)
app.use(examesRouter)

app.listen(port, () => {
  console.log("Servidor ta de pé :p " + port)
})

// Anotação Controller controla tudo que tem a ver com req e res
// Services cuida de toda a lógica necessária
// Repositórios cuidam de tudo relacionado ao banco de dados