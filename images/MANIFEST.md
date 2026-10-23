# Image manifest — styli_staging

All files were generated with sharp from `images/*.jpg` and `logo.jpg`, with metadata stripped. WebP files use quality 78 (the portrait uses 82). The JPG hero uses mozjpeg q80 and `og.jpg` uses q82. Images are resized by width only and are never upscaled.
The root-level `ImageDownloader_..._659208231_...jpg` is byte-identical to `images/` (MD5 `8a768e8f0f41eb0e62919a8b820ad556`), so it is the same photo as `salon-kuchnia-jodelka`.

**Hero / og:image:** `salon-kuchnia-jodelka` is the strongest photo for a large hero. It shows a whole room in landscape format, has bright even light and a clear depth line along the herringbone floor. Runner-up: `sypialnia-wezglowie` is warm and symmetric and suits a moodier hero.

## Photos

| # | Slug | Source (orientation, px) | What is shown | Alt (PL) | Caption (PL) | Dominant colors |
|---|---|---|---|---|---|---|
| 1 | `salon-kuchnia-jodelka` | landscape 4:3, 1920×1440 (`…659208231…`) | Open living room with a kitchenette. It has white handleless and fluted cabinets, warm-grey lower fronts, an oak herringbone floor, a round oak table with cognac leather chairs, a burgundy pendant lamp, ZZ plants, a wooden sideboard with abstract prints and a light sofa with patterned cushions. Bright daylight, crisp and airy. | Jasny salon z aneksem kuchennym: białe fronty, dębowa jodełka, okrągły stół i koniakowe krzesła | Salon z aneksem, dębowa jodełka | `#E9ECEF` white fronts, `#A7A1A7` grey fronts, `#B7835D` oak floor, `#7D3428` cognac leather, `#222A32` black accents |
| 2 | `sypialnia-wezglowie` | landscape ~1.23:1, 1770×1439 (`…587794059…`) | Bedroom with a tall taupe velvet headboard and white linen pillows. Cushions in camel and chocolate, plus a textured cream one with stitched edging. Two framed prints (heron, leaf shadows), white floor mirrors, linen table lamps and pink roses. Warm golden evening light and very soft. | Sypialnia w beżach: tapicerowane wezgłowie, poduszki w brązach, lampki nocne i grafiki z czaplą | Sypialnia w ciepłych beżach | `#D0D1CB` bedding, `#A6937D` wall (shade), `#897262` taupe headboard, `#593E2D` chocolate, `#D8AD87` lamp glow |
| 3 | `komoda-lampa-lisc` | square 1:1, 1440×1440 (`…587308838…`) | Vignette of a dark walnut console. It holds a dusty-pink arch lamp with a linen shade, a plum glass vase with eucalyptus and a pink candle. Behind it hangs a framed linen canvas with an embroidered palm leaf. Warm lamp light from the right, cream wall. | Komoda z ciemnego drewna, różowa lampa w kształcie łuku, gałązki eukaliptusa i obraz z liściem palmy | Komoda, lampa i eukaliptus | `#A8A393` wall, `#977F66` linen canvas, `#E8B98A` lamp glow, `#6E3C2F` plum glass, `#51413B` walnut |
| 4 | `taras-roz` | portrait 9:16, 1215×2160 (`…619088476…`) | Terrace or balcony lounge with a cream outdoor sofa. Cushions in mustard knit, faux fur and striped pink, plus a pink knitted throw. A round white table holds two pink cups on a wooden tray and a pink glass lantern. Green plants grow in planters along the wall. Bright sun, pastel and cheerful. | Taras z jasną sofą, musztardową i różowymi poduszkami, kubkami na tacy i zielenią w donicach | Taras, pastelowe tekstylia | `#B8B1A3` wall, `#DFC19F` cream sofa, `#CF761D` mustard, `#C89C97` dusty pink, `#4C6C14` leaf green |
| 5 | `jadalnia-lawenda` | portrait ~0.47:1, **632×1350** after trimming the white Instagram side borders (source 1080×1350, `…610582990…`) | Dining corner with a round black table and four greige upholstered chairs. A black pendant lamp hangs above, with a round black-framed mirror and pampas grass in a white vase. Light oak floor, roman blinds and blurred lavender in the foreground. Soft warm daylight. | Kącik jadalniany: czarny okrągły stół, beżowe krzesła, okrągłe lustro i lawenda na pierwszym planie | Jadalnia z lawendą | `#CCAE92` warm wall, `#C08145` oak floor, `#B09179` greige chairs, `#5E4B7C` lavender (by eye), `#261F19` black |
| 6 | `lazienka-umywalka` | square 1:1, 1440×1440 (`…589905664…`) | Bathroom with large light-grey stone-effect tiles and a white rectangular countertop basin. It has a matte black wall-mounted tap, a black-framed rounded mirror, an oak-look vanity, a glass shower screen with black profile, rolled white towels and a pink rose. Neutral, clean and cool. | Łazienka z jasnymi płytkami, białą umywalką nablatową, czarną baterią i szafką w kolorze dębu | Łazienka, czerń i dąb | `#AEB0B1` tile, `#F4F4F4` basin, `#735232` oak vanity, `#131217` matte black, `#DAB1B7` rose |
| — | `sylwia` | square 1:1, 320×320 (`logo.jpg`; this is a portrait, not a logo) | Head-and-shoulders portrait of Sylwia. She has long brown hair, a slight smile and wears a burgundy-brown top with a keyhole neckline. The background is a light blurred wall with a large green plant. Soft warm light. | Sylwia Warzecha, home stagerka z Wrocławia, w bordowej bluzce na tle zielonej rośliny | Sylwia Warzecha | `#F7E5E0` background, `#451A13` burgundy top, `#56392F` hair, `#ABA184` plant |

