console.log("🌱 Iniciando o servidor... Aguarde.");

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve arquivos estáticos da raiz do projeto
app.use(express.static(path.join(__dirname)));

// 🔄 Rota genérica para salvar dados em arquivos .json
app.post('/salvar/:arquivo', (req, res) => {
  const nomeArquivo = `${req.params.arquivo}.json`;
  const dados = req.body;

  fs.writeFile(nomeArquivo, JSON.stringify(dados, null, 2), err => {
    if (err) {
      console.error('❌ Erro ao salvar o arquivo:', err);
      return res.status(500).send('Erro ao salvar');
    }
    res.send('✅ Dados salvos com sucesso!');
  });
});

// 📤 Rota genérica para retornar dados dos arquivos .json
app.get('/dados/:arquivo', (req, res) => {
  const nomeArquivo = `${req.params.arquivo}.json`;

  fs.readFile(nomeArquivo, 'utf8', (err, data) => {
    if (err) {
      console.error(`⚠️ Erro ao ler o arquivo ${nomeArquivo}:`, err);
      return res.status(404).send(`Arquivo ${nomeArquivo} não encontrado.`);
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error('❌ Erro ao analisar JSON:', parseErr);
      res.status(500).send('Erro ao processar os dados.');
    }
  });
});

// 🔗 Rota padrão para página inicial (opcional, se quiser forçar renderizar index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
