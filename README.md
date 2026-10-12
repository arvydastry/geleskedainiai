# Auksės darbeliai – demo dizainas (WP + WooCommerce / Xstore)

Statinis HTML demo, kaip atrodytų e. parduotuvė, įkvėpta
https://arvydastry.github.io/geliusalonas/ (serif + sans tipografika, šiltas šviesus fonas, pill mygtukai).

## Failai
- `index.html` – pradinis puslapis (hero, USP, kategorijos, populiariausios prekės, apie, individualūs užsakymai, žingsniai, atsiliepimai, galerija, naujienlaiškis, footer)
- `parduotuve.html` – prekių puslapis (filtrai šoninėje juostoje, rikiavimas, prekių tinklelis, CTA)
- `assets/css/style.css` – dizaino sistema (spalvos, šriftai, komponentai, responsive)
- `assets/js/main.js` – reveal animacijos, mobilus meniu, demo krepšelis / norų sąrašas, filtrai
- `assets/img/products/*.jpg` – 11 prekių nuotraukų ant vienodo studijinio fono (1000×1000)
- `assets/img/hero-bouquet.png` – iškirpta puokštė su permatomu fonu (hero sekcijai)
- `prekes-woocommerce.csv` – prekių sąrašas WooCommerce importui (Products → Import)

## Prekių šaltinis
Nuotraukos ir vienintelis pilnas aprašas (prekė AD-001, 40 €) – iš Facebook grupės
„Aukses Darbeliai“ (https://www.facebook.com/groups/1241429364391938).
Be prisijungimo Facebook rodo tik dalį įrašų, todėl AD-002…AD-005 kainos ir aprašai
yra DEMO (sukurti pagal nuotraukas) – pažymėta CSV stulpelyje `Meta: _kainos_saltinis`.

## Perkėlimas į Xstore
- Spalvos / šriftai: Xstore → Theme Options → Typography & Colors (žr. `:root` kintamuosius `style.css`)
- Header: Xstore Header Builder – topbar + logo centre / kairėje + ikonos dešinėje
- Hero, USP, kategorijos, band, žingsniai, atsiliepimai – Elementor sekcijos pagal `index.html`
- Prekių kortelė: Xstore → Shop → Product card (hover antra nuotrauka, wishlist, „Į krepšelį“)
- Parduotuvės filtrai: Xstore sidebar + WooCommerce layered nav / Xstore AJAX filtrai
