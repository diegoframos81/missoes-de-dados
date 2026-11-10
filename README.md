# Missões de Dados

Jogo para celular para praticar **SQL, Python, Databricks, DAX e M (Power Query)** escrevendo código de verdade, como numa tarefa do trabalho, do básico ao avançado.

## Como funciona

- **72 missões** em 5 trilhas: SQL (16), Python (14), Databricks (13), DAX (15) e M (14).
- Cada trilha tem os níveis **Básico**, **Intermediário** e **Avançado**. A próxima missão abre quando você termina a anterior.
- **SQL** roda de verdade no navegador (SQLite via [sql.js](https://sql.js.org)). O jogo compara o seu resultado com o esperado.
- **Python** roda de verdade no navegador ([Pyodide](https://pyodide.org)), com testes automáticos. As missões avançadas usam pandas.
- **DAX, M e Databricks** são conferidos por regras que dizem o que falta na sua solução.
- Tem dicas, solução de referência, XP, níveis e dias seguidos.
- Barra de símbolos embaixo do editor para digitar código no celular.

## Usar no celular

1. Abra o site uma vez com internet (o Python baixa cerca de 10 MB na primeira vez que você usa).
2. Instale como app: no Android, menu ⋮ → **Instalar app**; no iPhone, **Compartilhar → Adicionar à Tela de Início**.
3. Depois disso o jogo funciona offline.

O progresso fica salvo no navegador. Para passar para outro aparelho, use **“Levar progresso para outro aparelho”** no fim da tela inicial.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O jogo inteiro (missões, motor de correção e interface) |
| `sw.js` | Service worker que guarda o jogo e as bibliotecas para uso offline |
| `manifest.webmanifest` | Permite instalar como app |
