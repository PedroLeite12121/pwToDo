import express from 'express'
import { testarConexao, conexao, closeConexao } from './src/database.js'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = await conexao()

import devsRouter from "./src/routes/devs.js";
app.use("/devs", devsRouter);

import usuariosRouter from "./src/routes/usuarios.js";
app.use("/usuarios", usuariosRouter);

import tarefasRouter from "./src/routes/tarefas.js";
app.use("/tarefas", tarefasRouter);

import usuarioTarefaRouter from "./src/routes/usuario_tarefa.js";
app.use("/usuario_tarefa", usuarioTarefaRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})