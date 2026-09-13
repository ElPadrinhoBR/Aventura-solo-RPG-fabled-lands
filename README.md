# ⚔️ Aventura Solo RPG — Fabled Lands: Cidades de Ouro e Glória

> **Um RPG de mundo aberto baseado no livro-jogo clássico *Fabled Lands* (Livro 2), jogável direto no navegador, 100% em português.**

---

## 🌍 Sobre o Projeto

*Aventura Solo RPG – Fabled Lands* é uma adaptação digital e interativa do livro de aventura solo **"Cities of Gold and Glory"** (Fabled Lands, Livro 2), criado originalmente por **Dave Morris & Jamie Thomson**.

O jogador assume o papel de um aventureiro que naufraga nas costas do **Reino Mercantil de Golnir** e parte em uma jornada épica e de mundo aberto: explorando cidades portuárias, florestas perigosas, castelos assombrados e mares violentos, ao estilo dos grandes RPGs de mesa clássicos.

---

## 🎮 Funcionalidades

| Recurso | Descrição |
|---|---|
| 📖 **Narrativa Ramificada** | Mais de 700 seções interativas com escolhas que moldam a aventura |
| ⚔️ **Sistema de Combate** | Combate baseado em dados, com opção de fuga estratégica |
| 🎲 **Testes de Habilidade** | Rolagem 2d6 + atributos (Combate, Magia, Santidade, Exploração, Ladinagem, Sobrevivência) |
| 🗺️ **Mapa Fiel e Interativo** | Mapa oficial colorido de Golnir com rastreamento de posição em tempo real |
| 📍 **Trilha de Viagem** | Rastro dourado registrando cada local percorrido na aventura |
| 🌅 **Ressurreição Divina** | Sistema de segunda chance ou Morte Final ao cair em combate |
| 🎒 **Inventário & Frota Naval** | Gestão de itens, armaduras, cargas e navios |
| 🗝️ **Palavras-Código** | Sistema completo de codewords persistentes entre aventuras |
| 💾 **Salvamento Automático** | Salva a cada cena; exportação e importação manual em JSON |
| 🔊 **Áudio Procedural** | Música de fundo e efeitos sonoros gerados via Web Audio API |
| 🖼️ **Gravuras Originais** | Galeria com mapas e ilustrações extraídas do livro original |
| 📱 **Responsivo** | Funciona em desktop, tablet e celular |

---

## 🗺️ O Mundo de Golnir

A aventura se passa no **Reino Mercantil de Golnir**, repleto de:

- **Cidades e Portos:** Ringhorn, Metrópole de Metriciens, Wishport, Delpton, Goldfall, Conflass
- **Fortalezas:** Castelo Ravayne, Ruínas do Castelo Orlock, Torre do Desespero
- **Regiões Selvagens:** Floresta dos Abandonados, Colinas Assombradas, Planícies Sem Fim
- **Locais Sagrados:** Mosteiro de Molhern, Abadia de Lacuna
- **Mares:** Oceano Violeta, Ilha dos Feiticeiros (Dweomer), Mar das Algas

---

## 🚀 Como Jogar

### Online (GitHub Pages)
Acesse diretamente pelo navegador, sem instalar nada:  
➡️ **[Jogar Agora](https://SEU_USUARIO.github.io/aventura-solo-rpg-fabled-lands/)**

### Localmente
```bash
git clone https://github.com/SEU_USUARIO/aventura-solo-rpg-fabled-lands.git
cd aventura-solo-rpg-fabled-lands
python -m http.server 8080
# Abra: http://localhost:8080
```

---

## 🛠️ Tecnologias

- **HTML5 + CSS3 + JavaScript (Vanilla)** — sem frameworks, sem dependências externas
- **Web Audio API** — trilha sonora e efeitos procedurais
- **LocalStorage** — salvamento persistente no navegador
- **SVG dinâmico** — mapa interativo com trilha de viagem

---

## 📁 Estrutura do Projeto

```
📦 aventura-solo-rpg-fabled-lands/
├── 📄 index.html           # Interface principal do jogo
├── 🎨 styles.css           # Estilos e temas medievais
├── ⚡ app.js               # Motor do jogo (lógica, combate, mapa)
├── 🔊 audio.js             # Motor de áudio procedural
├── 📂 data/
│   ├── sections_pt.json    # Todas as seções em português
│   ├── sections_bundle.js  # Bundle otimizado das seções
│   └── map_locations.js    # Mapeamento geográfico de Golnir
└── 📂 assets/
    ├── favicon.ico         # Ícone do jogo
    └── 📂 images/
        ├── mapa_golnir.jpg # Mapa oficial colorido de Golnir
        └── 📂 gravuras/    # Ilustrações originais do livro
```

---

## ⚖️ Direitos Autorais

Este projeto é uma **adaptação digital de uso não comercial e educativo** do livro-jogo *Fabled Lands: Cities of Gold and Glory* (© Dave Morris & Jamie Thomson, 1995).

Todo o conteúdo narrativo pertence aos seus criadores originais. A implementação técnica (código, interface, sistemas digitais) é de autoria própria.

---

## 🤝 Contribuições

Issues e sugestões são bem-vindas! Abra uma [issue](../../issues) ou envie um pull request.
