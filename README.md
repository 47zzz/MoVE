# MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation

> **Interspeech 2026** (Under Review)

Recent Speech-to-Speech Translation (S2ST) systems achieve strong semantic accuracy yet consistently strip away non-verbal vocalizations (NVs) such as laughter and crying. **MoVE** addresses this via:

1. **Scalable Expressive Data Pipeline** -- an automated generation-selection pipeline producing a ~1,000-hour bilingual (Chinese-English) corpus with 5 emotion categories.
2. **Mixture of LoRA Experts** -- five specialized vocalization adapters with a learned soft-weighting router that dynamically blends experts for capturing hybrid expressive states.
3. **AudioLLM Data Efficiency** -- 30 minutes of curated data is enough for strong expressive S2ST performance.

MoVE reproduces target NVs in **76%** of cases and achieves the **highest human-rated naturalness** among all compared systems (existing S2ST systems preserve at most 14% of NVs).

---

## Demo

**[Live Demo Page](https://anonymous.4open.science/w/MoVE-Dataset-3EBE/)**

The demo includes two interactive components:

| Demo | Description |
|------|-------------|
| [MoVE Dataset](MoVE_dataset_demo/) | Browse bilingual audio samples across 5 emotion categories with waveform visualization |
| [S2ST Eval Platform](S2ST_eval_platform/) | Compare 7 S2ST models (OpenAI, SeamlessM4T, Kimi, Cascaded, MoE, MoVE, Expressive) side-by-side |

## Project Structure

```
.
├── index.html                  # Landing page
├── MoVE_dataset_demo/          # Dataset demo (static)
│   ├── index.html
│   ├── samples.json
│   └── audio/                  # EN/ZH audio samples by emotion
├── S2ST_eval_platform/         # Model comparison platform (static)
│   ├── index.html
│   ├── static/
│   │   ├── demo.js
│   │   ├── style.css
│   │   └── data_manifest.json
│   └── data/                   # Model outputs by emotion/set
│       ├── Angry/
│       ├── Happy/
│       ├── Sad/
│       ├── Neutral/
│       ├── Laughing/
│       └── Crying/
└── README.md
```

## Hosting

This project is fully static and can be hosted on **GitHub Pages** directly:

1. Push this repo to GitHub
2. Go to **Settings > Pages > Source** and select the branch/root
3. The site will be available at `https://<username>.github.io/<repo-name>/`

No backend server is required.

## Models Compared

| Model | Type |
|-------|------|
| **MoVE (Ours)** | Mixture-of-LoRA-Experts on AudioLLM |
| MoE (Top 5 Attention) | Mixture of Experts baseline |
| Cascaded | Traditional ASR + MT + TTS pipeline |
| OpenAI | GPT-4o S2ST |
| SeamlessM4T | Meta's multilingual translation |
| Kimi Instruct | Kimi Audio instruction-following |
| Expressive | Expressive speech baseline |

## Citation

```bibtex
@article{anonymous2026move,
  title   = {MoVE: Translating Laughter and Tears via Mixture
             of Vocalization Experts in Speech-to-Speech Translation},
  author  = {Anonymous},
  journal = {Interspeech 2026 (Under Review)},
  year    = {2026}
}
```

## License

Dataset and code are released for research purposes. Full license details will be provided upon paper acceptance.
