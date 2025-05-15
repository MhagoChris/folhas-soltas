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

// Seção Histórias
app.get('/historias.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'historias.html'));
});

// Página individual de leitura de história
app.get('/historia.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'historia.html'));
});

// Seção Notícias
app.get('/noticias.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'noticias.html'));
});

// Página individual de notícia
app.get('/noticia.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'noticia.html'));
});

// Página individual Vídeo
app.get('/video.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'video.html'));
});

// Página individual de livro
app.get('/livro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'livro.html'));
});

// Seção Autores
app.get('/autores.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'autores.html'));
});

// Seção Autores
app.get('/autores.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'autores.html'));
});

// Seção Sobre
app.get('/sobre.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'sobre.html'));
});

// Página Todas as Notícias
app.get('/todas-noticias.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'todas-noticias.html'));
});

// Seção Contato
app.get('/contato.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contato.html'));
});

// Página Administração
app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Página Editor
app.get('/editor.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'editor.html'));
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
