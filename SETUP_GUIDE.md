# Op Tijd. Website - Setup Guide

## 📋 Wat je hebt ontvangen

Je hebt een complete, professionele website ontvangen met:

### Pagina's:
- `index.html` - Homepage met app screenshot en alle features
- `about.html` - Over ons pagina met het verhaal achter Op Tijd.
- `contact.html` - Contactpagina met werkend formulier
- `faq.html` - Veelgestelde vragen met accordion
- `privacy.html` - Privacy policy (bestaand, bijgewerkt)

### Assets:
- `style.css` - Volledig vernieuwde, professionele styling
- `script.js` - JavaScript met FormSpree integratie en interacties

## 🚀 Installatie

### Stap 1: Upload alle bestanden

Upload alle bestanden naar je webserver via FTP of cPanel:
```
/public_html/
  ├── index.html
  ├── about.html
  ├── contact.html
  ├── faq.html
  ├── privacy.html
  ├── style.css
  ├── script.js
  └── assets/ (maak deze folder aan)
```

### Stap 2: Configureer FormSpree (Email Functionaliteit)

Het contactformulier is ingesteld om automatisch emails te sturen naar **stijn.wouters@hotmail.com**.

**Belangrijke stappen:**

1. Ga naar [https://formspree.io](https://formspree.io)
2. Maak een gratis account aan
3. Klik op "New Form"
4. Vul in:
   - **Name**: Op Tijd Contact Form
   - **Email**: stijn.wouters@hotmail.com (dit is waar berichten naartoe gaan)
5. Je krijgt een Form ID zoals: `xpzbkjlm`
6. Open `contact.html` en vervang op **regel 93**:
   ```html
   <form id="contactForm" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Met:
   ```html
   <form id="contactForm" class="contact-form" action="https://formspree.io/f/xpzbkjlm" method="POST">
   ```
7. Open `script.js` en vervang op **regel 111**:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
   Met:
   ```javascript
   const response = await fetch('https://formspree.io/f/xpzbkjlm', {
   ```

**Klaar!** Formulieren worden nu automatisch naar je email gestuurd.

### Stap 3: Beta TestFlight Link

In `index.html` op **regel 90**, vervang:
```html
<a href="https://testflight.apple.com/join/your-link" class="btn btn-beta" target="_blank" rel="noopener">
```

Met je echte TestFlight link.

### Stap 4: Maak Assets Folder

Maak een `assets/` folder en voeg toe:

1. **Favicon** (`favicon.svg`):
```svg
<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="120" rx="25" fill="#f1c40f"/>
    <circle cx="60" cy="60" r="35" stroke="#4a4a4a" stroke-width="4" fill="none"/>
    <line x1="60" y1="60" x2="60" y2="35" stroke="#4a4a4a" stroke-width="4" stroke-linecap="round"/>
    <line x1="60" y1="60" x2="75" y2="60" stroke="#4a4a4a" stroke-width="4" stroke-linecap="round"/>
</svg>
```

2. **OG Image** (`og-image.jpg`) - Maak een 1200x630px afbeelding voor social media shares

## ✨ Nieuwe Features

### 1. Professionele App Screenshot
De homepage toont nu een realistisch iPhone mockup met:
- Live app interface
- Meerdere routines zichtbaar
- Progress tracking
- Floating statistische kaarten

### 2. Responsive Navigation
- Werkt perfect op mobiel met hamburger menu
- Sticky header die meescrollt
- Active page indicators

### 3. Contactformulier met Email
- Automatische emails naar stijn.wouters@hotmail.com
- Character counter (max 1000 chars)
- Realtime validatie
- Loading states
- Success/error berichten

### 4. FAQ Pagina met Accordion
- 20 veelgestelde vragen
- Smooth open/sluit animaties
- Categorieën voor overzicht

### 5. Over Ons Pagina
- Volledig verhaal
- Missie en waarden
- Team sectie
- Timeline van de ontwikkeling

### 6. Enhanced Styling
- Modern design systeem
- Consistent kleurenschema
- Smooth animaties
- Perfect responsive
- Professionele typografie

## 🎨 Kleuren Aanpassen

In `style.css` bovenaan (regel 7-20):
```css
:root {
    --accent: #f1c40f;        /* Hoofdkleur (geel) */
    --accent-dark: #d4ac0d;   /* Donkere variant */
    --success: #2ecc71;       /* Groene accenten */
    --bg: #FFFEF0;           /* Achtergrond */
    --text: #4a4a4a;         /* Tekstkleur */
}
```

## 📱 Testen

### Lokaal testen:
1. Open `index.html` in je browser
2. Test alle links en navigatie
3. Vul het contactformulier in (let op: FormSpree werkt alleen online)

### Online testen:
1. Upload naar je server
2. Test op verschillende apparaten
3. Test het contactformulier
4. Controleer emails bij stijn.wouters@hotmail.com

## 🔧 Veelvoorkomende Aanpassingen

### Beta Link Aanpassen
`index.html` regel 90 en `contact.html` regel 66

### Email Adres Wijzigen
1. FormSpree instellingen
2. Footer links (alle HTML bestanden)
3. Privacy policy

### Social Media Links
Footer op alle pagina's - voeg je Instagram/Twitter toe

### Teksten Aanpassen
Alle teksten zijn in HTML - gewoon zoeken en vervangen!

## 🐛 Troubleshooting

### Formulier werkt niet
- Controleer of je de FormSpree ID hebt ingevuld
- Check of je online bent (werkt niet lokaal)
- Kijk in browser console (F12) voor errors

### Styling ziet er raar uit
- Clear browser cache (Ctrl + Shift + R)
- Controleer of `style.css` correct is geüpload

### Mobile menu werkt niet
- Controleer of `script.js` correct is geüpload
- Kijk in browser console voor JavaScript errors

## 📧 Support

Vragen? Email naar stijn.wouters@hotmail.com

## 🎉 Klaar voor Launch!

Je website is professioneel, responsive en klaar voor gebruik. Succes met Op Tijd.!

---
Gemaakt met ❤️ voor Op Tijd.
