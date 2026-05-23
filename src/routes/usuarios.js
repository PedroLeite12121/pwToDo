import express from "express"
import { conexao } from "../database.js";

const router = express.Router();

//Selecionar dados
router.get("/", async (req, res) => {
  try {
    const pool = await conexao();
    const [result] = await pool.query("SELECT * FROM tbUsuarios");

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Selecionar um dado específico
router.get("/:idUsuario", async (req, res) => {
  try {
    const pool = await conexao();
    const [result] = await pool.query("SELECT * FROM tbUsuarios WHERE idUsuario = ?", [req.params.idUsuario]);

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Inserir dados
router.post("/", async (req, res) => {
  const {nome, usuario, senha} = req.body;

  try {
    const conn = await conexao();
    const sql = `INSERT INTO tbUsuarios (nome, usuario, senha) 
                VALUES (?, ?, ?)`;
    
    const [result] = await conn.query(sql, [nome, usuario, senha]);

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
  const {nome, usuario, senha, idUsuario} = req.body;
  try {
    const pool = await conexao();
    const sql = `UPDATE tbUsuarios 
                SET nome = ?, usuario = ?, senha = ?
                WHERE idUsuario = ?`
    
    const [result] = await pool.query(sql, [nome, usuario, senha, idUsuario]);

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
router.delete("/:idUsuario", async (req, res) => {
  try {
    const pool = await conexao();

    const [result] = await pool.query("DELETE FROM tbUsuarios WHERE idUsuario = ?", [req.params.idUsuario]);

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