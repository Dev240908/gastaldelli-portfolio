# Listino Prezzi — Brian Gastaldelli
*Freelancer digitale AI-powered — Aggiornato: 2026-04-17*
*Logica di calcolo visibile. Aggiorna le variabili nella sezione "Fondamenta" quando cambia il mercato.*

---

## Fondamenta (aggiorna qui, i prezzi si ricalcolano)

```
TARIFFA_ORA_BASE = 45€/h       # Competitivo Verona, non sotto-mercato junior
EFFICIENZA_AI = 0.55            # AI riduce tempo del 45%, quindi moltiplico per 0.55
TARIFFA_ORA_EFFETTIVA = 45 * (1/0.55) ≈ 82€/h equivalente al cliente
MARKUP_OVERHEAD = 1.25          # Tasse, tools, marketing, margine rischio
VOUCHER_CCIAA = "max 6.500€ su investimenti 4-15k€ — segnalarlo ai clienti PMI Verona"
```

---

## 1. SITI WEB (One-shot)

### Tier A — Vetrina Essenziale
**Prezzo: da €990** *(sweet spot mercato Veneto: €1.200-1.800)*

Cosa include:
- 5 pagine (Home, Chi siamo, Servizi, Portfolio, Contatti)
- Design mobile-first responsivo
- SEO tecnico base (meta, sitemap, robots)
- Google Analytics 4 collegato
- Form contatto funzionante
- Hosting primo mese incluso
- Consegna: 10 giorni lavorativi

Target: micro-imprese locali (artigiani, studi professionali 1-2 persone, negozi)
Soglia psicologica: sotto €1.500 → "ok vediamo"

---

### Tier B — Sito Business PRO ⭐ *[più scelto]*
**Prezzo: da €1.890**

Cosa include (tutto il Tier A più):
- Fino a 10 pagine + blog/news
- CMS per aggiornare i contenuti da soli
- Google My Business ottimizzato
- Page speed ottimizzata (Lighthouse ≥90)
- Integrazione prenotazioni (Calendly / Cal.com)
- 1 mese di supporto post-lancio
- Consegna: 15 giorni lavorativi

Target: PMI locali con clienti da acquisire online, studi professionali
Nota: tier ideale per le cold email — sotto soglia "no" PMI <10 dip. (€3.000)

---

### Tier C — Su Misura
**Prezzo: da €3.900** *(da qui attivo discorso voucher CCIAA Verona)*

Cosa include (tutto il Tier B più):
- E-commerce (Shopify / custom Next.js)
- Automazioni integrate (CRM, email marketing, booking)
- Area riservata clienti
- Multilingua
- Integrazioni gestionali
- 3 mesi supporto + training staff

Target: hotel, ristoranti con prenotazione, e-commerce alimentare/DOP, agenzie
CTA: "Parliamone → call 20 minuti gratuita"

---

### Add-on siti (prezzi separati, vendibili con qualsiasi tier)
| Servizio | Prezzo |
|----------|--------|
| Manutenzione annuale forfait | €490/anno |
| SEO base (3 mesi, report mensile) | €390/mese |
| Articoli blog (4/mese, copywriting AI-assistito) | €290/mese |
| Landing page singola aggiuntiva | €490 |
| Migrazione da vecchio sito | €290-590 |
| Integrazione Google Reviews + widget | €190 |

---

## 2. AUTOMAZIONI E BOT

### Bot / Workflow semplice
**Prezzo: €490-890**

- Chatbot FAQ per sito o WhatsApp Business
- Workflow N8N: form → notifica email/Telegram → CRM
- Automazione social media posting (buffer/scheduling)
- Risposta automatica email con AI

---

### Pipeline automatizzata media
**Prezzo: €890-1.890**

- Lead generation automatizzata (Google Maps → email → CRM)
- Bot Telegram/WhatsApp con integrazione CRM
- Workflow multi-step con condizioni e error handling
- Integrazione 2-3 piattaforme (es. Stripe → Notion → Gmail)
- Automazione ordini/prenotazioni

