import express from "express"
import { conexao } from "../database.js";

const router = express.Router();

//Selecionar dados
router.get("/", async (req, res) => {
  try {
    const pool = await conexao();
    const [result] = await pool.query("SELECT * FROM tbUsuario_Tarefa");

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Selecionar um dado específico
router.get("/:idUsuarioTarefa", async (req, res) => {
  try {
  	const pool = await conexao();
    const [result] = await pool.query("SELECT * FROM tbUsuario_Tarefa WHERE idUsuarioTarefa = ?", [req.params.idUsuarioTarefa]);

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Inserir dados
router.post("/", async (req, res) => {
	const {idUsuario, idTarefa} = req.body;

  try {
    const conn = await conexao();
    const sql = `INSERT INTO tbUsuario_Tarefa (idUsuario, idTarefa) 
                VALUES (?, ?)`;
    
    const [result] = await conn.query(sql, [idUsuario, idTarefa]);

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
  const {idUsuario, idTarefa, idUsuarioTarefa} = req.body;

  try {
      const pool = await conexao();
      const sql = `UPDATE tbUsuario_Tarefa 
              SET idUsuario = ?, idTarefa = ?
              WHERE idUsuarioTarefa = ?`
  
      const [result] = await pool.query(sql, [idUsuario, idTarefa, idUsuarioTarefa]);

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
router.delete("/:idUsuarioTarefa", async (req, res) => {
  try {
    const pool = await conexao();

    const [result] = await pool.query("DELETE FROM tbUsuario_Tarefa WHERE idUsuarioTarefa = ?", [req.params.idUsuarioTarefa]);

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