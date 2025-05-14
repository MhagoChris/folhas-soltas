console.log("🌱 Iniciando o servidor... Aguarde.");

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Rota genérica: salva dados em qualquer .json
app.post('/salvar/:arquivo', (req, res) => {
  const nomeArquivo = `${req.params.arquivo}.json`;
  const dados = req.body;

  fs.writeFile(nomeArquivo, JSON.stringify(dados, null, 2), err => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
      return res.status(500).send('Erro ao salvar');
    }
    res.send('Dados salvos com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
