# 🎨 Guia Completo de Criação de Imagens (Estilo D&D / RPG Clássico)
## Fabled Lands: Cidades de Ouro e Glória (Golnir)

Este guia foi elaborado para você gerar imagens em plataformas externas (como **Midjourney, Leonardo.ai, Stable Diffusion, Bing Image Creator / DALL-E 3**) e tratá-las no **Photoshop** sem gastar tokens aqui.

---

## 📁 1. Onde Salvar os Arquivos

O jogo já está programado para ler automaticamente as imagens das seguintes pastas dentro do projeto:

`
assets/
└── images/
    ├── cenarios/     <- Paisagens e locais (16:9 - JPG ou WebP)
    ├── personagens/  <- Retratos dos heróis (2:3 ou PNG transparente)
    └── inimigos/     <- Monstros e adversários de combate (PNG transparente)
`

---

## ⚙️ 2. Especificações Técnicas: PNG vs. JPG

| Tipo de Imagem | Formato Recomendado | Resolução | Tratamento no Photoshop |
| :--- | :--- | :--- | :--- |
| **Cenários & Locais** | **JPG** ou **WebP** (qualidade 85%) | **1280 × 720** (16:9) | Cortar em 16:9, ajustar contraste/cores quentes. Não precisa de transparência. Salvar leve (200KB a 400KB). |
| **Personagens (Heróis)** | **PNG** (transparente) ou **JPG** pergaminho | **600 × 900** (2:3) | Recortar o personagem do fundo ou manter fundo estilo pergaminho antigo. |
| **Monstros & Inimigos** | **PNG-24** (com transparência) | **600 × 600** (1:1) | **Obrigatório PNG transparente**: selecione o monstro, remova o fundo branco/cenário para ele se integrar diretamente ao painel de combate. |

---

## 🗺️ 3. Lista de Imagens de Cenários (ssets/images/cenarios/)

Copie e cole estes prompts em inglês na plataforma de IA de sua preferência:

### 1. alesias_brancas.jpg *(Já gerada e ativa no jogo)*
> **Prompt:** Epic fantasy D&D style splash art. A lone adventurer stands at the edge of white chalk cliffs overlooking a vast golden kingdom and violet ocean. Medieval fantasy setting, golden hour light, dramatic clouds. Classic RPG book illustration style, painterly, rich warm colors. 16:9, no text.

### 2. porto_ringhorn.jpg *(Já gerada e ativa no jogo)*
> **Prompt:** D&D fantasy RPG location illustration. A bustling medieval merchant port city viewed from the harbor, tall stone walls, colorful market stalls, sailing ships docked, golden towers, violet sea. Classic fantasy art style, painterly, warm light, detailed. 16:9, no text.

### 3. porto_wishport.jpg
- **Onde aparece:** Porto dos Desejos (Wishport - Seção 3)
> **Prompt:** D&D fantasy RPG landscape. The harbor town of Wishport on a foggy coastal morning, wooden docks, foreign caravels, spice market lanterns glowing through sea mist, weathered sailors, classic tabletop fantasy art, painterly, oil painting style. 16:9, no text.

### 4. metropole_metriciens.jpg
- **Onde aparece:** Metrópole Real de Metriciens (Capital - Seção 10)
> **Prompt:** Grand medieval fantasy royal capital city of Metriciens, towering golden banners, massive stone gate with knights in shining plate armor, bustling grand bazaar, palatial courtyards, opulent spires, rich warm colors, classic D&D style matte painting. 16:9, no text.

### 5. ilarejo_delpton.jpg
- **Onde aparece:** Delpton (Seção 6)
> **Prompt:** Peaceful medieval river village of Delpton nestled along a sparkling blue river, thatch-roof cottages, wooden watermill, green pastoral meadows, weeping willows, serene fantasy landscape, D&D art style, rich detail. 16:9, no text.

### 6. campos_de_trigo.jpg
- **Onde aparece:** Campos de Trigo / Wheatfields (Seção 78)
> **Prompt:** Vast endless rolling golden wheat fields under an expansive blue sky, old stone windmills in the distance, rustic farmsteads, horse-drawn carts along a dirt road, pastoral fantasy realm of Golnir, painterly D&D style. 16:9, no text.

### 7. castelo_ravayne.jpg
- **Onde aparece:** Castelo Ravayne (Barão Aldred - Seção 11)
> **Prompt:** Imposing austere medieval stone castle of Castle Ravayne perched on a rocky bluff, banners fluttering in the sea breeze, armed sentinels on battlements, drawbridge and moat, dramatic sunset lighting, classic fantasy RPG painting. 16:9, no text.

### 8. castelo_orlock.jpg
- **Onde aparece:** Ruínas do Castelo Orlock (Seção 291)
> **Prompt:** Haunted ancient ruined stone castle of Castle Orlock, crumbling towers overgrown with dark ivy, jagged sea cliffs, crashing stormy waves below, ominous ravens circling, dark fantasy gothic mood, D&D illustration. 16:9, no text.

### 9. 	orre_desespero.jpg
- **Onde aparece:** A Torre do Desespero (Seção 236)
> **Prompt:** Enigmatic monolithic black obsidian spire tower rising alone in the middle of vast barren plains, arcane purple runes glowing softly on dark stone, solitary and ominous, classic dark fantasy D&D book art. 16:9, no text.

### 10. loresta_abandonados.jpg
- **Onde aparece:** Floresta dos Abandonados (Seção 7)
> **Prompt:** Deep ancient primeval dark fantasy forest, giant gnarly mossy oak trees, sunbeams piercing through dense canopy and mist, mysterious pagan standing stones, wilderness path, D&D forest encounter backdrop. 16:9, no text.

