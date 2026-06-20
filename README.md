# Op Tijd. Website

Een rustige, professionele website voor de ADHD-vriendelijke routine-app **Op Tijd.**

## 📁 Bestanden

- `index.html` - Hoofdpagina met hero, features, beta-testlink en contactformulier
- `privacy.html` - Complete privacy policy pagina
- `style.css` - Alle styling (rustige, minimalistische design)
- `script.js` - JavaScript voor formulier en interacties

## 🚀 Installatie

### Optie 1: Direct gebruiken
1. Upload alle bestanden naar je webserver
2. De website werkt meteen!

### Optie 2: Lokaal testen
1. Open `index.html` in je browser
2. De website werkt volledig offline

## ⚙️ Configuratie

### Beta-testlink aanpassen
In `index.html` op regel 56, vervang de placeholder link:

```html
<a href="https://your-testflight-or-beta-link-here.com" class="cta cta-beta" target="_blank" rel="noopener">
```

Met jouw echte TestFlight of Google Play Beta link.

### Contactformulier werkend maken

Het contactformulier is nu geconfigureerd als client-side demo. Voor productie heb je 3 opties:

#### Optie A: FormSpree (Eenvoudigst - Gratis tot 50 submissions/maand)
1. Ga naar [formspree.io](https://formspree.io)
2. Maak een gratis account
3. Vervang in `script.js` regel 34-43 met:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
});

if (!response.ok) {
    throw new Error('Verzenden mislukt');
}
```

#### Optie B: EmailJS (Gratis tot 200 emails/maand)
1. Ga naar [emailjs.com](https://emailjs.com)
2. Configureer je email service
3. Voeg EmailJS script toe aan `index.html` voor `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

4. Vervang in `script.js` de fetch call met EmailJS code

#### Optie C: Eigen backend
1. Maak een API endpoint (bijv. PHP, Node.js, Python)
2. Vervang in `script.js` regel 34 de URL met jouw endpoint
3. Handle POST request met JSON body

### E-mailadres privacy policy aanpassen
In `privacy.html` op regel 261, vervang:

```html
<strong>E-mail:</strong> privacy@optijd.app<br>
```

Met jouw echte e-mailadres.

## 🎨 Kleuren aanpassen

In `style.css` bovenaan staan alle kleuren als CSS variabelen:

```css
:root {
    --accent: #f1c40f;        /* Goud accent kleur */
    --accent-dark: #d4ac0d;   /* Donkerder goud */
    --success: #2ecc71;       /* Groen voor success */
    --bg: #fffef0;            /* Achtergrond kleur */
    --text: #4a4a4a;          /* Hoofdtekst kleur */
    /* etc. */
}
```

Pas deze aan naar jouw huisstijl.

## 📱 Features

### ✅ Wat werkt nu al
- Volledig responsive design (mobiel, tablet, desktop)
- Smooth scroll navigatie
- Geanimeerde secties
- Contactformulier validatie (client-side)
- Privacy policy pagina
- Beta-testlink sectie
- SEO-vriendelijke HTML

### 🔄 Wat je moet configureren
- [ ] Beta-testlink (TestFlight of Google Play Beta)
- [ ] Contactformulier backend (FormSpree, EmailJS, of custom)
- [ ] E-mailadres in privacy policy
- [ ] Google Analytics (optioneel)
- [ ] Favicon toevoegen (optioneel)

## 🧪 Contactformulier testen

Het formulier werkt nu in "demo mode":
- Valideert alle velden
- Toont success/error berichten
- Logt data naar browser console (F12 → Console)

Voor productie: kies een van de backend opties hierboven.

## 🔒 Privacy & GDPR

De privacy policy is volledig AVG-compliant en bevat:
- Welke data wordt verzameld
- Hoe data wordt gebruikt
- Gebruikersrechten
- Bewaartermijnen
- Contact voor privacy vragen

Pas de tekst aan op basis van je daadwerkelijke data-verwerking.

## 📊 Analytics toevoegen (Optioneel)

### Google Analytics (privacy-vriendelijk)
Voeg toe voor `</head>` in beide HTML bestanden:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true
  });
</script>
```

### Plausible Analytics (privacy-first alternatief)
```html
<script defer data-domain="jouwdomain.nl" src="https://plausible.io/js/script.js"></script>
```

## 🌐 SEO Optimalisatie

De website is al SEO-friendly, maar voeg toe:

1. **Favicon** - Voeg toe in `<head>`:
```html
<link rel="icon" type="image/png" href="favicon.png">
```

2. **Open Graph tags** voor social media:
```html
<meta property="og:title" content="Op Tijd. — Rust in je routines">
<meta property="og:description" content="ADHD-vriendelijke routine-app">
<meta property="og:image" content="https://jouwdomain.nl/og-image.jpg">
```

3. **Sitemap.xml** - Genereer via [xml-sitemaps.com](https://www.xml-sitemaps.com)

## 🚀 Deployment Tips

### Netlify (Gratis hosting)
1. Drag & drop alle bestanden naar [netlify.com/drop](https://netlify.com/drop)
2. Klaar!

### Vercel
1. Installeer Vercel CLI: `npm i -g vercel`
2. Run `vercel` in de folder
3. Volg de instructies

### Traditional hosting (SiteGround, Hostinger, etc.)
1. Upload via FTP naar `/public_html`
2. Klaar!

## 📝 Licentie

Deze website is gemaakt voor Op Tijd. Alle rechten voorbehouden.

## 💬 Support

Voor vragen over de website code:
- Open een issue
- Of neem contact op via het contactformulier op de website

---

Gemaakt met ❤️ voor mensen die structuur zoeken zonder druk.
