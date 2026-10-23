# Instagram image manifest — @styli_staging

Source: the public profile embed page `https://www.instagram.com/styli_staging/embed/`, fetched on 2026-10-23 without logging in. The `web_profile_info` API returned HTTP 429 on both `www.` and `i.instagram.com`, and the normal profile HTML returned an error page.

The profile reports **19 posts, 528 followers**. The embed page exposes only the **6 newest posts** (37 media: 36 photos plus 1 reel cover). The 13 older posts were not reachable without logging in. The 6 photos already on the site (`salon-kuchnia-jodelka`, `sypialnia-wezglowie`, …) were taken from earlier downloads, see `images/MANIFEST.md`.

Instagram serves these photos at a maximum width of 1080 px. Every source is narrower than 1600 px, so each kept photo has **only a `-800.webp`**, with no `-1600`. The reel cover is 540 px wide and is saved unscaled as `-540.webp`. All files were made with sharp at WebP quality 78, metadata stripped, resized by width only and never upscaled.

## Kept photos (31)

Dates are `taken_at_timestamp` in UTC. None of the captions says "before/after" (przed/po), so none of the photos is marked as such. Post `DX_pmnPij82` is described as a *metamorfoza* (makeover), but it shows only the finished result.

| # | Slug | File (W×H) | Post · date | What it shows | Alt (PL) | Caption (PL) | Materials | Best crops (object-position) |
|---|---|---|---|---|---|---|---|---|
| 1 | `dom-salon-narozna-sofa` | `dom-salon-narozna-sofa-800.webp` 800×800 | Dd7MLe-EVhN · 2026-09-30 | House living room: curved cream corner sofa, bouclé armchair, organic terracotta coffee table, beige floor-length curtains, two terracotta paintings, a sliding door onto a pergola terrace and garden, sun patches on a cream rug | Salon w domu: kremowa narożna sofa, fotel bouclé, organiczny stolik i wyjście na taras z pergolą | Salon z widokiem na ogród | bouclé, len, terakota, ciepła biel | 4:5 `40% 50%` · 1:1 native · 3:2 `50% 55%` · 16:10 `50% 55%` **(hero candidate)** |
| 2 | `dom-jadalnia-salon` | `dom-jadalnia-salon-800.webp` 800×800 | Dd7MLe-EVhN · 2026-09-30 | View from the oak dining table across to the living room and terrace. Ribbed terracotta pendants, strelitzia, blue-grey sideboard, large pale stone-look floor tiles | Jadalnia z dębowym stołem i terakotowymi lampami, w tle salon i taras z ogrodem | Jadalnia otwarta na salon | dąb, terakota, kamienne płyty | 4:5 `45% 50%` · 1:1 native · 3:2 `50% 45%` · 16:10 `50% 40%` |
| 3 | `dom-kuchnia-jadalnia` | `dom-kuchnia-jadalnia-800.webp` 800×800 | Dd7MLe-EVhN · 2026-09-30 | Cream L-shaped kitchen with copper tap, round copper wall sconces, oak table with oak chairs, terracotta pendants, white wooden blinds | Kremowa kuchnia z miedzianą baterią i kinkietami, dębowy stół i krzesła pod terakotowymi lampami | Kuchnia w kremie i dębie | dąb, krem, miedź | 4:5 `50% 55%` · 1:1 native · 3:2 `50% 55%` · 16:10 `50% 50%` |
| 4 | `dom-kuchnia-okno` | `dom-kuchnia-okno-800.webp` 800×800 | Dd7MLe-EVhN · 2026-09-30 | The same kitchen, front view: handleless cream fronts with leather pulls, window with blinds, copper tap, framed painting, lemons, oak chair backs in the foreground | Kremowa zabudowa kuchenna przy oknie z żaluzjami, miedziana bateria, cytryny i obraz na ścianie | Kremowa kuchnia przy oknie | krem, miedź, dąb | 4:5 `50% 40%` · 1:1 native · 3:2 `50% 40%` · 16:10 `50% 40%` |
| 5 | `dom-lazienka-wanna` | `dom-lazienka-wanna-800.webp` 800×800 | Dd7MLe-EVhN · 2026-09-30 | Bathroom: beige stone-look tiles, glossy vertical zellige-style tiles by the bath, blue-grey vanity with a countertop basin, wall-hung WC, rolled towels | Łazienka w beżach: wanna przy połyskliwych płytkach, niebieskoszara szafka z umywalką nablatową | Łazienka w beżu i błękicie | kamień, glazura, błękit | 4:5 `55% 50%` · 1:1 native · 3:2 `50% 55%` · 16:10 `50% 55%` |
| 6 | `dom-lazienka-prysznic-miedz` | `dom-lazienka-prysznic-miedz-800.webp` 800×800 | Dd7MLe-EVhN · 2026-09-30 | Second bathroom: walk-in shower with burgundy glossy tiles, brushed-copper fittings, freestanding basin, two abstract prints, blue-grey tall cabinets | Łazienka z prysznicem w bordowych płytkach, miedziane baterie, wolnostojąca umywalka i dwie grafiki | Prysznic z miedzianą armaturą | miedź, bordowa glazura, kamień | 4:5 `55% 50%` · 1:1 native · 3:2 `50% 50%` · 16:10 `50% 45%` |
| 7 | `dom-przedpokoj-laweczka` | `dom-przedpokoj-laweczka-800.webp` 800×800 | Dd7MLe-EVhN · 2026-09-30 | Hallway: upholstered grey bench, black-framed mirror, botanical wallpaper, hanging planters, blue-grey wardrobe with wooden knobs, pale stone floor | Przedpokój z tapicerowaną ławką, lustrem w czarnej ramie, wiszącymi doniczkami i niebieską szafą | Przedpokój z ławeczką | tkanina, kamień, drewno | 4:5 `45% 50%` · 1:1 native · 3:2 weak `50% 60%` · 16:10 weak |
| 8 | `wroclaw-salon-sofa-musztarda` | `wroclaw-salon-sofa-musztarda-800.webp` 800×800 | Dd4ZfGBEVhW · 2026-09-29 | Wrocław flat: grey sofa with mustard, geometric and black-and-white cushions, a dark green fringed throw, shaggy rug, white wire side table with grapes, wooden doors behind | Szara sofa z musztardowymi i graficznymi poduszkami, zielony pled i biały stolik w mieszkaniu we Wrocławiu | Salon z musztardowymi akcentami | tkanina, musztarda, drewno | 4:5 `45% 55%` · 1:1 native · 3:2 `50% 60%` · 16:10 `50% 60%` |
| 9 | `wroclaw-salon-aneks-zielony` | `wroclaw-salon-aneks-zielony-800.webp` 800×800 | Dd4ZfGBEVhW · 2026-09-29 | The same flat, wide view: lime-green kitchen units, wooden peninsula, small white dining table, terrace door with a deck, grey sofa, cream rug | Salon z aneksem we Wrocławiu: zielone fronty kuchni, drewniany blat, szara sofa i wyjście na taras | Salon z aneksem i tarasem | drewno, len, zieleń | 4:5 `55% 50%` · 1:1 native · 3:2 `50% 45%` · 16:10 `50% 40%` |
| 10 | `wroclaw-salon-regal` | `wroclaw-salon-regal-800.webp` 800×800 | Dd4ZfGBEVhW · 2026-09-29 | Wrocław flat: white bookcase styled with vases, books and a rattan basket, two white textured canvases, tripod lamp, low white bench | Biały regał z wazonami, książkami i koszem, dwa białe obrazy strukturalne oraz lampa na trójnogu | Regał i białe obrazy | biel, rattan, szkło | 4:5 `40% 50%` · 1:1 native · 3:2 `45% 55%` · 16:10 `45% 55%` |
| 11 | `wroclaw-sypialnia-rattan` | `wroclaw-sypialnia-rattan-800.webp` 800×800 | Dd4ZfGBEVhW · 2026-09-29 | Wrocław bedroom: woven rattan pendant, metal headboard, cognac and cream cushions, olive muslin throw, botanical print, white chest of drawers | Sypialnia z rattanową lampą, oliwkową narzutą, poduszkami w koniaku i grafiką z liśćmi | Sypialnia z rattanową lampą | rattan, muślin, ciepła biel | 4:5 `40% 50%` · 1:1 native · 3:2 `40% 45%` · 16:10 `40% 40%` |
| 12 | `kuchnia-orzech-stol` | `kuchnia-orzech-stol-800.webp` 800×800 | DclKEMjCsro · 2026-08-28 | Kitchen with walnut-look lower fronts, grey upper units, black tap, white worktop, solid wood table with hydrangea and grapes in the foreground | Kuchnia z frontami w orzechu i szarymi szafkami, drewniany stół z hortensją i winogronami | Kuchnia w orzechu | orzech, biel, czerń | 4:5 `50% 55%` · 1:1 native · 3:2 `50% 45%` · 16:10 `50% 45%` |
| 13 | `lazienka-lustro-organiczne` | `lazienka-lustro-organiczne-800.webp` 800×800 | DclKEMjCsro · 2026-08-28 | Grey bathroom seen through the shower glass: organic walnut-framed mirror, countertop basin on a white fluted vanity, black fittings, bathtub, wooden sculpture | Szara łazienka z organicznym lustrem w drewnianej ramie, ryflowaną szafką i czarną armaturą | Łazienka z organicznym lustrem | drewno, ryflowanie, czerń | 4:5 `50% 50%` · 1:1 native · 3:2 `50% 55%` · 16:10 `50% 55%` |
| 14 | `przedpokoj-lamele-kosz` | `przedpokoj-lamele-kosz-800.webp` 800×722 | DclKEMjCsro · 2026-08-28 | Hallway: white wardrobe with black edge pulls, beige fluted panelling, woven wood baskets with pink scarves on a bench, herringbone floor. **Cropped** to remove the "SPRZEDANE" banner along the bottom | Przedpokój z ryflowaną zabudową w beżu, białą szafą i plecionymi koszami na ławce | Przedpokój z lamelami | lamele, wiklina, dąb | 4:5 `55% 50%` · 1:1 `55% 50%` · 3:2 `50% 70%` · 16:10 weak |
| 15 | `salon-sofa-rudy-akcent` | `salon-sofa-rudy-akcent-800.webp` 800×800 | DclKEMjCsro · 2026-08-28 | Living room: cream chaise sofa, rust bouclé ball cushion, white doughnut cushion, striped cushion, black round coffee table, beige curtain, herringbone floor | Kremowa sofa z rudymi i białymi poduszkami bouclé, czarny okrągły stolik i jodełka na podłodze | Salon w kremie i rudym | bouclé, len, jodełka | 4:5 `50% 55%` · 1:1 native · 3:2 `50% 60%` · 16:10 `50% 60%` |
| 16 | `salon-jadalnia-jodelka-otwarta` | `salon-jadalnia-jodelka-otwarta-800.webp` 800×800 | DclKEMjCsro · 2026-08-28 | Open-plan room: wooden dining table with woven-seat chairs, amber glass pendants, a round rattan-framed mirror, walnut kitchen behind, black coffee table, herringbone oak | Salon z jadalnią: drewniany stół, bursztynowe lampy, okrągłe lustro i kuchnia w orzechu na jodełce | Jadalnia w ciepłym drewnie | dąb, orzech, bursztynowe szkło | 4:5 `40% 50%` · 1:1 native · 3:2 `50% 45%` · 16:10 `50% 45%` **(hero candidate)** |
| 17 | `salon-sofa-grafiki` | `salon-sofa-grafiki-800.webp` 800×800 | DclKEMjCsro · 2026-08-28 | Close detail of the same sofa: two black-framed abstract prints, white and rust bouclé cushions, hydrangea in an amber glass vase, candle | Detal salonu: kremowa sofa, poduszki bouclé, hortensja w bursztynowym wazonie i dwie grafiki | Detal: sofa i grafiki | bouclé, szkło, czerń | 4:5 `50% 50%` · 1:1 native · 3:2 `50% 55%` · 16:10 `50% 55%` |
| 18 | `wynajem-kuchnia-okragly-stol` | `wynajem-kuchnia-okragly-stol-800.webp` 800×1008 | DX_pmnPij82 · 2026-05-06 | Rental flat: new white kitchen with an oak-look worktop and splashback, under-cabinet LEDs, built-in microwave, round oak table, taupe velvet chairs, smoked-glass pendant, lilac | Nowa biała kuchnia z blatem w dębie, okrągły stół, aksamitne krzesła i lampa z dymionego szkła | Kuchnia w mieszkaniu na wynajem | dąb, biel, aksamit | 4:5 `50% 55%` · 1:1 `50% 60%` · 3:2 `50% 55%` · 16:10 `50% 50%` |
| 19 | `wynajem-kuchnia-zaslony` | `wynajem-kuchnia-zaslony-800.webp` 800×1008 | DX_pmnPij82 · 2026-05-06 | The same flat seen from the sofa: dining set by a window with cream curtains and sheers, kitchen line with oven, blue sofa with a checked cushion in the foreground | Kącik jadalniany przy oknie z zasłonami i kuchnia w bieli i dębie, w tle mieszkanie na wynajem | Jadalnia przy oknie | len, dąb, aksamit | 4:5 `50% 45%` · 1:1 `50% 45%` · 3:2 `50% 40%` · 16:10 `50% 40%` |
| 20 | `wynajem-salon-kuchnia` | `wynajem-salon-kuchnia-800.webp` 800×1008 | DX_pmnPij82 · 2026-05-06 | Rental flat, wide view: kitchen with oak splashback, round table, taupe chairs, blue sofa with mustard and checked cushions, oak floor | Salon z aneksem w mieszkaniu na wynajem: biało-dębowa kuchnia, okrągły stół i niebieska sofa | Salon z aneksem na wynajem | dąb, biel, musztarda | 4:5 `50% 50%` · 1:1 `50% 55%` · 3:2 `50% 50%` · 16:10 `50% 45%` |
| 21 | `wynajem-jadalnia-lampa` | `wynajem-jadalnia-lampa-800.webp` 800×1008 | DX_pmnPij82 · 2026-05-06 | Symmetric dining nook: round oak table on black star legs, four velvet chairs, smoked-glass pendant, lilac in a black vase, cream curtain backdrop | Okrągły dębowy stół z czterema aksamitnymi krzesłami pod lampą z dymionego szkła, na tle zasłon | Kącik jadalniany | dąb, aksamit, len | 4:5 native-ish `50% 50%` · 1:1 `50% 60%` · 3:2 `50% 65%` · 16:10 weak |
| 22 | `wynajem-sypialnia-grafiki` | `wynajem-sypialnia-grafiki-800.webp` 800×1008 | DX_pmnPij82 · 2026-05-06 | Refreshed bedroom, front view: taupe upholstered headboard, layered white and striped cushions, cream knit blanket, grey plush throw, two abstract prints | Odświeżona sypialnia: tapicerowane wezgłowie, białe poduszki, kremowy koc i dwie abstrakcyjne grafiki | Sypialnia w jasnych tkaninach | len, dzianina, ciepła biel | 4:5 `50% 55%` · 1:1 `50% 60%` · 3:2 `50% 60%` · 16:10 `50% 60%` |
| 23 | `wynajem-sypialnia-biurko-okno` | `wynajem-sypialnia-biurko-okno-800.webp` 800×1008 | DX_pmnPij82 · 2026-05-06 | Bright bedroom with a window and sheers: bed with a beige headboard and a camel throw, oak desk on white drawers, velvet chair, eucalyptus | Jasna sypialnia z biurkiem przy oknie, beżowym wezgłowiem, karmelowym pledem i firanami | Sypialnia z kącikiem do pracy | dąb, len, karmel | 4:5 `50% 55%` · 1:1 `50% 60%` · 3:2 `50% 55%` · 16:10 `50% 55%` |
| 24 | `wynajem-sypialnia-biurko` | `wynajem-sypialnia-biurko-800.webp` 800×1008 | DX_pmnPij82 · 2026-05-06 | The bedroom from photo 22 seen from the corner: rattan pendant, oak desk with white drawers, velvet chair, aloe, two prints, bed with a blue plush throw | Sypialnia z rattanową lampą, biurkiem z szufladami, aksamitnym krzesłem i niebieskim pledem | Sypialnia z biurkiem | rattan, dąb, ciepła biel | 4:5 `50% 55%` · 1:1 `50% 60%` · 3:2 `50% 65%` · 16:10 `50% 65%` |
| 25 | `sypialnia-czapla-tapeta` | `sypialnia-czapla-tapeta-540.webp` 540×960 | DXPt5irkcjP (reel cover) · 2026-04-17 | Bedroom of the investment flat: hand-painted heron mural wallpaper, upholstered greige bed, blush knit throw, bouclé doughnut cushion, blush floor-length curtains, herringbone floor. Low resolution, from a video frame | Sypialnia z tapetą z czaplą, tapicerowanym łóżkiem, różowym pledem i zasłonami do podłogi | Sypialnia z czaplą | tapeta, dzianina, jodełka | 9:16 native · 4:5 `50% 60%` · 1:1 `50% 65%` · keep ≤270 CSS px wide |
| 26 | `inwestycja-salon-kinkiety` | `inwestycja-salon-kinkiety-800.webp` 800×600 | DXKuh66DDpO · 2026-04-15 | Investment flat living room: light grey sofa, rust bouclé ball and giraffe-pattern cushions, two white wall sconces, tall white radiator, lily buds in the foreground | Jasna sofa z rudymi poduszkami pod dwoma kinkietami, biały grzejnik i lilie na pierwszym planie | Salon w ciepłej bieli | bouclé, biel, rudy akcent | 4:5 `65% 50%` · 1:1 `60% 50%` · 3:2 native-ish `50% 50%` · 16:10 `50% 55%` |
| 27 | `inwestycja-kuchnia-ryflowana` | `inwestycja-kuchnia-ryflowana-800.webp` 800×600 | DXKuh66DDpO · 2026-04-15 | Kitchen run: fluted white upper fronts and a fluted splashback, warm grey lower fronts with black handles, black tap, induction hob, lilies in a glass vase | Kuchnia z ryflowanymi frontami i panelem nad blatem, szare szafki dolne i czarna bateria | Ryflowana kuchnia | ryflowanie, biel, czerń | 4:5 `40% 50%` · 1:1 `40% 50%` · 3:2 `50% 50%` · 16:10 `50% 50%` |
| 28 | `inwestycja-kuchnia-bordowa-lampa` | `inwestycja-kuchnia-bordowa-lampa-800.webp` 800×600 | DXKuh66DDpO · 2026-04-15 | Same kitchen, front view: glossy burgundy pendant in the foreground, fluted uppers, black tap and hob, mirrored panel, fruit and basil | Biała kuchnia z ryflowanymi frontami i bordową lampą wiszącą, czarna bateria i bazylia | Kuchnia z bordową lampą | ryflowanie, bordo, biel | 4:5 `50% 50%` · 1:1 `50% 50%` · 3:2 `50% 50%` · 16:10 `50% 45%` |
| 29 | `inwestycja-lazienka-lastryko` | `inwestycja-lazienka-lastryko-800.webp` 800×600 | DXKuh66DDpO · 2026-04-15 | Bathroom: terrazzo tiles, oval countertop basin, brushed-copper wall tap, oak-look vanity, white tall cabinet, gold-framed mirror, tulips | Łazienka z lastryko: umywalka nablatowa, miedziana bateria podtynkowa i szafka w kolorze dębu | Łazienka z lastryko | lastryko, miedź, dąb | 4:5 `35% 50%` · 1:1 `40% 50%` · 3:2 `45% 50%` · 16:10 `45% 50%` |
| 30 | `inwestycja-prysznic-lastryko` | `inwestycja-prysznic-lastryko-800.webp` 800×600 | DXKuh66DDpO · 2026-04-15 | Detail: glass shower with terrazzo walls, a band of vertical tiles and a copper shower set, white wardrobe on the left | Prysznic za szklaną ścianką: lastryko, pas pionowych płytek i miedziana słuchawka | Prysznic w lastryko | lastryko, miedź, szkło | 4:5 `70% 50%` · 1:1 `70% 50%` · 3:2 `60% 50%` · 16:10 `60% 50%` |
| 31 | `inwestycja-sypialnia-tapeta` | `inwestycja-sypialnia-tapeta-800.webp` 800×600 | DXKuh66DDpO · 2026-04-15 | Bedroom (same room as photo 25): botanical mural, greige upholstered bed, blush knit throw, camel and bouclé cushions, cream curtains, herringbone oak | Sypialnia z tapetą botaniczną, tapicerowanym łóżkiem, różowym pledem i kremowymi zasłonami | Sypialnia z tapetą | tapeta, dzianina, jodełka | 4:5 `45% 50%` · 1:1 `45% 50%` · 3:2 `50% 50%` · 16:10 `50% 50%` |

