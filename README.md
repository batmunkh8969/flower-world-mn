# Цэцгийн ертөнц

A Mongolian pixel garden and flower learning game.

Public site: <https://batmunkh8969.github.io/flower-world-mn/>

The page is a static Mongolian pixel garden with 59 individually drawn flower profiles, a field-guide panel, and a separate on-demand scientific-name index. The garden lets visitors choose among seven settings, four planting layouts, four sky color moods, ten flower palettes, adjustable bloom size, and wind animation. Outdoor stems root at their own ground positions; only the patio scene gathers them into a pot. The index contains 365,813 accepted vascular-plant names from the WCVP v16 taxon file. It includes flowering plants and non-flowering ferns and gymnosperms. A name record does not imply a custom illustration, Mongolian common name, or species-level identification guide.

## Data credit

Govaerts R (ed.). 2026. *The World Checklist of Vascular Plants (WCVP).* Facilitated by the Royal Botanic Gardens, Kew. <https://doi.org/10.34885/egs6-cp24>. Retrieved 2026-11-16. Dataset licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Kew does not endorse this website.

## Rebuild the name index

Download and extract the WCVP v16 Darwin Core Archive from [Kew's record](https://kew.iro.bl.uk/entities/product/998399a0-4b87-4a93-8303-6abc8a2de281), then run:

```powershell
node scripts/build-plant-index.js path\to\wcvp_taxon.csv
```

The script writes letter shards and the manifest into both `plant-index/` and `dist/plant-index/`. The original WCVP archive is not part of the website repository.

## Hosting

The GitHub Pages version is public at the link above. Search engine crawling can take time, and inclusion is not guaranteed. A branded `www` address requires a domain owner and DNS changes; GitHub Pages supports that once the domain is configured in the repository.