## Crop guidance (CSS `object-fit: cover` + `object-position`)

| Slug | 4:5 | 3:2 | 1:1 | Other |
|---|---|---|---|---|
| `salon-kuchnia-jodelka` | Weak. If needed, use `30% 50%` (dining set) | **Best.** `50% 40%` keeps the pendant lamp | Good: `40% 50%` (table + kitchen run) | 16:9 / 1.9:1 hero band works, but shift up to keep the pendant (og.jpg uses this) |
| `sypialnia-wezglowie` | Good: `50% 50%` (loses the mirrors, keeps both lamps) | Good: `50% 35%` (trims the throw) | **Excellent:** `50% 50%`, symmetric | Alternative hero |
| `komoda-lampa-lisc` | Good: `60% 50%` (lamp + leaf) | Weak. Use `50% 80%` for a lamp + vase strip, which loses the top of the leaf | **Native** | Detail / texture tile |
| `taras-roz` | **Good:** `50% 30%` (cushions + cups) | Band only: `50% 33%` | Good: `50% 35%` | Tall 9:16 slot or story-style card |
| `jadalnia-lawenda` | Good: `50% 40%` | Not recommended (too narrow) | OK: `50% 45%` | Max 632 px wide, so keep its rendered size ≤ ~320 CSS px at 2x |
| `lazienka-umywalka` | Good: `70% 50%` (basin + mirror) | OK: `60% 65%` (basin, tap, vanity top) | **Native** | — |
| `sylwia` | OK: `50% 30%` | — | **Native** (round avatar works well) | Do not display above 320 px (160 CSS px at 2x) |

## Output files (`public/img/`)

| File | W×H | Bytes |
|---|---|---|
| `salon-kuchnia-jodelka-800.webp` | 800×600 | 52 080 |
| `salon-kuchnia-jodelka-1600.webp` | 1600×1200 | 180 708 |
| `salon-kuchnia-jodelka-1600.jpg` (hero fallback, q80) | 1600×1200 | 240 250 |
| `og.jpg` (from salon-kuchnia-jodelka, q82, crop shifted up to keep the pendant) | 1200×630 | 101 197 |
| `sypialnia-wezglowie-800.webp` | 800×650 | 36 728 |
| `sypialnia-wezglowie-1600.webp` | 1600×1301 | 107 988 |
| `komoda-lampa-lisc-800.webp` | 800×800 | 34 440 |
| `komoda-lampa-lisc-1600.webp` | 1440×1440 (source max) | 162 100 |
| `taras-roz-800.webp` | 800×1422 | 179 374 |
| `taras-roz-1600.webp` | 1215×2160 (source max) | 445 358 |
| `jadalnia-lawenda-800.webp` | 632×1350 (source max after trim) | 78 478 |
| `jadalnia-lawenda-1600.webp` | 632×1350 (identical to -800, kept for naming consistency) | 78 478 |
| `lazienka-umywalka-800.webp` | 800×800 | 36 400 |
| `lazienka-umywalka-1600.webp` | 1440×1440 (source max) | 134 590 |
| `sylwia-320.webp` | 320×320 | 9 398 |
| `sylwia.jpg` | 320×320 | 13 005 |
| `favicon.svg` | 512×512 viewBox, rounded square | 1 267 |
| `apple-touch-icon.png` | 180×180, square (iOS rounds it) | 3 023 |

Notes:
- `sylwia-640.webp` was intentionally **not** produced because the source is only 320 px and upscaling is not allowed.
- `favicon.svg` is a Cormorant Garamond SemiBold "S" (the site's display font, OFL), converted to a path so it does not depend on fonts. The letter is `#EFE6DA` on `#2B211B`.
- For srcset, use real widths, e.g. `taras-roz-800.webp 800w, taras-roz-1600.webp 1215w`. For the jadalnia photo, use only `-800.webp` (632w).
