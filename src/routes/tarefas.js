import express from "express"
import { conexao } from "../database.js";

const router = express.Router();

//Selecionar dados
router.get("/", async (req, res) => {
  try {
    const pool = await conexao();
    const [result] = await pool.query("SELECT * FROM tbTarefas");

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Selecionar um dado específico
router.get("/:idTarefa", async (req, res) => {
  try {
    const pool = await conexao();
    const [result] = await pool.query("SELECT * FROM tbTarefas WHERE idTarefa = ?", [req.params.idTarefa]);

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Inserir dados
router.post("/", async (req, res) => {
  const {nome_da_tarefa, tempo, relevancia, status} = req.body;

  try {
    const conn = await conexao();
    const sql = `INSERT INTO tbTarefas (nome_da_tarefa, tempo, relevancia, status) 
                VALUES (?, ?, ?, ?)`;
    
    const [result] = await conn.query(sql, [nome_da_tarefa, tempo, relevancia, status]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Dados inseridos com sucesso"});
    } else {
      res.status(400).json({ error: "Erro ao inserir dados" });
    }

  } catch (err) {
    console.error("Erro ao inserir dados:", err);
    res.status(500).json({ error: "Erro ao inserir dados" });
  }
});

//Atualizar dados
router.put("/", async (req, res) => {
  const {nome_da_tarefa, tempo, relevancia, status, idTarefa} = req.body;
  try {
    const pool = await conexao();
    const sql = `UPDATE tbTarefas 
                SET nome_da_tarefa = ?, tempo = ?, relevancia = ?, status = ?
                WHERE idTarefa = ?`
    
    const [result] = await pool.query(sql, [nome_da_tarefa, tempo, relevancia, status, idTarefa]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Dados atualizados com sucesso"});
    } else {
      res.status(400).json({ error: "Erro ao atualizar dados" });
    }

  } catch (err) {
    console.error("Erro ao atualizar dados:", err);
    res.status(500).json({ error: "Erro ao atualizar dados" });
  }
});

//Atualizar 1 dado
router.patch("/", async (req, res) => {
  const {id, coluna, valor} = req.body

  const colunasPermitidas = ['nome_da_tarefa', 'tempo', 'relevancia', 'status']; 
  if (!colunasPermitidas.includes(coluna)) {
      throw new Error('Coluna inválida');
  }

  try {
    const pool = await conexao();
    const sql = `UPDATE tbTarefas 
                SET ${coluna} = ?
                WHERE idTarefa = ?`
    
    const [result] = await pool.query(sql, [valor, id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Dados atualizados com sucesso"});
    } else {
      res.status(400).json({ error: "Erro ao atualizar dados" });
    }

  } catch (err) {
    console.error("Erro ao atualizar dados:", err);
    res.status(500).json({ error: "Erro ao atualizar dados" });
  }
});

//Deletar dados
router.delete("/:idTarefa", async (req, res) => {
  try {
    const pool = await conexao();

    const [result] = await pool.query("DELETE FROM tbTarefas WHERE idTarefa = ?", [req.params.idTarefa]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Dados deletados com sucesso"});
    } else {
      res.status(400).json({ error: "Erro ao deletar dados" });
    }

  } catch (err) {
    console.error("Erro ao deletar dados:", err);
    res.status(500).json({ error: "Erro ao deletar dados" });
  }
});

export default router