## Discarded

| Source | Reason |
|---|---|
| `DXKuh66DDpO` #1 | Visual duplicate of `salon-kuchnia-jodelka`, which is already on the site at a higher resolution |
| `DclKEMjCsro` #7 | Visual duplicate (tighter crop) of `sypialnia-wezglowie` |
| `Dd4ZfGBEVhW` #5 | Byte-identical to #4 (`wroclaw-sypialnia-rattan`) |
| `DX_pmnPij82` #2 | Near-duplicate close-up of #1 (same kitchen, same angle) |
| `DXKuh66DDpO` #7 | Motion-blurred doorway shot |
| `DXKuh66DDpO` #9 | Blurred mirror and bench shot, visible wall stains |

None of the 6 posts contains a portrait of Sylwia. The profile picture is exposed only at 100×100, which is smaller than the existing `sylwia-320.webp`, so there is no `sylwia-ig`.

## Posts and captions (verbatim)

Captions are copied exactly as posted, with emoji and hashtags kept.

### Dd7MLe-EVhN · 2026-09-30 · carousel 7 → photos 1–7 (`dom-*`)
> Realizacja domu 🏡
>
> Minimalistyczne wnętrze, naturalne materiały, gra światła i funkcjonalność.
>
> Prosto, spokojnie i ponadczasowo – z dbałością o każdy detal.
>
> #homestaging #realizacja #wnetrza #minimalizm #dom #gdynia #nieruchomosci #projektwnetrz #pomorskie

