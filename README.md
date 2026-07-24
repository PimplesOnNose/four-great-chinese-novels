# 四大名著 · The Four Great Classical Novels

A digital showcase celebrating China's four greatest literary masterpieces, designed with deep respect for traditional Chinese aesthetics and philosophy.

**[→ View Live Site](https://pimplesonnose.github.io/four-great-chinese-novels/)**

---

## ✨ Features

- **Bilingual Experience** — Toggle between English (EN) and Chinese (中文) on all pages
- **Language Persistence** — Your language choice persists across page navigation via localStorage
- **Wu Xing Theming** — Each novel has its own elemental color palette (Water, Earth, Fire, Wood)
- **Gongbi Artwork** — AI-generated traditional Chinese brush painting style images
- **Responsive Design** — Works beautifully on desktop and mobile
- **Scroll Animations** — Elegant reveal effects as you explore the content

---

## Design Philosophy

### The Five Elements (五行) as Design Language

Each novel is assigned a **Wu Xing element** that reflects its narrative character:

| Novel | Element | Color Palette | Symbolism |
|-------|---------|---------------|-----------|
| **三国演义** | Water (水) | Deep indigo, azure, silver | Strategy, wisdom, the flow of power |
| **水浒传** | Earth (土) | Warm gold, amber, brown | Brotherhood, loyalty, grounded rebellion |
| **西游记** | Fire (火) | Crimson, vermillion, orange | Passion, transformation, spiritual energy |
| **红楼梦** | Wood (木) | Jade green, soft pink | Growth, beauty, the transience of life |

This isn't arbitrary theming—it's **philosophical encoding**. The Water element mirrors Three Kingdoms' emphasis on strategy and the inevitable flow of dynasties. Earth reflects Water Margin's grounded brotherhood and connection to the common people. Fire captures Journey to the West's transformative spiritual energy. Wood embodies Dream of the Red Chamber's themes of growth, beauty, and inevitable decay.

### Qinglu (青绿) Design System

The visual foundation draws from **Qinglu aesthetics**—the blue-green landscape painting tradition that has defined Chinese visual art for centuries.

**Core Palette:**
- **Jade Green** `#4a9e8a` — Primary accent, representing harmony and renewal
- **Azure** `#5a8e9e` — Secondary accent, evoking depth and contemplation
- **Deep Night** `#080a10` — Background, suggesting the infinite sky
- **Malachite** `#3a7a6a` — Gradient endpoints, grounding the composition

**Typography Hierarchy:**
- **Ma Shan Zheng** — Display headings, capturing the brushstroke energy of calligraphy
- **Noto Serif SC** — Body Chinese text, balancing tradition with readability
- **Noto Sans SC** — UI elements, providing modern clarity
- **Crimson Pro** — English text and italics, bridging Eastern and Western typographic traditions

### Yin-Yang (阴阳) Balance

Every design decision seeks equilibrium:
- **Dark backgrounds** with **luminous text** — the interplay of shadow and light
- **Horizontal navigation** balanced by **vertical Chinese characters**
- **Geometric cards** softened by **organic mist animations**
- **Western serif fonts** harmonizing with **Eastern brush script**

### Atmospheric Layers

The floating mist effect evokes the **mountain-water paintings** (山水画) that inspired the Qinglu aesthetic. These semi-transparent layers create depth, suggesting the spatial philosophy of traditional Chinese art where **negative space** (留白) is as important as the painted surface.

---

## Technical Architecture

```
four-great-chinese-novels/
├── index.html                 # Landing page with language toggle
├── three-kingdoms.html        # 三国演义 · Water element
├── water-margin.html          # 水浒传 · Earth element
├── journey-west.html          # 西游记 · Fire element
├── red-chamber.html           # 红楼梦 · Wood element
│
├── css/
│   ├── variables.css          # Design tokens & Wu Xing themes
│   ├── base.css               # Reset & foundational styles
│   ├── animations.css         # Scroll reveal & atmospheric effects
│   ├── components.css         # Reusable UI components
│   ├── novel-page.css         # Shared novel page layout
│   ├── lang-toggle.css        # Language toggle styles
│   ├── three-kingdoms.css     # Water element overrides
│   ├── water-margin.css       # Earth element overrides
│   ├── journey-west.css       # Fire element overrides
│   └── red-chamber.css        # Wood element overrides
│
├── js/
│   ├── landing.js             # Landing page interactions
│   ├── novel-page.js          # Novel page scroll effects
│   └── lang-toggle.js         # Language toggle component
│
└── images/
    └── *.png                  # Gongbi-style AI artwork
```

---

## Cultural Context

### The Four Masterworks (四大奇书)

These novels, collectively known as the **Four Masterworks of Ming Fiction**, represent the pinnacle of classical Chinese literature:

1. **Romance of the Three Kingdoms** (三国演义, c. 1368-1398)
   - Author: Luo Guanzhong (罗贯中)
   - Historical epic of the Three Kingdoms period (220-280 CE)
   - "Seven parts fact, three parts fiction"

2. **Water Margin** (水浒传, c. 1368-1398)
   - Author: Shi Nai'an (施耐庵)
   - 108 outlaws gather at Liangshan Marsh
   - The first vernacular Chinese novel

3. **Journey to the West** (西游记, c. 1592)
   - Author: Wu Cheng'en (吴承恩)
   - Mythological pilgrimage to India
   - Sun Wukong: the Monkey King

4. **Dream of the Red Chamber** (红楼梦, c. 1750s)
   - Author: Cao Xueqin (曹雪芹)
   - Semi-autobiographical family saga
   - Spawned the scholarly field of "Redology" (红学)

### Enduring Legacy

These works have shaped East Asian culture for centuries:
- **Language**: Proverbs from these novels enter daily speech
- **Religion**: Guan Yu became a venerated Buddhist Bodhisattva
- **Popular Culture**: Adaptations in film, television, manga, anime, and gaming
- **Academic Study**: Redology alone has produced thousands of scholarly works

---

## Artwork

The hero images were generated using **Pollinations.ai** with prompts designed to evoke traditional Chinese **gongbi** (工笔画) painting style—meticulous brushwork characterized by fine lines, vibrant colors, and detailed representation.

---

## Credits

**Crafted with ♥ by [Pi](https://pi.dev) & [Mimo](https://mimo.mi.com/)**

- **Pi** — AI-powered development environment
- **Mimo** — Xiaomi LLM Core Team's language model

Design philosophy informed by:
- [Qinglu Design System](https://github.com/PimplesOnNose/qinglu-design) — Blue-green landscape aesthetics
- Traditional Chinese Design Principles — Wu Xing, Yin-Yang, Feng Shui

---

## License

MIT License

---

*"天下大势，分久必合，合久必分"*
*"The empire, long divided, must unite; long united, must divide."*
— Romance of the Three Kingdoms
