// Antes (CommonJS)
const express = require('express');
const { createConnection } = require('mysql');

// Depois (ES6 Modules)
import express from 'express';
import { createConnection } from 'mysql';


const app = express();
const port = 3000;

app.use(express.json());

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '10203040Lu.',
  database: 'jogomate_js'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados!');
  }
});

app.post('/inserirPontuacao', (req, res) => {
  const { nomeJogador, pontuacao } = req.body;

  const query = 'INSERT INTO Pontuacoes (nomeJogador, pontuacao) VALUES (?, ?)';
  const values = [nomeJogador, pontuacao];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir pontuação no banco de dados:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      console.log('Pontuação inserida com sucesso!');
      res.status(200).send('Pontuação inserida com sucesso!');
    }
  });
});

app.get('/recuperarPontuacoes', (req, res) => {
  const query = 'SELECT * FROM Pontuacoes ORDER BY pontuacao DESC LIMIT 10';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao recuperar pontuações do banco de dados:', err);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