### Dd4ZfGBEVhW · 2026-09-29 · carousel 5 → photos 8–11 (`wroclaw-*`)
> Jedna z moich realizacji we Wrocławiu 🤍
>
> Przygotowanie nieruchomości do sprzedaży, uporządkowanie przestrzeni i odpowiednie przygotowanie wnętrza do zdjęć.
>
> Efekt? Nieruchomość szybko znalazła nowego właściciela.
>
> Dziś działam już również w Trójmieście i okolicach, pomagając właścicielom przygotować mieszkania i domy do sprzedaży.
>
> 📩 Jeśli planujesz sprzedaż nieruchomości — zapraszam do kontaktu.

### DclKEMjCsro · 2026-08-28 · carousel 7 → photos 12–17
> Każda sprzedaż zaczyna się od dobrego pierwszego wrażenia.
>
> To właśnie ono sprawia, że zatrzymujemy się przy zdjęciu, chcemy zobaczyć więcej i umawiamy się na prezentację.
>
> Tutaj historia kończy się jednym słowem:
>
> SPRZEDANE. 🤍

### DX_pmnPij82 · 2026-05-06 · carousel 8 → photos 18–24 (`wynajem-*`)
> Metamorfoza mieszkania pod wynajem – mały budżet, przemyślany efekt
>
> W tym projekcie skupiliśmy się nie tylko na wymianie kuchni i zakupie nowych sprzętów AGD, ale również na odświeżeniu sypialni. Całość została zaprojektowana tak, aby stworzyć spójną, neutralną i przyjemną przestrzeń dla przyszłych najemców.
>
> Kuchnia zyskała nową, funkcjonalną zabudowę i nowoczesne wyposażenie, a sypialnia – lekkość, harmonię i komfort. Jasna kolorystyka, miękkie tkaniny i subtelne dodatki budują atmosferę, w której łatwo się odnaleźć.
>
> To właśnie takie detale sprawiają, że mieszkanie wyróżnia się na tle innych ofert i szybciej znajduje najemcę
>
> Home staging to sztuka podejmowania dobrych decyzji – nawet przy ograniczonym budżecie.
>
> #homestaging #wynajem #metamorfoza #sypialnia #kuchnia #wnętrza #nieruchomości #stylistaging