### 11. colinas_assombradas.jpg
- **Onde aparece:** As Colinas Assombradas (Seção 199)
> **Prompt:** Eerie windswept foggy highland moors, ancient barrow mounds and mossy gravestones, pale ghostly will-o-wisps flickering in cold mist, twilight sky, classic gothic fantasy RPG landscape. 16:9, no text.

### 12. mosteiro_molhern.jpg
- **Onde aparece:** Mosteiro de Molhern (Seção 8)
> **Prompt:** Secluded sanctuary monastery of stone and wood in the green hills, serene courtyard, herb gardens, meditating monks in robes, golden sunbeams, peaceful sacred atmosphere, D&D fantasy temple art. 16:9, no text.

### 13. badia_lacuna.jpg
- **Onde aparece:** Abadia de Lacuna (Seção 38)
> **Prompt:** Majestic sacred abbey nestled in a high alpine mountain valley, crystal clear lake reflecting snow-capped peaks, tall arched gothic windows, sacred bells, peaceful mystic fantasy sanctuary. 16:9, no text.

### 14. oceano_violeta.jpg
- **Onde aparece:** Oceano Violeta (Navegação - Seção 73)
> **Prompt:** Deep purple-blue ocean waters of the Violet Ocean, wooden galleon sailing with billowing cream sails, white sea foam crests, dramatic horizon, adventure on the high seas, classic naval fantasy art. 16:9, no text.

### 15. ilha_feiticeiros.jpg
- **Onde aparece:** Ilha dos Feiticeiros / Dweomer (Seção 169)
> **Prompt:** Mystical island of Dweomer surrounded by glowing arcane sea mist, tall wizard towers with glowing observatories, floating glowing crystals, magical twilight atmosphere, classic high fantasy RPG illustration. 16:9, no text.

---

## 👤 4. Lista de Personagens (ssets/images/personagens/)

> **Dica para o Photoshop:** Salve com fundo estilo pergaminho antigo ou remova o fundo e salve em **PNG transparente**.

### 1. guerreira_andarilha.jpg *(Já gerada e ativa no jogo)*
- **Liana, a Veloz (Andarilha)**

### 2. mago_arcano.png
- **Asteroth, o Arcano (Mago)**
> **Prompt:** D&D fantasy RPG character portrait. An elegant male wizard in midnight-blue hooded robes adorned with golden astrological patterns, holding a wooden staff topped with a glowing amber crystal, waist-up, parchment background, classic fantasy RPG art. 2:3, no text.

### 3. sacerdote_devoto.png
- **Ignatius, o Devoto (Sacerdote)**
> **Prompt:** D&D fantasy RPG character portrait. A noble cleric with a trimmed beard in polished chainmail and white holy tabard, holding a bronze war mace and holy sun medallion, warm divine lighting, waist-up, parchment background. 2:3, no text.

### 4. ladino_sombra.png
- **Marlo, a Sombra (Ladino)**
> **Prompt:** D&D fantasy RPG character portrait. A cunning rogue with a hooded dark cloak, leather armor with daggers strapped across chest, sly confident smirk, warm torchlight from the side, waist-up, classic tabletop RPG illustration. 2:3, no text.

### 5. cavaleiro_guerreiro.png
- **Varik, o Forte (Guerreiro)**
> **Prompt:** D&D fantasy RPG character portrait. A stalwart veteran knight in heavy steel plate armor with a fur-lined crimson cloak, broadsword resting on shoulder, battle-scarred noble face, waist-up, parchment background. 2:3, no text.

### 6. 	rovador_menestrel.png
- **Elidyr, o Poeta (Trovador)**
> **Prompt:** D&D fantasy RPG character portrait. A charismatic bard with feathered cap, ornate embroidered vest, holding a wooden lute, cheerful engaging smile, waist-up, classic fantasy illustration. 2:3, no text.

---

## ⚔️ 5. Lista de Inimigos / Monstros (ssets/images/inimigos/)

> **IMPORTANTE NO PHOTOSHOP:** Para monstros, use **PNG-24 transparente**. Remova o fundo no Photoshop (Ferramenta *Selecionar Assunto* -> *Máscara de Camada* -> *Exportar como PNG*).

1. homem_javali.png - *Boar-man beast warrior with tusks and studded leather, holding a crude axe, fierce combat pose, isolated on white background.*
2. ranha_gigante.png - *Terrifying giant spider with venomous mandibles and hairy striped legs, menacing pose, isolated on white background.*
3. lobo_terrivel.png - *Giant dire wolf snarling with bared fangs, thick grey fur, amber eyes, combat stance, isolated on white background.*
4. pirata_saqueador.png - *Fierce ocean pirate reaver with cutlass and scarred face, bandana, isolated on white background.*
5. cavaleiro_renegado.png - *Corrupt black knight in spiked dark armor with jagged greatsword, glowing red visor, isolated on white background.*
6. demonio_fluvial.png - *Water demon fiend with scaly greenish skin and webbed claws, dripping water, isolated on white background.*

---

## 💡 Dicas de Tratamento no Photoshop

1. **Nitidez:** Use Filtro > Tornar Nítido > Máscara de Nitidez (Quantidade: 50%, Raio: 1.0) para dar aquele aspecto de gravura de livro de RPG.
2. **Tom de Cor:** Uma camada de ajuste de Filtro de Foto > Filtro Quente (85) a 15% de opacidade faz todas as imagens geradas em IAs diferentes parecerem pertencer ao mesmo universo artístico.
3. **Exportação Otimizada:** Use Arquivo > Exportar > Salvar para Web (Legado):
   - Para cenários: **JPEG Alta**, qualidade 80.
   - Para monstros: **PNG-24 com Transparência marcada**.
