import express from "express"
import { conexao } from "../database.js";

const router = express.Router();

//Selecionar dados
router.get("/", async (req, res) => {
  try {
    const pool = await conexao();
    const [result] = await pool.query("SELECT * FROM tbDevs");

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Selecionar um dado específico
router.get("/:idDev", async (req, res) => {
  try {
    const pool = await conexao();
    const [result] = await pool.query("SELECT * FROM tbDevs WHERE idDev = ?", [req.params.idDev]);

    res.json(result);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Inserir dados
router.post("/", async (req, res) => {
  const {nome, funcao, frase, link_url} = req.body;

  try {
    const conn = await conexao();
    const sql = `INSERT INTO tbDevs (nome, funcao, frase, link_url) 
                VALUES (?, ?, ?, ?)`;
    
    const [result] = await conn.query(sql, [nome, funcao, frase, link_url]);

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
  const {nome, funcao, frase, link_url, idDev} = req.body
  try {
    const pool = await conexao();
    const sql = `UPDATE tbDevs 
                SET nome = ?, funcao = ?, frase = ?, link_url = ?
                WHERE idDev = ?`
    
    const [result] = await pool.query(sql, [nome, funcao, frase, link_url, idDev]);

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
router.delete("/:idDev", async (req, res) => {
  try {
    const pool = await conexao();

    const [result] = await pool.query("DELETE FROM tbDevs WHERE idDev = ?", [req.params.idDev]);

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