### DXPt5irkcjP · 2026-04-17 · reel → photo 25 (cover)
> Minimalizm nie musi być chłodny! Może budować emocje, spokój i poczucie „tu chcę być”.
>
> W tym projekcie inwestycyjnym postawiłam na ponadczasową bazę — światło, proporcje i drewnianą podłogę w jodłę, która ociepla całość. To wnętrze nie dominuje.
>
> Ono pozwala przyszłemu właścicielowi się w nim odnaleźć.
>
> Jeśli chcesz przygotować nieruchomość, która sprzedaje się szybciej i lepiej — napisz do mnie ✉️

### DXKuh66DDpO · 2026-04-15 · carousel 9 → photos 26–31 (`inwestycja-*`), plus `salon-kuchnia-jodelka` (#1, already on the site)
> Realizacja: projekt inwestycyjny.
> Nowoczesna przestrzeń przygotowana w duchu home stagingu, z myślą o jej przyszłym odbiorze i potencjale rynkowym.
>
> Stonowana paleta, światło i prostota formy pozwalają wybrzmieć temu, co najważniejsze — przestrzeni i funkcjonalności wnętrza.
>
> Delikatne opracowanie detali sprawia, że mieszkanie staje się bardziej czytelne, atrakcyjne i gotowe na nowych właścicieli.
>
> 🤍 Stylistaging
>
> #homestaging #projektinwestycyjny #nieruchomosci #wnetrza #designwnetrz #nowoczesnewnetrze #sprzedaznieruchomosci #realestatepoland #wnetrzarswo #minimalizm #staging #interiordesign