---

### Sistema di automazione completo
**Prezzo: €1.890-3.900**

- Pipeline outreach automatizzata end-to-end
- CRM self-hosted (EspoCRM) + integrazione completa
- Dashboard reporting personalizzata
- Sistema di follow-up automatico multi-canale
- Training e documentazione inclusi

---

### Monitoring mensile automazioni (retainer leggero)
**Prezzo: €90-190/mese**
Monitoraggio uptime, alert errori, piccole modifiche, report mensile.
*Nota: no retainer pesante. Questo è un "care plan" light, vendibile facilmente dopo progetto.*

---

## 3. SEO

| Pacchetto | Cosa include | Prezzo/mese |
|-----------|-------------|-------------|
| SEO Starter | Audit iniziale + 2 articoli + monitoring keyword | €390 |
| SEO Growth | 4 articoli + link building locale + report avanzato | €690 |
| SEO Local Pro | GMB + recensioni + local pack + NAP | €490 |

*Contratto minimo 3 mesi. Risultati visibili da mese 2-3.*

---

## 4. CONSULENZA

| Tipo | Prezzo |
|------|--------|
| Call strategica 1h | €90 |
| Audit sito esistente + report scritto | €290 |
| Workshop digitalizzazione PMI (mezza giornata) | €490 |
| Formazione team su strumenti digitali (giornata) | €890 |

---

## 5. PACCHETTI VERTICALI (nicchie prioritarie)

### Hotel & Hospitality
**€2.490** — Sito + booking diretto (Beds24/Smoobu) + GMB + pricing stagionale
*Posizionamento: "le OTA ti prendono il 20-25%. 10 prenotazioni dirette in più pagano questo investimento."*

### Ristorante & Food
**€1.490** — Sito + menu digitale QR + integrazione TheFork/OpenTable + GMB
*Consegna: 10 giorni. Ideale per aperture nuove attività.*

### Studio Professionale
**€1.890** — Sito sobrio + prenotazione online + area download documenti + GDPR
*Target: commercialisti, avvocati, consulenti, studi medici*

### Produttori DOP/Artigianali
**€2.990** — Sito + e-commerce semplice (max 30 prodotti) + storytelling prodotto + newsletter
*Voucher CCIAA Verona applicabile: segnalarlo sempre al cliente*

---

## Logica di calcolo (trasparente)

```
Sito Vetrina base (Tier A):
- Stima ore: 18h design + 12h dev + 6h contenuti + 4h test = 40h
- Con AI efficiency (x0.55): 22h reali lavorate
- Tariffa base 45€/h × 22h = €990
- Output: €990 (corrisponde al "da €990" in listino)

Sito Business PRO (Tier B):
- Stima ore: 70h equivalenti
- Con AI: 38.5h reali
- 45€/h × 38.5 = €1.732 → arrotondato a €1.890 con margine (9%)
- Output: €1.890

[logica replicabile per ogni servizio]
```

---

## Note strategiche

1. **Voucher CCIAA Verona**: sempre citarlo per progetti >€4.000. Il cliente percepisce risparmio reale, la proposta diventa più facile.
2. **Retainer pesante = no**. Churn 50% in 18 mesi. Meglio: progetto + manutenzione forfait annuale (€490/anno).
3. **"AI-powered" come leva**: non abbassare i prezzi, usa l'AI per promettere tempi rapidi (10-15 gg vs 6-8 settimane agenzia).
4. **Discovery call gratuita 20 min**: sempre. Converte meglio del form. Usa Cal.com (già integrato nel sito).
5. **Pagamento**: 50% upfront + 50% alla consegna. Mai iniziare senza acconto.
6. **IVA**: se Brian è in regime forfettario, non applica IVA → vantaggio competitivo vs agenzie (prezzi sono già finali per il cliente).
