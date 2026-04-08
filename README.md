# MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation

> **Interspeech 2026** (Under Review)

Recent Speech-to-Speech Translation (S2ST) systems achieve strong semantic accuracy yet consistently strip away non-verbal vocalizations (NVs) such as laughter and crying. **MoVE** addresses this via:

1. **Scalable Expressive Data Pipeline** -- an automated generation-selection pipeline producing a ~1,000-hour bilingual (Chinese-English) corpus with 5 emotion categories.
2. **Mixture of LoRA Experts** -- five specialized vocalization adapters with a learned soft-weighting router that dynamically blends experts for capturing hybrid expressive states.
3. **AudioLLM Data Efficiency** -- 30 minutes of curated data is enough for strong expressive S2ST performance.

MoVE reproduces target NVs in **76%** of cases and achieves the **highest human-rated naturalness** among all compared systems (existing S2ST systems preserve at most 14% of NVs).

---

## Demo

**[Live Demo](https://47zzz.github.io/MoVE/)**

| Page | Description |
|------|-------------|
| [MoVE Dataset](https://47zzz.github.io/MoVE/MoVE_dataset_demo/) | Browse bilingual audio samples across 5 emotion categories with waveform visualization |
| [Model Comparison](https://47zzz.github.io/MoVE/model_comparison/) | Listen and compare 8 S2ST models side-by-side (MoVE, Kimi variants, gpt-4o-audio-preview, SeamlessExpressive, SeamlessM4T-Large-v2, Cascaded) |

## Project Structure

```
.
├── index.html                  # Landing page
├── i18n.js                     # EN/ZH language toggle
├── MoVE_dataset_demo/          # Dataset demo
│   ├── index.html
│   ├── samples.json
│   └── audio/
├── model_comparison/           # Model comparison demo
│   ├── index.html
│   ├── static/
│   │   └── data_manifest.json
│   └── data/
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
| Kimi + LoRA (SynStard 100h) | Kimi-Audio fine-tuned on SynStard 100h |
| Kimi + LoRA (SeamlessAlign 67h) | Kimi-Audio fine-tuned on SeamlessAlign 67h |
| Kimi-Audio-7B-Instruct | Base Kimi-Audio instruction model |
| gpt-4o-audio-preview | OpenAI's GPT-4o audio preview |
| SeamlessExpressive | Meta's expressive speech translation |
| SeamlessM4T-Large-v2 | Meta's multilingual translation |
| Cascaded | Traditional ASR + MT + TTS pipeline |

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