## Facts from the captions for site copy

- **Where she works:** Wrocław (a past project: "Jedna z moich realizacji we Wrocławiu"). She now also works in **Trójmiasto i okolice** ("Dziś działam już również w Trójmieście i okolicach"). The house project is tagged `#gdynia #pomorskie`. *Note: the existing `MANIFEST.md` alt text says "home stagerka z Wrocławia", so the site copy should mention both.*
- **Services named:**
  - przygotowanie nieruchomości do sprzedaży
  - uporządkowanie przestrzeni
  - przygotowanie wnętrza do zdjęć
  - metamorfoza mieszkania pod wynajem, including wymiana kuchni, zakup nowych sprzętów AGD and odświeżenie sypialni
  - projekty inwestycyjne (staging for investors / developers)
  - realizacja domu (a whole house)
- **Clients:** "właściciele" preparing "mieszkania i domy do sprzedaży", investors ("projekt inwestycyjny"), and landlords ("mieszkanie pod wynajem… dla przyszłych najemców").
- **Results she claims (no numbers given):** "Nieruchomość szybko znalazła nowego właściciela", "SPRZEDANE", "szybciej znajduje najemcę", "sprzedaje się szybciej i lepiej".
- **Prices:** none in these captions. The only budget mention is "mały budżet" / "nawet przy ograniczonym budżecie".
- **Brand name in use:** "Stylistaging" (also `#stylistaging`), next to the handle `styli_staging`.
- **CTAs she uses:** "📩 Jeśli planujesz sprzedaż nieruchomości — zapraszam do kontaktu." · "Jeśli chcesz przygotować nieruchomość, która sprzedaje się szybciej i lepiej — napisz do mnie ✉️"
- **Phrases she uses:**
  - "Każda sprzedaż zaczyna się od dobrego pierwszego wrażenia."
  - "Home staging to sztuka podejmowania dobrych decyzji – nawet przy ograniczonym budżecie."
  - "Minimalizm nie musi być chłodny!"
  - "poczucie „tu chcę być”"
  - "To wnętrze nie dominuje. Ono pozwala przyszłemu właścicielowi się w nim odnaleźć."
  - "z myślą o jej przyszłym odbiorze i potencjale rynkowym"
  - "mieszkanie staje się bardziej czytelne, atrakcyjne i gotowe na nowych właścicieli"
  - "Prosto, spokojnie i ponadczasowo – z dbałością o każdy detal."
  - "wyróżnia się na tle innych ofert"
- **Recurring style words:** minimalizm, naturalne materiały, światło, proporcje, ponadczasowa baza, stonowana / jasna / neutralna paleta, miękkie tkaniny, subtelne dodatki, drewniana podłoga w jodłę.
